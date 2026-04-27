const fs = require('fs');
const path = require('path');

// Load data once (cached between invocations in serverless)
const dataPath = path.join(__dirname, '..', 'data', 'cutoffs.json');
const DB = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// ── Institute Alias Map ──
const INSTITUTE_ALIASES = {
  // IITs
  'iit bombay': 'Indian Institute of Technology Bombay',
  'iitb': 'Indian Institute of Technology Bombay',
  'iit mumbai': 'Indian Institute of Technology Bombay',
  'iit delhi': 'Indian Institute of Technology Delhi',
  'iitd': 'Indian Institute of Technology Delhi',
  'iit madras': 'Indian Institute of Technology Madras',
  'iitm': 'Indian Institute of Technology Madras',
  'iit chennai': 'Indian Institute of Technology Madras',
  'iit kanpur': 'Indian Institute of Technology Kanpur',
  'iitk': 'Indian Institute of Technology Kanpur',
  'iit kharagpur': 'Indian Institute of Technology Kharagpur',
  'iitkgp': 'Indian Institute of Technology Kharagpur',
  'iit roorkee': 'Indian Institute of Technology Roorkee',
  'iitr': 'Indian Institute of Technology Roorkee',
  'iit guwahati': 'Indian Institute of Technology Guwahati',
  'iitg': 'Indian Institute of Technology Guwahati',
  'iit hyderabad': 'Indian Institute of Technology Hyderabad',
  'iith': 'Indian Institute of Technology Hyderabad',
  'iit bhu': 'Indian Institute of Technology (BHU) Varanasi',
  'iit varanasi': 'Indian Institute of Technology (BHU) Varanasi',
  'iit bhu varanasi': 'Indian Institute of Technology (BHU) Varanasi',
  'iit indore': 'Indian Institute of Technology Indore',
  'iit bhubaneswar': 'Indian Institute of Technology Bhubaneswar',
  'iitbbs': 'Indian Institute of Technology Bhubaneswar',
  'iit gandhinagar': 'Indian Institute of Technology Gandhinagar',
  'iitgn': 'Indian Institute of Technology Gandhinagar',
  'iit jodhpur': 'Indian Institute of Technology Jodhpur',
  'iit patna': 'Indian Institute of Technology Patna',
  'iitp': 'Indian Institute of Technology Patna',
  'iit ropar': 'Indian Institute of Technology Ropar',
  'iit rupnagar': 'Indian Institute of Technology Ropar',
  'iit mandi': 'Indian Institute of Technology Mandi',
  'iit palakkad': 'Indian Institute of Technology Palakkad',
  'iit tirupati': 'Indian Institute of Technology Tirupati',
  'iit dharwad': 'Indian Institute of Technology Dharwad',
  'iit bhilai': 'Indian Institute of Technology Bhilai',
  'iit goa': 'Indian Institute of Technology Goa',
  'iit jammu': 'Indian Institute of Technology Jammu',
  'ism dhanbad': 'Indian Institute of Technology (Indian School of Mines), Dhanbad',
  'iit dhanbad': 'Indian Institute of Technology (Indian School of Mines), Dhanbad',
  'iit ism': 'Indian Institute of Technology (Indian School of Mines), Dhanbad',
  'iit ism dhanbad': 'Indian Institute of Technology (Indian School of Mines), Dhanbad',
  // NITs
  'nit trichy': 'National Institute of Technology Tiruchirappalli',
  'nit tiruchirappalli': 'National Institute of Technology Tiruchirappalli',
  'nitt': 'National Institute of Technology Tiruchirappalli',
  'nit warangal': 'National Institute of Technology Warangal',
  'nitw': 'National Institute of Technology Warangal',
  'nit surathkal': 'National Institute of Technology Karnataka, Surathkal',
  'nitk': 'National Institute of Technology Karnataka, Surathkal',
  'nit karnataka': 'National Institute of Technology Karnataka, Surathkal',
  'nit calicut': 'National Institute of Technology Calicut',
  'nitc': 'National Institute of Technology Calicut',
  'nit kozhikode': 'National Institute of Technology Calicut',
  'nit rourkela': 'National Institute of Technology Rourkela',
  'nitr': 'National Institute of Technology Rourkela',
  'nit allahabad': 'Motilal Nehru National Institute of Technology Allahabad',
  'mnnit': 'Motilal Nehru National Institute of Technology Allahabad',
  'mnnit allahabad': 'Motilal Nehru National Institute of Technology Allahabad',
  'nit jaipur': 'Malaviya National Institute of Technology Jaipur',
  'mnit': 'Malaviya National Institute of Technology Jaipur',
  'mnit jaipur': 'Malaviya National Institute of Technology Jaipur',
  'nit nagpur': 'Visvesvaraya National Institute of Technology, Nagpur',
  'vnit': 'Visvesvaraya National Institute of Technology, Nagpur',
  'vnit nagpur': 'Visvesvaraya National Institute of Technology, Nagpur',
  'nit bhopal': 'Maulana Azad National Institute of Technology Bhopal',
  'manit': 'Maulana Azad National Institute of Technology Bhopal',
  'manit bhopal': 'Maulana Azad National Institute of Technology Bhopal',
  'nit kurukshetra': 'National Institute of Technology Kurukshetra',
  'nitkkr': 'National Institute of Technology Kurukshetra',
  'nit durgapur': 'National Institute of Technology Durgapur',
  'nitdgp': 'National Institute of Technology Durgapur',
  'nit silchar': 'National Institute of Technology Silchar',
  'nits': 'National Institute of Technology Silchar',
  'nit srinagar': 'National Institute of Technology Srinagar',
  'nit hamirpur': 'National Institute of Technology Hamirpur',
  'nit jalandhar': 'Dr. B R Ambedkar National Institute of Technology, Jalandhar',
  'nit patna': 'National Institute of Technology Patna',
  'nitp': 'National Institute of Technology Patna',
  'nit raipur': 'National Institute of Technology Raipur',
  'nit agartala': 'National Institute of Technology Agartala',
  'nit goa': 'National Institute of Technology Goa',
  'nit meghalaya': 'National Institute of Technology Meghalaya',
  'nit mizoram': 'National Institute of Technology Mizoram',
  'nit manipur': 'National Institute of Technology Manipur',
  'nit nagaland': 'National Institute of Technology Nagaland',
  'nit sikkim': 'National Institute of Technology Sikkim',
  'nit arunachal': 'National Institute of Technology Arunachal Pradesh',
  'nit arunachal pradesh': 'National Institute of Technology Arunachal Pradesh',
  'nit uttarakhand': 'National Institute of Technology Uttarakhand',
  'nit andhra pradesh': 'National Institute of Technology Andhra Pradesh',
  'nit delhi': 'National Institute of Technology Delhi',
  'nit puducherry': 'National Institute of Technology Puducherry',
  'nit surat': 'Sardar Vallabhbhai National Institute of Technology, Surat',
  'svnit': 'Sardar Vallabhbhai National Institute of Technology, Surat',
  'svnit surat': 'Sardar Vallabhbhai National Institute of Technology, Surat',
  // IIEST
  'iiest': 'Indian Institute of Engineering Science and Technology, Shibpur',
  'iiest shibpur': 'Indian Institute of Engineering Science and Technology, Shibpur',
  // IIITs
  'iiit hyderabad': 'International Institute of Information Technology, Hyderabad',
  'iiith': 'International Institute of Information Technology, Hyderabad',
  'iiit allahabad': 'Indian Institute of Information Technology, Allahabad',
  'iiita': 'Indian Institute of Information Technology, Allahabad',
  'iiit gwalior': 'ABV-Indian Institute of Information Technology and Management, Gwalior',
  'abv iiitm': 'ABV-Indian Institute of Information Technology and Management, Gwalior',
  'iiit jabalpur': 'Indian Institute of Information Technology, Design and Manufacturing, Jabalpur',
  'iiitdm jabalpur': 'Indian Institute of Information Technology, Design and Manufacturing, Jabalpur',
  'iiit kancheepuram': 'Indian Institute of Information Technology, Design and Manufacturing, Kancheepuram',
  'iiitdm kancheepuram': 'Indian Institute of Information Technology, Design and Manufacturing, Kancheepuram',
  'iiit delhi': 'Indraprastha Institute of Information Technology Delhi',
  'iiitd': 'Indraprastha Institute of Information Technology Delhi',
};

// ── Program Alias Map ──
const PROGRAM_KEYWORDS = [
  { keys: ['cse', 'cs', 'computer science', 'computer engineering'], match: 'Computer Science' },
  { keys: ['ece', 'electronics and communication', 'electronics & communication'], match: 'Electronics and Communication' },
  { keys: ['ee', 'electrical engineering', 'electrical engg'], match: 'Electrical Engineering' },
  { keys: ['me', 'mechanical engineering', 'mechanical engg', 'mechanical'], match: 'Mechanical Engineering' },
  { keys: ['ce', 'civil engineering', 'civil engg', 'civil'], match: 'Civil Engineering' },
  { keys: ['chemical', 'chemical engineering', 'chemical engg'], match: 'Chemical Engineering' },
  { keys: ['metallurgy', 'metallurgical', 'mme'], match: 'Metallurgical' },
  { keys: ['aerospace', 'aero'], match: 'Aerospace' },
  { keys: ['biotech', 'biotechnology'], match: 'Biotechnology' },
  { keys: ['mathematics and computing', 'math and computing', 'mnc', 'maths computing'], match: 'Mathematics and Computing' },
  { keys: ['engineering physics', 'ep', 'engg physics'], match: 'Engineering Physics' },
  { keys: ['mining', 'mining engineering'], match: 'Mining' },
  { keys: ['textile', 'textile engineering'], match: 'Textile' },
  { keys: ['architecture', 'barch', 'b.arch'], match: 'Architecture' },
  { keys: ['production', 'production engineering', 'industrial'], match: 'Production' },
  { keys: ['it', 'information technology'], match: 'Information Technology' },
  { keys: ['ai', 'artificial intelligence'], match: 'Artificial Intelligence' },
  { keys: ['data science'], match: 'Data Science' },
  { keys: ['biomedical'], match: 'Biomedical' },
  { keys: ['environmental'], match: 'Environmental' },
  { keys: ['ocean', 'naval', 'naval architecture'], match: 'Naval Architecture' },
  { keys: ['ceramic', 'ceramics'], match: 'Ceramic' },
  { keys: ['food technology', 'food'], match: 'Food' },
  { keys: ['instrumentation'], match: 'Instrumentation' },
  { keys: ['petroleum'], match: 'Petroleum' },
  { keys: ['agricultural'], match: 'Agricultural' },
  { keys: ['material science', 'materials'], match: 'Material' },
  { keys: ['electronics', 'ece'], match: 'Electronics' },
];

// ── Category Map (base categories only, PwD detected separately) ──
const CATEGORY_ALIASES = {
  'general': 'OPEN',
  'open': 'OPEN',
  'ur': 'OPEN',
  'unreserved': 'OPEN',
  'gen': 'OPEN',
  'obc': 'OBC-NCL',
  'obc-ncl': 'OBC-NCL',
  'obc ncl': 'OBC-NCL',
  'sc': 'SC',
  'scheduled caste': 'SC',
  'st': 'ST',
  'scheduled tribe': 'ST',
  'ews': 'EWS',
  'economically weaker': 'EWS',
};

// ── Utility ──
function norm(s) { return s.toLowerCase().replace(/[,.\-()]/g, ' ').replace(/\s+/g, ' ').trim(); }

// ── Institute finder ──
function findInstitute(alias) {
  const normFull = norm(INSTITUTE_ALIASES[alias] || alias);
  let idx = DB.institutes.findIndex(inst => {
    const ni = norm(inst);
    return ni.includes(normFull) || normFull.includes(ni);
  });
  if (idx === -1) {
    const keyWord = alias.replace(/\b(iit|nit|iiit|iiitdm|iiest)\b/gi, '').trim();
    if (keyWord.length > 2) {
      idx = DB.institutes.findIndex(inst => norm(inst).includes(keyWord));
    }
  }
  return idx !== -1 ? { idx, name: DB.institutes[idx] } : null;
}

// ── Find ALL institutes mentioned in a query ──
function findAllInstitutes(q) {
  const found = [];
  const usedIdxs = new Set();
  const sortedAliases = Object.keys(INSTITUTE_ALIASES).sort((a, b) => b.length - a.length);
  let remaining = q;
  for (const alias of sortedAliases) {
    if (remaining.includes(alias)) {
      const inst = findInstitute(alias);
      if (inst && !usedIdxs.has(inst.idx)) {
        found.push(inst);
        usedIdxs.add(inst.idx);
        remaining = remaining.replace(alias, ' ');
      }
    }
  }
  return found;
}

// ── Query Parser ──
function parseQuery(question) {
  const q = question.toLowerCase().trim();
  const filters = {};

  // Extract year (support multiple for trends)
  const yearMatches = [...q.matchAll(/\b(2023|2024|2025|2026)\b/g)].map(m => parseInt(m[1]));
  if (yearMatches.length === 1) {
    filters.year = yearMatches[0] === 2026 ? 2025 : yearMatches[0];
  } else if (yearMatches.length > 1) {
    filters.years = [...new Set(yearMatches.map(y => y === 2026 ? 2025 : y))].sort();
  }

  // Extract round
  const roundMatch = q.match(/\bround\s*(\d)\b/i);
  if (roundMatch) filters.round = parseInt(roundMatch[1]);

  // Extract gender
  if (/\b(female|girl|women|woman|supernumerary)\b/i.test(q)) {
    filters.gender = 1;
  } else {
    filters.gender = 0;
  }

  // ── Detect PwD SEPARATELY from base category ──
  const isPwD = /\b(pwd|pw\s*d|physically disabled|handicapped|divyang|divyaang)\b/i.test(q);
  if (isPwD) filters.isPwD = true;

  // Extract base category (OPEN, OBC-NCL, SC, ST, EWS)
  for (const [alias, seatType] of Object.entries(CATEGORY_ALIASES)) {
    const regex = alias.length <= 3
      ? new RegExp(`\\b${alias}\\b`, 'i')
      : new RegExp(alias, 'i');
    if (regex.test(q)) {
      filters.seatType = seatType;
      break;
    }
  }

  // Build the actual DB seat type string
  if (isPwD && filters.seatType) {
    // "OBC PwD" → "OBC-NCL (PwD)"
    filters.seatType = `${filters.seatType} (PwD)`;
  } else if (isPwD && !filters.seatType) {
    // Just "PwD" → match any PwD seat
    filters.seatType = 'PwD';
  }

  // ── Extract rank for "can I get" / eligibility queries ──
  const rankMatch = q.match(/\b(?:rank|crl|air)\s*(?:is\s*)?(\d{1,6})\b/i) ||
                    q.match(/\bwith\s+(\d{1,6})\b/i) ||
                    q.match(/\bgot\s+(\d{1,6})\b/i) ||
                    q.match(/\bhave\s+(\d{1,6})\b/i) ||
                    q.match(/\b(\d{1,6})\s*(?:rank|crl|air)\b/i);
  if (rankMatch) filters.userRank = parseInt(rankMatch[1]);

  // ── Detect institute type filter ──
  if (/\ball\s+iits?\b/i.test(q) || /\btop\s+iits?\b/i.test(q)) {
    filters.instType = 'IIT';
  } else if (/\ball\s+nits?\b/i.test(q) || /\btop\s+nits?\b/i.test(q)) {
    filters.instType = 'NIT';
  } else if (/\ball\s+iiits?\b/i.test(q) || /\btop\s+iiits?\b/i.test(q)) {
    filters.instType = 'IIIT';
  }

  // ── Detect trend queries ──
  if (/\b(trend|trends|over\s+years?|year\s+wise|yearwise|all\s+years?|history)\b/i.test(q)) {
    filters.showTrend = true;
  }

  // ── Detect preference list queries ──
  if (/\b(prefer[ea]nce|pref\b|choice\s*list|counselling\s*list|counseling\s*list|josaa\s*list|filling\s*order|choice\s*filling)\b/i.test(q)) {
    filters.wantPreference = true;
  }

  // ── Detect comparison queries and find multiple institutes ──
  if (isComparisonQuery(q)) {
    const allInst = findAllInstitutes(q);
    if (allInst.length >= 2) {
      filters.compareInstitutes = allInst;
      filters.instituteIdx = allInst[0].idx;
      filters.instituteName = allInst[0].name;
    }
  }

  // Extract single institute if not already set
  if (filters.instituteIdx === undefined && !filters.instType) {
    for (const [alias] of Object.entries(INSTITUTE_ALIASES)) {
      if (q.includes(alias)) {
        const inst = findInstitute(alias);
        if (inst) {
          filters.instituteIdx = inst.idx;
          filters.instituteName = inst.name;
        }
        break;
      }
    }
  }

  // Fuzzy match if no alias matched
  if (filters.instituteIdx === undefined && !filters.instType) {
    const words = q.split(/\s+/);
    let bestScore = 0, bestIdx = -1;
    for (let i = 0; i < DB.institutes.length; i++) {
      const instNorm = norm(DB.institutes[i]);
      let score = 0;
      for (const word of words) {
        if (word.length > 2 && instNorm.includes(word)) score++;
      }
      if (score > bestScore) { bestScore = score; bestIdx = i; }
    }
    if (bestScore >= 2) {
      filters.instituteIdx = bestIdx;
      filters.instituteName = DB.institutes[bestIdx];
    }
  }

  // Extract program
  for (const { keys, match } of PROGRAM_KEYWORDS) {
    for (const key of keys) {
      const regex = key.length <= 3
        ? new RegExp(`\\b${key}\\b`, 'i')
        : new RegExp(key, 'i');
      if (regex.test(q)) {
        filters.programMatch = match;
        break;
      }
    }
    if (filters.programMatch) break;
  }

  // Degree type hints
  if (/\b(dual|5\s*year|integrated|bs\s*ms)\b/i.test(q)) {
    filters.degreeHint = '5 Years';
  } else if (/\b(btech|b\.?tech|4\s*year|bachelor)\b/i.test(q)) {
    filters.degreeHint = '4 Years';
  }

  // ── Fallback: detect standalone rank number ──
  if (!filters.userRank) {
    const years = new Set([2023, 2024, 2025, 2026]);
    if (filters.wantPreference) {
      // "preference list 5000" — find any number that isn't a year
      const nums = q.match(/\b(\d{1,6})\b/g);
      if (nums) {
        const rankNum = nums.map(Number).find(n => !years.has(n));
        if (rankNum) filters.userRank = rankNum;
      }
    } else {
      // Query is just a number → treat as rank, auto-show preference
      const justNum = q.match(/^\s*(\d{1,6})\s*$/);
      if (justNum) {
        const num = parseInt(justNum[1]);
        if (!years.has(num)) {
          filters.userRank = num;
          filters.wantPreference = true;
        }
      }
    }
  }

  return filters;
}

// ── Data Filter ──
function filterData(filters) {
  const results = [];
  const latestYear = filters.year || Math.max(...DB.meta.years);
  const maxRound = DB.meta.roundsByYear[latestYear];

  const keys = [];
  if (filters.round) {
    keys.push(`${latestYear}-${filters.round}`);
  } else {
    keys.push(`${latestYear}-1`);
    keys.push(`${latestYear}-${maxRound}`);
  }

  for (const key of keys) {
    const rows = DB.data[key];
    if (!rows) continue;
    const [yearStr, roundStr] = key.split('-');
    const year = parseInt(yearStr);
    const round = parseInt(roundStr);

    for (const row of rows) {
      const [instIdx, progIdx, quotaIdx, seatType, gender, openRank, closeRank] = row;

      if (filters.instituteIdx !== undefined && instIdx !== filters.instituteIdx) continue;

      // Filter by institute type
      if (filters.instType) {
        const instName = DB.institutes[instIdx];
        if (filters.instType === 'IIT' && !instName.startsWith('Indian Institute of Technology')) continue;
        if (filters.instType === 'NIT' && !/National Institute of Technology|Malaviya|Motilal|Visvesvaraya|Maulana Azad|Sardar Vallabhbhai|Dr\. B R Ambedkar/.test(instName)) continue;
        if (filters.instType === 'IIIT' && !/Institute of Information Technology/.test(instName)) continue;
      }

      if (filters.programMatch) {
        const progName = DB.programs[progIdx].toLowerCase();
        if (!progName.includes(filters.programMatch.toLowerCase())) continue;
        if (filters.degreeHint && !progName.includes(filters.degreeHint.toLowerCase())) continue;
      }

      // ── Improved seat type filtering ──
      if (filters.seatType) {
        if (filters.seatType === 'PwD') {
          // Just "PwD" → any PwD variant
          if (!seatType.includes('PwD')) continue;
        } else if (filters.seatType.includes('(PwD)')) {
          // "OBC-NCL (PwD)" → exact match
          if (seatType !== filters.seatType) continue;
        } else {
          // "OBC-NCL" → exact match (not PwD variant)
          if (seatType !== filters.seatType) continue;
        }
      }

      if (filters.gender !== undefined && gender !== filters.gender) continue;

      results.push({
        institute: DB.institutes[instIdx],
        instIdx,
        program: DB.programs[progIdx],
        quota: DB.quotas[quotaIdx],
        seatType,
        gender: gender === 0 ? 'Gender-Neutral' : 'Female-only (including Supernumerary)',
        openingRank: Math.abs(openRank),
        closingRank: Math.abs(closeRank),
        isPreparatory: openRank < 0 || closeRank < 0,
        year, round,
      });
    }
  }

  results.sort((a, b) => a.round - b.round || a.program.localeCompare(b.program));

  if (results.length > 10 && !filters.degreeHint && filters.programMatch) {
    const mainPrograms = results.filter(r =>
      r.program.includes('4 Years') && !r.program.toLowerCase().includes('campus')
    );
    if (mainPrograms.length > 0) return mainPrograms;
  }

  return results;
}

// ── Multi-year filter for trends ──
function filterDataAllYears(filters) {
  const allResults = [];
  for (const year of DB.meta.years) {
    const maxRound = DB.meta.roundsByYear[year];
    const key = `${year}-${maxRound}`;
    const rows = DB.data[key];
    if (!rows) continue;

    for (const row of rows) {
      const [instIdx, progIdx, quotaIdx, seatType, gender, openRank, closeRank] = row;
      if (filters.instituteIdx !== undefined && instIdx !== filters.instituteIdx) continue;
      if (filters.programMatch) {
        const progName = DB.programs[progIdx].toLowerCase();
        if (!progName.includes(filters.programMatch.toLowerCase())) continue;
        if (filters.degreeHint && !progName.includes(filters.degreeHint.toLowerCase())) continue;
      }
      if (filters.seatType) {
        if (filters.seatType === 'PwD') { if (!seatType.includes('PwD')) continue; }
        else if (filters.seatType.includes('(PwD)')) { if (seatType !== filters.seatType) continue; }
        else { if (seatType !== filters.seatType) continue; }
      } else {
        if (seatType !== 'OPEN') continue; // default to OPEN for trends
      }
      if (filters.gender !== undefined && gender !== filters.gender) continue;

      allResults.push({
        institute: DB.institutes[instIdx], instIdx,
        program: DB.programs[progIdx],
        quota: DB.quotas[quotaIdx], seatType,
        gender: gender === 0 ? 'Gender-Neutral' : 'Female-only',
        openingRank: Math.abs(openRank), closingRank: Math.abs(closeRank),
        isPreparatory: openRank < 0 || closeRank < 0,
        year, round: maxRound,
      });
    }
  }
  return allResults;
}

// ── Template Response Helpers ──
function fmtRank(rank) {
  return rank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const ABBREVS = new Set(['iit','nit','iiit','iiest','mnnit','mnit','vnit','manit','svnit','iiitdm','abv','ism','bhu']);

const SHORT_NAME_MAP = {};
for (const [alias, fullName] of Object.entries(INSTITUTE_ALIASES)) {
  const normFull = norm(fullName);
  let matchIdx = DB.institutes.findIndex(inst => {
    const ni = norm(inst);
    return ni.includes(normFull) || normFull.includes(ni);
  });
  if (matchIdx === -1) {
    const keyWord = alias.replace(/\b(iit|nit|iiit|iiitdm|iiest|mnnit|mnit|vnit|manit|svnit|abv)\b/gi, '').trim();
    if (keyWord.length > 2) {
      matchIdx = DB.institutes.findIndex(inst => norm(inst).includes(keyWord));
    }
  }
  if (matchIdx !== -1) {
    const dbName = DB.institutes[matchIdx];
    const cur = SHORT_NAME_MAP[dbName];
    const score = (a) => {
      const words = a.split(' ');
      const hasLoc = words.some(w => !ABBREVS.has(w.toLowerCase()) && w.length > 1);
      if (words.length > 1 && hasLoc) return 3;
      if (words.length > 1) return 2;
      return 1;
    };
    const ns = score(alias), cs = cur ? score(cur) : 0;
    if (ns > cs || (ns === cs && alias.length < (cur?.length ?? Infinity))) {
      SHORT_NAME_MAP[dbName] = alias;
    }
  }
}

function capitalizeAlias(raw) {
  return raw.split(' ').map(w =>
    ABBREVS.has(w.toLowerCase()) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)
  ).join(' ');
}

function getShortName(fullName) {
  const raw = SHORT_NAME_MAP[fullName];
  if (!raw) return fullName;
  return capitalizeAlias(raw);
}

function shortProgram(p) {
  return p
    .replace(/\((\d+) Years?, Bachelor of Technology\)/i, '($1 Year BTech)')
    .replace(/\((\d+) Years?, Bachelor and Master of Technology.*?\)/i, '($1 Year Dual Degree)')
    .replace(/\((\d+) Years?, Integrated.*?\)/i, '($1 Year Integrated)')
    .replace(/\((\d+) Years?, Bachelor of Architecture\)/i, '($1 Year BArch)')
    .replace(/\((\d+) Years?, Bachelor of Science\)/i, '($1 Year BS)')
    .replace(/\((\d+) Years?, Bachelor of Design\)/i, '($1 Year BDes)');
}

function seatLabel(s) {
  const map = {
    'OPEN': 'General', 'OPEN (PwD)': 'General (PwD)',
    'OBC-NCL': 'OBC-NCL', 'OBC-NCL (PwD)': 'OBC-NCL (PwD)',
    'SC': 'SC', 'SC (PwD)': 'SC (PwD)',
    'ST': 'ST', 'ST (PwD)': 'ST (PwD)',
    'EWS': 'EWS', 'EWS (PwD)': 'EWS (PwD)',
  };
  return map[s] || s;
}

// Category badge with color
function seatBadge(s) {
  const colors = {
    'OPEN': '#00d4aa', 'OPEN (PwD)': '#00d4aa',
    'OBC-NCL': '#f39c12', 'OBC-NCL (PwD)': '#f39c12',
    'SC': '#9b59b6', 'SC (PwD)': '#9b59b6',
    'ST': '#e74c3c', 'ST (PwD)': '#e74c3c',
    'EWS': '#3498db', 'EWS (PwD)': '#3498db',
  };
  const color = colors[s] || '#888';
  return `<span style="display:inline-block;background:${color}22;color:${color};border:1px solid ${color}44;border-radius:4px;padding:2px 8px;font-size:12px;font-weight:500">${seatLabel(s)}</span>`;
}

function rankTypeLabel(s) {
  if (s === 'OPEN' || s === 'OPEN (PwD)') return 'CRL (Common Rank List)';
  if (s.includes('PwD')) return `${s.replace(' (PwD)','')} category PwD rank`;
  return `${s} category rank`;
}

function quotaFull(q) {
  return { AI: 'All India', HS: 'Home State', OS: 'Other State', GO: 'Goa', JK: 'J&K', LA: 'Ladakh' }[q] || q;
}

function isComparisonQuery(q) {
  return /\b(compare|vs\.?|versus|difference between)\b/i.test(q);
}

function isComplexQuery(q) {
  if (isComparisonQuery(q)) return false;
  return /\b(better|best|worst|chances|predict|recommend|suggest|should i|which college)\b/i.test(q);
}

// ── Template Builders ──
function pickDefaultQuota(display) {
  const quotas = [...new Set(display.map(r => r.quota))];
  if (quotas.length <= 1) return display;
  for (const pref of ['AI', 'OS', 'HS']) {
    if (quotas.includes(pref)) return display.filter(r => r.quota === pref);
  }
  return display.filter(r => r.quota === quotas[0]);
}

function formatTemplateResponse(results, filters) {
  if (results.length === 0) return noResultsTemplate(filters);

  let display = [...results];

  // Default to OPEN seat type if no category specified
  if (!filters.seatType) {
    const open = display.filter(r => r.seatType === 'OPEN');
    if (open.length > 0) display = open;
  }

  const hasInst = filters.instituteIdx !== undefined;
  const hasProg = !!filters.programMatch;

  if (!(hasInst && hasProg)) {
    display = pickDefaultQuota(display);
  }

  if (hasInst && hasProg) return detailedTemplate(display, filters);
  if (hasInst) return instituteSummaryTemplate(display, filters);
  if (hasProg) return programComparisonTemplate(display, filters);
  return noResultsTemplate(filters);
}

// ── No results ──
function noResultsTemplate(filters) {
  let h = '';
  h += `<div style="margin-bottom:12px"><strong style="font-size:16px">No matching data found</strong></div>`;
  h += `<div style="color:var(--text-muted);margin-bottom:12px">Parsed from your query:</div>`;
  h += `<div style="margin-bottom:16px;line-height:2">`;
  if (filters.instituteName) h += `Institute: <strong>${getShortName(filters.instituteName)}</strong><br>`;
  if (filters.programMatch) h += `Program: <strong>${filters.programMatch}</strong><br>`;
  if (filters.year) h += `Year: <strong>${filters.year}</strong><br>`;
  if (filters.seatType) h += `Category: ${seatBadge(filters.seatType)}<br>`;
  if (filters.instType) h += `Institute type: <strong>${filters.instType}s</strong><br>`;
  h += `</div>`;
  h += `<div style="color:var(--text-muted);font-size:13px;line-height:1.8">`;
  h += `Try queries like:<br>`;
  h += `&nbsp;&nbsp;"NIT Trichy CSE cutoff 2024"<br>`;
  h += `&nbsp;&nbsp;"IIT Bombay cutoffs"<br>`;
  h += `&nbsp;&nbsp;"CSE cutoff 2025"<br><br>`;
  h += `Available: JoSAA 2023, 2024, 2025 data for IITs, NITs, IIITs &amp; GFTIs`;
  h += `</div>`;
  return h;
}

// ── Detailed: institute + program ──
function detailedTemplate(results, filters) {
  if (results.length === 0) return noResultsTemplate(filters);

  const inst = results[0].institute;
  const shortInst = getShortName(inst);
  const year = results[0].year;
  const seat = results[0].seatType;
  const gender = results[0].gender;

  const quotaOrder = { AI: 0, OS: 1, HS: 2, GO: 3, JK: 4, LA: 5 };
  const uniqueQuotas = [...new Set(results.map(r => r.quota))].sort((a, b) => (quotaOrder[a] ?? 99) - (quotaOrder[b] ?? 99));
  const multiQuota = uniqueQuotas.length > 1;

  let h = '';

  // Header with category badge
  h += `<div style="margin-bottom:16px">`;
  h += `<strong style="font-size:18px">${shortInst}</strong>`;
  if (shortInst.toLowerCase().replace(/\s+/g,'') !== inst.toLowerCase().replace(/[^a-z]/g,'')) {
    h += `<div style="color:var(--text-muted);font-size:12px;margin-top:2px">${inst}</div>`;
  }
  h += `</div>`;

  for (const quota of uniqueQuotas) {
    const quotaRows = results.filter(r => r.quota === quota);
    const byProg = {};
    for (const r of quotaRows) { (byProg[r.program] ??= []).push(r); }

    for (const [prog, rows] of Object.entries(byProg)) {
      rows.sort((a, b) => a.round - b.round);
      const maxRound = DB.meta.roundsByYear[year];

      h += `<div style="margin-bottom:20px">`;
      h += `<div style="font-weight:500;margin-bottom:6px">${shortProgram(prog)}</div>`;
      h += `<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:10px">`;
      h += seatBadge(seat);
      h += `<span style="color:var(--text-muted);font-size:13px">${year} &middot; ${gender} &middot; ${quotaFull(quota)} Quota</span>`;
      h += `</div>`;

      h += `<table><tr><th>Round</th><th>Opening Rank</th><th>Closing Rank</th></tr>`;
      for (const r of rows) {
        const prep = r.isPreparatory ? ' <span style="color:var(--accent);font-size:11px">(Preparatory)</span>' : '';
        const label = r.round === maxRound ? `Round ${r.round} (Final)` : `Round ${r.round}`;
        h += `<tr><td>${label}</td><td><strong>${fmtRank(r.openingRank)}</strong>${prep}</td><td><strong>${fmtRank(r.closingRank)}</strong>${prep}</td></tr>`;
      }
      h += `</table></div>`;

      // Rank movement insight
      if (rows.length >= 2 && Object.keys(byProg).length === 1 && !multiQuota) {
        const diff = rows[rows.length - 1].closingRank - rows[0].closingRank;
        if (diff > 0) {
          h += `<div style="background:rgba(0,212,170,0.06);border:1px solid rgba(0,212,170,0.15);border-radius:8px;padding:10px 14px;margin-bottom:16px;font-size:13px;line-height:1.6">`;
          h += `Closing rank relaxed by <strong style="color:var(--accent-2)">${fmtRank(diff)}</strong> positions from Round ${rows[0].round} to Round ${rows[rows.length - 1].round}. Later rounds tend to have higher closing ranks as seats open up.`;
          h += `</div>`;
        } else if (diff < 0) {
          h += `<div style="background:rgba(255,107,53,0.06);border:1px solid rgba(255,107,53,0.15);border-radius:8px;padding:10px 14px;margin-bottom:16px;font-size:13px;line-height:1.6">`;
          h += `Closing rank tightened by <strong>${fmtRank(Math.abs(diff))}</strong> positions from Round ${rows[0].round} to Round ${rows[rows.length - 1].round}.`;
          h += `</div>`;
        }
      }
    }
  }

  // HS vs OS insight
  if (multiQuota && uniqueQuotas.includes('HS') && uniqueQuotas.includes('OS')) {
    h += `<div style="background:rgba(108,92,231,0.06);border:1px solid rgba(108,92,231,0.15);border-radius:8px;padding:10px 14px;margin-bottom:16px;font-size:13px;line-height:1.6">`;
    h += `<strong style="color:var(--accent-3)">HS vs OS:</strong> Home State (HS) quota is for students domiciled in the NIT's state. Other State (OS) is for everyone else. OS cutoffs are typically more competitive (lower ranks).`;
    h += `</div>`;
  }

  // Footer with rank type explanation
  h += `<div style="font-size:12px;color:var(--text-muted);border-top:1px solid var(--border);padding-top:12px;line-height:1.7">`;
  h += `Ranks shown are <strong>${rankTypeLabel(seat)}</strong>. `;
  const baseSeat = seat.replace(' (PwD)', '');
  const otherCats = ['OPEN', 'OBC-NCL', 'SC', 'ST', 'EWS'].filter(c => c !== baseSeat);
  h += `Try: ${otherCats.join(', ')}`;
  if (!seat.includes('PwD')) h += `, or add PwD`;
  h += `<br>`;
  const otherYears = DB.meta.years.filter(y => y !== year);
  if (otherYears.length) h += `Also available: ${otherYears.join(', ')} &middot; `;
  h += `Source: JoSAA Official`;
  h += `</div>`;

  return h;
}

// ── Institute summary: all programs ──
function instituteSummaryTemplate(results, filters) {
  if (results.length === 0) return noResultsTemplate(filters);

  const inst = results[0].institute;
  const shortInst = getShortName(inst);
  const year = results[0].year;
  const seat = results[0].seatType;

  let display = results;
  const allProgNames = [...new Set(results.map(r => r.program))];
  if (allProgNames.length > 15) {
    const btech = results.filter(r => r.program.includes('4 Years'));
    if (btech.length > 0) display = btech;
  }

  const byProg = {};
  for (const r of display) { (byProg[r.program] ??= {})[r.round] = r; }

  const rounds = [...new Set(display.map(r => r.round))].sort((a, b) => a - b);
  const maxRound = DB.meta.roundsByYear[year];

  const sorted = Object.entries(byProg).sort((a, b) => {
    const ar = a[1][rounds[0]]?.closingRank ?? 999999;
    const br = b[1][rounds[0]]?.closingRank ?? 999999;
    return ar - br;
  });

  let h = '';
  h += `<div style="margin-bottom:16px">`;
  h += `<strong style="font-size:18px">${shortInst}</strong>`;
  if (shortInst.toLowerCase().replace(/\s+/g,'') !== inst.toLowerCase().replace(/[^a-z]/g,'')) {
    h += `<div style="color:var(--text-muted);font-size:12px;margin-top:2px">${inst}</div>`;
  }
  h += `<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:6px">`;
  h += seatBadge(seat);
  h += `<span style="color:var(--text-muted);font-size:13px">${year} &middot; Gender-Neutral &middot; Closing Ranks</span>`;
  h += `</div></div>`;

  h += `<table><tr><th>Program</th>`;
  for (const r of rounds) {
    h += `<th>R${r}${r === maxRound ? ' (Final)' : ''}</th>`;
  }
  h += `</tr>`;
  for (const [prog, rd] of sorted) {
    h += `<tr><td style="font-size:13px">${shortProgram(prog)}</td>`;
    for (const r of rounds) {
      h += `<td>${rd[r] ? '<strong>' + fmtRank(rd[r].closingRank) + '</strong>' : '<span style="color:var(--text-muted)">-</span>'}</td>`;
    }
    h += `</tr>`;
  }
  h += `</table>`;

  h += `<div style="font-size:12px;color:var(--text-muted);border-top:1px solid var(--border);padding-top:12px;margin-top:4px;line-height:1.7">`;
  if (display.length < results.length) h += `Showing ${sorted.length} BTech programs of ${allProgNames.length} total. `;
  else h += `${sorted.length} programs found. `;
  h += `Sorted by cutoff (lower = more competitive). `;
  h += `Ranks are <strong>${rankTypeLabel(seat)}</strong>.<br>Source: JoSAA Official`;
  h += `</div>`;
  return h;
}

// ── Program comparison: same program across institutes ──
function programComparisonTemplate(results, filters) {
  if (results.length === 0) return noResultsTemplate(filters);

  const year = results[0].year;
  const seat = results[0].seatType;
  const programs = [...new Set(results.map(r => r.program))];
  const progLabel = programs.length === 1 ? shortProgram(programs[0]) : filters.programMatch;

  const byInst = {};
  for (const r of results) { (byInst[r.institute] ??= {})[r.round] = r; }

  const rounds = [...new Set(results.map(r => r.round))].sort((a, b) => a - b);
  const maxRound = DB.meta.roundsByYear[year];

  const sorted = Object.entries(byInst).sort((a, b) => {
    const ar = a[1][rounds[0]]?.closingRank ?? 999999;
    const br = b[1][rounds[0]]?.closingRank ?? 999999;
    return ar - br;
  });
  const limited = sorted.slice(0, 25);

  let h = '';
  h += `<div style="margin-bottom:16px">`;
  h += `<strong style="font-size:18px">${progLabel}</strong>`;
  h += `<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:6px">`;
  h += seatBadge(seat);
  h += `<span style="color:var(--text-muted);font-size:13px">${year} &middot; Gender-Neutral &middot; Closing Ranks</span>`;
  h += `</div></div>`;

  h += `<table><tr><th>Institute</th>`;
  for (const r of rounds) { h += `<th>R${r}${r === maxRound ? ' (Final)' : ''}</th>`; }
  h += `</tr>`;
  for (const [inst, rd] of limited) {
    h += `<tr><td style="font-size:13px">${getShortName(inst)}</td>`;
    for (const r of rounds) {
      h += `<td>${rd[r] ? '<strong>' + fmtRank(rd[r].closingRank) + '</strong>' : '<span style="color:var(--text-muted)">-</span>'}</td>`;
    }
    h += `</tr>`;
  }
  h += `</table>`;

  const total = Object.keys(byInst).length;
  h += `<div style="font-size:12px;color:var(--text-muted);border-top:1px solid var(--border);padding-top:12px;margin-top:4px;line-height:1.7">`;
  if (total > 25) h += `Showing top 25 of ${total} institutes. `;
  else h += `${total} institutes found. `;
  h += `Ranked by cutoff (lower = more competitive). `;
  h += `Ranks are <strong>${rankTypeLabel(seat)}</strong>.<br>Source: JoSAA Official`;
  h += `</div>`;
  return h;
}

// ── Institute Comparison (vs) ──
function instituteComparisonTemplate(filters) {
  const insts = filters.compareInstitutes;
  const year = filters.year || Math.max(...DB.meta.years);
  const maxRound = DB.meta.roundsByYear[year];
  const progMatch = filters.programMatch;

  const instData = [];
  for (const inst of insts) {
    const instFilters = { ...filters, instituteIdx: inst.idx, instituteName: inst.name };
    delete instFilters.compareInstitutes;
    let rows = filterData(instFilters);
    if (!filters.seatType) {
      const open = rows.filter(r => r.seatType === 'OPEN');
      if (open.length > 0) rows = open;
    }
    rows = pickDefaultQuota(rows);
    instData.push({ inst, rows });
  }

  const totalRows = instData.reduce((s, d) => s + d.rows.length, 0);
  if (totalRows === 0) return noResultsTemplate(filters);

  const seat = filters.seatType || 'OPEN';
  let h = '';

  const instNames = insts.map(i => getShortName(i.name));
  h += `<div style="margin-bottom:16px">`;
  h += `<strong style="font-size:18px">${instNames.join(' vs ')}</strong>`;
  h += `<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:6px">`;
  h += seatBadge(seat);
  if (progMatch) h += `<span style="color:var(--text-muted);font-size:13px">${progMatch} &middot; ${year} &middot; Closing Ranks</span>`;
  else h += `<span style="color:var(--text-muted);font-size:13px">${year} &middot; Closing Ranks</span>`;
  h += `</div></div>`;

  if (progMatch) {
    const uniqueRounds = [...new Set(instData.flatMap(d => d.rows.map(r => r.round)))].sort((a, b) => a - b);
    const showRounds = uniqueRounds.length > 0 ? uniqueRounds : [1, maxRound];

    h += `<table><tr><th>Round</th>`;
    for (const inst of insts) { h += `<th>${getShortName(inst.name)}</th>`; }
    h += `</tr>`;
    for (const round of showRounds) {
      h += `<tr><td>R${round}${round === maxRound ? ' (Final)' : ''}</td>`;
      for (const d of instData) {
        const row = d.rows.find(r => r.round === round);
        h += row
          ? `<td><strong>${fmtRank(row.closingRank)}</strong></td>`
          : `<td><span style="color:var(--text-muted)">-</span></td>`;
      }
      h += `</tr>`;
    }
    h += `</table>`;

    h += `<div style="margin-top:12px;font-size:13px;line-height:1.8">`;
    for (const d of instData) {
      const progs = [...new Set(d.rows.map(r => r.program))];
      if (progs.length > 0) {
        h += `<div><span style="color:var(--text-muted)">${getShortName(d.inst.name)}:</span> ${shortProgram(progs[0])}</div>`;
      }
    }
    h += `</div>`;

    const finalData = instData.map(d => {
      const finalRow = d.rows.find(r => r.round === maxRound) || d.rows[d.rows.length - 1];
      return { name: getShortName(d.inst.name), rank: finalRow?.closingRank ?? null };
    }).filter(d => d.rank !== null);

    if (finalData.length >= 2) {
      finalData.sort((a, b) => a.rank - b.rank);
      const diff = finalData[finalData.length - 1].rank - finalData[0].rank;
      h += `<div style="background:rgba(0,212,170,0.06);border:1px solid rgba(0,212,170,0.15);border-radius:8px;padding:10px 14px;margin-top:16px;font-size:13px;line-height:1.6">`;
      h += `<strong style="color:var(--accent-2)">${finalData[0].name}</strong> has a more competitive cutoff (closing rank ${fmtRank(finalData[0].rank)}) compared to `;
      h += `<strong>${finalData[finalData.length - 1].name}</strong> (${fmtRank(finalData[finalData.length - 1].rank)})`;
      if (diff > 0) h += ` — difference of <strong>${fmtRank(diff)}</strong> ranks`;
      h += `.`;
      h += `</div>`;
    }
  } else {
    h += `<div style="display:flex;gap:24px;flex-wrap:wrap">`;
    for (const d of instData) {
      const shortName = getShortName(d.inst.name);
      const byProg = {};
      for (const r of d.rows) {
        if (!byProg[r.program] || r.closingRank < byProg[r.program].closingRank) byProg[r.program] = r;
      }
      const sorted = Object.values(byProg).sort((a, b) => a.closingRank - b.closingRank).slice(0, 10);
      h += `<div style="flex:1;min-width:220px">`;
      h += `<div style="font-weight:500;margin-bottom:8px">${shortName}</div>`;
      h += `<table><tr><th>Program</th><th>Cutoff</th></tr>`;
      for (const r of sorted) { h += `<tr><td style="font-size:13px">${shortProgram(r.program)}</td><td><strong>${fmtRank(r.closingRank)}</strong></td></tr>`; }
      h += `</table></div>`;
    }
    h += `</div>`;
  }

  h += `<div style="font-size:12px;color:var(--text-muted);border-top:1px solid var(--border);padding-top:12px;margin-top:12px;line-height:1.7">`;
  h += `${seatLabel(seat)} &middot; Gender-Neutral &middot; Lower rank = more competitive<br>Source: JoSAA Official`;
  h += `</div>`;
  return h;
}

// ── NEW: Rank Eligibility Template ("can I get X with rank Y") ──
function rankEligibilityTemplate(results, filters) {
  const rank = filters.userRank;
  const year = filters.year || Math.max(...DB.meta.years);
  const maxRound = DB.meta.roundsByYear[year];
  const seat = filters.seatType || 'OPEN';
  const hasInst = filters.instituteIdx !== undefined;
  const hasProg = !!filters.programMatch;

  // Get final round data
  let data = [];
  const key = `${year}-${maxRound}`;
  const rows = DB.data[key];
  if (!rows) return noResultsTemplate(filters);

  for (const row of rows) {
    const [instIdx, progIdx, quotaIdx, seatType, gender, openRank, closeRank] = row;
    if (hasInst && instIdx !== filters.instituteIdx) continue;
    if (filters.instType) {
      const instName = DB.institutes[instIdx];
      if (filters.instType === 'IIT' && !instName.startsWith('Indian Institute of Technology')) continue;
      if (filters.instType === 'NIT' && !/National Institute of Technology|Malaviya|Motilal|Visvesvaraya|Maulana Azad|Sardar Vallabhbhai|Dr\. B R Ambedkar/.test(instName)) continue;
      if (filters.instType === 'IIIT' && !/Institute of Information Technology/.test(instName)) continue;
    }
    if (hasProg) {
      const progName = DB.programs[progIdx].toLowerCase();
      if (!progName.includes(filters.programMatch.toLowerCase())) continue;
      if (filters.degreeHint && !progName.includes(filters.degreeHint.toLowerCase())) continue;
    }
    // Match seat type
    if (filters.seatType) {
      if (filters.seatType === 'PwD') { if (!seatType.includes('PwD')) continue; }
      else if (filters.seatType.includes('(PwD)')) { if (seatType !== filters.seatType) continue; }
      else { if (seatType !== filters.seatType) continue; }
    } else {
      if (seatType !== 'OPEN') continue;
    }
    if (gender !== (filters.gender || 0)) continue;

    data.push({
      institute: DB.institutes[instIdx], program: DB.programs[progIdx],
      quota: DB.quotas[quotaIdx], seatType,
      closingRank: Math.abs(closeRank), openingRank: Math.abs(openRank),
    });
  }

  // Prefer 4-year BTech
  if (data.length > 30 && !filters.degreeHint) {
    const btech = data.filter(r => r.program.includes('4 Years'));
    if (btech.length > 0) data = btech;
  }

  data = pickDefaultQuota(data);

  const canGet = data.filter(r => rank <= r.closingRank);
  const close = data.filter(r => rank > r.closingRank && rank <= r.closingRank * 1.15);

  canGet.sort((a, b) => a.closingRank - b.closingRank);
  close.sort((a, b) => a.closingRank - b.closingRank);

  let h = '';
  h += `<div style="margin-bottom:16px">`;
  h += `<strong style="font-size:18px">Rank ${fmtRank(rank)} — What can you get?</strong>`;
  h += `<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:6px">`;
  h += seatBadge(seat);
  h += `<span style="color:var(--text-muted);font-size:13px">${year} Final Round &middot; Gender-Neutral</span>`;
  h += `</div></div>`;

  if (canGet.length > 0) {
    const show = canGet.slice(0, 20);
    h += `<div style="color:var(--accent-2);font-weight:500;margin-bottom:8px;font-size:14px">✓ You can get (${canGet.length} options)</div>`;
    h += `<table><tr><th>Institute</th><th>Program</th><th>Cutoff</th></tr>`;
    for (const r of show) {
      h += `<tr><td style="font-size:13px">${getShortName(r.institute)}</td>`;
      h += `<td style="font-size:13px">${shortProgram(r.program)}</td>`;
      h += `<td><strong>${fmtRank(r.closingRank)}</strong></td></tr>`;
    }
    h += `</table>`;
    if (canGet.length > 20) {
      h += `<div style="color:var(--text-muted);font-size:12px;margin-top:4px">...and ${canGet.length - 20} more options</div>`;
    }
  } else {
    h += `<div style="margin-bottom:12px;font-size:14px">No programs found where your rank of <strong>${fmtRank(rank)}</strong> falls within the cutoff.</div>`;
  }

  if (close.length > 0) {
    h += `<div style="color:#f39c12;font-weight:500;margin:16px 0 8px;font-size:14px">⚠ Close calls (within 15% — possible in later rounds)</div>`;
    h += `<table><tr><th>Institute</th><th>Program</th><th>Cutoff</th><th>Gap</th></tr>`;
    for (const r of close.slice(0, 10)) {
      const gap = rank - r.closingRank;
      h += `<tr><td style="font-size:13px">${getShortName(r.institute)}</td>`;
      h += `<td style="font-size:13px">${shortProgram(r.program)}</td>`;
      h += `<td><strong>${fmtRank(r.closingRank)}</strong></td>`;
      h += `<td style="color:#f39c12;font-size:12px">+${fmtRank(gap)}</td></tr>`;
    }
    h += `</table>`;
  }

  h += `<div style="background:rgba(108,92,231,0.06);border:1px solid rgba(108,92,231,0.15);border-radius:8px;padding:10px 14px;margin-top:16px;font-size:13px;line-height:1.6">`;
  h += `<strong style="color:var(--accent-3)">Note:</strong> Based on ${year} final round data. Actual cutoffs vary each year. Cutoffs generally relax (increase) in later rounds. This is for reference only — check JoSAA for official counselling.`;
  h += `</div>`;

  h += `<div style="font-size:12px;color:var(--text-muted);border-top:1px solid var(--border);padding-top:12px;margin-top:12px;line-height:1.7">`;
  h += `Ranks are <strong>${rankTypeLabel(seat)}</strong>. Source: JoSAA Official`;
  h += `</div>`;
  return h;
}

// ── NEW: Year Trend Template ──
function trendTemplate(filters) {
  const allData = filterDataAllYears(filters);
  if (allData.length === 0) return noResultsTemplate(filters);

  const hasInst = filters.instituteIdx !== undefined;
  const hasProg = !!filters.programMatch;
  const seat = filters.seatType || 'OPEN';

  let display = pickDefaultQuota(allData);

  let h = '';

  if (hasInst && hasProg) {
    // Specific institute + program: show cutoff across years
    const inst = display[0].institute;
    const shortInst = getShortName(inst);
    const progs = [...new Set(display.map(r => r.program))];
    // Pick main 4-year if multiple
    let progRows = display;
    if (progs.length > 1) {
      const btech = display.filter(r => r.program.includes('4 Years'));
      if (btech.length > 0) progRows = btech;
    }
    const prog = progRows[0]?.program || progs[0];

    h += `<div style="margin-bottom:16px">`;
    h += `<strong style="font-size:18px">${shortInst} — ${shortProgram(prog)}</strong>`;
    h += `<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:6px">`;
    h += seatBadge(seat);
    h += `<span style="color:var(--text-muted);font-size:13px">Year-wise Trend &middot; Final Round &middot; Closing Ranks</span>`;
    h += `</div></div>`;

    const byYear = {};
    for (const r of progRows.filter(r => r.program === prog)) { byYear[r.year] = r; }
    const years = Object.keys(byYear).sort();

    h += `<table><tr><th>Year</th><th>Opening Rank</th><th>Closing Rank</th></tr>`;
    for (const y of years) {
      const r = byYear[y];
      h += `<tr><td>${y}</td><td><strong>${fmtRank(r.openingRank)}</strong></td><td><strong>${fmtRank(r.closingRank)}</strong></td></tr>`;
    }
    h += `</table>`;

    // Trend insight
    if (years.length >= 2) {
      const first = byYear[years[0]].closingRank;
      const last = byYear[years[years.length - 1]].closingRank;
      const diff = last - first;
      if (Math.abs(diff) > 5) {
        const dir = diff > 0 ? 'increased (easier to get in)' : 'decreased (harder to get in)';
        const color = diff > 0 ? 'rgba(0,212,170' : 'rgba(255,107,53';
        h += `<div style="background:${color},0.06);border:1px solid ${color},0.15);border-radius:8px;padding:10px 14px;margin-top:12px;font-size:13px;line-height:1.6">`;
        h += `Closing rank has <strong>${dir}</strong> by ${fmtRank(Math.abs(diff))} from ${years[0]} to ${years[years.length - 1]}.`;
        h += `</div>`;
      }
    }
  } else if (hasProg) {
    // Program across institutes, show years as columns
    h += `<div style="margin-bottom:16px">`;
    h += `<strong style="font-size:18px">${filters.programMatch} — Year-wise Trend</strong>`;
    h += `<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:6px">`;
    h += seatBadge(seat);
    h += `<span style="color:var(--text-muted);font-size:13px">Final Round &middot; Closing Ranks</span>`;
    h += `</div></div>`;

    const byInst = {};
    for (const r of display) {
      (byInst[r.institute] ??= {})[r.year] = r;
    }
    const years = [...new Set(display.map(r => r.year))].sort();
    const sorted = Object.entries(byInst).sort((a, b) => {
      const ay = a[1][years[years.length - 1]]?.closingRank ?? 999999;
      const by = b[1][years[years.length - 1]]?.closingRank ?? 999999;
      return ay - by;
    }).slice(0, 20);

    h += `<table><tr><th>Institute</th>`;
    for (const y of years) { h += `<th>${y}</th>`; }
    h += `</tr>`;
    for (const [inst, yd] of sorted) {
      h += `<tr><td style="font-size:13px">${getShortName(inst)}</td>`;
      for (const y of years) {
        h += `<td>${yd[y] ? '<strong>' + fmtRank(yd[y].closingRank) + '</strong>' : '<span style="color:var(--text-muted)">-</span>'}</td>`;
      }
      h += `</tr>`;
    }
    h += `</table>`;
  } else {
    return noResultsTemplate(filters);
  }

  h += `<div style="font-size:12px;color:var(--text-muted);border-top:1px solid var(--border);padding-top:12px;margin-top:12px;line-height:1.7">`;
  h += `Ranks are <strong>${rankTypeLabel(seat)}</strong>. Source: JoSAA Official`;
  h += `</div>`;
  return h;
}

// ── Preference prompt (no rank provided) ──
function preferencePromptTemplate() {
  let h = '';
  h += `<div style="margin-bottom:16px"><strong style="font-size:16px">Generate Your Preference List</strong></div>`;
  h += `<div style="color:var(--text-muted);font-size:14px;line-height:1.8;margin-bottom:16px">`;
  h += `To generate your JoSAA choice filling preference list, I need your rank. Try:`;
  h += `</div>`;
  h += `<div style="line-height:2.2;margin-bottom:16px">`;
  h += `<div style="font-size:14px">"<strong>5000</strong>" — just enter your rank</div>`;
  h += `<div style="font-size:14px">"<strong>rank 5000 preference list</strong>"</div>`;
  h += `<div style="font-size:14px">"<strong>preference list OBC rank 8000</strong>" — with category</div>`;
  h += `<div style="font-size:14px">"<strong>rank 1500 all IITs preference</strong>" — filtered</div>`;
  h += `</div>`;
  h += `<div style="background:rgba(108,92,231,0.06);border:1px solid rgba(108,92,231,0.15);border-radius:8px;padding:10px 14px;font-size:13px;line-height:1.6">`;
  h += `<strong style="color:var(--accent-3)">Tip:</strong> You can add a category (OBC, SC, ST, EWS) and filter by institute type (all IITs, all NITs). Default is OPEN category, Gender-Neutral.`;
  h += `</div>`;
  return h;
}

// ── Region Classification ──
const REGION_KEYWORDS = {
  south: ['madras', 'chennai', 'hyderabad', 'tirupati', 'palakkad', 'dharwad', 'tiruchirappalli', 'warangal', 'karnataka', 'surathkal', 'calicut', 'andhra pradesh', 'puducherry', 'kancheepuram'],
  north: ['delhi', 'kanpur', 'roorkee', 'varanasi', 'jodhpur', 'mandi', 'ropar', 'rupnagar', 'jammu', 'kurukshetra', 'hamirpur', 'jalandhar', 'jaipur', 'allahabad', 'uttarakhand', 'srinagar', 'patna'],
  east: ['kharagpur', 'bhubaneswar', 'dhanbad', 'rourkela', 'durgapur', 'shibpur'],
  west: ['bombay', 'mumbai', 'indore', 'gandhinagar', 'bhilai', 'nagpur', 'surat', 'bhopal', 'raipur', 'goa'],
  northeast: ['guwahati', 'silchar', 'agartala', 'meghalaya', 'mizoram', 'manipur', 'nagaland', 'sikkim', 'arunachal'],
};

function getInstRegion(name) {
  const n = name.toLowerCase();
  for (const [region, keywords] of Object.entries(REGION_KEYWORDS)) {
    if (keywords.some(k => n.includes(k))) return region;
  }
  return 'other';
}

const TOP_IITS = ['Bombay', 'Delhi', 'Madras', 'Kanpur', 'Kharagpur', 'Roorkee', 'Guwahati'];
function isTopIIT(name) {
  if (!name.startsWith('Indian Institute of Technology')) return false;
  return TOP_IITS.some(t => name.includes(t));
}

function isNITInst(name) {
  return /National Institute of Technology|Malaviya|Motilal|Visvesvaraya|Maulana Azad|Sardar Vallabhbhai|Dr\. B R Ambedkar/.test(name);
}

// ── Combo Strategy Definitions ──
const COMBO_DEFS = [
  {
    title: 'CSE Focused', subtitle: 'Prioritize Computer Science & IT branches across all institutes',
    branchFocus: ['Computer Science', 'Information Technology', 'Artificial Intelligence', 'Data Science'],
    blockedBranches: [], regionFocus: null, blockedRegions: [], instFilter: null, safeOnly: false,
  },
  {
    title: 'ECE Focused', subtitle: 'Prioritize Electronics & Communication branches',
    branchFocus: ['Electronics and Communication', 'Electronics', 'Electrical Engineering'],
    blockedBranches: [], regionFocus: null, blockedRegions: [], instFilter: null, safeOnly: false,
  },
  {
    title: 'Top IITs Only', subtitle: 'Only the top 7 IITs — any branch you can get',
    branchFocus: [], blockedBranches: [], regionFocus: null, blockedRegions: [],
    instFilter: 'TOP_IIT', safeOnly: false,
  },
  {
    title: 'South India', subtitle: 'Institutes in Tamil Nadu, Karnataka, AP, Kerala & Telangana',
    branchFocus: [], blockedBranches: [], regionFocus: 'south', blockedRegions: [],
    instFilter: null, safeOnly: false,
  },
  {
    title: 'North India', subtitle: 'Institutes in Delhi, UP, Rajasthan, HP, Punjab & J&K',
    branchFocus: [], blockedBranches: [], regionFocus: 'north', blockedRegions: [],
    instFilter: null, safeOnly: false,
  },
  {
    title: 'No Northeast', subtitle: 'Exclude all Northeast India institutes',
    branchFocus: [], blockedBranches: [], regionFocus: null, blockedRegions: ['northeast'],
    instFilter: null, safeOnly: false,
  },
  {
    title: 'NITs Only', subtitle: 'Only National Institutes of Technology',
    branchFocus: [], blockedBranches: [], regionFocus: null, blockedRegions: [],
    instFilter: 'NIT', safeOnly: false,
  },
  {
    title: 'Safe Choices', subtitle: 'High-confidence picks where your rank is well within cutoff',
    branchFocus: [], blockedBranches: [], regionFocus: null, blockedRegions: [],
    instFilter: null, safeOnly: true,
  },
  {
    title: 'Core Branches', subtitle: 'Mechanical, Civil, Electrical, Chemical — traditional engineering',
    branchFocus: ['Mechanical', 'Civil', 'Electrical Engineering', 'Chemical'],
    blockedBranches: [], regionFocus: null, blockedRegions: [], instFilter: null, safeOnly: false,
  },
  {
    title: 'IITs + NITs Mix', subtitle: 'Best combination of IIT and NIT options',
    branchFocus: [], blockedBranches: [], regionFocus: null, blockedRegions: [],
    instFilter: 'IIT_NIT', safeOnly: false,
  },
];

// ── Preference Combo Generator ──
function generatePreferenceCombos(filters) {
  const rank = filters.userRank;
  const year = filters.year || Math.max(...DB.meta.years);
  const maxRound = DB.meta.roundsByYear[year];
  const seat = filters.seatType || 'OPEN';
  const gender = filters.gender || 0;

  const key = `${year}-${maxRound}`;
  const rows = DB.data[key];
  if (!rows) return null;

  // Build base eligible list
  const allEligible = [];
  for (const row of rows) {
    const [instIdx, progIdx, quotaIdx, seatType, g, openRank, closeRank] = row;

    if (filters.instType) {
      const instName = DB.institutes[instIdx];
      if (filters.instType === 'IIT' && !instName.startsWith('Indian Institute of Technology')) continue;
      if (filters.instType === 'NIT' && !isNITInst(instName)) continue;
      if (filters.instType === 'IIIT' && !/Institute of Information Technology/.test(instName)) continue;
    }

    if (filters.seatType) {
      if (filters.seatType === 'PwD') { if (!seatType.includes('PwD')) continue; }
      else if (filters.seatType.includes('(PwD)')) { if (seatType !== filters.seatType) continue; }
      else { if (seatType !== filters.seatType) continue; }
    } else {
      if (seatType !== 'OPEN') continue;
    }

    if (g !== gender) continue;

    const absClose = Math.abs(closeRank);
    if (rank > absClose) continue;

    allEligible.push({
      institute: DB.institutes[instIdx], instIdx,
      program: DB.programs[progIdx], programLower: DB.programs[progIdx].toLowerCase(),
      quota: DB.quotas[quotaIdx], seatType,
      closingRank: absClose, openingRank: Math.abs(openRank),
      is4Year: DB.programs[progIdx].includes('4 Years'),
    });
  }

  if (allEligible.length === 0) return null;

  // Deduplicate: one entry per inst+program, prefer AI quota
  const seen = new Map();
  for (const e of allEligible) {
    const k = `${e.instIdx}|${e.program}`;
    if (!seen.has(k)) { seen.set(k, e); }
    else if (e.quota === 'AI' && seen.get(k).quota !== 'AI') { seen.set(k, e); }
  }
  let baseList = [...seen.values()];
  const fourYear = baseList.filter(e => e.is4Year);
  if (fourYear.length >= 20) baseList = fourYear;

  // Generate combos
  const combos = [];
  for (const def of COMBO_DEFS) {
    const filtered = baseList.filter(e => {
      if (def.branchFocus.length > 0) {
        if (!def.branchFocus.some(b => e.programLower.includes(b.toLowerCase()))) return false;
      }
      if (def.blockedBranches.length > 0) {
        if (def.blockedBranches.some(b => e.programLower.includes(b.toLowerCase()))) return false;
      }
      if (def.regionFocus) {
        if (getInstRegion(e.institute) !== def.regionFocus) return false;
      }
      if (def.blockedRegions.length > 0) {
        if (def.blockedRegions.includes(getInstRegion(e.institute))) return false;
      }
      if (def.instFilter === 'IIT') {
        if (!e.institute.startsWith('Indian Institute of Technology')) return false;
      } else if (def.instFilter === 'TOP_IIT') {
        if (!isTopIIT(e.institute)) return false;
      } else if (def.instFilter === 'NIT') {
        if (!isNITInst(e.institute)) return false;
      } else if (def.instFilter === 'IIT_NIT') {
        if (!e.institute.startsWith('Indian Institute of Technology') && !isNITInst(e.institute)) return false;
      }
      if (def.safeOnly) {
        if (rank > e.closingRank * 0.85) return false;
      }
      return true;
    });

    if (filtered.length === 0) continue;

    filtered.sort((a, b) => a.closingRank - b.closingRank);
    const capped = filtered.slice(0, 60);

    const iitCount = capped.filter(e => e.institute.startsWith('Indian Institute of Technology')).length;
    const safeCount = capped.filter(e => rank <= e.closingRank * 0.85).length;

    combos.push({
      id: combos.length,
      title: def.title, subtitle: def.subtitle,
      branchFocus: def.branchFocus, blockedBranches: def.blockedBranches,
      locationFocus: def.regionFocus, blockedRegions: def.blockedRegions,
      entries: capped.map(e => ({
        institute: e.institute, shortInstitute: getShortName(e.institute),
        program: shortProgram(e.program), fullProgram: e.program,
        closingRank: e.closingRank, openingRank: e.openingRank,
        quota: e.quota, quotaFull: quotaFull(e.quota),
        seatType: e.seatType, seatLabel: seatLabel(e.seatType),
      })),
      stats: { options: filtered.length, iits: iitCount, safe: safeCount },
    });
  }

  if (combos.length === 0) return null;

  return {
    type: 'preference',
    userRank: rank, seatType: seat, seatTypeLabel: seatLabel(seat),
    year, gender: gender === 0 ? 'Gender-Neutral' : 'Female-only',
    combos,
  };
}

// ── Fallback: unsupported query ──
function unsupportedQueryTemplate(filters) {
  let h = '';
  h += `<div style="margin-bottom:16px"><strong style="font-size:16px">I can help with cutoff data!</strong></div>`;
  h += `<div style="color:var(--text-muted);font-size:14px;line-height:1.8;margin-bottom:16px">`;
  h += `I couldn't understand that query. Try asking like:`;
  h += `</div>`;
  h += `<div style="line-height:2.2;margin-bottom:16px">`;
  h += `<div style="font-size:14px">"<strong>IIT Bombay CSE cutoff 2025</strong>"</div>`;
  h += `<div style="font-size:14px">"<strong>NIT Trichy cutoffs 2024</strong>" — all programs</div>`;
  h += `<div style="font-size:14px">"<strong>CSE cutoff 2025</strong>" — compare across institutes</div>`;
  h += `<div style="font-size:14px">"<strong>IIT Bombay vs IIT Delhi CSE</strong>" — head-to-head</div>`;
  h += `<div style="font-size:14px">"<strong>IIT Kanpur EE OBC cutoff</strong>" — with category</div>`;
  h += `<div style="font-size:14px">"<strong>IIT Bombay CSE OBC PwD</strong>" — category + PwD</div>`;
  h += `<div style="font-size:14px">"<strong>Can I get IIT Delhi CSE with rank 500</strong>"</div>`;
  h += `<div style="font-size:14px">"<strong>IIT Bombay CSE cutoff trend</strong>" — year-over-year</div>`;
  h += `<div style="font-size:14px">"<strong>All IITs CSE cutoff 2025</strong>" — by institute type</div>`;
  h += `</div>`;
  h += `<div style="background:rgba(108,92,231,0.06);border:1px solid rgba(108,92,231,0.15);border-radius:8px;padding:10px 14px;font-size:13px;line-height:1.6">`;
  h += `<strong style="color:var(--accent-3)">Tip:</strong> Include an <strong>institute name</strong> or <strong>program name</strong> (CSE, ECE, Mechanical, etc.) for best results. `;
  h += `Available: JoSAA 2023, 2024 &amp; 2025 for IITs, NITs, IIITs &amp; GFTIs.`;
  h += `</div>`;
  return h;
}

// ── API Handler ──
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { question } = req.body;
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Missing question field' });
    }

    const filters = parseQuery(question);
    const results = filterData(filters);
    const hasFilters = filters.instituteIdx !== undefined || filters.programMatch || filters.instType;

    // 0. Preference without rank → prompt for rank
    if (filters.wantPreference && !filters.userRank) {
      return res.status(200).json({
        answer: preferencePromptTemplate(),
        html: true, filters, matchCount: 0, source: 'template',
      });
    }

    // 0.5 Preference cards: rank + preference keyword OR rank-only (no institute/program)
    const isRankOnly = filters.userRank && filters.instituteIdx === undefined
      && !filters.programMatch && !filters.showTrend && !filters.compareInstitutes;
    if (filters.userRank && (filters.wantPreference || isRankOnly)) {
      const prefData = generatePreferenceCombos(filters);
      if (prefData && prefData.combos.length > 0) {
        return res.status(200).json({ ...prefData, source: 'template' });
      }
    }

    // 1. Rank eligibility: "can I get X with rank 500"
    if (filters.userRank) {
      return res.status(200).json({
        answer: rankEligibilityTemplate(results, filters),
        html: true, filters, matchCount: results.length, source: 'template',
      });
    }

    // 2. Year trend: "IIT Bombay CSE cutoff trend"
    if (filters.showTrend && (filters.programMatch || filters.instituteIdx !== undefined)) {
      const allData = filterDataAllYears(filters);
      return res.status(200).json({
        answer: trendTemplate(filters),
        html: true, filters, matchCount: allData.length, source: 'template',
      });
    }

    // 3. Multi-year: "IIT Bombay CSE 2023 2024 2025"
    if (filters.years && filters.years.length > 1 && (filters.programMatch || filters.instituteIdx !== undefined)) {
      return res.status(200).json({
        answer: trendTemplate(filters),
        html: true, filters, matchCount: 0, source: 'template',
      });
    }

    // 4. Comparison: "IIT Bombay vs IIT Madras CSE"
    if (filters.compareInstitutes && filters.compareInstitutes.length >= 2) {
      const totalRows = filters.compareInstitutes.reduce((s, inst) => {
        const f = { ...filters, instituteIdx: inst.idx };
        delete f.compareInstitutes;
        return s + filterData(f).length;
      }, 0);
      return res.status(200).json({
        answer: instituteComparisonTemplate(filters),
        html: true, filters, matchCount: totalRows, source: 'template',
      });
    }

    // 5. Standard data queries with filters
    if (hasFilters && results.length > 0) {
      return res.status(200).json({
        answer: formatTemplateResponse(results, filters),
        html: true, filters, matchCount: results.length, source: 'template',
      });
    }

    // 6. Has filters but no results
    if (hasFilters) {
      return res.status(200).json({
        answer: noResultsTemplate(filters),
        html: true, filters, matchCount: 0, source: 'template',
      });
    }

    // 7. Anything else → friendly guidance
    return res.status(200).json({
      answer: unsupportedQueryTemplate(filters),
      html: true, filters, matchCount: 0, source: 'template',
    });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: 'Failed to process question', details: err.message });
  }
};
