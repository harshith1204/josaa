// ============================================================================
// JoSAA CHOICE FILLING STRATEGIES — COMPREHENSIVE RESEARCH DATA
// ============================================================================
// Deep-dive research compiled from official JoSAA guidelines, coaching institute
// blogs (Allen, Aakash, Vedantu), education portals (Shiksha, Careers360,
// CollegeDekho, CollegeDunia), Quora, Reddit, and community forums.
// Sources indexed at bottom of file.
// ============================================================================

// ─── 1. OFFICIAL JOSAA GUIDELINES ──────────────────────────────────────────
export const OFFICIAL_GUIDELINES = {
  overview: {
    totalInstitutes: 127,
    breakdown: { IITs: 23, NITs: 31, IIITs: 26, GFTIs: 47 },
    totalBranchCombinations: 700,
    rounds: 6,
    description:
      'JoSAA conducts centralized counselling for 127 premier institutes based on JEE Main and JEE Advanced ranks. Choices are filled once before Round 1 and cannot be changed after the deadline.',
  },
  choiceFillingRules: [
    'Candidates fill choices ONCE before Round 1 — the list is used across all 6 rounds.',
    'Choices can be edited, reordered, added, or deleted ONLY during the choice-filling window.',
    'If candidates do not lock choices manually, the system auto-locks the last saved version.',
    'After seat allotment, candidates choose Freeze / Float / Slide for subsequent rounds.',
    'No modifications to the choice list are permitted after the deadline — triple-check before locking.',
    'Mock allotment rounds are conducted to help students gauge likely outcomes before final locking.',
  ],
  postAllotmentOptions: {
    freeze: {
      name: 'Freeze',
      description: 'Accept the allotted seat permanently. No further upgrades in subsequent rounds.',
      when: 'Use when you are fully satisfied with the allotted seat.',
      irreversible: true,
    },
    float: {
      name: 'Float',
      description:
        'Accept seat but stay in the pool for higher-preference choices across ALL institutes in later rounds.',
      when: 'Use when you want a shot at a better institute OR branch.',
      irreversible: false,
    },
    slide: {
      name: 'Slide',
      description:
        'Accept seat but seek upgrade to a higher-preference branch within the SAME institute only.',
      when: 'Use when you love the institute but want a better branch there.',
      irreversible: false,
    },
  },
  optionChangeRules: [
    'Float can be changed to Slide or Freeze in subsequent rounds.',
    'Slide can be changed to Freeze in subsequent rounds.',
    'Freeze CANNOT be changed back to Float or Slide — it is irreversible.',
    'In the final round (Round 6), all remaining candidates are automatically Frozen.',
  ],
};

// ─── 2. INSTITUTE TIER HIERARCHY ───────────────────────────────────────────
export const INSTITUTE_TIERS = {
  IITs: {
    tier1: {
      label: 'Top 5 (Old IITs)',
      institutes: ['IIT Bombay', 'IIT Delhi', 'IIT Madras', 'IIT Kanpur', 'IIT Kharagpur'],
      closingRankCSE: '< 200 (General)',
      notes: 'Global brand, best placements, strongest alumni network. IIT Bombay CSE closes under rank 70.',
    },
    tier2: {
      label: 'Established IITs',
      institutes: ['IIT Roorkee', 'IIT Guwahati', 'IIT BHU'],
      closingRankCSE: '200–800',
      notes: 'Excellent placements, strong campus culture. Roorkee and Guwahati are strong for core branches too.',
    },
    tier3: {
      label: 'Mid IITs',
      institutes: [
        'IIT Hyderabad', 'IIT Indore', 'IIT Gandhinagar', 'IIT Ropar',
        'IIT Patna', 'IIT Bhubaneswar', 'IIT Mandi', 'IIT Jodhpur',
      ],
      closingRankCSE: '800–3000',
      notes: 'Growing reputation, good placements in CS/ECE. IIT Hyderabad is rapidly rising.',
    },
    tier4: {
      label: 'New IITs',
      institutes: [
        'IIT Tirupati', 'IIT Palakkad', 'IIT Dharwad', 'IIT Bhilai',
        'IIT Goa', 'IIT Jammu', 'IIT Kharagpur (off-campus)',
      ],
      closingRankCSE: '3000–6000',
      notes: 'Still developing infrastructure. IIT tag provides baseline placement access.',
    },
  },
  NITs: {
    tier1: {
      label: 'Top NITs',
      institutes: ['NIT Trichy', 'NIT Surathkal', 'NIT Warangal', 'NIT Rourkela', 'NIT Calicut'],
      closingRankCSE_HS: '1500–5000',
      closingRankCSE_OS: '3000–8000',
      notes: 'NIT Trichy is NIRF #8 overall. These compete with mid-tier IITs for top branches.',
    },
    tier2: {
      label: 'Strong NITs',
      institutes: [
        'MNNIT Allahabad', 'NIT Nagpur', 'NIT Jaipur', 'NIT Kurukshetra',
        'NIT Durgapur', 'VNIT Nagpur', 'NIT Silchar',
      ],
      closingRankCSE_HS: '5000–15000',
      closingRankCSE_OS: '8000–20000',
    },
    tier3: {
      label: 'Mid-tier NITs',
      institutes: [
        'NIT Jalandhar', 'NIT Patna', 'NIT Raipur', 'NIT Srinagar',
        'NIT Hamirpur', 'NIT Meghalaya', 'NIT Uttarakhand',
      ],
      closingRankCSE_OS: '20000–50000',
    },
  },
  IIITs: {
    tier1: {
      label: 'Top IIITs',
      institutes: ['IIIT Hyderabad', 'IIIT Bangalore', 'IIIT Allahabad', 'IIIT Delhi'],
      notes: 'IIIT Hyderabad and Bangalore rank above most NITs for CSE/ECE. Specialized IT focus.',
      closingRankCSE: '3000–10000',
    },
    tier2: {
      label: 'Other IIITs',
      institutes: [
        'IIIT Lucknow', 'IIIT Guwahati', 'IIIT Kottayam', 'IIIT Sri City',
        'IIIT Sonepat', 'IIIT Nagpur', 'IIIT Pune',
      ],
      closingRankCSE: '10000–40000',
      notes: 'PPP (Public-Private Partnership) IIITs charge higher fees (1.5–2.5L/sem) vs Govt IIITs (50K–1.2L/sem).',
    },
  },
  GFTIs: {
    topPicks: ['BIT Mesra', 'IIEST Shibpur', 'PEC Chandigarh', 'IIITDM Jabalpur'],
    notes: 'BIT Mesra leads this category. Good fallback options for 30000+ ranks.',
  },
};

// ─── 3. BRANCH HIERARCHY & PLACEMENT DATA ──────────────────────────────────
export const BRANCH_HIERARCHY = {
  tier1_highest_demand: {
    branches: [
      'Computer Science & Engineering (CSE)',
      'Artificial Intelligence & Data Science',
      'Mathematics & Computing',
    ],
    avgPackageTopIIT: '30–45 LPA',
    avgPackageTopNIT: '15–25 LPA',
    closingRankRange: 'Top 500–5000 (IITs), Top 1500–15000 (NITs)',
    topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'Uber', 'Samsung'],
    futureScope: 'Highest demand. AI/ML, cloud, and cybersecurity are sub-domains with explosive growth.',
  },
  tier2_strong: {
    branches: [
      'Electronics & Communication (ECE)',
      'Electrical Engineering (EE)',
    ],
    avgPackageTopIIT: '25–32 LPA',
    avgPackageTopNIT: '10–18 LPA',
    closingRankRange: '300–3000 (IITs), 5000–28000 (NITs)',
    notes: 'ECE graduates frequently cross into software roles. EE has strong core + software placement.',
  },
  tier3_moderate: {
    branches: [
      'Mechanical Engineering',
      'Chemical Engineering',
      'Civil Engineering',
    ],
    avgPackageTopIIT: '15–22 LPA',
    avgPackageTopNIT: '6–12 LPA',
    closingRankRange: '1500–8000 (IITs), 15000–70000 (NITs)',
    notes: 'Lower IT placement rates but strong in core industries, PSUs, and government jobs.',
  },
  tier4_niche: {
    branches: [
      'Metallurgical Engineering',
      'Mining Engineering',
      'Textile Engineering',
      'Ceramic Engineering',
      'Ocean Engineering',
    ],
    avgPackageTopIIT: '10–18 LPA',
    notes: 'Very specialized. Often chosen for IIT tag rather than branch passion. Branch change is a common plan.',
  },
  emergingBranches: {
    branches: [
      'Data Science & AI',
      'Computational Mathematics',
      'Energy Engineering',
      'Biomedical Engineering',
      'Engineering Physics',
    ],
    notes: 'Newer programs with growing demand. Lower cutoffs than CSE but strong career trajectories.',
  },
};

// ─── 4. RANK-RANGE STRATEGIES ──────────────────────────────────────────────
export const RANK_RANGE_STRATEGIES = {
  'rank_1_1000': {
    label: 'AIR 1–1000 (Top IITs)',
    jeeAdvanced: true,
    targetInstitutes: [
      'IIT Bombay', 'IIT Delhi', 'IIT Madras', 'IIT Kanpur', 'IIT Kharagpur',
    ],
    strategy: [
      'You can get CSE/AI at top 5 IITs. Prioritize your dream IIT + branch combo at the top.',
      'If CSE at IIT Bombay is the dream, place it #1. Follow with CSE at Delhi, Madras, Kanpur, KGP.',
      'Include ECE/EE at top 3 IITs as moderate choices — these have excellent placement outcomes too.',
      'Even at this rank, fill 50+ choices. Do not leave anything to chance.',
      'Consider dual degree programs at IIT Bombay/KGP — they have slightly higher closing ranks but excellent ROI.',
    ],
    commonMistake: 'Filling only 5-10 choices thinking "I will definitely get one of these." Always have safety nets.',
  },
  'rank_1000_5000': {
    label: 'AIR 1000–5000 (IIT CSE/ECE at mid-tier, top branches at top 5)',
    jeeAdvanced: true,
    targetInstitutes: [
      'IIT Roorkee', 'IIT Guwahati', 'IIT BHU', 'IIT Hyderabad', 'IIT Indore',
      'Top 5 IITs (non-CSE branches)',
    ],
    strategy: [
      'CSE at Roorkee, Guwahati, BHU, Hyderabad is achievable. Place these high.',
      'EE/ECE at top 5 IITs (Bombay, Delhi, Madras) are strong options — place as ambitious choices.',
      'Include Mathematics & Computing programs — these have excellent placement parity with CSE.',
      'IIT Hyderabad CSE is increasingly competitive — do not underestimate its cutoff.',
      'Fill at least 80+ choices mixing IIT branches with top NIT CSE as safety.',
    ],
    commonMistake: 'Ignoring newer IITs. IIT Indore, Gandhinagar have surprisingly good placements.',
  },
  'rank_5000_15000': {
    label: 'AIR 5000–15000 (New IITs, Top NITs, Top IIITs)',
    jeeAdvanced: true,
    targetInstitutes: [
      'New IITs (all branches)', 'NIT Trichy', 'NIT Surathkal', 'NIT Warangal',
      'IIIT Hyderabad', 'IIIT Bangalore',
    ],
    strategy: [
      'THE CLASSIC DILEMMA ZONE: CSE at top NIT vs non-CSE at mid IIT.',
      'If you want software careers: CSE at NIT Trichy/Surathkal/Warangal is often better than Mech at older IIT.',
      'If you want IIT tag + flexibility: Take any branch at a new IIT and leverage the ecosystem.',
      'IIIT Hyderabad CSE is equivalent to mid-IIT CSE in placement outcomes.',
      'Fill 100+ choices. Use Home State quota at NITs aggressively.',
      'Include dual degree programs — they close at higher ranks and give you an extra year of prep.',
    ],
    commonMistake: 'Blindly choosing IIT tag over branch. At rank 10000, Mechanical at a new IIT may underperform CSE at NIT Trichy.',
  },
  'rank_15000_30000': {
    label: 'AIR 15000–30000 (Mid-tier NITs, strong IIITs)',
    jeeAdvanced: false,
    targetInstitutes: [
      'Mid-tier NITs (CSE/ECE)', 'IIIT Allahabad', 'IIIT Lucknow',
      'MNNIT Allahabad', 'NIT Nagpur', 'NIT Jaipur',
    ],
    strategy: [
      'Focus on getting the best possible BRANCH at a decent NIT/IIIT.',
      'CSE at tier-2 NITs closes around 10000–20000 OS. Target these.',
      'ECE/EE at tier-1 NITs (Trichy, Warangal) may still be possible with Home State quota.',
      'Home State quota is your biggest lever — a 5000–25000 rank difference is common.',
      'Fill every NIT in your home state first, then expand to other states.',
      'Include GFTIs like BIT Mesra, PEC Chandigarh as safety.',
    ],
    commonMistake: 'Not leveraging Home State quota. Check if your NIT has significantly lower HS cutoffs.',
  },
  'rank_30000_50000': {
    label: 'AIR 30000–50000 (Lower NITs, IIITs, GFTIs)',
    jeeAdvanced: false,
    targetInstitutes: [
      'Tier-3 NITs', 'Newer IIITs', 'Top GFTIs',
      'NIT Jalandhar', 'NIT Patna', 'NIT Raipur', 'BIT Mesra',
    ],
    strategy: [
      'At this range, BRANCH matters more than institute name. Get the best branch you can.',
      'CSE/IT at any NIT in this range is still a strong career foundation.',
      'Newer IIITs with low fees are excellent value if you get CSE/IT.',
      'Consider ECE at established NITs over CSE at very new IIITs.',
      'Do NOT ignore GFTIs — some have excellent placement cells.',
      'Fill maximum choices (150+). At this rank range, seat availability fluctuates significantly across rounds.',
    ],
    commonMistake: 'Giving up hope. Cutoffs expand significantly in Rounds 5 and 6. Seats that seem unreachable in Round 1 may open up.',
  },
  'rank_50000_plus': {
    label: 'AIR 50000+ (GFTIs, Newer IIITs, Spot Rounds)',
    jeeAdvanced: false,
    targetInstitutes: [
      'All GFTIs', 'Newer IIITs', 'Tier-4 NITs (Home State)',
    ],
    strategy: [
      'Focus on getting ANY seat through JoSAA, then explore CSAB special rounds.',
      'Home State quota at lesser-known NITs can work in your favor at this rank.',
      'Fill ALL possible choices — every single one. There is no downside to listing more.',
      'Civil/Mechanical at mid-tier NITs may be achievable. These are still government engineering colleges.',
      'After JoSAA, CSAB conducts additional rounds for remaining seats at NITs, IIITs, and GFTIs.',
      'Consider state counselling (GGSIPU, JAC Delhi, etc.) as parallel backup.',
    ],
    commonMistake: 'Not filling enough choices and losing out on seats that open up in later rounds.',
  },
};

// ─── 5. CHOICE DISTRIBUTION MODEL ─────────────────────────────────────────
export const CHOICE_DISTRIBUTION = {
  philosophy:
    'Distribute choices across three tiers — Ambitious (Dream), Moderate (Realistic), and Safe (Backup). The exact ratio depends on your risk appetite and rank stability.',
  recommendedDistribution: {
    ambitious: {
      label: 'Ambitious / Dream Picks',
      percentage: '20–25%',
      definition: 'Your rank is ABOVE (worse than) last year closing rank, but within 15–20% margin.',
      example: 'If your rank is 8000 and last year closing was 6500, it is an ambitious pick.',
      placement: 'Put these at the TOP of your list. No harm in dreaming — you only get allotted if the cutoff drops.',
    },
    moderate: {
      label: 'Moderate / Realistic Picks',
      percentage: '40–50%',
      definition: 'Your rank is WITHIN 0–15% better than last year closing rank.',
      example: 'If your rank is 8000 and last year closing was 8500–9200, it is a moderate pick.',
      placement: 'These form the BULK of your list. High probability of getting one of these.',
    },
    safe: {
      label: 'Safe / Backup Picks',
      percentage: '25–35%',
      definition: 'Your rank is 15–30% better (lower) than last year closing rank.',
      example: 'If your rank is 8000 and last year closing was 10000–12000, it is a safe pick.',
      placement: 'Put these at the BOTTOM. Insurance against unexpected cutoff drops.',
    },
  },
  minimumChoices: {
    'rank_under_200': '50+ choices recommended',
    'rank_200_5000': '80+ choices recommended',
    'rank_5000_20000': '100+ choices recommended',
    'rank_20000_plus': '150+ choices (fill everything relevant)',
  },
  importantRule:
    'There is NO penalty for filling more choices. The system allots the HIGHEST preference that your rank qualifies for. Always fill more rather than less.',
};

// ─── 6. BRANCH VS COLLEGE DECISION FRAMEWORK ──────────────────────────────
export const BRANCH_VS_COLLEGE = {
  chooseBranchWhen: [
    'You have a clear career goal aligned with a specific branch (e.g., core mechanical R&D).',
    'You are passionate about a particular field and plan to pursue higher studies in it.',
    'The branch has strong independent placement outcomes (CSE anywhere > random branch at famous college).',
    'You are NOT planning to switch fields — you want to work in the domain you study.',
    'The salary gap between branches is significant at the institutes you are comparing.',
  ],
  chooseCollegeWhen: [
    'You are unsure about your career direction and want flexibility.',
    'You plan to leverage the IIT brand for MBA, civil services, or entrepreneurship.',
    'The institute offers easy internal branch change after first year.',
    'You prioritize campus life, peer quality, alumni network, and exposure over branch specifics.',
    'You plan to enter software/IT regardless of your branch (many IIT non-CS students do this).',
  ],
  quantitativeComparison: {
    cseAtTopNIT_vs_mechAtOldIIT: {
      example: 'CSE at NIT Trichy vs Mechanical at IIT Guwahati',
      avgPackageCSE_NIT: '18–22 LPA',
      avgPackageMech_IIT: '14–18 LPA',
      verdict: 'For software careers, CSE at top NIT often wins. For flexibility and IIT ecosystem, Mech at IIT can work if you self-learn CS.',
    },
    cseAtNewIIT_vs_cseAtTopNIT: {
      example: 'CSE at IIT Dharwad vs CSE at NIT Trichy',
      avgPackageCSE_newIIT: '12–16 LPA',
      avgPackageCSE_topNIT: '18–22 LPA',
      verdict: 'NIT Trichy CSE has more established placements. New IIT tag helps for brand but NIT Trichy is a safer bet for outcomes.',
    },
  },
  allenRecommendation:
    'ALLEN advises: "Choose the branch of your interest first, then the college." But if you want flexibility and are placement-focused, top college with lower branch can work too.',
  iitBombayWarning:
    'Some IITs like IIT Bombay no longer provide branch change facility. Verify branch-change policies before counting on switching later.',
};

// ─── 7. ROUND-WISE STRATEGY ───────────────────────────────────────────────
export const ROUND_WISE_STRATEGY = {
  round1: {
    action: 'Get allotted, choose FLOAT.',
    details: [
      'First allotment based on your choice list. Accept whatever you get.',
      'Choose FLOAT to remain in the pool for higher-preference upgrades.',
      'Pay the partial seat acceptance fee to confirm your seat.',
      'Analyze the allotment — compare with your preference list to understand the gap.',
    ],
  },
  round2: {
    action: 'Continue with FLOAT (or SLIDE if happy with institute).',
    details: [
      'If upgraded to a better choice, your previous seat is released.',
      'If you love the institute but want a better branch, switch to SLIDE.',
      'Check mock allotment data to see if further upgrades are likely.',
    ],
  },
  round3_4: {
    action: 'Evaluate seriously. Consider SLIDE if upgrade is unlikely.',
    details: [
      'By Round 3, most major movements have happened.',
      'If cutoff trends show your dream choice is not moving, switch to SLIDE or FREEZE.',
      'Cutoff expansion starts becoming visible — some seats open up from withdrawals.',
    ],
  },
  round5: {
    action: 'Last chance for meaningful upgrades. Maximum cutoff expansion observed here.',
    details: [
      'Round 5 sees the largest cutoff expansion due to students withdrawing for CSAB, state counselling, or private colleges.',
      'If you are still on FLOAT, this is your best shot at a surprise upgrade.',
      'After Round 5, seriously consider FREEZE if satisfied.',
    ],
  },
  round6: {
    action: 'Final round. All remaining candidates are auto-frozen.',
    details: [
      'This is the last round. Whatever you are allotted becomes final.',
      'No further changes possible after this round.',
      'If not allotted anywhere, explore CSAB special rounds, state counselling, or private colleges.',
    ],
  },
  goldenRule:
    'Use FLOAT until Round 5 for maximum upgrade chances. Only FREEZE when fully satisfied or in Round 6.',
};

// ─── 8. COMMON MISTAKES ───────────────────────────────────────────────────
export const COMMON_MISTAKES = [
  {
    mistake: 'Filling too few choices',
    impact: 'HIGH',
    details: 'Students with rank 5000+ should fill at least 100 choices. There is zero downside to filling more. The system always allots your highest possible preference.',
    fix: 'Fill every institute-branch combo you would be willing to attend. More choices = more chances.',
  },
  {
    mistake: 'Not locking choices before deadline',
    impact: 'CRITICAL',
    details: 'If you forget to lock, the system auto-locks the last saved version — which may not reflect your intended order.',
    fix: 'Lock choices manually at least 2 hours before the deadline. Take a screenshot as proof.',
  },
  {
    mistake: 'Wrong preference ordering',
    impact: 'HIGH',
    details: 'Placing a lower-preference choice above a higher-preference one. Once allotted, upgrading past a higher-ranked choice is nearly impossible.',
    fix: 'Review your list 3–4 times. Ask a mentor to cross-check. Simulate scenarios mentally.',
  },
  {
    mistake: 'Choosing college name blindly over branch',
    impact: 'HIGH',
    details: 'Taking Metallurgy at IIT Bombay when your goal is software, just for the IIT tag. Placement outcomes differ drastically by branch.',
    fix: 'Check branch-specific placement data, not just institute averages. Ask: "Would I study this subject for 4 years?"',
  },
  {
    mistake: 'Ignoring Home State quota at NITs',
    impact: 'MEDIUM-HIGH',
    details: 'Home State cutoffs can be 5000–25000 ranks more relaxed than Other State. This is a massive advantage being left on the table.',
    fix: 'Always list your home state NIT choices separately and ensure they are well-placed in your preference list.',
  },
  {
    mistake: 'Freezing too early',
    impact: 'MEDIUM-HIGH',
    details: 'Freezing in Round 1 or 2 when significant cutoff expansion happens in Rounds 5–6.',
    fix: 'Use FLOAT until Round 5 unless you got your #1 choice. Freeze is irreversible.',
  },
  {
    mistake: 'Not using mock allotment data',
    impact: 'MEDIUM',
    details: 'JoSAA provides 2 mock allotment rounds before actual Round 1. Many students skip analyzing these.',
    fix: 'Study mock allotment results. Adjust your choice order based on likely outcomes shown in mocks.',
  },
  {
    mistake: 'Not keeping document originals ready',
    impact: 'CRITICAL',
    details: 'Category certificates, income certificates (for EWS), and domicile proofs must be valid. Discrepancies can cancel admission.',
    fix: 'Get all certificates ready BEFORE counselling begins. Verify formats match JoSAA requirements.',
  },
  {
    mistake: 'Panicking after Round 1',
    impact: 'MEDIUM',
    details: 'Getting a low-preference allotment in Round 1 and making emotional decisions. Cutoffs change significantly across rounds.',
    fix: 'Stay calm. Use FLOAT. Rounds 2–5 bring meaningful upgrades for many students.',
  },
  {
    mistake: 'Ignoring fee differences',
    impact: 'MEDIUM',
    details: 'PPP IIITs charge 2.5–5L/semester while government IIITs charge 50K–1.2L. Total 4-year cost difference can be 10–15 lakh.',
    fix: 'Compare total programme cost (tuition + hostel + mess for 4 years) before ordering choices.',
  },
];

// ─── 9. CATEGORY-SPECIFIC STRATEGIES ──────────────────────────────────────
export const CATEGORY_STRATEGIES = {
  general: {
    category: 'General (Unreserved)',
    seatShare: '40.5% of total seats',
    strategy: [
      'Most competitive category. Cutoffs are highest.',
      'Focus on maximizing choices and using the 3-tier distribution model.',
      'At borderline ranks, your safety choices become critical — fill aggressively.',
    ],
  },
  obc_ncl: {
    category: 'OBC-NCL',
    seatShare: '27% of total seats',
    strategy: [
      'Category rank matters, not AIR. Your OBC rank determines your actual competitiveness.',
      'Fill choices in BOTH OBC and General categories — you are eligible for both.',
      'OBC certificate must be in Central List format and valid for the admission year.',
      'Cutoffs are typically 30–50% more relaxed than General category.',
      'Non-Creamy Layer certificate must be recent (issued after a specified date each year).',
    ],
    warning: 'If your OBC certificate is rejected during verification, you are treated as General. Keep backup choices that are safe even under General cutoffs.',
  },
  ews: {
    category: 'GEN-EWS',
    seatShare: '10% of total seats',
    strategy: [
      'Relatively new category (since 2019). Cutoffs are still stabilizing year-over-year.',
      'EWS cutoffs are typically 10–20% more relaxed than General.',
      'Income certificate is mandatory and must be for the current financial year.',
      'Fill choices in both EWS and General categories.',
    ],
    warning: 'EWS certificates are valid for one year only. Ensure it is current.',
  },
  sc: {
    category: 'SC (Scheduled Caste)',
    seatShare: '15% of total seats',
    strategy: [
      'Significant rank relaxation available. SC category cutoffs can be 3–10x more relaxed than General.',
      'With a decent SC rank, top IIT CSE becomes accessible at ranks that would not qualify in General.',
      'Always fill General category choices too — you may get allotted under General if your rank is good enough.',
      'SC certificates are generally permanent — verify format matches JoSAA requirements.',
    ],
  },
  st: {
    category: 'ST (Scheduled Tribe)',
    seatShare: '7.5% of total seats',
    strategy: [
      'Most relaxed cutoffs among all categories. Even moderate ranks can access top institutes.',
      'Preparatory courses are available at IITs for ST candidates who narrowly miss cutoffs.',
      'Fill choices ambitiously — the rank relaxation is substantial.',
    ],
  },
  pwd: {
    category: 'PwD (Persons with Disability)',
    seatShare: '5% horizontal reservation across all categories',
    strategy: [
      'PwD reservation is applied across ALL categories (General-PwD, OBC-PwD, SC-PwD, etc.).',
      'Cutoffs are significantly more relaxed. Many PwD seats go vacant — fill ambitiously.',
      'Disability certificate must be from a government hospital and should specify >= 40% disability.',
    ],
  },
  documentChecklist: [
    'Category Certificate (OBC-NCL/SC/ST/EWS) in prescribed format',
    'Income Certificate (for EWS — current year)',
    'Non-Creamy Layer Certificate (for OBC — current year)',
    'PwD Certificate from Government Hospital (if applicable)',
    'Domicile / Nativity Certificate (for Home State quota at NITs)',
    'Class 12 Marksheet and Passing Certificate',
    'JEE Main / Advanced Scorecard',
    'Aadhaar Card and Passport-size Photographs',
  ],
};

// ─── 10. HOME STATE QUOTA STRATEGY ────────────────────────────────────────
export const HOME_STATE_QUOTA = {
  overview: {
    split: '50% Home State (HS) + 50% Other State (OS) at all NITs',
    determination: 'Home State is decided by the state where you passed Class 12, NOT birthplace or domicile.',
    significance: 'HS cutoffs can be 5,000 to 25,000+ ranks more relaxed than OS, depending on the state and institute.',
  },
  stateWiseAdvantage: {
    highAdvantage: {
      states: ['States with fewer JEE aspirants — NE states, J&K, Himachal, Uttarakhand'],
      rankDifference: '15,000–50,000+ ranks easier under HS',
      advice: 'If your NIT is in one of these states, HS quota is a massive advantage. Prioritize it.',
    },
    moderateAdvantage: {
      states: ['Tamil Nadu, Karnataka, Kerala, Telangana, Andhra Pradesh, Gujarat'],
      rankDifference: '5,000–15,000 ranks easier under HS',
      advice: 'Meaningful advantage. Always list HS choices prominently.',
    },
    lowAdvantage: {
      states: ['Rajasthan, UP, Bihar, Maharashtra'],
      rankDifference: '500–5,000 ranks easier under HS',
      advice: 'Smaller gap due to high competition density. Still worth using but do not over-rely.',
    },
  },
  tacticalAdvice: [
    'Always list your home state NIT first, then other NITs for the same branch.',
    'For top NITs (Trichy, Warangal, Surathkal), HS advantage is smaller because demand is high from all states.',
    'For mid/lower NITs, HS quota can be transformative — you may get CSE at HS NIT where OS cutoff is out of reach.',
    'If you studied Class 12 in a different state from your home state, your HS is the Class 12 state.',
    'IITs do NOT have Home State quota — only NITs and some GFTIs.',
  ],
};

// ─── 11. DUAL DEGREE VS SINGLE DEGREE ─────────────────────────────────────
export const DUAL_DEGREE_VS_SINGLE = {
  dualDegree: {
    duration: '5 years (BTech + MTech)',
    advantages: [
      'Get both BTech and MTech degrees without appearing for GATE.',
      'Higher placement rates: IIT Bombay dual degree had 95% placement vs 88% for BTech in recent years.',
      'Dual degree students consistently report higher average packages than BTech students.',
      'Extra year allows more internships, projects, and learning from seniors\' placement experiences.',
      'Specialization in a focused area can make you a domain expert.',
    ],
    disadvantages: [
      'One extra year in college — you start earning 1 year later than BTech peers.',
      'Watching friends get placed while you still have a year left can be demotivating.',
      'If you want to switch fields (e.g., MBA), the extra year may feel wasted.',
      'Opportunity cost: 1 year of salary at a top company can be 15–40 LPA.',
    ],
    bestFor: 'Students who want depth in their field, plan for research/higher studies, or want the IIT brand at a slightly lower cutoff.',
  },
  singleDegree: {
    duration: '4 years (BTech)',
    advantages: [
      'Enter the workforce 1 year earlier.',
      'More flexibility — can pursue MBA, MS, or switch fields sooner.',
      'Lower total college expenditure.',
    ],
    bestFor: 'Students who want maximum flexibility, plan to do MBA/MS separately, or want to start earning sooner.',
  },
  cutoffInsight:
    'Dual degree programs at the same institute typically close at 500–2000 ranks higher (worse) than the single degree equivalent. This means you can sometimes get into a better IIT via the dual degree route.',
  strategicUse:
    'Use dual degree as a strategic lever: if CSE BTech at IIT Bombay is out of reach, CSE BTech+MTech Dual might be accessible. The placement outcomes are nearly identical.',
};

// ─── 12. FEE STRUCTURE COMPARISON ─────────────────────────────────────────
export const FEE_COMPARISON = {
  IITs: {
    tuitionPerYear: '2–3 lakh',
    hostelPerYear: '20,000–50,000',
    totalForFourYears: '10–14 lakh',
    scholarships: 'Means-based fee waiver available. SC/ST/PwD get full tuition waiver.',
  },
  NITs: {
    tuitionPerYear: '1.5–3 lakh',
    hostelPerYear: '15,000–40,000',
    totalForFourYears: '8–14 lakh',
    scholarships: 'Various state and central scholarships available.',
  },
  IIITs_Government: {
    tuitionPerSemester: '50,000–1.2 lakh',
    totalForFourYears: '4–10 lakh',
    notes: 'Government-funded IIITs are very affordable.',
  },
  IIITs_PPP: {
    tuitionPerSemester: '1.5–2.5 lakh',
    totalForFourYears: '12–20 lakh',
    notes: 'PPP (Public-Private Partnership) IIITs are significantly more expensive. Compare ROI carefully.',
  },
  GFTIs: {
    tuitionPerYear: '1–2.5 lakh',
    totalForFourYears: '5–12 lakh',
    notes: 'Generally affordable. BIT Mesra is on the higher end.',
  },
  roiInsight:
    'NIT Trichy and top government IIITs offer some of the best ROI in engineering education — lower fees with strong placement outcomes comparable to mid-tier IITs.',
};

// ─── 13. DATA-DRIVEN INSIGHTS ─────────────────────────────────────────────
export const DATA_INSIGHTS = {
  cutoffTrendPatterns: [
    'CSE cutoffs have TIGHTENED (worsened for students) by 5–15% year-over-year at top institutes due to growing demand.',
    'AI/Data Science branches, where newly introduced, start with relaxed cutoffs that tighten rapidly over 2–3 years.',
    'Core branches (Mechanical, Civil, Chemical) have LOOSENED by 10–20% at many institutes as demand shifts to CS/IT.',
    'Round-wise cutoff expansion: Maximum expansion happens in Rounds 5 and 6 due to withdrawals.',
    'Opening rank vs Closing rank gap: Can be as wide as 5000–10000 ranks for popular branches, indicating high demand fluctuation.',
  ],
  roundWiseCutoffBehavior: {
    round1: 'Tightest cutoffs. Only the most competitive choices fill up.',
    round2_3: 'Moderate expansion. 500–2000 rank relaxation is common.',
    round4_5: 'Significant expansion. Withdrawals from students joining private colleges or state counselling create openings.',
    round6: 'Final expansion. Largest cutoff relaxation observed — but also fewest seats available.',
  },
  dataUsageAdvice: [
    'Use 2–3 years of past cutoff data, not just the most recent year. Single-year anomalies happen.',
    'Weight the most recent year slightly more (50%) and older years less (25% each).',
    'If a branch was newly introduced, its cutoff in Year 1 is unreliable — it will tighten significantly.',
    'Compare opening AND closing ranks. A large gap means high demand volatility — safer as an ambitious pick.',
    'JoSAA official website publishes Opening/Closing ranks for all rounds — use this as the primary data source.',
  ],
  officialDataSource: 'https://josaa.nic.in/document/opening-and-closing-ranks-2024/',
};

// ─── 14. NEW IITs VS OLD NITs DEBATE ──────────────────────────────────────
export const NEW_IIT_VS_OLD_NIT = {
  forNewIIT: {
    label: 'Arguments FOR choosing a New IIT',
    points: [
      'IIT brand name carries weight in placements, MBA admissions, and global recognition.',
      'All IITs share a common placement portal — new IIT students can access top recruiters.',
      'IIT alumni network is massive and helpful for career growth.',
      'If you plan higher studies abroad, IIT carries more recognition than NIT.',
      'Flexibility to branch-change after first year (verify per institute).',
      'Research opportunities and faculty quality are generally strong even at new IITs.',
    ],
  },
  forOldNIT: {
    label: 'Arguments FOR choosing a top NIT',
    points: [
      'Established placement cells with decade-long recruiter relationships.',
      'Better campus infrastructure, hostels, and student life than new IITs still building their campuses.',
      'Specific branch-level placements (CSE at NIT Trichy) can outperform new IIT averages.',
      'Stronger peer group for competitive branches — a CSE batch at NIT Trichy is self-selected for high aptitude.',
      'Home State quota advantage makes top NITs accessible at much more relaxed ranks.',
      'More extracurricular opportunities, fests, and cultural life at established campuses.',
    ],
  },
  verdictMatrix: {
    'Software Career + CSE': 'Top NIT (Trichy/Surathkal/Warangal) CSE > New IIT CSE, usually.',
    'IIT Brand + Flexibility': 'New IIT > Mid-tier NIT, if you are okay with any branch and plan MBA/startup.',
    'Core Engineering': 'Depends on specific branch placement data. Check institute-level stats.',
    'Higher Studies Abroad': 'IIT (any) > NIT in terms of global brand recognition.',
    'Campus Life': 'Old NIT > New IIT, generally. New IITs are still building hostels and labs.',
  },
};

// ─── 15. EXPERT TIPS COMPILATION ──────────────────────────────────────────
export const EXPERT_TIPS = [
  {
    source: 'ALLEN Career Institute',
    tips: [
      'Choose the branch of your interest first, then the college.',
      'Research placement data thoroughly before finalizing order.',
      'Create preference order on paper BEFORE sitting at the computer.',
      'Participate in mock counselling rounds and analyze results.',
      'Verify branch-change policies — IIT Bombay no longer allows it.',
      'Check preference order 3–4 times before locking.',
    ],
  },
  {
    source: 'Careers360',
    tips: [
      'Analyze 2–3 years of cutoff trends, not just the latest year.',
      'Do not make impulsive changes based on Round 1 allotment.',
      'Keep documents ready BEFORE counselling begins.',
      'Category certificates must match JoSAA prescribed formats exactly.',
    ],
  },
  {
    source: 'CollegeDekho / Shiksha',
    tips: [
      'Fill maximum choices — there is no penalty for more choices.',
      'Use FLOAT until Round 5 for best upgrade chances.',
      'Balance dream, realistic, and safe choices in a 20:50:30 ratio.',
      'Monitor cutoff expansion in Rounds 5–6 for surprise opportunities.',
    ],
  },
  {
    source: 'Community Consensus (Quora, Reddit, Forums)',
    tips: [
      'CSE at top NIT > non-CS at mid IIT, for software careers.',
      'IIIT Hyderabad CSE is equivalent to mid-IIT CSE in placements.',
      'Dual degree is underrated — same placements, slightly higher cutoff.',
      'Do not ignore emerging branches like AI/DS — they have lower cutoffs but strong future scope.',
      'Fill 100+ choices minimum. The students who regret most are those who filled too few.',
      'Home State quota at NITs is the single most underused strategic lever.',
    ],
  },
];

// ─── 16. SOURCES ──────────────────────────────────────────────────────────
export const SOURCES = [
  { name: 'JoSAA Official Website', url: 'https://josaa.nic.in/' },
  { name: 'JoSAA Opening & Closing Ranks', url: 'https://josaa.nic.in/document/opening-and-closing-ranks-2024/' },
  { name: 'ALLEN Career Institute — Choice Filling Guide', url: 'https://myexam.allen.in/josaa-2025-college-choice-filling-guide/' },
  { name: 'Careers360 — Common Mistakes', url: 'https://engineering.careers360.com/articles/major-mistakes-avoid-in-josaa-counselling' },
  { name: 'Shiksha — Choice Filling Tips', url: 'https://www.shiksha.com/engineering/articles/how-to-fill-choices-in-josaa-counselling-blogId-200916' },
  { name: 'CollegeDekho — Choice Filling Process', url: 'https://www.collegedekho.com/articles/josaa-choice-filling/' },
  { name: 'iQuanta — Mistakes to Avoid', url: 'https://www.iquanta.in/blog/mistakes-to-avoid-during-josaa-counselling/' },
  { name: 'PW (Physics Wallah) — Branch vs College', url: 'https://www.pw.live/iit-jee/exams/which-is-better-lower-branch-at-iit-or-cse-from-nit-after-jee' },
  { name: 'Vedantu — Common Mistakes', url: 'https://www.vedantu.com/blog/mistakes-to-avoid-in-jee-seat-counselling' },
  { name: 'CollegeDunia — Round-wise Relaxation', url: 'https://collegedunia.com/articles/e-301-josaa-round-wise-rank-relaxation-in-2026' },
  { name: 'Adarsh Barnwal — Placement Stats & Rankings', url: 'https://www.adarshbarnwal.com/all-nit-gfti-iit-iiit-placement-details/' },
  { name: 'Career Plan B — NIT Warangal Cutoff Analysis', url: 'https://careerplanb.co/nit-warangal-josaa-cutoff-analysis-2025/' },
  { name: 'InfinityLearn — Reservation Criteria', url: 'https://infinitylearn.com/iit-jee-exam/jee-mains-reservation-policy' },
  { name: 'eSaral — Opening & Closing Rank Tool', url: 'https://www.esaral.com/jossa-opening-and-closing-rank/' },
  { name: 'Phodu Club — Home State Quota', url: 'https://phodu.club/blogs/what-home-state-quota-jee-mains/' },
  { name: 'Quora — Branch vs College Order', url: 'https://www.quora.com/What-should-be-the-order-of-branch-and-college-choices-in-JOSAA' },
];
