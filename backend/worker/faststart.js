// MP4 Faststart - moves moov atom before mdat for instant video playback
// Pure JS implementation for Cloudflare Workers (no dependencies)

function readUint32(buf, offset) {
  return (buf[offset] << 24 | buf[offset+1] << 16 | buf[offset+2] << 8 | buf[offset+3]) >>> 0;
}

function writeUint32(buf, offset, val) {
  buf[offset] = (val >> 24) & 0xff;
  buf[offset+1] = (val >> 16) & 0xff;
  buf[offset+2] = (val >> 8) & 0xff;
  buf[offset+3] = val & 0xff;
}

function readAscii(buf, offset, len) {
  let s = '';
  for (let i = 0; i < len; i++) s += String.fromCharCode(buf[offset + i]);
  return s;
}

// Parse top-level MP4 boxes
function parseBoxes(buf) {
  const boxes = [];
  let offset = 0;
  while (offset < buf.length) {
    if (offset + 8 > buf.length) break;
    let size = readUint32(buf, offset);
    const type = readAscii(buf, offset + 4, 4);
    if (size === 0) size = buf.length - offset; // box extends to end
    if (size < 8 || offset + size > buf.length) break;
    boxes.push({ type, offset, size });
    offset += size;
  }
  return boxes;
}

// Find all stco and co64 boxes inside moov (recursive search)
function findChunkOffsetBoxes(buf, start, end) {
  const results = [];
  let offset = start;
  while (offset + 8 <= end) {
    let size = readUint32(buf, offset);
    const type = readAscii(buf, offset + 4, 4);
    if (size === 0) size = end - offset;
    if (size < 8 || offset + size > end) break;

    if (type === 'stco' || type === 'co64') {
      results.push({ type, offset, size });
    } else if (size > 8) {
      // Recurse into container boxes (skip 8-byte header)
      const inner = findChunkOffsetBoxes(buf, offset + 8, offset + size);
      results.push(...inner);
    }
    offset += size;
  }
  return results;
}

// Adjust chunk offsets by delta
function adjustOffsets(buf, moovOffset, moovSize, delta) {
  const chunkBoxes = findChunkOffsetBoxes(buf, moovOffset + 8, moovOffset + moovSize);

  for (const box of chunkBoxes) {
    // stco: version(1) + flags(3) + count(4) + offsets(4 each)
    // co64: version(1) + flags(3) + count(4) + offsets(8 each)
    const dataStart = box.offset + 8; // after box header
    const count = readUint32(buf, dataStart + 4); // skip version+flags

    if (box.type === 'stco') {
      for (let i = 0; i < count; i++) {
        const pos = dataStart + 8 + i * 4;
        const oldVal = readUint32(buf, pos);
        writeUint32(buf, pos, oldVal + delta);
      }
    } else if (box.type === 'co64') {
      for (let i = 0; i < count; i++) {
        const pos = dataStart + 8 + i * 8;
        // Only adjust lower 32 bits (videos < 4GB)
        const hi = readUint32(buf, pos);
        const lo = readUint32(buf, pos + 4);
        const val = hi * 0x100000000 + lo + delta;
        writeUint32(buf, pos, Math.floor(val / 0x100000000));
        writeUint32(buf, pos + 4, val >>> 0);
      }
    }
  }
}

export function faststart(inputBuffer) {
  const buf = new Uint8Array(inputBuffer);
  const boxes = parseBoxes(buf);

  // Find moov and mdat
  const moovBox = boxes.find(b => b.type === 'moov');
  const mdatBox = boxes.find(b => b.type === 'mdat');

  if (!moovBox || !mdatBox) {
    return buf; // Not a standard MP4, return as-is
  }

  // Already faststart (moov before mdat)
  if (moovBox.offset < mdatBox.offset) {
    return buf;
  }

  // Extract moov data
  const moovData = new Uint8Array(buf.buffer, moovBox.offset, moovBox.size);
  const moovCopy = new Uint8Array(moovData.length);
  moovCopy.set(moovData);

  // Adjust chunk offsets: moov is moving before mdat, so all offsets increase by moov size
  adjustOffsets(moovCopy, 0, moovBox.size, moovBox.size);

  // Build output: everything before mdat + moov + mdat + everything after moov
  const output = new Uint8Array(buf.length);
  let writePos = 0;

  // Copy everything before mdat (usually just ftyp)
  output.set(buf.subarray(0, mdatBox.offset), writePos);
  writePos += mdatBox.offset;

  // Insert moov
  output.set(moovCopy, writePos);
  writePos += moovBox.size;

  // Copy mdat
  output.set(buf.subarray(mdatBox.offset, mdatBox.offset + mdatBox.size), writePos);
  writePos += mdatBox.size;

  // Copy anything between mdat end and moov start (unlikely but possible)
  const mdatEnd = mdatBox.offset + mdatBox.size;
  if (mdatEnd < moovBox.offset) {
    output.set(buf.subarray(mdatEnd, moovBox.offset), writePos);
    writePos += moovBox.offset - mdatEnd;
  }

  // Copy anything after moov (unlikely)
  const moovEnd = moovBox.offset + moovBox.size;
  if (moovEnd < buf.length) {
    output.set(buf.subarray(moovEnd), writePos);
  }

  return output;
}
