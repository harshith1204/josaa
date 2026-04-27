// Strategy engine — template-based, no LLM needed
// Uses real cutoff data to generate smart choice lists with explanations

import { simulatorChoices } from './choices';

// ─── Strategy definitions ────────────────────────────────
const STRATEGIES = {
  safe: {
    id: 'safe',
    name: 'Safe Strategy',
    icon: '🛡️',
    color: '#43a047',
    tagline: 'High chance of admission',
    description: 'Picks choices where your rank is well within the closing rank. Minimizes risk of not getting a seat.',
  },
  moderate: {
    id: 'moderate',
    name: 'Moderate Strategy',
    icon: '⚖️',
    color: '#1976d2',
    tagline: 'Balanced risk and reward',
    description: 'Mix of aspirational and safe choices. Good balance between dream colleges and practical options.',
  },
  aggressive: {
    id: 'aggressive',
    name: 'Aggressive Strategy',
    icon: '🔥',
    color: '#e53935',
    tagline: 'Aim for the top',
    description: 'Targets choices near or above your rank. High reward but higher risk — needs backup options.',
  },
  branch: {
    id: 'branch',
    name: 'Branch Priority',
    icon: '💻',
    color: '#7b1fa2',
    tagline: 'Best branch, any college',
    description: 'Prioritizes your preferred branch/program across all institutes. Great if you care more about what you study than where.',
  },
  college: {
    id: 'college',
    name: 'College Priority',
    icon: '🏛️',
    color: '#e65100',
    tagline: 'Best college, any branch',
    description: 'Prioritizes top-tier institutes regardless of branch. Good if brand name and campus matter most to you.',
  },
};

// ─── Institute tier ranking ──────────────────────────────
function getInstituteTier(name) {
  if (name.startsWith('Indian Institute of Technology')) return 1; // IIT
  if (name.startsWith('National Institute of Technology')) return 2; // NIT
  if (name.startsWith('Indian Institute of Information Technology')) return 3; // IIIT
  return 4; // GFTI
}

// ─── Branch desirability (CS > ECE > EE > Mech > Civil > ...) ──
const BRANCH_RANK = {
  'Computer Science': 1,
  'Artificial Intelligence': 1,
  'Data Science': 1,
  'Mathematics and Computing': 2,
  'Electrical Engineering': 3,
  'Electronics': 3,
  'Electronics and Communication': 3,
  'Information Technology': 2,
  'Mechanical Engineering': 4,
  'Chemical Engineering': 5,
  'Civil Engineering': 5,
  'Aerospace': 4,
  'Metallurgical': 6,
  'Mining': 6,
  'Textile': 7,
  'Ceramic': 7,
  'Agricultural': 7,
};

function getBranchScore(programName) {
  const lower = programName.toLowerCase();
  if (lower.includes('computer science') || lower.includes('artificial intelligence') || lower.includes('data science') || lower.includes('machine learning')) return 1;
  if (lower.includes('mathematics and computing') || lower.includes('information technology')) return 2;
  if (lower.includes('electronics and communication') || lower.includes('electronics & communication')) return 3;
  if (lower.includes('electrical') && !lower.includes('electronics')) return 3.5;
  if (lower.includes('electronics')) return 3;
  if (lower.includes('mechanical')) return 4;
  if (lower.includes('aerospace') || lower.includes('engineering physics')) return 4;
  if (lower.includes('chemical')) return 5;
  if (lower.includes('civil')) return 5;
  if (lower.includes('biotechnology') || lower.includes('biomedical')) return 5.5;
  if (lower.includes('metallurg') || lower.includes('mining') || lower.includes('ceramic') || lower.includes('textile') || lower.includes('agricultural')) return 6;
  return 5; // default mid-tier
}

// ─── Explanation templates ───────────────────────────────
function safetyLabel(rank, closingRank) {
  const ratio = rank / closingRank;
  if (ratio <= 0.5) return { level: 'Very Safe', color: '#2e7d32', emoji: '✅' };
  if (ratio <= 0.75) return { level: 'Safe', color: '#43a047', emoji: '🟢' };
  if (ratio <= 0.95) return { level: 'Moderate', color: '#f9a825', emoji: '🟡' };
  if (ratio <= 1.05) return { level: 'Risky', color: '#e65100', emoji: '🟠' };
  return { level: 'Long Shot', color: '#c62828', emoji: '🔴' };
}

function generateExplanation(choice, rank, strategy) {
  const safety = safetyLabel(rank, choice.closingRank);
  const tier = getInstituteTier(choice.institute);
  const tierName = tier === 1 ? 'IIT' : tier === 2 ? 'NIT' : tier === 3 ? 'IIIT' : 'GFTI';
  const branchScore = getBranchScore(choice.programFull);
  const branchQuality = branchScore <= 2 ? 'top-tier' : branchScore <= 3.5 ? 'good' : branchScore <= 5 ? 'decent' : 'niche';
  const margin = choice.closingRank - rank;

  let reasoning = '';

  switch (strategy) {
    case 'safe':
      if (safety.level === 'Very Safe') {
        reasoning = `Your rank ${rank} is well within the closing rank of ${choice.closingRank} — ${margin} ranks of buffer. Very high chance of getting this seat.`;
      } else {
        reasoning = `Closing rank ${choice.closingRank} gives you ${margin > 0 ? margin + ' ranks of margin' : 'a tight fit'}. ${safety.level} pick for your rank.`;
      }
      break;
    case 'moderate':
      reasoning = `Balances ${tierName} prestige with ${branchQuality} branch. Closing rank ${choice.closingRank} vs your rank ${rank} — ${safety.level.toLowerCase()} admission chance.`;
      break;
    case 'aggressive':
      if (margin < 0) {
        reasoning = `Your rank is ${Math.abs(margin)} positions above the last closing rank — but cutoffs fluctuate yearly. Worth trying as a stretch choice.`;
      } else {
        reasoning = `Aspirational ${tierName} pick. Only ${margin} ranks of margin — competitive but achievable if cutoffs ease slightly.`;
      }
      break;
    case 'branch':
      reasoning = `${branchQuality === 'top-tier' ? 'Premium CS/AI branch' : branchQuality === 'good' ? 'Strong technical branch' : 'Solid branch'} at ${tierName}. Branch quality matters more for placements — ${choice.programFull.split('(')[0].trim()} has strong industry demand.`;
      break;
    case 'college':
      reasoning = `${tierName} carries strong brand value. ${tier === 1 ? 'IIT tag opens doors regardless of branch — top recruiters visit all departments.' : tier === 2 ? 'NIT reputation is strong across India. Good campus and placement record.' : 'Decent institute with growing reputation.'}`;
      break;
  }

  return { safety, reasoning };
}

// ─── Strategy generators ─────────────────────────────────
function generateSafe(rank, count = 25) {
  // Pick choices where rank is well within closing rank (ratio < 0.85)
  return simulatorChoices
    .filter(c => c.closingRank > 0 && rank / c.closingRank <= 0.85 && rank <= c.closingRank)
    .sort((a, b) => {
      // Sort by institute tier first, then by closing rank (tightest safe first = most prestigious)
      const tierDiff = getInstituteTier(a.institute) - getInstituteTier(b.institute);
      if (tierDiff !== 0) return tierDiff;
      return a.closingRank - b.closingRank;
    })
    .slice(0, count);
}

function generateModerate(rank, count = 25) {
  // Mix: some aspirational (0.85-1.05 ratio) + some safe (0.5-0.85)
  const all = simulatorChoices.filter(c => c.closingRank > 0 && rank / c.closingRank <= 1.05);
  // Score by combo of tier + branch + safety
  return all
    .map(c => ({
      ...c,
      _score: getInstituteTier(c.institute) * 2 + getBranchScore(c.programFull) + (rank / c.closingRank) * 3,
    }))
    .sort((a, b) => a._score - b._score)
    .slice(0, count);
}

function generateAggressive(rank, count = 25) {
  // Target choices near or slightly above rank (0.8-1.3 ratio), prioritize top institutes
  return simulatorChoices
    .filter(c => c.closingRank > 0 && rank / c.closingRank >= 0.7 && rank / c.closingRank <= 1.3)
    .sort((a, b) => {
      const tierDiff = getInstituteTier(a.institute) - getInstituteTier(b.institute);
      if (tierDiff !== 0) return tierDiff;
      return getBranchScore(a.programFull) - getBranchScore(b.programFull);
    })
    .slice(0, count);
}

function generateBranchPriority(rank, count = 25) {
  // Best branches first, across all institutes
  return simulatorChoices
    .filter(c => c.closingRank > 0 && rank <= c.closingRank * 1.1)
    .sort((a, b) => {
      const branchDiff = getBranchScore(a.programFull) - getBranchScore(b.programFull);
      if (branchDiff !== 0) return branchDiff;
      return getInstituteTier(a.institute) - getInstituteTier(b.institute);
    })
    .slice(0, count);
}

function generateCollegePriority(rank, count = 25) {
  // Best institutes first, any branch
  return simulatorChoices
    .filter(c => c.closingRank > 0 && rank <= c.closingRank * 1.1)
    .sort((a, b) => {
      const tierDiff = getInstituteTier(a.institute) - getInstituteTier(b.institute);
      if (tierDiff !== 0) return tierDiff;
      return a.closingRank - b.closingRank;
    })
    .slice(0, count);
}

// ─── Main export ─────────────────────────────────────────
export function getStrategies() {
  return Object.values(STRATEGIES);
}

export function generateStrategy(strategyId, rank, count = 25) {
  if (!rank || rank <= 0) return { choices: [], strategy: STRATEGIES[strategyId] };

  let choices;
  switch (strategyId) {
    case 'safe': choices = generateSafe(rank, count); break;
    case 'moderate': choices = generateModerate(rank, count); break;
    case 'aggressive': choices = generateAggressive(rank, count); break;
    case 'branch': choices = generateBranchPriority(rank, count); break;
    case 'college': choices = generateCollegePriority(rank, count); break;
    default: choices = [];
  }

  // Add explanations
  const explained = choices.map(c => ({
    ...c,
    explanation: generateExplanation(c, rank, strategyId),
  }));

  return {
    strategy: STRATEGIES[strategyId],
    choices: explained,
    summary: `Found ${explained.length} choices for rank ${rank} using ${STRATEGIES[strategyId].name}`,
  };
}

export { safetyLabel, getInstituteTier, getBranchScore };
