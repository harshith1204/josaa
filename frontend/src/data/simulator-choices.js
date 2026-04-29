// JoSAA Simulator — Choice data built from real cutoffs.json
// Uses actual JoSAA institute names, program names, and cutoff data
// Default view: 2025 Round 6, OPEN seats, Gender-Neutral

import cutoffsData from './simulator-cutoffs.json';

// ─── Institute type detection ─────────────────────────────
function getInstituteType(name) {
  if (name.startsWith('Indian Institute of Technology')) return 'IIT';
  if (name.startsWith('National Institute of Technology')) return 'NIT';
  if (name.startsWith('Indian Institute of Information Technology')) return 'IIIT';
  return 'GFTI';
}

const typeFullMap = {
  IIT: 'Indian Institute of Technology',
  NIT: 'National Institute of Technology',
  IIIT: 'Indian Institute of Information Technology',
  GFTI: 'Other GFTIs',
};

// ─── Quota label map ──────────────────────────────────────
const quotaLabelMap = {
  AI: 'All India',
  HS: 'Home State',
  OS: 'Other State',
  GO: 'Goa',
  JK: 'Jammu & Kashmir',
  LA: 'Ladakh',
};

// ─── Build choices from cutoffs.json ──────────────────────
function buildChoices() {
  const { institutes, programs, quotas, data } = cutoffsData;

  // Use latest year, latest round: 2025 Round 6
  const roundKey = '2025-6';
  const roundData = data[roundKey];

  if (!roundData) {
    console.warn(`Round ${roundKey} not found in cutoffs data`);
    return [];
  }

  const choices = [];
  let id = 1;

  // We show OPEN seat, Gender-Neutral (0) entries as the default "available choices"
  // but also collect ALL entries for filtering
  for (const row of roundData) {
    const [instIdx, progIdx, quotaIdx, seatType, gender, openingRank, closingRank] = row;

    const instituteName = institutes[instIdx];
    const programName = programs[progIdx];
    const quotaCode = quotas[quotaIdx];
    const type = getInstituteType(instituteName);

    choices.push({
      id: id++,
      institute: instituteName,
      program: programName,
      programFull: programName,
      type,
      typeFull: typeFullMap[type],
      quota: quotaCode,
      quotaFull: quotaLabelMap[quotaCode] || quotaCode,
      seatType,
      gender: gender === 0 ? 'Gender-Neutral' : 'Female-only',
      genderCode: gender,
      openingRank: Math.abs(openingRank),
      closingRank: Math.abs(closingRank),
    });
  }

  // Sort by closing rank (most competitive first)
  choices.sort((a, b) => a.closingRank - b.closingRank);
  // Re-assign IDs
  choices.forEach((c, i) => (c.id = i + 1));

  return choices;
}

export const allChoicesRaw = buildChoices();

// Default filtered view: OPEN seats, Gender-Neutral only
// (This is what students see in the real JoSAA portal by default)
export const simulatorChoices = allChoicesRaw.filter(
  (c) => c.seatType === 'OPEN' && c.genderCode === 0
);

// ─── Unique values for filter dropdowns ───────────────────
export const instituteTypes = [
  'All Institute Types',
  ...new Set(simulatorChoices.map((c) => c.typeFull)),
];

export const allInstitutes = [
  'All Institutes',
  ...new Set(simulatorChoices.map((c) => c.institute)),
].sort();

export const allPrograms = [
  'All Programs',
  ...new Set(simulatorChoices.map((c) => c.program)),
].sort();

// Seat type and quota options (for advanced filtering)
export const seatTypes = [
  'All Seat Types',
  ...new Set(allChoicesRaw.map((c) => c.seatType)),
];

export const quotaOptions = [
  'All Quotas',
  ...new Set(allChoicesRaw.map((c) => c.quotaFull)),
];
