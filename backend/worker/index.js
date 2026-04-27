import { faststart } from './faststart.js';

const ALLOWED_TYPES = [
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'video/mp4', 'video/quicktime', 'video/webm',
];

const MAX_SIZE = 100 * 1024 * 1024; // 100MB
const WORKER_URL = 'https://cutoffs-upload.fresherschat.workers.dev';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Filename, X-Folder, Range',
  'Access-Control-Expose-Headers': 'Content-Length, Content-Range, Accept-Ranges',
  'Access-Control-Max-Age': '86400',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // GET /file/<key> — serve files from R2
    if ((request.method === 'GET' || request.method === 'HEAD') && url.pathname.startsWith('/file/')) {
      const key = decodeURIComponent(url.pathname.slice(6));
      const rangeHeader = request.headers.get('Range');

      // Get object metadata first
      const head = await env.BUCKET.head(key);
      if (!head) {
        return new Response('Not found', { status: 404, headers: CORS_HEADERS });
      }

      const size = head.size;
      const contentType = head.httpMetadata?.contentType || 'application/octet-stream';

      // Handle range requests
      if (rangeHeader) {
        const match = rangeHeader.match(/bytes=(\d+)-(\d*)/);
        if (match) {
          const start = parseInt(match[1]);
          const end = match[2] ? parseInt(match[2]) : size - 1;
          const chunkSize = end - start + 1;

          const object = await env.BUCKET.get(key, {
            range: { offset: start, length: chunkSize },
          });

          return new Response(object.body, {
            status: 206,
            headers: {
              ...CORS_HEADERS,
              'Content-Type': contentType,
              'Content-Length': chunkSize.toString(),
              'Content-Range': `bytes ${start}-${end}/${size}`,
              'Accept-Ranges': 'bytes',
              'Cache-Control': 'public, max-age=31536000',
            },
          });
        }
      }

      // Full file request
      if (request.method === 'HEAD') {
        return new Response(null, {
          status: 200,
          headers: {
            ...CORS_HEADERS,
            'Content-Type': contentType,
            'Content-Length': size.toString(),
            'Accept-Ranges': 'bytes',
            'Cache-Control': 'public, max-age=31536000',
          },
        });
      }

      const object = await env.BUCKET.get(key);
      return new Response(object.body, {
        status: 200,
        headers: {
          ...CORS_HEADERS,
          'Content-Type': contentType,
          'Content-Length': size.toString(),
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=31536000',
        },
      });
    }

    // PUT / — upload files to R2
    if (request.method === 'PUT') {
      try {
        const contentType = request.headers.get('Content-Type') || 'application/octet-stream';
        const filename = request.headers.get('X-Filename') || 'upload';
        const folder = request.headers.get('X-Folder') || 'uploads';

        if (!ALLOWED_TYPES.includes(contentType)) {
          return new Response(JSON.stringify({ error: 'File type not allowed' }), {
            status: 400, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
          });
        }

        const contentLength = parseInt(request.headers.get('Content-Length') || '0');
        if (contentLength > MAX_SIZE) {
          return new Response(JSON.stringify({ error: 'File too large. Max 100MB.' }), {
            status: 400, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
          });
        }

        const sanitized = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
        const key = `${folder}/${Date.now()}-${sanitized}`;

        // For videos, apply faststart (move moov atom to front) for instant playback
        let body = request.body;
        if (contentType.startsWith('video/')) {
          const arrayBuf = await new Response(body).arrayBuffer();
          const processed = faststart(arrayBuf);
          body = processed;
        }

        await env.BUCKET.put(key, body, {
          httpMetadata: { contentType },
        });

        const fileUrl = `${WORKER_URL}/file/${key}`;
        return new Response(JSON.stringify({ fileUrl, key }), {
          status: 200, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  },
};
