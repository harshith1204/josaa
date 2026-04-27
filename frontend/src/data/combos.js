export const comboStrategies = [
  {
    id: 1,
    title: "Aggressive: All Top NITs CSE",
    subtitle: "Premium branches only at top NITs",
    branchFocus: ["CSE", "IT", "AI"],
    blockedBranches: ["Civil", "Mechanical", "Chemical"],
    locationFocus: "All India",
    stats: { matchingSeats: 85, rankGap: "2k-15k", placement: "92%" },
    description: "Best for ranks under 15,000. Focuses on CS-related branches at top-ranked NITs."
  },
  {
    id: 2,
    title: "Safe Bet: Mid NITs CSE Only",
    subtitle: "CSE at mid-tier NITs for guaranteed seat",
    branchFocus: ["CSE"],
    blockedBranches: ["ECE", "EE", "Mechanical", "Civil"],
    locationFocus: "All India",
    stats: { matchingSeats: 42, rankGap: "15k-30k", placement: "85%" },
    description: "For ranks 15,000-30,000. Only CSE branches at mid-ranked NITs."
  },
  {
    id: 3,
    title: "Branch Over College: CSE Anywhere",
    subtitle: "CSE at any NIT or IIIT, any location",
    branchFocus: ["CSE", "CSE (AI)", "CSE (DS)"],
    blockedBranches: ["ECE", "EE", "Mechanical"],
    locationFocus: "All India",
    stats: { matchingSeats: 120, rankGap: "5k-80k", placement: "88%" },
    description: "Prioritizes getting CSE branch regardless of institute ranking."
  },
  {
    id: 4,
    title: "College Over Branch: Top 5 NITs Any",
    subtitle: "Any branch at top 5 NITs only",
    branchFocus: ["CSE", "IT", "ECE", "EE", "Mechanical", "Civil"],
    blockedBranches: [],
    locationFocus: "All India",
    stats: { matchingSeats: 65, rankGap: "1k-40k", placement: "90%" },
    description: "Best for ranks under 40,000. Accept any branch at Trichy, Surathkal, Rourkela, Warangal, Calicut."
  },
  {
    id: 5,
    title: "South India Focus: NIT + IIIT",
    subtitle: "All south Indian NITs and IIITs",
    branchFocus: ["CSE", "IT", "ECE", "AI"],
    blockedBranches: ["Civil", "Chemical"],
    locationFocus: "South India",
    stats: { matchingSeats: 58, rankGap: "1k-65k", placement: "87%" },
    description: "For students preferring South India. Covers Trichy, Surathkal, Calicut, Warangal, and southern IIITs."
  },
  {
    id: 6,
    title: "North India Only: NITs",
    subtitle: "NITs in North India with CS/IT focus",
    branchFocus: ["CSE", "IT", "AI"],
    blockedBranches: ["Mechanical", "Civil", "Chemical"],
    locationFocus: "North India",
    stats: { matchingSeats: 45, rankGap: "10k-35k", placement: "83%" },
    description: "NITs in Delhi, Jaipur, Kurukshetra, Jalandhar, Hamirpur, Srinagar."
  },
  {
    id: 7,
    title: "ECE Specialist: Top NITs",
    subtitle: "Electronics at top 10 NITs only",
    branchFocus: ["ECE", "ECE (VLSI)", "EE"],
    blockedBranches: ["CSE", "Mechanical", "Civil"],
    locationFocus: "All India",
    stats: { matchingSeats: 55, rankGap: "30k-55k", placement: "82%" },
    description: "For students passionate about electronics. Top NITs ECE branches."
  },
  {
    id: 8,
    title: "AI/ML Focused: Cross-Institute",
    subtitle: "AI and ML programs across NITs & IIITs",
    branchFocus: ["AI", "AI & ML", "AI & DS", "Data Science"],
    blockedBranches: ["Civil", "Mechanical", "Chemical", "EE"],
    locationFocus: "All India",
    stats: { matchingSeats: 38, rankGap: "4k-50k", placement: "89%" },
    description: "Focuses exclusively on AI/ML/DS programs wherever available."
  },
  {
    id: 9,
    title: "Conservative: Safety First",
    subtitle: "High probability choices with backup options",
    branchFocus: ["CSE", "IT", "ECE", "AI"],
    blockedBranches: ["Chemical", "Mining"],
    locationFocus: "All India",
    stats: { matchingSeats: 95, rankGap: "20k-80k", placement: "80%" },
    description: "Broad range of choices ensuring at least one allotment. For cautious students."
  },
  {
    id: 10,
    title: "IIIT Only: CSE Focus",
    subtitle: "All IIITs with CS-related branches",
    branchFocus: ["CSE", "IT", "AI", "Cyber Security"],
    blockedBranches: ["ECE", "Mechanical"],
    locationFocus: "All India",
    stats: { matchingSeats: 72, rankGap: "85k-155k", placement: "84%" },
    description: "IIITs offer focused CS curriculum. Best for ranks 85k-155k."
  },
  {
    id: 11,
    title: "West India: Gujarat & Maharashtra",
    subtitle: "SVNIT Surat, VNIT Nagpur + western IIITs",
    branchFocus: ["CSE", "IT", "ECE", "AI"],
    blockedBranches: ["Civil", "Chemical"],
    locationFocus: "West India",
    stats: { matchingSeats: 32, rankGap: "7k-55k", placement: "86%" },
    description: "For students preferring western region. SVNIT, VNIT, IIIT Pune, IIIT Vadodara."
  },
  {
    id: 12,
    title: "East India: Bengal & Odisha",
    subtitle: "NIT Durgapur, Rourkela, IIEST + eastern IIITs",
    branchFocus: ["CSE", "IT", "ECE"],
    blockedBranches: ["Chemical", "Mining"],
    locationFocus: "East India",
    stats: { matchingSeats: 35, rankGap: "2k-85k", placement: "84%" },
    description: "Eastern region focus including Rourkela, Durgapur, IIEST Shibpur, Jamshedpur."
  },
  {
    id: 13,
    title: "Top 3 NITs or Nothing",
    subtitle: "Only Trichy, Surathkal, Rourkela CSE/IT",
    branchFocus: ["CSE", "IT"],
    blockedBranches: ["ECE", "EE", "Mechanical", "Civil"],
    locationFocus: "All India",
    stats: { matchingSeats: 12, rankGap: "600-5k", placement: "95%" },
    description: "Ultra-aggressive for top rankers. Only accept CSE/IT at top 3 NITs."
  },
  {
    id: 14,
    title: "Balanced: NIT CSE + IIIT CSE",
    subtitle: "Mix of mid NITs and top IIITs for CSE",
    branchFocus: ["CSE", "IT"],
    blockedBranches: ["Mechanical", "Civil", "Chemical"],
    locationFocus: "All India",
    stats: { matchingSeats: 78, rankGap: "10k-90k", placement: "86%" },
    description: "Good mix of NIT and IIIT options for CS-focused students."
  },
  {
    id: 15,
    title: "Northeast Explorer",
    subtitle: "NE region NITs with all branches",
    branchFocus: ["CSE", "IT", "ECE", "EE", "Mechanical"],
    blockedBranches: [],
    locationFocus: "Northeast India",
    stats: { matchingSeats: 48, rankGap: "65k-85k", placement: "72%" },
    description: "NIT Silchar, Agartala, Meghalaya, Manipur, Mizoram, Nagaland, Sikkim."
  },
  {
    id: 16,
    title: "Data Science Track",
    subtitle: "DS & Analytics programs across institutes",
    branchFocus: ["Data Science", "DS & AI", "AI & DS", "CSE (DS)"],
    blockedBranches: ["Mechanical", "Civil", "ECE"],
    locationFocus: "All India",
    stats: { matchingSeats: 28, rankGap: "42k-170k", placement: "85%" },
    description: "Dedicated data science programs at NITs and IIITs."
  },
  {
    id: 17,
    title: "Cyber Security Track",
    subtitle: "Cyber security specializations at IIITs",
    branchFocus: ["Cyber Security", "CSE (Cyber Sec)"],
    blockedBranches: ["ECE", "EE", "Mechanical"],
    locationFocus: "All India",
    stats: { matchingSeats: 18, rankGap: "110k-155k", placement: "83%" },
    description: "Growing field with dedicated programs at newer IIITs."
  },
  {
    id: 18,
    title: "VLSI Specialist",
    subtitle: "VLSI design programs at NITs & IIITs",
    branchFocus: ["VLSI", "ECE (VLSI)", "EE (VLSI)"],
    blockedBranches: ["CSE", "Mechanical", "Civil"],
    locationFocus: "All India",
    stats: { matchingSeats: 22, rankGap: "37k-165k", placement: "88%" },
    description: "For chip design enthusiasts. VLSI programs at top institutes."
  },
  {
    id: 19,
    title: "Rank 5k-10k Optimal",
    subtitle: "Best value picks for JEE rank 5,000-10,000",
    branchFocus: ["CSE", "IT", "AI"],
    blockedBranches: ["Civil", "Mechanical"],
    locationFocus: "All India",
    stats: { matchingSeats: 35, rankGap: "5k-10k", placement: "90%" },
    description: "Optimized for rank range 5k-10k. Targets Calicut, VNIT, Silchar CSE."
  },
  {
    id: 20,
    title: "Rank 10k-20k Optimal",
    subtitle: "Best value for JEE rank 10,000-20,000",
    branchFocus: ["CSE", "IT", "AI", "ECE"],
    blockedBranches: ["Civil", "Chemical"],
    locationFocus: "All India",
    stats: { matchingSeats: 52, rankGap: "10k-20k", placement: "86%" },
    description: "Balanced choices for rank 10k-20k including Durgapur, Delhi, Surat CSE."
  },
  {
    id: 21,
    title: "Rank 20k-35k Optimal",
    subtitle: "Strategic picks for rank 20,000-35,000",
    branchFocus: ["CSE", "IT", "ECE", "AI"],
    blockedBranches: ["Chemical", "Mining"],
    locationFocus: "All India",
    stats: { matchingSeats: 60, rankGap: "20k-35k", placement: "82%" },
    description: "Mid-range options: Srinagar, Bhopal, Goa, Hamirpur CSE + top NITs ECE."
  },
  {
    id: 22,
    title: "Rank 35k-50k Optimal",
    subtitle: "Best options for rank 35,000-50,000",
    branchFocus: ["ECE", "AI", "IT", "CSE"],
    blockedBranches: ["Civil", "Chemical"],
    locationFocus: "All India",
    stats: { matchingSeats: 48, rankGap: "35k-50k", placement: "80%" },
    description: "Top NIT ECE branches and mid-NIT AI programs."
  },
  {
    id: 23,
    title: "Rank 50k-80k Optimal",
    subtitle: "Smart choices for rank 50,000-80,000",
    branchFocus: ["ECE", "CSE", "AI", "IT"],
    blockedBranches: ["Chemical"],
    locationFocus: "All India",
    stats: { matchingSeats: 55, rankGap: "50k-80k", placement: "78%" },
    description: "Mix of mid NIT ECE and newer NIT/IIEST CSE options."
  },
  {
    id: 24,
    title: "Rank 80k-120k Optimal",
    subtitle: "Value picks for rank 80,000-120,000",
    branchFocus: ["CSE", "IT", "AI", "ECE"],
    blockedBranches: [],
    locationFocus: "All India",
    stats: { matchingSeats: 62, rankGap: "80k-120k", placement: "82%" },
    description: "IIIT CSE programs and newer NIT branches. Good placements despite rank."
  },
  {
    id: 25,
    title: "Rank 120k-170k Safety Net",
    subtitle: "Ensuring a seat for rank 120,000+",
    branchFocus: ["CSE", "IT", "AI", "ECE", "DS"],
    blockedBranches: [],
    locationFocus: "All India",
    stats: { matchingSeats: 75, rankGap: "120k-170k", placement: "75%" },
    description: "Broad coverage of newer IIITs and other JoSAA institutes."
  },
  {
    id: 26,
    title: "Metro Cities Only",
    subtitle: "NITs and IIITs in major cities only",
    branchFocus: ["CSE", "IT", "ECE", "AI"],
    blockedBranches: ["Civil", "Mechanical"],
    locationFocus: "Metro Cities",
    stats: { matchingSeats: 30, rankGap: "7k-55k", placement: "88%" },
    description: "Delhi, Nagpur, Jaipur, Surat, Allahabad, Bhopal. Urban living preference."
  },
  {
    id: 27,
    title: "Small Town Gems",
    subtitle: "Hidden gems at smaller location NITs",
    branchFocus: ["CSE", "IT"],
    blockedBranches: ["Chemical", "Mining"],
    locationFocus: "Tier 2/3 Cities",
    stats: { matchingSeats: 40, rankGap: "20k-70k", placement: "80%" },
    description: "Hamirpur, Puducherry, Goa, Silchar, Raipur - peaceful campuses, good academics."
  },
  {
    id: 28,
    title: "Placement Focused: 90%+ Only",
    subtitle: "Only institutes with 90%+ placement rate",
    branchFocus: ["CSE", "IT", "AI"],
    blockedBranches: ["Civil", "Mechanical", "Chemical"],
    locationFocus: "All India",
    stats: { matchingSeats: 25, rankGap: "1k-12k", placement: "93%" },
    description: "Top NITs with proven placement records above 90%."
  },
  {
    id: 29,
    title: "Research Oriented: Old NITs",
    subtitle: "Established NITs (pre-1970) for research path",
    branchFocus: ["CSE", "ECE", "EE", "Mechanical"],
    blockedBranches: [],
    locationFocus: "All India",
    stats: { matchingSeats: 50, rankGap: "1k-80k", placement: "85%" },
    description: "Older NITs with strong research culture and PhD programs."
  },
  {
    id: 30,
    title: "New NITs CSE: High Growth",
    subtitle: "2009-2015 NITs - growing fast, CSE only",
    branchFocus: ["CSE", "AI"],
    blockedBranches: ["ECE", "EE", "Mechanical", "Civil"],
    locationFocus: "All India",
    stats: { matchingSeats: 28, rankGap: "65k-85k", placement: "76%" },
    description: "Newer NITs with modern curriculum and improving placements."
  },
  {
    id: 31,
    title: "Coastal NITs: Beach Life",
    subtitle: "NITs near the coast for campus lifestyle",
    branchFocus: ["CSE", "IT", "ECE"],
    blockedBranches: ["Chemical"],
    locationFocus: "Coastal India",
    stats: { matchingSeats: 35, rankGap: "1k-65k", placement: "86%" },
    description: "Surathkal, Calicut, Goa, Puducherry - great campus life near beaches."
  },
  {
    id: 32,
    title: "Female-Friendly: Supernumerary",
    subtitle: "Institutes with strong women support programs",
    branchFocus: ["CSE", "IT", "ECE", "AI"],
    blockedBranches: [],
    locationFocus: "All India",
    stats: { matchingSeats: 90, rankGap: "5k-100k", placement: "85%" },
    description: "Top NITs and IIITs with active women in engineering initiatives."
  },
  {
    id: 33,
    title: "Startup Hub Adjacent",
    subtitle: "Institutes near startup ecosystems",
    branchFocus: ["CSE", "IT", "AI", "Data Science"],
    blockedBranches: ["Civil", "Mechanical"],
    locationFocus: "Bangalore, Hyderabad, Pune",
    stats: { matchingSeats: 25, rankGap: "1k-95k", placement: "90%" },
    description: "NITs/IIITs near Bangalore, Hyderabad, Pune tech hubs."
  },
  {
    id: 34,
    title: "Budget Friendly: Low Fees",
    subtitle: "Institutes with lowest fee structures",
    branchFocus: ["CSE", "IT", "ECE"],
    blockedBranches: [],
    locationFocus: "All India",
    stats: { matchingSeats: 65, rankGap: "10k-85k", placement: "80%" },
    description: "NITs with scholarship-friendly fee structures."
  },
  {
    id: 35,
    title: "IIoT & Emerging Tech",
    subtitle: "Industrial IoT and new-age programs",
    branchFocus: ["IIoT", "AI", "Data Science", "Cyber Security"],
    blockedBranches: ["Civil", "Mechanical", "Chemical"],
    locationFocus: "All India",
    stats: { matchingSeats: 15, rankGap: "16k-155k", placement: "82%" },
    description: "Niche emerging tech programs at select institutes."
  },
  {
    id: 36,
    title: "Rajasthan & Gujarat Focus",
    subtitle: "MNIT Jaipur, SVNIT Surat + regional IIITs",
    branchFocus: ["CSE", "IT", "ECE", "AI"],
    blockedBranches: ["Chemical"],
    locationFocus: "Rajasthan & Gujarat",
    stats: { matchingSeats: 28, rankGap: "9k-150k", placement: "84%" },
    description: "For students from or preferring western India."
  },
  {
    id: 37,
    title: "UP & MP Corridor",
    subtitle: "MNNIT, MANIT, IIIT Allahabad + more",
    branchFocus: ["CSE", "IT", "AI"],
    blockedBranches: ["Civil", "Chemical"],
    locationFocus: "UP & MP",
    stats: { matchingSeats: 38, rankGap: "13k-130k", placement: "83%" },
    description: "Central India belt: Allahabad, Bhopal, Jabalpur, Lucknow."
  },
  {
    id: 38,
    title: "Tamil Nadu & Kerala Hub",
    subtitle: "Trichy, Calicut, Kancheepuram, Tiruchirappalli IIITs",
    branchFocus: ["CSE", "ECE", "IT"],
    blockedBranches: ["Chemical"],
    locationFocus: "Tamil Nadu & Kerala",
    stats: { matchingSeats: 30, rankGap: "1k-155k", placement: "88%" },
    description: "Strong academic culture in South Indian institutes."
  },
  {
    id: 39,
    title: "Karnataka & AP Tech Belt",
    subtitle: "Surathkal, Warangal + southern IIITs",
    branchFocus: ["CSE", "IT", "ECE", "AI"],
    blockedBranches: ["Civil"],
    locationFocus: "Karnataka & AP",
    stats: { matchingSeats: 35, rankGap: "1k-105k", placement: "87%" },
    description: "Tech corridor: Surathkal, Warangal, Dharwad, Sri City, Kurnool."
  },
  {
    id: 40,
    title: "Punjab & Haryana Belt",
    subtitle: "Jalandhar, Kurukshetra, PEC + Sonepat",
    branchFocus: ["CSE", "IT", "ECE", "AI"],
    blockedBranches: ["Chemical"],
    locationFocus: "Punjab & Haryana",
    stats: { matchingSeats: 32, rankGap: "14k-155k", placement: "81%" },
    description: "Northern belt institutes close to Delhi NCR."
  },
  {
    id: 41,
    title: "Aggressive ECE + CSE Mix",
    subtitle: "Top branches at top 10 NITs",
    branchFocus: ["CSE", "ECE", "IT"],
    blockedBranches: ["Mechanical", "Civil", "Chemical"],
    locationFocus: "All India",
    stats: { matchingSeats: 70, rankGap: "1k-55k", placement: "89%" },
    description: "Both CSE and ECE at premier NITs for maximum options."
  },
  {
    id: 42,
    title: "Only NIRF Top 50 Institutes",
    subtitle: "Institutes ranked in NIRF top 50 only",
    branchFocus: ["CSE", "IT", "ECE", "AI"],
    blockedBranches: ["Chemical", "Mining"],
    locationFocus: "All India",
    stats: { matchingSeats: 42, rankGap: "1k-50k", placement: "91%" },
    description: "Only institutes with NIRF rank under 50. Quality assured."
  },
  {
    id: 43,
    title: "IIIT Top 10: Premium CS",
    subtitle: "Top 10 IIITs by ranking for CS",
    branchFocus: ["CSE", "IT", "AI"],
    blockedBranches: ["ECE"],
    locationFocus: "All India",
    stats: { matchingSeats: 30, rankGap: "85k-115k", placement: "86%" },
    description: "Gwalior, Allahabad, Jabalpur, Pune, Kancheepuram - best IIITs."
  },
  {
    id: 44,
    title: "Mixed Bag: Hedged Bets",
    subtitle: "Dream + target + safety across all tiers",
    branchFocus: ["CSE", "IT", "ECE", "AI"],
    blockedBranches: ["Chemical"],
    locationFocus: "All India",
    stats: { matchingSeats: 110, rankGap: "5k-100k", placement: "84%" },
    description: "Well-distributed choices across difficulty levels."
  },
  {
    id: 45,
    title: "Himachal & Uttarakhand",
    subtitle: "Hill station NITs and IIITs",
    branchFocus: ["CSE", "IT", "ECE"],
    blockedBranches: ["Chemical"],
    locationFocus: "Himachal & Uttarakhand",
    stats: { matchingSeats: 18, rankGap: "26k-145k", placement: "78%" },
    description: "NIT Hamirpur, NIT Uttarakhand, IIIT Una. Scenic campus life."
  },
  {
    id: 46,
    title: "Oldest Institutes Only",
    subtitle: "Pre-independence and early post-independence",
    branchFocus: ["CSE", "ECE", "EE", "Mechanical"],
    blockedBranches: [],
    locationFocus: "All India",
    stats: { matchingSeats: 35, rankGap: "1k-170k", placement: "82%" },
    description: "Heritage institutes: IIEST (1856), GKV (1902), PEC (1921), NIT Raipur (1956)."
  },
  {
    id: 47,
    title: "Quantum & Emerging Tech",
    subtitle: "Cutting-edge specializations at IIITs",
    branchFocus: ["Quantum Tech", "AI", "Cyber Security", "Data Science"],
    blockedBranches: ["Civil", "Mechanical", "ECE"],
    locationFocus: "All India",
    stats: { matchingSeats: 12, rankGap: "100k-155k", placement: "78%" },
    description: "Futuristic programs for forward-thinking students."
  },
  {
    id: 48,
    title: "CDS & Interdisciplinary",
    subtitle: "Computational data science and hybrid programs",
    branchFocus: ["CDS", "DS & AI", "CS and Business", "IT-Business"],
    blockedBranches: ["Civil", "Mechanical"],
    locationFocus: "All India",
    stats: { matchingSeats: 15, rankGap: "85k-130k", placement: "84%" },
    description: "Interdisciplinary programs combining CS with business/data."
  },
  {
    id: 49,
    title: "Gap Year Backup Plan",
    subtitle: "Safe choices while preparing for next attempt",
    branchFocus: ["CSE", "IT"],
    blockedBranches: ["Mechanical", "Civil", "Chemical", "ECE"],
    locationFocus: "All India",
    stats: { matchingSeats: 45, rankGap: "50k-170k", placement: "76%" },
    description: "Keep a seat while re-preparing. Easy branches, minimal workload."
  },
  {
    id: 50,
    title: "All-Rounder: Maximum Coverage",
    subtitle: "Widest possible coverage across all institutes",
    branchFocus: ["CSE", "IT", "ECE", "AI", "DS", "Cyber Security"],
    blockedBranches: [],
    locationFocus: "All India",
    stats: { matchingSeats: 150, rankGap: "1k-170k", placement: "82%" },
    description: "Maximum choices for maximum chance of allotment. Covers all bases."
  }
];
