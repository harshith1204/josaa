/**
 * Short labels for JoSAA simulator tables — readable abbreviations for institutes and programs.
 */

const MAX_INST_LEN = 40;
const MAX_PROG_LEN = 36;

function capLen(s, max) {
  if (!s || s.length <= max) return s;
  return `${s.slice(0, Math.max(0, max - 1))}…`;
}

// ─── Institutes ───────────────────────────────────────────────────────────────

function abbrevNationalTech(name, nitPhrase, brand) {
  const idx = name.indexOf(nitPhrase);
  if (idx === -1) return null;
  let rest = name.slice(idx + nitPhrase.length).replace(/^[, ]+/, '').trim();
  if (!rest) return null;
  const parts = rest.split(',').map((s) => s.trim()).filter(Boolean);
  rest = parts[parts.length - 1] || rest;
  return `${brand} ${rest}`;
}

function abbrevIIIT(name) {
  const lower = name.toLowerCase();
  if (lower.includes('management') && lower.includes('gwalior')) return 'IIITM Gwalior';

  if (/^International Institute of Information Technology/i.test(name)) {
    const rest = name
      .replace(/^International Institute of Information Technology,?\s*/i, '')
      .trim();
    const head = rest.split(',')[0].trim();
    if (head) return capLen(`IIIT ${head}`, MAX_INST_LEN);
  }

  const m = name.match(/Indian Institute of Information Technology\s*\(?IIIT\)?\s*[,:]?\s*(.+)/i);
  if (m) {
    let tail = m[1]
      .replace(/^\(IIIT\)\s*/i, '')
      .replace(/^,+\s*/, '')
      .trim();
    tail = tail.split(',')[0].trim();
    if (tail) return capLen(`IIIT ${tail}`, MAX_INST_LEN);
  }

  const m2 = name.match(
    /Indian Institute of Information Technology[, ]+\s*Design[^,]+,?\s*(.+)/i
  );
  if (m2) {
    const t = m2[1].split(',')[0].trim();
    if (t) return capLen(`IIITDM ${t}`, MAX_INST_LEN);
  }

  const m3 = name.match(
    /Indian Institute of Information Technology[, ]+(.+?)(?:\s*\(IIITVICD\)|$)/i
  );
  if (m3) {
    const t = m3[1].split(',')[0].replace(/\s*International Campus.*/i, '').trim();
    if (t && t.length < 45) return capLen(`IIIT ${t}`, MAX_INST_LEN);
  }

  const cityMatch = name.match(
    /Indian Institute of Information Technology\s+(?:\(IIIT\)\s*)?([A-Za-z][A-Za-z\s.'-]{2,40})$/i
  );
  if (cityMatch) return capLen(`IIIT ${cityMatch[1].trim()}`, MAX_INST_LEN);

  return null;
}

/** IIT Delhi, NIT Calicut, IIIT Allahabad, IIEST Shibpur, etc. */
export function abbrevInstitute(name) {
  if (!name) return '';

  if (name.startsWith('Indian Institute of Technology ')) {
    return capLen(`IIT ${name.slice('Indian Institute of Technology '.length)}`, MAX_INST_LEN);
  }

  const nit = abbrevNationalTech(name, 'National Institute of Technology', 'NIT');
  if (nit) return capLen(nit, MAX_INST_LEN);

  if (/Indian Institute of Engineering Science and Technology/i.test(name)) {
    const m = name.match(/Indian Institute of Engineering Science and Technology,?\s*(.+)/i);
    if (m) {
      const place = m[1].split(',')[0].trim();
      if (place) return capLen(`IIEST ${place}`, MAX_INST_LEN);
    }
  }

  if (/Indian Institute of Information Technology/i.test(name) || /\bIIIT\b/i.test(name)) {
    const iiit = abbrevIIIT(name);
    if (iiit) return iiit;
  }

  return capLen(name, MAX_INST_LEN);
}

// ─── Programs — longest / most specific patterns first ────────────────────────

const DUAL_MAIN = {
  'Civil Engineering': 'CE',
  'Electrical Engineering': 'EE',
  'Mechanical Engineering': 'ME',
  'Computer Science and Engineering': 'CSE',
  'Electronics and Communication Engineering': 'ECE',
  'Chemical Engineering': 'CHE',
  'Metallurgical and Materials Engineering': 'MME',
  'Biotechnology': 'Biotech',
};

const PROGRAM_RULES = [
  [/Artificial Intelligence and Data Engineering/i, 'AI & DE'],
  [/Artificial Intelligence and Data Analytics/i, 'AI & DA'],
  [/Artificial Intelligence and Data Science/i, 'AI & DS'],
  [/Artificial Intelligence and Machine Learning/i, 'AI & ML'],
  [/Data Science and Artificial Intelligence/i, 'DS & AI'],
  [/Artificial Intelligence/i, 'AI'],
  [/Computer Science and Engineering/i, 'CSE'],
  [/Electronics and Communication Engineering/i, 'ECE'],
  [/Electrical and Electronics Engineering/i, 'EEE'],
  [/Electronics and Instrumentation Engineering/i, 'E & I'],
  [/Electrical Engineering/i, 'EE'],
  [/Mechanical Engineering/i, 'ME'],
  [/Civil Engineering/i, 'CE'],
  [/Chemical Engineering/i, 'CHE'],
  [/Metallurgical and Materials Engineering/i, 'MME'],
  [/Materials Science and Engineering/i, 'MSE'],
  [/Engineering Physics/i, 'EP'],
  [/Mathematics and Computing/i, 'MnC'],
  [/Mathematics & Computing/i, 'MnC'],
  [/Industrial Engineering/i, 'IE'],
  [/Industrial Design/i, 'ID'],
  [/Biotechnology/i, 'Biotech'],
  [/Production and Industrial Engineering/i, 'PIE'],
  [/Textile Engineering/i, 'Textile'],
  [/Food Process Engineering/i, 'FPE'],
  [/Biochemical Engineering/i, 'Biochemical'],
  [/Aerospace Engineering/i, 'Aerospace'],
  [/Aeronautical Engineering/i, 'Aeronautical'],
  [/Naval Architecture and Ocean Engineering/i, 'NAOE'],
  [/Ceramic Engineering/i, 'Ceramic'],
  [/Mining Engineering/i, 'Mining'],
  [/Petroleum Engineering/i, 'Petroleum'],
  [/Biomedical Engineering/i, 'Biomedical'],
  [/Bio Technology/i, 'Bio Tech'],
  [/Bioengineering/i, 'Bio Eng'],
  [/BS in Mathematics/i, 'BS Math'],
  [/BS in Economics/i, 'BS Econ'],
  [/BS in Chemical Sciences/i, 'BS Chem'],
  [/Architecture and Planning/i, 'Arch & Plan'],
  [/Architecture/i, 'Arch'],
  [/Physics/i, 'Physics'],
  [/Chemistry/i, 'Chemistry'],
];

/** e.g. CSE, CE (DD), or a shortened branch label */
export function abbrevProgram(full) {
  if (!full) return '';
  const isDualFlag = /Dual Degree|Bachelor and Master of Technology \(Dual Degree\)/i.test(full);
  const isFiveYear = /\(\s*5 Years/i.test(full);
  let base = full.split('(')[0].trim();
  base = base.replace(/^B\.?\s*Tech\.?\s+in\s+/i, '');

  const dualIntegrated = base.match(
    /^(Civil Engineering|Electrical Engineering|Mechanical Engineering|Computer Science and Engineering|Electronics and Communication Engineering|Chemical Engineering|Metallurgical and Materials Engineering|Biotechnology)\s+and\s+M\.?\s*Tech/i
  );
  if (dualIntegrated) {
    const ab = DUAL_MAIN[dualIntegrated[1]] || dualIntegrated[1].slice(0, 4);
    return `${ab} (DD)`;
  }

  let short = base;
  for (const [re, ab] of PROGRAM_RULES) {
    if (re.test(base)) {
      short = base.replace(re, ab);
      break;
    }
  }

  if (short === base && base.length > MAX_PROG_LEN) {
    short = capLen(base, MAX_PROG_LEN);
  }

  if (isDualFlag && !short.includes('(DD)')) short += ' (DD)';
  else if (isFiveYear && !short.includes('(5Y)')) short += ' (5Y)';

  if (/^CSE\s+with\s+/i.test(short)) short = short.replace(/^CSE\s+with\s+/i, 'CSE · ');
  if (/^ECE\s+with\s+/i.test(short)) short = short.replace(/^ECE\s+with\s+/i, 'ECE · ');
  if (/^EE\s+with\s+/i.test(short)) short = short.replace(/^EE\s+with\s+/i, 'EE · ');
  if (/^ME\s+with\s+/i.test(short)) short = short.replace(/^ME\s+with\s+/i, 'ME · ');

  return capLen(short, 36);
}
