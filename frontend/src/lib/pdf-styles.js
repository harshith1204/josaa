// PDF Style Constants for the Premium Book Generator
// All measurements in PDF points (1 point = 1/72 inch)

export const COLORS = {
  // Primary palette
  primary: [75, 0, 130],        // Deep indigo
  primaryLight: [139, 92, 246], // Purple
  primaryDark: [45, 0, 80],     // Very dark purple

  // Accent colors
  accent: [255, 107, 53],       // Orange
  accentGold: [212, 175, 55],   // Gold
  accentGreen: [16, 185, 129],  // Emerald green
  accentRed: [239, 68, 68],     // Red
  accentBlue: [59, 130, 246],   // Blue

  // Neutrals
  white: [255, 255, 255],
  black: [20, 20, 20],
  darkGray: [55, 55, 65],
  mediumGray: [120, 120, 130],
  lightGray: [200, 200, 210],
  veryLightGray: [240, 240, 245],

  // Semantic colors
  safe: [16, 185, 129],         // Green — safe picks
  target: [255, 165, 0],        // Orange — target picks
  reach: [239, 68, 68],         // Red — reach picks

  // Chart colors
  chart: [
    [139, 92, 246],   // Purple
    [59, 130, 246],    // Blue
    [16, 185, 129],    // Green
    [255, 107, 53],    // Orange
    [239, 68, 68],     // Red
    [212, 175, 55],    // Gold
    [236, 72, 153],    // Pink
    [20, 184, 166],    // Teal
  ],

  // Table colors
  tableHeader: [75, 0, 130],
  tableHeaderText: [255, 255, 255],
  tableRowEven: [248, 248, 255],
  tableRowOdd: [255, 255, 255],
  tableBorder: [200, 200, 210],
};

export const FONTS = {
  // PDFKit built-in fonts
  title: 'Helvetica-Bold',
  subtitle: 'Helvetica-Bold',
  heading: 'Helvetica-Bold',
  body: 'Helvetica',
  bodyBold: 'Helvetica-Bold',
  bodyItalic: 'Helvetica-Oblique',
  mono: 'Courier',
};

export const SIZES = {
  // Font sizes
  coverTitle: 36,
  coverSubtitle: 18,
  coverRank: 48,
  partTitle: 28,
  chapterTitle: 22,
  sectionTitle: 16,
  subSectionTitle: 13,
  body: 10,
  bodySmall: 9,
  caption: 8,
  footnote: 7,
  pageNumber: 8,

  // Page layout
  pageWidth: 595.28,   // A4 width in points
  pageHeight: 841.89,  // A4 height in points
  marginTop: 60,
  marginBottom: 60,
  marginLeft: 50,
  marginRight: 50,
  headerHeight: 30,
  footerHeight: 30,
};

// Computed layout values
export const LAYOUT = {
  contentWidth: SIZES.pageWidth - SIZES.marginLeft - SIZES.marginRight,
  contentHeight: SIZES.pageHeight - SIZES.marginTop - SIZES.marginBottom,
  contentStartY: SIZES.marginTop + SIZES.headerHeight,
  contentEndY: SIZES.pageHeight - SIZES.marginBottom - SIZES.footerHeight,
};

// Institute type colors
export const INSTITUTE_COLORS = {
  NIT: [139, 92, 246],
  IIIT: [59, 130, 246],
  Other: [120, 120, 130],
};

// Branch emoji mapping
export const BRANCH_ICONS = {
  CSE: "CS",
  IT: "IT",
  ECE: "EC",
  EE: "EE",
  Mechanical: "ME",
  Civil: "CE",
  AI: "AI",
  "AI & ML": "ML",
  "AI & DS": "DS",
  "Data Science": "DS",
  "Cyber Security": "CY",
  VLSI: "VL",
  IIoT: "IoT",
  Chemical: "CH",
  Metallurgy: "MT",
  Mining: "MN",
};
