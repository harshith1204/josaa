import { NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

// ─── Data imports ───────────────────────────────────────────
// We read these at request time since they're ESM in src/data
// For server-side, we'll inline the logic to read from the JSON

const COLORS = {
  primary: [75, 0, 130],
  primaryLight: [139, 92, 246],
  primaryDark: [45, 0, 80],
  accent: [255, 107, 53],
  accentGold: [212, 175, 55],
  accentGreen: [16, 185, 129],
  accentRed: [239, 68, 68],
  accentBlue: [59, 130, 246],
  white: [255, 255, 255],
  black: [20, 20, 20],
  darkGray: [55, 55, 65],
  mediumGray: [120, 120, 130],
  lightGray: [200, 200, 210],
  veryLightGray: [240, 240, 245],
  safe: [16, 185, 129],
  target: [255, 165, 0],
  reach: [239, 68, 68],
  chart: [
    [139, 92, 246], [59, 130, 246], [16, 185, 129], [255, 107, 53],
    [239, 68, 68], [212, 175, 55], [236, 72, 153], [20, 184, 166],
  ],
  tableHeader: [75, 0, 130],
  tableHeaderText: [255, 255, 255],
  tableRowEven: [248, 248, 255],
  tableRowOdd: [255, 255, 255],
  tableBorder: [200, 200, 210],
};

// ─── Load data ──────────────────────────────────────────────
function loadCutoffData() {
  const filePath = path.join(process.cwd(), 'data', 'cutoffs.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function loadPlacementData() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'placements.js');
  const content = fs.readFileSync(filePath, 'utf-8');

  const placementMatch = content.match(/export const placementData = (\{[\s\S]*?\n\};)/);
  const companyMatch = content.match(/export const companyDirectory = (\{[\s\S]*?\n\};)/);
  const branchMatch = content.match(/export const branchCareerPaths = (\{[\s\S]*?\n\};)/);

  const safeEval = (str) => {
    if (!str) return {};
    try {
      // Convert JS object literal to JSON-parseable string
      const jsonStr = str
        .replace(/'/g, '"')
        .replace(/(\w+)\s*:/g, '"$1":')
        .replace(/,\s*([}\]])/g, '$1')
        .replace(/undefined/g, 'null');
      return JSON.parse(jsonStr);
    } catch { return {}; }
  };

  return {
    placements: safeEval(placementMatch?.[1]),
    companies: safeEval(companyMatch?.[1]),
    branchPaths: safeEval(branchMatch?.[1]),
  };
}

function loadChoicesData() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'choices.js');
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/export const choices = (\[[\s\S]*?\]);/);
  if (!match) return [];
  try {
    const jsonStr = match[1].replace(/'/g, '"').replace(/(\w+)\s*:/g, '"$1":').replace(/,\s*([}\]])/g, '$1').replace(/undefined/g, 'null');
    return JSON.parse(jsonStr);
  } catch { return []; }
}

function loadCombosData() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'combos.js');
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/export const comboStrategies = (\[[\s\S]*?\]);/);
  if (!match) return [];
  try {
    const jsonStr = match[1].replace(/'/g, '"').replace(/(\w+)\s*:/g, '"$1":').replace(/,\s*([}\]])/g, '$1').replace(/undefined/g, 'null');
    return JSON.parse(jsonStr);
  } catch { return []; }
}

function loadCollegesData() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'colleges.js');
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/export const nirfRankings = (\{[\s\S]*?\n\};)/);
  if (!match) return {};
  return new Function(`return ${match[1]}`)();
}

// ─── Helpers ────────────────────────────────────────────────

function getInstituteType(name) {
  if (name.includes('Indian Institute of Technology')) return 'IIT';
  if (name.includes('NIT') || name.includes('National Institute of Technology') || name.includes('VNIT') || name.includes('SVNIT') || name.includes('MNIT') || name.includes('MNNIT') || name.includes('MANIT')) return 'NIT';
  if (name.includes('IIIT') || name.includes('Indian Institute of Information Technology') || name.includes('Indian institute of information technology') || name.includes('INDIAN INSTITUTE OF INFORMATION TECHNOLOGY') || name.includes('International Institute of Information Technology')) return 'IIIT';
  return 'Other';
}

function getShortName(fullName) {
  const map = {
    // NITs (with and without commas to handle cutoffs.json variations)
    'National Institute of Technology, Tiruchirappalli': 'NIT Tiruchirappalli',
    'National Institute of Technology Tiruchirappalli': 'NIT Tiruchirappalli',
    'National Institute of Technology Karnataka, Surathkal': 'NIT Karnataka, Surathkal',
    'National Institute of Technology, Rourkela': 'NIT Rourkela',
    'National Institute of Technology Rourkela': 'NIT Rourkela',
    'National Institute of Technology, Warangal': 'NIT Warangal',
    'National Institute of Technology Warangal': 'NIT Warangal',
    'National Institute of Technology Calicut': 'NIT Calicut',
    'Visvesvaraya National Institute of Technology, Nagpur': 'VNIT Nagpur',
    'National Institute of Technology, Silchar': 'NIT Silchar',
    'National Institute of Technology Silchar': 'NIT Silchar',
    'Malaviya National Institute of Technology Jaipur': 'MNIT Jaipur',
    'National Institute of Technology Durgapur': 'NIT Durgapur',
    'National Institute of Technology Delhi': 'NIT Delhi',
    'Sardar Vallabhbhai National Institute of Technology, Surat': 'SVNIT Surat',
    'Motilal Nehru National Institute of Technology Allahabad': 'MNNIT Allahabad',
    'National Institute of Technology, Srinagar': 'NIT Srinagar',
    'National Institute of Technology Srinagar': 'NIT Srinagar',
    'Maulana Azad National Institute of Technology Bhopal': 'MANIT Bhopal',
    'Dr. B R Ambedkar National Institute of Technology, Jalandhar': 'NIT Jalandhar',
    'National Institute of Technology Patna': 'NIT Patna',
    'National Institute of Technology, Jamshedpur': 'NIT Jamshedpur',
    'National Institute of Technology Jamshedpur': 'NIT Jamshedpur',
    'National Institute of Technology, Kurukshetra': 'NIT Kurukshetra',
    'National Institute of Technology Kurukshetra': 'NIT Kurukshetra',
    'National Institute of Technology Raipur': 'NIT Raipur',
    'National Institute of Technology Hamirpur': 'NIT Hamirpur',
    'National Institute of Technology Puducherry': 'NIT Puducherry',
    'National Institute of Technology Agartala': 'NIT Agartala',
    'National Institute of Technology Goa': 'NIT Goa',
    'National Institute of Technology Sikkim': 'NIT Sikkim',
    'National Institute of Technology Meghalaya': 'NIT Meghalaya',
    'National Institute of Technology, Uttarakhand': 'NIT Uttarakhand',
    'National Institute of Technology Uttarakhand': 'NIT Uttarakhand',
    'National Institute of Technology, Andhra Pradesh': 'NIT Andhra Pradesh',
    'National Institute of Technology Andhra Pradesh': 'NIT Andhra Pradesh',
    'National Institute of Technology Arunachal Pradesh': 'NIT Arunachal Pradesh',
    'National Institute of Technology, Manipur': 'NIT Manipur',
    'National Institute of Technology Manipur': 'NIT Manipur',
    'National Institute of Technology, Mizoram': 'NIT Mizoram',
    'National Institute of Technology Mizoram': 'NIT Mizoram',
    'National Institute of Technology Nagaland': 'NIT Nagaland',

    // IIITs
    'Atal Bihari Vajpayee Indian Institute of Information Technology & Management Gwalior': 'IIITM Gwalior',
    'Indian Institute of Information Technology, Allahabad': 'IIIT Allahabad',
    'Pt. Dwarka Prasad Mishra Indian Institute of Information Technology, Design & Manufacture Jabalpur': 'IIITDM Jabalpur',
    'Indian Institute of Information Technology, Design & Manufacturing, Kancheepuram': 'IIITDM Kancheepuram',
    'Indian Institute of Information Technology (IIIT) Pune': 'IIIT Pune',
    'Indian Institute of Information Technology Bhopal': 'IIIT Bhopal',
    'Indian Institute of Information Technology Lucknow': 'IIIT Lucknow',
    'Indian Institute of Information Technology (IIIT) Nagpur': 'IIIT Nagpur',
    'Indian Institute of Information Technology Tiruchirappalli': 'IIIT Tiruchirappalli',
    'Indian Institute of Information Technology (IIIT) Ranchi': 'IIIT Ranchi',
    'Indian Institute of Information Technology Surat': 'IIIT Surat',
    'Indian Institute of Information Technology(IIIT) Kalyani, West Bengal': 'IIIT Kalyani, West Bengal',
    'Indian Institute of Information Technology(IIIT)Kota, Rajasthan': 'IIIT Kota, Rajasthan',
    'Indian Institute of Information Technology Guwahati': 'IIIT Guwahati',
    'Indian Institute of Information Technology(IIIT) Dharwad': 'IIIT Dharwad',
    'Indian Institute of Information Technology (IIIT), Sri City, Chittoor': 'IIIT Sri City, Chittoor',
    'Indian Institute of Information Technology(IIIT) Kottayam': 'IIIT Kottayam',
    'Indian Institute of Information Technology(IIIT), Vadodara, Gujrat': 'IIIT Vadodara, Gujrat',
    'Indian Institute of Information Technology(IIIT) Kilohrad, Sonepat, Haryana': 'IIIT Kilohrad, Sonepat',
    'Indian Institute of Information Technology Design & Manufacturing Kurnool, Andhra Pradesh': 'IIITDM Kurnool',
    'International Institute of Information Technology, Naya Raipur': 'IIIT Naya Raipur',
    'Indian Institute of Information Technology(IIIT) Una, Himachal Pradesh': 'IIIT Una, Himachal Pradesh',
    'Indian institute of information technology, Raichur, Karnataka': 'IIIT Raichur, Karnataka',
    'Indian Institute of Information Technology, Agartala': 'IIIT Agartala',
    'Indian Institute of Information Technology, Vadodara International Campus Diu (IIITVICD)': 'IIIT Vadodara Intl Campus Diu',
    'Indian Institute of Information Technology Bhagalpur': 'IIIT Bhagalpur',
    'INDIAN INSTITUTE OF INFORMATION TECHNOLOGY SENAPATI MANIPUR': 'IIIT Senapati Manipur',
    'International Institute of Information Technology, Bhubaneswar': 'IIIT Bhubaneswar',
    'Indian Institute of Information Technology Manipur': 'IIIT Manipur',

    // Others
    'Indian Institute of Engineering Science and Technology, Shibpur': 'IIEST Shibpur',
    'Birla Institute of Technology, Mesra, Ranchi': 'BIT Mesra, Ranchi',
    'Punjab Engineering College, Chandigarh': 'PEC Chandigarh',
    'Sant Longowal Institute of Engineering and Technology': 'SLIET',
    'Jawaharlal Nehru University, Delhi': 'JNU Delhi',
    'Assam University, Silchar': 'Assam Univ Silchar',
    'Puducherry Technological University, Puducherry': 'PTU Puducherry',
    'Central institute of Technology Kokrajar, Assam': 'CIT Kokrajar, Assam',
    'J.K. Institute of Applied Physics & Technology, Department of Electronics & Communication, University of Allahabad- Allahabad': 'JKIAPT Allahabad',
    'Gurukula Kangri Vishwavidyalaya, Haridwar': 'GKV Haridwar',
    'Birla Institute of Technology, Deoghar Off-Campus': 'BIT Deoghar',
    'Birla Institute of Technology, Patna Off-Campus': 'BIT Patna',
  };

  if (map[fullName]) return map[fullName];

  // Fallback: generate a reasonable short name
  let short = fullName;
  short = short.replace(/^National Institute of Technology,?\s*/, 'NIT ');
  short = short.replace(/^Indian Institute of Information Technology.*?\)\s*/, 'IIIT ');
  short = short.replace(/^Indian Institute of Information Technology\s*/, 'IIIT ');
  short = short.replace(/^Indian institute of information technology,?\s*/, 'IIIT ');
  short = short.replace(/^INDIAN INSTITUTE OF INFORMATION TECHNOLOGY\s*/, 'IIIT ');
  short = short.replace(/^International Institute of Information Technology,?\s*/, 'IIIT ');
  short = short.replace(/^Indian Institute of Engineering Science and Technology,?\s*/, 'IIEST ');
  return short.trim();
}

function getShortProgram(fullProgram) {
  return fullProgram
    .replace(/\s*\(\d+ Years?,.*?\)\s*/g, '')
    .replace('Bachelor of Technology', '')
    .replace('Bachelor and Master of Technology (Dual Degree)', '(DD)')
    .trim();
}

function classifyOption(cutoff, rank) {
  // cutoff = closing rank. Higher closing rank = easier to get in.
  // Safe: cutoff is 50%+ higher than rank (very likely admission)
  if (cutoff >= rank * 1.5) return { label: 'Safe', color: COLORS.safe };
  // Target: cutoff is at or above rank (reasonable chance)
  if (cutoff >= rank * 1.0) return { label: 'Target', color: COLORS.target };
  // Reach: cutoff is below rank (risky)
  return { label: 'Reach', color: COLORS.reach };
}

function getState(collegeName) {
  const stateMap = {
    'Tiruchirappalli': 'Tamil Nadu', 'Surathkal': 'Karnataka', 'Rourkela': 'Odisha',
    'Warangal': 'Telangana', 'Calicut': 'Kerala', 'Nagpur': 'Maharashtra',
    'Silchar': 'Assam', 'Jaipur': 'Rajasthan', 'Durgapur': 'West Bengal',
    'Delhi': 'Delhi', 'Surat': 'Gujarat', 'Allahabad': 'Uttar Pradesh',
    'Srinagar': 'J&K', 'Bhopal': 'Madhya Pradesh', 'Jalandhar': 'Punjab',
    'Patna': 'Bihar', 'Jamshedpur': 'Jharkhand', 'Kurukshetra': 'Haryana',
    'Raipur': 'Chhattisgarh', 'Hamirpur': 'Himachal Pradesh',
    'Puducherry': 'Puducherry', 'Agartala': 'Tripura', 'Goa': 'Goa',
    'Sikkim': 'Sikkim', 'Gwalior': 'Madhya Pradesh',
    'Meghalaya': 'Meghalaya', 'Uttarakhand': 'Uttarakhand',
    'Andhra Pradesh': 'Andhra Pradesh', 'Arunachal Pradesh': 'Arunachal Pradesh',
    'Manipur': 'Manipur', 'Mizoram': 'Mizoram', 'Nagaland': 'Nagaland',
    'Lucknow': 'Uttar Pradesh', 'Pune': 'Maharashtra',
    'Ranchi': 'Jharkhand', 'Kalyani': 'West Bengal', 'Kota': 'Rajasthan',
    'Guwahati': 'Assam', 'Dharwad': 'Karnataka', 'Sri City': 'Andhra Pradesh',
    'Chittoor': 'Andhra Pradesh', 'Kottayam': 'Kerala', 'Vadodara': 'Gujarat',
    'Sonepat': 'Haryana', 'Kurnool': 'Andhra Pradesh', 'Naya Raipur': 'Chhattisgarh',
    'Una': 'Himachal Pradesh', 'Raichur': 'Karnataka', 'Diu': 'Daman & Diu',
    'Bhagalpur': 'Bihar', 'Senapati': 'Manipur', 'Bhubaneswar': 'Odisha',
    'Shibpur': 'West Bengal', 'Mesra': 'Jharkhand', 'Chandigarh': 'Chandigarh',
    'Longowal': 'Punjab', 'Kokrajar': 'Assam', 'Haridwar': 'Uttarakhand',
    'Deoghar': 'Jharkhand', 'Jabalpur': 'Madhya Pradesh',
    'Kancheepuram': 'Tamil Nadu', 'Kilohrad': 'Haryana',
    'Bhilai': 'Chhattisgarh',
  };
  for (const [key, state] of Object.entries(stateMap)) {
    if (collegeName.includes(key)) return state;
  }
  return 'India';
}

// ─── PDF Drawing Helpers ────────────────────────────────────

function drawLineChart(doc, { title, labels, datasets, x, y, width, height }) {
  const chartX = x + 40;
  const chartY = y + (title ? 20 : 0);
  const chartW = width - 55;
  const chartH = height - (title ? 45 : 25);

  if (title) {
    doc.font('Helvetica-Bold').fontSize(9).fillColor(COLORS.darkGray);
    doc.text(title, x, y, { width, align: 'center' });
  }

  const allValues = datasets.flatMap(d => d.data).filter(v => v != null && v > 0);
  if (allValues.length === 0) return;
  let minVal = Math.min(...allValues);
  let maxVal = Math.max(...allValues);
  const padding = (maxVal - minVal) * 0.15 || 200;
  minVal = Math.max(0, minVal - padding);
  maxVal = maxVal + padding;

  // Axes
  doc.strokeColor(COLORS.lightGray).lineWidth(0.5);
  doc.moveTo(chartX, chartY).lineTo(chartX, chartY + chartH).stroke();
  doc.moveTo(chartX, chartY + chartH).lineTo(chartX + chartW, chartY + chartH).stroke();

  // Y-axis labels + grid lines
  doc.font('Helvetica').fontSize(6).fillColor(COLORS.mediumGray);
  for (let i = 0; i <= 4; i++) {
    const val = minVal + (maxVal - minVal) * (1 - i / 4);
    const yPos = chartY + (chartH * i) / 4;
    doc.text(Math.round(val).toLocaleString(), x, yPos - 3, { width: 35, align: 'right' });
    doc.strokeColor([230, 230, 238]).lineWidth(0.3);
    doc.moveTo(chartX + 1, yPos).lineTo(chartX + chartW, yPos).stroke();
  }

  // X-axis labels
  doc.font('Helvetica').fontSize(6).fillColor(COLORS.mediumGray);
  const stepX = labels.length > 1 ? chartW / (labels.length - 1) : chartW;
  labels.forEach((label, i) => {
    const lx = chartX + stepX * i;
    doc.text(label, lx - 15, chartY + chartH + 3, { width: 30, align: 'center' });
  });

  // Lines
  datasets.forEach((dataset) => {
    const color = dataset.color || COLORS.primaryLight;
    const validPoints = [];
    dataset.data.forEach((val, i) => {
      if (val != null && val > 0) {
        const px = chartX + stepX * i;
        const py = chartY + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
        validPoints.push({ px, py });
      }
    });

    if (validPoints.length < 2) return;

    doc.strokeColor(color).lineWidth(1.5);
    doc.moveTo(validPoints[0].px, validPoints[0].py);
    for (let i = 1; i < validPoints.length; i++) {
      doc.lineTo(validPoints[i].px, validPoints[i].py);
    }
    doc.stroke();

    validPoints.forEach(({ px, py }) => {
      doc.circle(px, py, 2.5).fill(color);
    });
  });

  // Legend
  if (datasets.length > 1) {
    let legendX = chartX;
    const legendY = chartY + chartH + 16;
    doc.fontSize(6);
    datasets.forEach((ds) => {
      doc.rect(legendX, legendY, 8, 4).fill(ds.color || COLORS.primaryLight);
      doc.fillColor(COLORS.darkGray).text(ds.label, legendX + 11, legendY - 1);
      legendX += doc.widthOfString(ds.label) + 20;
    });
  }
}

function drawBarChart(doc, { title, items, x, y, width, height, showValues = true }) {
  if (!items || items.length === 0) return y;
  let currentY = y;

  if (title) {
    doc.font('Helvetica-Bold').fontSize(9).fillColor(COLORS.darkGray);
    doc.text(title, x, currentY, { width, align: 'center' });
    currentY += 16;
  }

  const maxVal = Math.max(...items.map(i => i.value)) || 1;
  const barHeight = Math.min(14, (height - (title ? 20 : 0)) / items.length - 3);
  const labelWidth = 75;
  const barAreaWidth = width - labelWidth - (showValues ? 40 : 5);

  items.forEach((item, i) => {
    const barY = currentY + i * (barHeight + 3);
    doc.font('Helvetica').fontSize(7).fillColor(COLORS.darkGray);
    doc.text(item.label, x, barY + 1, { width: labelWidth - 5, align: 'right', lineBreak: false });

    doc.rect(x + labelWidth, barY, barAreaWidth, barHeight).fill(COLORS.veryLightGray);
    const barWidth = Math.max(1, (item.value / maxVal) * barAreaWidth);
    const color = item.color || COLORS.primaryLight;
    doc.rect(x + labelWidth, barY, barWidth, barHeight).fill(color);

    if (showValues) {
      doc.font('Helvetica-Bold').fontSize(7).fillColor(COLORS.darkGray);
      doc.text(item.value.toString(), x + labelWidth + barAreaWidth + 4, barY + 1);
    }
  });

  return currentY + items.length * (barHeight + 3);
}

function drawPieChart(doc, { title, items, x, y, radius }) {
  if (!items || items.length === 0) return;
  const total = items.reduce((sum, i) => sum + i.value, 0);
  if (total === 0) return;

  const centerX = x;
  const centerY = y;

  if (title) {
    doc.font('Helvetica-Bold').fontSize(9).fillColor(COLORS.darkGray);
    doc.text(title, centerX - radius - 10, centerY - radius - 18, { width: (radius + 10) * 2, align: 'center' });
  }

  let startAngle = -Math.PI / 2;

  items.forEach((item, i) => {
    const sliceAngle = (item.value / total) * Math.PI * 2;
    if (sliceAngle < 0.01) { startAngle += sliceAngle; return; }

    const endAngle = startAngle + sliceAngle;
    const color = item.color || COLORS.chart[i % COLORS.chart.length];

    const x1 = centerX + Math.cos(startAngle) * radius;
    const y1 = centerY + Math.sin(startAngle) * radius;
    const x2 = centerX + Math.cos(endAngle) * radius;
    const y2 = centerY + Math.sin(endAngle) * radius;
    const largeArc = sliceAngle > Math.PI ? 1 : 0;

    doc.save();
    doc.path(`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`);
    doc.fill(color);
    doc.restore();

    startAngle = endAngle;
  });

  // Legend
  let legendY = centerY + radius + 12;
  doc.font('Helvetica').fontSize(7);
  items.forEach((item, i) => {
    const color = item.color || COLORS.chart[i % COLORS.chart.length];
    const pct = Math.round((item.value / total) * 100);
    doc.rect(centerX - radius, legendY, 7, 5).fill(color);
    doc.fillColor(COLORS.darkGray).text(`${item.label} (${pct}%)`, centerX - radius + 10, legendY - 1);
    legendY += 10;
  });
}

function drawTable(doc, { headers, rows, x, y, width, colWidths, headerColor }) {
  const hColor = headerColor || COLORS.tableHeader;
  const rowHeight = 16;
  const headerHeight = 20;
  let currentY = y;
  const cw = colWidths || headers.map(() => width / headers.length);

  // Header
  doc.rect(x, currentY, width, headerHeight).fill(hColor);
  doc.font('Helvetica-Bold').fontSize(7).fillColor(COLORS.white);
  let colX = x;
  headers.forEach((header, i) => {
    doc.text(header, colX + 3, currentY + 5, { width: cw[i] - 6, align: 'left', lineBreak: false });
    colX += cw[i];
  });
  currentY += headerHeight;

  rows.forEach((row, rowIdx) => {
    const bgColor = rowIdx % 2 === 0 ? COLORS.tableRowEven : COLORS.tableRowOdd;
    doc.rect(x, currentY, width, rowHeight).fill(bgColor);
    doc.rect(x, currentY, width, rowHeight).strokeColor(COLORS.tableBorder).lineWidth(0.3).stroke();

    doc.font('Helvetica').fontSize(7).fillColor(COLORS.darkGray);
    colX = x;
    row.forEach((cell, i) => {
      const cellStr = cell != null ? cell.toString() : '-';
      doc.text(cellStr, colX + 3, currentY + 4, { width: cw[i] - 6, align: 'left', lineBreak: false });
      colX += cw[i];
    });
    currentY += rowHeight;
  });

  return currentY;
}

function drawProgressBar(doc, { label, value, x, y, width, height = 10, color }) {
  const pct = Math.min(100, Math.max(0, value));
  if (label) {
    doc.font('Helvetica').fontSize(7).fillColor(COLORS.darkGray);
    doc.text(label, x, y - 11);
  }
  doc.roundedRect(x, y, width, height, 3).fill(COLORS.veryLightGray);
  if (pct > 0) {
    doc.roundedRect(x, y, (width * pct) / 100, height, 3).fill(color || COLORS.primaryLight);
  }
  doc.font('Helvetica-Bold').fontSize(6).fillColor(pct > 50 ? COLORS.white : COLORS.darkGray);
  doc.text(`${pct}%`, x, y + 1, { width, align: 'center' });
}

// ─── Page management ────────────────────────────────────────

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = { top: 55, bottom: 55, left: 50, right: 50 };
const CONTENT_W = PAGE_W - MARGIN.left - MARGIN.right;
const CONTENT_START = MARGIN.top;
const CONTENT_END = PAGE_H - MARGIN.bottom;

let pageCount = 0;
let tocEntries = [];
let currentChapter = '';

function addPage(doc, skipHeader = false) {
  doc.addPage({ size: 'A4', margins: { top: MARGIN.top, bottom: MARGIN.bottom, left: MARGIN.left, right: MARGIN.right } });
  pageCount++;

  if (!skipHeader && currentChapter) {
    // Header line
    doc.save();
    doc.rect(MARGIN.left, 20, CONTENT_W, 0.5).fill(COLORS.primaryLight);
    doc.font('Helvetica').fontSize(7).fillColor(COLORS.mediumGray);
    doc.text('cutoffs.ai — Your Personalized JoSAA Guide', MARGIN.left, 8, { width: CONTENT_W / 2 });
    doc.text(currentChapter, MARGIN.left + CONTENT_W / 2, 8, { width: CONTENT_W / 2, align: 'right' });
    doc.restore();
  }

  // Footer
  doc.save();
  doc.rect(MARGIN.left, PAGE_H - 30, CONTENT_W, 0.5).fill(COLORS.lightGray);
  doc.font('Helvetica').fontSize(7).fillColor(COLORS.mediumGray);
  doc.text(`Page ${pageCount}`, MARGIN.left, PAGE_H - 22, { width: CONTENT_W, align: 'center' });
  doc.text('Data sourced from NIRF, official college reports, and student surveys. Figures are approximate.', MARGIN.left, PAGE_H - 14, { width: CONTENT_W, align: 'center' });
  doc.restore();

  return CONTENT_START;
}

function checkPageBreak(doc, currentY, needed = 100) {
  if (currentY + needed > CONTENT_END - 20) {
    return addPage(doc);
  }
  return currentY;
}

// ─── Book Sections ──────────────────────────────────────────

function drawCoverPage(doc, rank, category) {
  // Background gradient effect — deep purple to dark
  for (let i = 0; i < 842; i += 2) {
    const r = 75 - (i / 842) * 30;
    const g = 0;
    const b = 130 - (i / 842) * 50;
    doc.rect(0, i, PAGE_W, 2).fill([Math.max(20, r), g, Math.max(40, b)]);
  }

  // Subtle geometric accent lines instead of circles
  doc.save();
  doc.strokeColor([139, 92, 246]).lineWidth(0.4).opacity(0.15);
  // Diagonal lines top-right
  for (let i = 0; i < 6; i++) {
    const offset = i * 18;
    doc.moveTo(PAGE_W - 120 + offset, 60).lineTo(PAGE_W - 60 + offset, 160).stroke();
  }
  // Diagonal lines bottom-left
  for (let i = 0; i < 6; i++) {
    const offset = i * 18;
    doc.moveTo(40 + offset, PAGE_H - 200).lineTo(100 + offset, PAGE_H - 100).stroke();
  }
  // Thin horizontal accent lines
  doc.strokeColor(COLORS.accentGold).lineWidth(0.3).opacity(0.2);
  doc.moveTo(60, 100).lineTo(PAGE_W - 60, 100).stroke();
  doc.moveTo(60, 650).lineTo(PAGE_W - 60, 650).stroke();
  doc.restore();

  // Gold accent bar at top
  doc.rect(PAGE_W * 0.3, 120, PAGE_W * 0.4, 2).fill(COLORS.accentGold);

  // Main title
  doc.font('Helvetica-Bold').fontSize(14).fillColor([200, 200, 220]);
  doc.text('YOUR PERSONALIZED', 0, 150, { width: PAGE_W, align: 'center' });

  doc.font('Helvetica-Bold').fontSize(40).fillColor(COLORS.white);
  doc.text('JoSAA GUIDE', 0, 175, { width: PAGE_W, align: 'center' });

  doc.font('Helvetica-Bold').fontSize(16).fillColor(COLORS.accentGold);
  doc.text('2025-26 EDITION', 0, 225, { width: PAGE_W, align: 'center' });

  // Decorative line
  doc.rect(PAGE_W * 0.35, 255, PAGE_W * 0.3, 1).fill([139, 92, 246]);

  // Rank display
  doc.font('Helvetica').fontSize(14).fillColor([200, 200, 220]);
  doc.text('Prepared exclusively for', 0, 290, { width: PAGE_W, align: 'center' });

  doc.font('Helvetica-Bold').fontSize(12).fillColor(COLORS.accentGold);
  doc.text('JEE MAIN RANK', 0, 320, { width: PAGE_W, align: 'center' });

  doc.font('Helvetica-Bold').fontSize(56).fillColor(COLORS.white);
  doc.text(rank.toLocaleString(), 0, 340, { width: PAGE_W, align: 'center' });

  doc.font('Helvetica-Bold').fontSize(16).fillColor(COLORS.accentGold);
  doc.text(`Category: ${category}`, 0, 405, { width: PAGE_W, align: 'center' });

  // Bottom section
  doc.rect(PAGE_W * 0.35, 460, PAGE_W * 0.3, 1).fill([139, 92, 246]);

  // What's inside
  doc.font('Helvetica-Bold').fontSize(11).fillColor([200, 200, 220]);
  doc.text("WHAT'S INSIDE", 0, 485, { width: PAGE_W, align: 'center' });

  const features = [
    'Complete college & branch analysis for your rank',
    '3-year cutoff trends with charts for every option',
    'Placement data — packages, companies, sectors',
    'Head-to-head college comparisons',
    'Recommended preference strategies',
    'Round-by-round counselling playbook',
    'Company directory & career paths',
  ];

  doc.font('Helvetica').fontSize(10).fillColor([180, 180, 200]);
  features.forEach((f, i) => {
    doc.text(`   ${f}`, 100, 510 + i * 18, { width: PAGE_W - 200, align: 'center' });
  });

  // Branding
  doc.font('Helvetica-Bold').fontSize(18).fillColor(COLORS.white);
  doc.text('cutoffs.ai', 0, 680, { width: PAGE_W, align: 'center' });
  doc.font('Helvetica').fontSize(9).fillColor([150, 150, 170]);
  doc.text('AI-Powered JEE Counselling Platform', 0, 705, { width: PAGE_W, align: 'center' });

  // Disclaimer
  doc.font('Helvetica').fontSize(7).fillColor([100, 100, 120]);
  doc.text(
    'This guide is generated based on publicly available data from NIRF, official college reports, and anonymous student surveys. All figures are approximate and should be used for guidance only.',
    60, 750, { width: PAGE_W - 120, align: 'center' }
  );

  doc.font('Helvetica').fontSize(7).fillColor([100, 100, 120]);
  doc.text(`Generated on ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, 0, 780, { width: PAGE_W, align: 'center' });
}

function drawTableOfContents(doc, entries) {
  addPage(doc, true);
  let y = CONTENT_START;

  doc.font('Helvetica-Bold').fontSize(24).fillColor(COLORS.primary);
  doc.text('Table of Contents', MARGIN.left, y);
  y += 40;

  doc.rect(MARGIN.left, y, CONTENT_W, 1).fill(COLORS.primaryLight);
  y += 15;

  let currentPart = '';

  entries.forEach((entry) => {
    y = checkPageBreak(doc, y, 20);

    if (entry.part && entry.part !== currentPart) {
      currentPart = entry.part;
      y += 8;
      doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.primary);
      doc.text(entry.part, MARGIN.left, y);
      y += 18;
    }

    const isChapter = entry.type === 'chapter';
    const indent = isChapter ? 0 : 15;

    doc.font(isChapter ? 'Helvetica-Bold' : 'Helvetica')
       .fontSize(isChapter ? 10 : 9)
       .fillColor(isChapter ? COLORS.darkGray : COLORS.mediumGray);

    const titleWidth = CONTENT_W - 40 - indent;
    doc.text(entry.title, MARGIN.left + indent, y, { width: titleWidth, lineBreak: false });
    doc.text(entry.page.toString(), MARGIN.left + indent + titleWidth, y, { width: 40, align: 'right' });

    // Dots
    const titleTextWidth = doc.widthOfString(entry.title);
    const dotsStart = MARGIN.left + indent + Math.min(titleTextWidth, titleWidth) + 5;
    const dotsEnd = MARGIN.left + CONTENT_W - 40;
    if (dotsEnd > dotsStart + 10) {
      doc.fontSize(8).fillColor(COLORS.lightGray);
      const dots = '.'.repeat(Math.floor((dotsEnd - dotsStart) / 3));
      doc.text(dots, dotsStart, y + 1, { width: dotsEnd - dotsStart, lineBreak: false });
    }

    y += isChapter ? 18 : 14;
  });
}

function drawPartTitle(doc, partNumber, partTitle, subtitle) {
  addPage(doc, true);

  // Background
  doc.rect(0, 0, PAGE_W, PAGE_H).fill([245, 245, 255]);
  doc.rect(0, PAGE_H * 0.35, PAGE_W, PAGE_H * 0.3).fill(COLORS.primary);

  // Part number
  doc.font('Helvetica-Bold').fontSize(14).fillColor(COLORS.primaryLight);
  doc.text(`PART ${partNumber}`, 0, PAGE_H * 0.28, { width: PAGE_W, align: 'center' });

  // Title
  doc.font('Helvetica-Bold').fontSize(30).fillColor(COLORS.white);
  doc.text(partTitle, 60, PAGE_H * 0.42, { width: PAGE_W - 120, align: 'center' });

  // Subtitle
  if (subtitle) {
    doc.font('Helvetica').fontSize(12).fillColor([200, 200, 220]);
    doc.text(subtitle, 80, PAGE_H * 0.52, { width: PAGE_W - 160, align: 'center' });
  }

  // Decorative line
  doc.rect(PAGE_W * 0.4, PAGE_H * 0.59, PAGE_W * 0.2, 2).fill(COLORS.accentGold);
}

function drawChapterTitle(doc, chapterNumber, title) {
  let y = addPage(doc);

  // Section header bar with colored background
  doc.rect(MARGIN.left, y, CONTENT_W, 50).fill(COLORS.primary);

  doc.font('Helvetica-Bold').fontSize(10).fillColor(COLORS.accentGold);
  doc.text(`CHAPTER ${chapterNumber}`, MARGIN.left + 15, y + 8);

  doc.font('Helvetica-Bold').fontSize(18).fillColor(COLORS.white);
  doc.text(title, MARGIN.left + 15, y + 24);

  doc.rect(MARGIN.left, y + 50, CONTENT_W, 2).fill(COLORS.accentGold);

  currentChapter = `Ch. ${chapterNumber}: ${title}`;

  return y + 65;
}

// ─── Main Generation Logic ──────────────────────────────────

function generateBook(rank, category) {
  return new Promise((resolve, reject) => {
    try {
      const cutoffData = loadCutoffData();
      const { placements, companies, branchPaths } = loadPlacementData();
      const choices = loadChoicesData();
      const combos = loadCombosData();
      const colleges = loadCollegesData();

      // Find eligible options from cutoff data
      // Fix #1 & #7: Correct seatType filter logic
      // For General/OPEN, only match st === 'OPEN'
      // For other categories (OBC-NCL, SC, ST, EWS), match st === category OR st === 'OPEN'
      const seatType = category === 'General' ? 'OPEN' : category;
      const eligibleOptions = [];

      // Search last round of latest year for closing ranks
      const years = cutoffData.meta.years;
      const latestYear = years[years.length - 1];

      // Collect cutoff trends for each institute+program
      // Collect ALL quota entries first, then deduplicate per institute+program
      // NITs use HS (Home State) and OS (Other State) quotas, not just AI (All India)
      // We pick the best quota entry per institute+program combo
      const rawTrends = {}; // key: instIdx-progIdx-quotaIdx, value: trend data

      years.forEach(year => {
        const roundKeys = Object.keys(cutoffData.data).filter(k => k.startsWith(`${year}-`));
        const lastRound = roundKeys[roundKeys.length - 1];
        if (!lastRound || !cutoffData.data[lastRound]) return;

        cutoffData.data[lastRound].forEach(entry => {
          const [instIdx, progIdx, quotaIdx, st, gender, openRank, closeRank] = entry;

          // Only accept relevant quotas: AI (0), HS (1), OS (2), GO (3)
          if (quotaIdx > 3) return;

          // Correct seatType filter
          if (seatType === 'OPEN') {
            if (st !== 'OPEN') return;
          } else {
            if (st !== seatType && st !== 'OPEN') return;
          }

          if (gender !== 0) return; // Gender-Neutral

          const inst = cutoffData.institutes[instIdx];
          const prog = cutoffData.programs[progIdx];
          if (!inst || !prog) return;

          // Skip IITs (this is JEE Main guide, not Advanced)
          if (inst.includes('Indian Institute of Technology')) return;

          const rawKey = `${instIdx}-${progIdx}-${quotaIdx}`;
          if (!rawTrends[rawKey]) {
            rawTrends[rawKey] = {
              instIdx, progIdx, quotaIdx,
              institute: inst,
              shortInstitute: getShortName(inst),
              program: prog,
              shortProgram: getShortProgram(prog),
              type: getInstituteType(inst),
              seatType: st,
              trends: {},
            };
          }
          rawTrends[rawKey].trends[year] = { open: openRank, close: closeRank };
        });
      });

      // Deduplicate: for each institute+program, pick the quota with the best
      // (most generally applicable) closing rank.
      // Priority: OS (2) > AI (0) > GO (3) > HS (1)
      // OS is most universal for non-home-state students, AI for IIITs/others
      const quotaPriority = { 2: 0, 0: 1, 3: 2, 1: 3 };
      const bestByProgram = {};

      Object.values(rawTrends).forEach(opt => {
        const dedupeKey = `${opt.instIdx}-${opt.progIdx}`;
        const existing = bestByProgram[dedupeKey];
        if (!existing) {
          bestByProgram[dedupeKey] = opt;
        } else {
          // Prefer by quota priority, then by higher closing rank (easier to get in)
          const existPrio = quotaPriority[existing.quotaIdx] ?? 99;
          const newPrio = quotaPriority[opt.quotaIdx] ?? 99;
          if (newPrio < existPrio) {
            bestByProgram[dedupeKey] = opt;
          }
        }
      });

      const cutoffTrends = bestByProgram;

      // Fix #1: Correct eligibility range
      // closeRank >= rank * 0.7 captures reach options (cutoff slightly better than student)
      // closeRank <= rank * 10 captures safe options (cutoff much higher rank number)
      Object.values(cutoffTrends).forEach(opt => {
        const latestTrend = opt.trends[latestYear];
        if (!latestTrend) return;
        const closeRank = latestTrend.close;
        if (closeRank >= rank * 0.7 && closeRank <= rank * 10) {
          opt.closingRank = closeRank;
          opt.classification = classifyOption(closeRank, rank);
          eligibleOptions.push(opt);
        }
      });

      // Cap at 80 options to keep PDF reasonable
      // Sort: safe first, then target, then reach, within each by closing rank
      const classOrder = { 'Safe': 0, 'Target': 1, 'Reach': 2 };
      eligibleOptions.sort((a, b) => {
        const oa = classOrder[a.classification.label] ?? 2;
        const ob = classOrder[b.classification.label] ?? 2;
        if (oa !== ob) return oa - ob;
        return a.closingRank - b.closingRank;
      });

      // No cap — include all eligible options for comprehensive coverage

      // ─── Create PDF Document ─────────────────────────────
      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: MARGIN.top, bottom: MARGIN.bottom, left: MARGIN.left, right: MARGIN.right },
        info: {
          Title: `JoSAA Guide — Rank ${rank} (${category})`,
          Author: 'cutoffs.ai',
          Subject: 'Personalized JEE Main College Counselling Guide',
          Creator: 'cutoffs.ai Book Generator',
        },
        bufferPages: true,
      });

      const buffers = [];
      doc.on('data', chunk => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      // Reset module-level globals
      pageCount = 0;
      tocEntries = [];
      currentChapter = '';

      // ═══════════════════════════════════════════════════════
      // COVER PAGE
      // ═══════════════════════════════════════════════════════
      pageCount = 1;
      drawCoverPage(doc, rank, category);

      // ═══════════════════════════════════════════════════════
      // PART 1: YOUR RANK OVERVIEW
      // ═══════════════════════════════════════════════════════
      drawPartTitle(doc, 'I', 'YOUR RANK OVERVIEW', `Understanding what JEE Main Rank ${rank.toLocaleString()} means for you`);
      const part1Page = pageCount;
      tocEntries.push({ part: 'PART I: YOUR RANK OVERVIEW', title: 'Your Rank Decoded', type: 'chapter', page: pageCount + 1 });

      // Chapter 1: Rank Decoded
      let y = drawChapterTitle(doc, 1, 'Your Rank Decoded');

      doc.font('Helvetica-Bold').fontSize(13).fillColor(COLORS.primary);
      doc.text(`JEE Main Rank: ${rank.toLocaleString()}`, MARGIN.left, y);
      y += 22;

      doc.font('Helvetica').fontSize(10).fillColor(COLORS.darkGray);
      doc.text(`Category: ${category}`, MARGIN.left, y);
      y += 20;

      // Percentile
      const totalStudents = 1200000;
      const percentile = ((1 - rank / totalStudents) * 100).toFixed(2);
      const studentsAbove = rank - 1;
      const studentsBelow = totalStudents - rank;

      doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.darkGray);
      doc.text('Where You Stand', MARGIN.left, y);
      y += 18;

      const statBoxW = CONTENT_W / 3 - 8;
      [
        { label: 'Percentile', value: `${percentile}%`, color: COLORS.primaryLight },
        { label: 'Students Above', value: studentsAbove.toLocaleString(), color: COLORS.accentRed },
        { label: 'Students Below', value: studentsBelow.toLocaleString(), color: COLORS.accentGreen },
      ].forEach((stat, i) => {
        const sx = MARGIN.left + i * (statBoxW + 12);
        doc.roundedRect(sx, y, statBoxW, 50, 5).fill(COLORS.veryLightGray);
        doc.roundedRect(sx, y, statBoxW, 4, 2).fill(stat.color);
        doc.font('Helvetica-Bold').fontSize(18).fillColor(stat.color);
        doc.text(stat.value, sx + 8, y + 12, { width: statBoxW - 16, align: 'center' });
        doc.font('Helvetica').fontSize(8).fillColor(COLORS.mediumGray);
        doc.text(stat.label, sx + 8, y + 35, { width: statBoxW - 16, align: 'center' });
      });
      y += 65;

      // Tier classification
      let tier, tierDesc;
      if (rank <= 5000) { tier = 'Tier 1 — Premium'; tierDesc = 'You have access to top NIT CSE/IT programs. Focus on branch preference at top colleges.'; }
      else if (rank <= 15000) { tier = 'Tier 1 — Strong'; tierDesc = 'Top NIT CSE is within reach. Strong options across ECE/IT at premier institutes.'; }
      else if (rank <= 30000) { tier = 'Tier 2 — Competitive'; tierDesc = 'Mid NITs for CSE, top NITs for ECE/EE. Good IIIT options available.'; }
      else if (rank <= 60000) { tier = 'Tier 2 — Moderate'; tierDesc = 'Wide range of NIT branches available. Top NITs for non-CS branches, mid NITs for ECE.'; }
      else if (rank <= 100000) { tier = 'Tier 3 — Emerging'; tierDesc = 'Newer NITs and IIITs with CS/IT. Many good options with improving placements.'; }
      else { tier = 'Tier 3 — Broad'; tierDesc = 'IIITs and newer institutes. Focus on branch choice and location preference.'; }

      doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.darkGray);
      doc.text('Your Tier Classification', MARGIN.left, y);
      y += 16;

      doc.roundedRect(MARGIN.left, y, CONTENT_W, 45, 5).fill([245, 240, 255]);
      doc.roundedRect(MARGIN.left, y, 4, 45, 2).fill(COLORS.primaryLight);
      doc.font('Helvetica-Bold').fontSize(12).fillColor(COLORS.primary);
      doc.text(tier, MARGIN.left + 15, y + 8);
      doc.font('Helvetica').fontSize(9).fillColor(COLORS.darkGray);
      doc.text(tierDesc, MARGIN.left + 15, y + 25, { width: CONTENT_W - 30 });
      y += 58;

      // Summary stats
      const safeCount = eligibleOptions.filter(o => o.classification.label === 'Safe').length;
      const targetCount = eligibleOptions.filter(o => o.classification.label === 'Target').length;
      const reachCount = eligibleOptions.filter(o => o.classification.label === 'Reach').length;

      doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.darkGray);
      doc.text('Your Options at a Glance', MARGIN.left, y);
      y += 18;

      const optBoxW = CONTENT_W / 4 - 8;
      [
        { label: 'Total Options', value: eligibleOptions.length.toString(), color: COLORS.primaryLight },
        { label: 'Safe Picks', value: safeCount.toString(), color: COLORS.safe },
        { label: 'Target Picks', value: targetCount.toString(), color: COLORS.target },
        { label: 'Reach Picks', value: reachCount.toString(), color: COLORS.reach },
      ].forEach((stat, i) => {
        const sx = MARGIN.left + i * (optBoxW + 10);
        doc.roundedRect(sx, y, optBoxW, 45, 5).fill(COLORS.veryLightGray);
        doc.font('Helvetica-Bold').fontSize(22).fillColor(stat.color);
        doc.text(stat.value, sx, y + 6, { width: optBoxW, align: 'center' });
        doc.font('Helvetica').fontSize(8).fillColor(COLORS.mediumGray);
        doc.text(stat.label, sx, y + 32, { width: optBoxW, align: 'center' });
      });
      y += 60;

      // Institute type breakdown
      y = checkPageBreak(doc, y, 150);
      doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.darkGray);
      doc.text('Options by Institute Type', MARGIN.left, y);
      y += 18;

      const nitCount = eligibleOptions.filter(o => o.type === 'NIT').length;
      const iiitCount = eligibleOptions.filter(o => o.type === 'IIIT').length;
      const otherCount = eligibleOptions.filter(o => o.type === 'Other').length;

      drawPieChart(doc, {
        title: 'Institute Type Distribution',
        items: [
          { label: `NITs (${nitCount})`, value: nitCount, color: COLORS.primaryLight },
          { label: `IIITs (${iiitCount})`, value: iiitCount, color: COLORS.accentBlue },
          { label: `Others (${otherCount})`, value: otherCount, color: COLORS.mediumGray },
        ],
        x: MARGIN.left + 80,
        y: y + 50,
        radius: 45,
      });

      // Branch breakdown (on right side)
      const branchCounts = {};
      eligibleOptions.forEach(o => {
        const branch = o.shortProgram.split('(')[0].trim();
        branchCounts[branch] = (branchCounts[branch] || 0) + 1;
      });
      const branchItems = Object.entries(branchCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([label, value], i) => ({ label, value, color: COLORS.chart[i % COLORS.chart.length] }));

      drawBarChart(doc, {
        title: 'Top Branches Available',
        items: branchItems,
        x: MARGIN.left + CONTENT_W / 2 + 10,
        y: y,
        width: CONTENT_W / 2 - 10,
        height: 140,
      });

      y += 160;

      // ═══════════════════════════════════════════════════════
      // PART 2: COLLEGE DEEP DIVES
      // ═══════════════════════════════════════════════════════
      drawPartTitle(doc, 'II', 'COLLEGE DEEP DIVES', `Detailed analysis of all ${eligibleOptions.length} options available at your rank`);
      tocEntries.push({ part: 'PART II: COLLEGE DEEP DIVES', title: `All ${eligibleOptions.length} College+Branch Options`, type: 'chapter', page: pageCount + 1 });

      // Group by college for deep dives
      const collegeGroups = {};
      eligibleOptions.forEach(opt => {
        const key = opt.shortInstitute;
        if (!collegeGroups[key]) collegeGroups[key] = { institute: key, fullName: opt.institute, type: opt.type, options: [] };
        collegeGroups[key].options.push(opt);
      });

      const sortedColleges = Object.values(collegeGroups).sort((a, b) => {
        const typeOrder = { NIT: 0, IIIT: 1, Other: 2 };
        if (typeOrder[a.type] !== typeOrder[b.type]) return typeOrder[a.type] - typeOrder[b.type];
        return a.institute.localeCompare(b.institute);
      });

      let collegeNum = 0;
      sortedColleges.forEach(college => {
        collegeNum++;
        const placementInfo = placements[college.institute];
        const nirfInfo = colleges[college.institute];

        tocEntries.push({ title: `${college.institute} (${college.options.length} options)`, type: 'sub', page: pageCount + 1 });

        // Fix #4: Don't unconditionally addPage for every college.
        // Use checkPageBreak to see if we need a new page for the college header (~130px needed).
        y = checkPageBreak(doc, y, 130);
        currentChapter = college.institute;

        // If we are at the very top of a page (from checkPageBreak triggering addPage), good.
        // Otherwise we add some spacing between colleges.
        if (y > CONTENT_START + 5) {
          y += 15;
          y = checkPageBreak(doc, y, 130);
        }

        // College header
        const typeColor = college.type === 'NIT' ? COLORS.primaryLight : college.type === 'IIIT' ? COLORS.accentBlue : COLORS.mediumGray;
        doc.roundedRect(MARGIN.left, y, CONTENT_W, 55, 5).fill([245, 243, 255]);
        doc.roundedRect(MARGIN.left, y, 4, 55, 2).fill(typeColor);

        // Type badge
        doc.roundedRect(MARGIN.left + 12, y + 6, 35, 14, 7).fill(typeColor);
        doc.font('Helvetica-Bold').fontSize(7).fillColor(COLORS.white);
        doc.text(college.type, MARGIN.left + 12, y + 9, { width: 35, align: 'center' });

        // College name
        doc.font('Helvetica-Bold').fontSize(16).fillColor(COLORS.primary);
        doc.text(college.institute, MARGIN.left + 55, y + 5, { width: CONTENT_W - 70 });

        // Meta info
        const state = getState(college.institute);
        const nirfRank = nirfInfo?.nirf || 'N/A';
        const estd = nirfInfo?.estd || 'N/A';
        doc.font('Helvetica').fontSize(9).fillColor(COLORS.mediumGray);
        doc.text(`${state}  |  NIRF Rank: ${nirfRank}  |  Established: ${estd}  |  ${college.options.length} eligible branch(es)`, MARGIN.left + 55, y + 38);
        y += 68;

        // Campus & Placement info if available
        if (placementInfo) {
          y = checkPageBreak(doc, y, 60);
          // Placement stats boxes
          const pBoxW = CONTENT_W / 4 - 6;
          [
            { label: 'Highest CTC', value: `${placementInfo.highest} LPA`, color: COLORS.accentGold },
            { label: 'Average CTC', value: `${placementInfo.average} LPA`, color: COLORS.accentGreen },
            { label: 'Median CTC', value: `${placementInfo.median} LPA`, color: COLORS.accentBlue },
            { label: 'Placement %', value: `${placementInfo.placementPct}%`, color: COLORS.primaryLight },
          ].forEach((stat, i) => {
            const sx = MARGIN.left + i * (pBoxW + 8);
            doc.roundedRect(sx, y, pBoxW, 40, 4).fill(COLORS.veryLightGray);
            doc.font('Helvetica-Bold').fontSize(14).fillColor(stat.color);
            doc.text(stat.value, sx, y + 6, { width: pBoxW, align: 'center' });
            doc.font('Helvetica').fontSize(7).fillColor(COLORS.mediumGray);
            doc.text(stat.label, sx, y + 26, { width: pBoxW, align: 'center' });
          });
          y += 50;

          // Top Companies
          y = checkPageBreak(doc, y, 40);
          doc.font('Helvetica-Bold').fontSize(9).fillColor(COLORS.darkGray);
          doc.text('Top Recruiting Companies', MARGIN.left, y);
          y += 14;

          doc.font('Helvetica').fontSize(8).fillColor(COLORS.mediumGray);
          const companyText = placementInfo.topCompanies.join('  |  ');
          doc.text(companyText, MARGIN.left, y, { width: CONTENT_W });
          y += 18;

          // Sector breakdown pie + campus info side by side
          if (placementInfo.sectorBreakdown) {
            y = checkPageBreak(doc, y, 140);
            const sectorItems = [
              { label: 'IT Product', value: placementInfo.sectorBreakdown.itProduct || 0, color: COLORS.chart[0] },
              { label: 'IT Services', value: placementInfo.sectorBreakdown.itServices || 0, color: COLORS.chart[1] },
              { label: 'Core', value: placementInfo.sectorBreakdown.core || 0, color: COLORS.chart[2] },
              { label: 'Finance', value: placementInfo.sectorBreakdown.finance || 0, color: COLORS.chart[3] },
              { label: 'Consulting', value: placementInfo.sectorBreakdown.consulting || 0, color: COLORS.chart[4] },
            ];

            drawPieChart(doc, {
              title: 'Placement Sector Breakdown',
              items: sectorItems,
              x: MARGIN.left + 70,
              y: y + 45,
              radius: 35,
            });

            // Campus info on the right
            const campusX = MARGIN.left + CONTENT_W / 2 + 10;
            let campusY = y;
            doc.font('Helvetica-Bold').fontSize(9).fillColor(COLORS.darkGray);
            doc.text('Campus Life', campusX, campusY);
            campusY += 14;

            if (placementInfo.campus) {
              const campusItems = [
                ['Hostel', placementInfo.campus.hostel],
                ['Food', placementInfo.campus.food],
                ['City', placementInfo.campus.city],
                ['Climate', placementInfo.campus.climate],
              ];
              campusItems.forEach(([label, value]) => {
                if (!value) return;
                doc.font('Helvetica-Bold').fontSize(7).fillColor(COLORS.darkGray);
                doc.text(`${label}: `, campusX, campusY, { continued: true });
                doc.font('Helvetica').fontSize(7).fillColor(COLORS.mediumGray);
                doc.text(value, { width: CONTENT_W / 2 - 25 });
                campusY += 12;
              });
            }

            // Pros & Cons
            campusY += 6;
            if (placementInfo.pros) {
              doc.font('Helvetica-Bold').fontSize(8).fillColor(COLORS.accentGreen);
              doc.text('Pros', campusX, campusY);
              campusY += 12;
              placementInfo.pros.forEach(pro => {
                doc.font('Helvetica').fontSize(7).fillColor(COLORS.darkGray);
                doc.text(`+ ${pro}`, campusX + 5, campusY, { width: CONTENT_W / 2 - 25 });
                campusY += 10;
              });
            }
            campusY += 4;
            if (placementInfo.cons) {
              doc.font('Helvetica-Bold').fontSize(8).fillColor(COLORS.accentRed);
              doc.text('Cons', campusX, campusY);
              campusY += 12;
              placementInfo.cons.forEach(con => {
                doc.font('Helvetica').fontSize(7).fillColor(COLORS.darkGray);
                doc.text(`- ${con}`, campusX + 5, campusY, { width: CONTENT_W / 2 - 25 });
                campusY += 10;
              });
            }

            y = Math.max(y + 130, campusY) + 10;
          }

          // Alumni & Fees
          y = checkPageBreak(doc, y, 60);
          if (placementInfo.alumni || placementInfo.fees) {
            doc.font('Helvetica-Bold').fontSize(9).fillColor(COLORS.darkGray);
            doc.text('Additional Info', MARGIN.left, y);
            y += 14;

            if (placementInfo.alumni) {
              doc.font('Helvetica-Bold').fontSize(7).fillColor(COLORS.darkGray);
              doc.text('Alumni Network: ', MARGIN.left, y, { continued: true });
              doc.font('Helvetica').fontSize(7).fillColor(COLORS.mediumGray);
              doc.text(placementInfo.alumni, { width: CONTENT_W - 80 });
              y += 14;
            }
            if (placementInfo.fees) {
              doc.font('Helvetica-Bold').fontSize(7).fillColor(COLORS.darkGray);
              doc.text('Approx. Total Fees (4 years): ', MARGIN.left, y, { continued: true });
              doc.font('Helvetica').fontSize(7).fillColor(COLORS.mediumGray);
              doc.text(`~${placementInfo.fees} Lakhs`);
              y += 14;
            }
            if (placementInfo.internship) {
              doc.font('Helvetica-Bold').fontSize(7).fillColor(COLORS.darkGray);
              doc.text('Internship Culture: ', MARGIN.left, y, { continued: true });
              doc.font('Helvetica').fontSize(7).fillColor(COLORS.mediumGray);
              doc.text(placementInfo.internship, { width: CONTENT_W - 80 });
              y += 14;
            }
          }
        }

        // ── Branch-wise options with cutoff trends ──
        y = checkPageBreak(doc, y, 80);
        doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.primary);
        doc.text('Your Eligible Branches at This College', MARGIN.left, y);
        y += 18;

        college.options.forEach((opt, optIdx) => {
          y = checkPageBreak(doc, y, 180);

          // Branch header
          const classColor = opt.classification.color;
          doc.roundedRect(MARGIN.left, y, CONTENT_W, 28, 4).fill([248, 246, 255]);
          doc.roundedRect(MARGIN.left, y, 3, 28, 1).fill(classColor);

          doc.font('Helvetica-Bold').fontSize(10).fillColor(COLORS.darkGray);
          doc.text(opt.shortProgram, MARGIN.left + 12, y + 4, { width: CONTENT_W * 0.6 });

          // Classification badge
          doc.roundedRect(MARGIN.left + CONTENT_W - 85, y + 5, 70, 16, 8).fill(classColor);
          doc.font('Helvetica-Bold').fontSize(7).fillColor(COLORS.white);
          doc.text(opt.classification.label, MARGIN.left + CONTENT_W - 85, y + 9, { width: 70, align: 'center' });

          // Closing rank
          doc.font('Helvetica').fontSize(8).fillColor(COLORS.mediumGray);
          doc.text(`Closing Rank (${latestYear}): ${opt.closingRank.toLocaleString()}`, MARGIN.left + 12, y + 17);
          y += 35;

          // Cutoff trend chart
          const trendYears = Object.keys(opt.trends).sort();
          if (trendYears.length > 0) {
            const labels = trendYears.map(String);
            const openData = trendYears.map(yr => opt.trends[yr]?.open || null);
            const closeData = trendYears.map(yr => opt.trends[yr]?.close || null);

            drawLineChart(doc, {
              title: `Cutoff Trend (${trendYears[0]}-${trendYears[trendYears.length - 1]})`,
              labels,
              datasets: [
                { label: 'Opening Rank', data: openData, color: COLORS.accentBlue },
                { label: 'Closing Rank', data: closeData, color: COLORS.primaryLight },
              ],
              x: MARGIN.left,
              y: y,
              width: CONTENT_W * 0.55,
              height: 100,
            });

            // Round-by-round table on right side
            const tableX = MARGIN.left + CONTENT_W * 0.58;
            const tableW = CONTENT_W * 0.42;
            let tableY = y;
            doc.font('Helvetica-Bold').fontSize(8).fillColor(COLORS.darkGray);
            doc.text('Round-wise Cutoffs', tableX, tableY);
            tableY += 14;

            // Collect round data for latest year
            const roundData = [];
            const roundKeys = Object.keys(cutoffData.data).filter(k => k.startsWith(`${latestYear}-`));
            roundKeys.forEach(rk => {
              const roundNum = rk.split('-')[1];
              const entries = cutoffData.data[rk];
              const match = entries.find(e => {
                const [iIdx, pIdx, qIdx, st, gender] = e;
                return cutoffData.institutes[iIdx] === opt.institute &&
                       cutoffData.programs[pIdx] === opt.program &&
                       qIdx === (opt.quotaIdx != null ? opt.quotaIdx : 0) &&
                       (seatType === 'OPEN' ? st === 'OPEN' : (st === seatType || st === 'OPEN')) &&
                       gender === 0;
              });
              if (match) {
                roundData.push([`R${roundNum}`, match[5].toLocaleString(), match[6].toLocaleString()]);
              }
            });

            if (roundData.length > 0) {
              tableY = drawTable(doc, {
                headers: ['Round', 'Opening', 'Closing'],
                rows: roundData,
                x: tableX,
                y: tableY,
                width: tableW,
                colWidths: [tableW * 0.25, tableW * 0.375, tableW * 0.375],
              });
            }

            y = Math.max(y + 110, tableY) + 10;
          }

          // Branch-specific placement if available
          if (placementInfo?.branchPlacements) {
            const branchKey = Object.keys(placementInfo.branchPlacements).find(k =>
              opt.shortProgram.toLowerCase().includes(k.toLowerCase())
            );
            if (branchKey) {
              const bp = placementInfo.branchPlacements[branchKey];
              y = checkPageBreak(doc, y, 30);

              doc.font('Helvetica').fontSize(8).fillColor(COLORS.mediumGray);
              doc.text(
                `Branch Placements: Avg ${bp.avg} LPA | Median ${bp.median} LPA | ${bp.pct}% placed`,
                MARGIN.left + 12, y
              );
              y += 16;
            }
          }

          if (optIdx < college.options.length - 1) {
            doc.rect(MARGIN.left + 20, y, CONTENT_W - 40, 0.5).fill(COLORS.lightGray);
            y += 10;
          }
        });

        y += 10;
      });

      // ═══════════════════════════════════════════════════════
      // PART 3: COMPARISONS
      // ═══════════════════════════════════════════════════════
      drawPartTitle(doc, 'III', 'HEAD-TO-HEAD COMPARISONS', 'Side-by-side analysis of competing options');
      tocEntries.push({ part: 'PART III: COMPARISONS', title: 'Head-to-Head Battles', type: 'chapter', page: pageCount + 1 });

      y = drawChapterTitle(doc, 2, 'Head-to-Head Battles');

      // Pick top competing pairs
      const targetOptions = eligibleOptions.filter(o => o.classification.label === 'Target' || o.classification.label === 'Safe');
      const comparisonPairs = [];

      // Find pairs of different colleges with similar cutoffs
      for (let i = 0; i < targetOptions.length && comparisonPairs.length < 6; i++) {
        for (let j = i + 1; j < targetOptions.length && comparisonPairs.length < 6; j++) {
          const a = targetOptions[i];
          const b = targetOptions[j];
          if (a.shortInstitute !== b.shortInstitute) {
            const diff = Math.abs(a.closingRank - b.closingRank);
            if (diff < rank * 0.5) {
              comparisonPairs.push([a, b]);
              break;
            }
          }
        }
      }

      comparisonPairs.forEach((pair, pairIdx) => {
        const [a, b] = pair;
        y = checkPageBreak(doc, y, 200);

        tocEntries.push({ title: `${a.shortInstitute} vs ${b.shortInstitute}`, type: 'sub', page: pageCount });

        doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.primary);
        doc.text(`Battle ${pairIdx + 1}: ${a.shortInstitute} vs ${b.shortInstitute}`, MARGIN.left, y);
        y += 6;
        doc.font('Helvetica').fontSize(8).fillColor(COLORS.mediumGray);
        doc.text(`${a.shortProgram} vs ${b.shortProgram}`, MARGIN.left, y);
        y += 16;

        const pA = placements[a.shortInstitute];
        const pB = placements[b.shortInstitute];
        const nA = colleges[a.shortInstitute];
        const nB = colleges[b.shortInstitute];

        const metrics = [
          { label: 'Closing Rank', values: [a.closingRank.toLocaleString(), b.closingRank.toLocaleString()], better: a.closingRank > b.closingRank ? 0 : 1 },
          { label: 'NIRF Rank', values: [nA?.nirf || 'N/A', nB?.nirf || 'N/A'], better: (nA?.nirf || 999) < (nB?.nirf || 999) ? 0 : 1 },
          { label: 'Highest CTC', values: [`${pA?.highest || '?'} LPA`, `${pB?.highest || '?'} LPA`], better: (pA?.highest || 0) > (pB?.highest || 0) ? 0 : 1 },
          { label: 'Average CTC', values: [`${pA?.average || '?'} LPA`, `${pB?.average || '?'} LPA`], better: (pA?.average || 0) > (pB?.average || 0) ? 0 : 1 },
          { label: 'Placement %', values: [`${pA?.placementPct || '?'}%`, `${pB?.placementPct || '?'}%`], better: (pA?.placementPct || 0) > (pB?.placementPct || 0) ? 0 : 1 },
          { label: 'Established', values: [nA?.estd || 'N/A', nB?.estd || 'N/A'], better: (nA?.estd || 2020) < (nB?.estd || 2020) ? 0 : 1 },
          { label: 'Fees (4yr)', values: [`~${pA?.fees || '?'}L`, `~${pB?.fees || '?'}L`], better: (pA?.fees || 99) < (pB?.fees || 99) ? 0 : 1 },
        ];

        // Draw comparison table
        const colW = CONTENT_W / 3;
        const rowH = 18;

        // Header
        doc.rect(MARGIN.left, y, CONTENT_W, 22).fill(COLORS.primary);
        doc.font('Helvetica-Bold').fontSize(8).fillColor(COLORS.white);
        doc.text('Metric', MARGIN.left + 5, y + 6, { width: colW - 10, align: 'center' });
        doc.text(a.shortInstitute, MARGIN.left + colW + 5, y + 6, { width: colW - 10, align: 'center', lineBreak: false });
        doc.text(b.shortInstitute, MARGIN.left + colW * 2 + 5, y + 6, { width: colW - 10, align: 'center', lineBreak: false });
        y += 22;

        metrics.forEach((m, mi) => {
          const bg = mi % 2 === 0 ? COLORS.veryLightGray : COLORS.white;
          doc.rect(MARGIN.left, y, CONTENT_W, rowH).fill(bg);
          doc.rect(MARGIN.left, y, CONTENT_W, rowH).strokeColor(COLORS.tableBorder).lineWidth(0.3).stroke();

          doc.font('Helvetica-Bold').fontSize(7).fillColor(COLORS.darkGray);
          doc.text(m.label, MARGIN.left + 5, y + 4, { width: colW - 10, align: 'center' });

          [0, 1].forEach(idx => {
            const isBetter = m.better === idx;
            doc.font(isBetter ? 'Helvetica-Bold' : 'Helvetica').fontSize(7)
               .fillColor(isBetter ? COLORS.accentGreen : COLORS.darkGray);
            doc.text(m.values[idx]?.toString() || '-', MARGIN.left + colW * (idx + 1) + 5, y + 4, { width: colW - 10, align: 'center' });
          });
          y += rowH;
        });

        // Verdict
        const aWins = metrics.filter(m => m.better === 0).length;
        const bWins = metrics.filter(m => m.better === 1).length;
        const winner = aWins > bWins ? a.shortInstitute : b.shortInstitute;

        y += 8;
        doc.roundedRect(MARGIN.left, y, CONTENT_W, 25, 4).fill([245, 255, 245]);
        doc.font('Helvetica-Bold').fontSize(9).fillColor(COLORS.accentGreen);
        doc.text(`Verdict: ${winner} edges ahead (${Math.max(aWins, bWins)}-${Math.min(aWins, bWins)} on metrics)`, MARGIN.left + 10, y + 7);
        y += 40;
      });

      // ── Branch vs Branch ──
      y = checkPageBreak(doc, y, 100);
      tocEntries.push({ title: 'Branch vs Branch Analysis', type: 'chapter', page: pageCount });

      doc.font('Helvetica-Bold').fontSize(14).fillColor(COLORS.primary);
      doc.text('Branch vs Branch Analysis', MARGIN.left, y);
      y += 22;

      doc.font('Helvetica').fontSize(9).fillColor(COLORS.darkGray);
      doc.text('How do different branches compare in terms of placements across your eligible colleges?', MARGIN.left, y, { width: CONTENT_W });
      y += 20;

      // Aggregate branch placement data
      const branchAggData = {};
      eligibleOptions.forEach(opt => {
        const branch = opt.shortProgram.split('(')[0].trim();
        const pInfo = placements[opt.shortInstitute];
        if (!pInfo?.branchPlacements) return;
        const bpKey = Object.keys(pInfo.branchPlacements).find(k => opt.shortProgram.toLowerCase().includes(k.toLowerCase()));
        if (bpKey) {
          if (!branchAggData[branch]) branchAggData[branch] = { avgPkgs: [], medPkgs: [], pcts: [], count: 0 };
          branchAggData[branch].avgPkgs.push(pInfo.branchPlacements[bpKey].avg);
          branchAggData[branch].medPkgs.push(pInfo.branchPlacements[bpKey].median);
          branchAggData[branch].pcts.push(pInfo.branchPlacements[bpKey].pct);
          branchAggData[branch].count++;
        }
      });

      const branchCompItems = Object.entries(branchAggData)
        .filter(([, d]) => d.count >= 2)
        .map(([branch, d]) => ({
          label: branch,
          value: Math.round(d.avgPkgs.reduce((s, v) => s + v, 0) / d.avgPkgs.length * 10) / 10,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 8)
        .map((item, i) => ({ ...item, color: COLORS.chart[i % COLORS.chart.length] }));

      if (branchCompItems.length > 0) {
        y = drawBarChart(doc, {
          title: 'Average Package by Branch (LPA) — Across Your Eligible Colleges',
          items: branchCompItems,
          x: MARGIN.left,
          y: y,
          width: CONTENT_W,
          height: 150,
          showValues: true,
        });
        y += 20;
      }

      // ═══════════════════════════════════════════════════════
      // PART 4: STRATEGY GUIDE
      // ═══════════════════════════════════════════════════════
      drawPartTitle(doc, 'IV', 'STRATEGY GUIDE', 'Your playbook for JoSAA counselling');
      tocEntries.push({ part: 'PART IV: STRATEGY GUIDE', title: 'Your Top Recommended Strategies', type: 'chapter', page: pageCount + 1 });

      y = drawChapterTitle(doc, 3, 'Your Top Recommended Strategies');

      // Find matching combos
      const relevantCombos = combos.filter(c => {
        const [minRank, maxRank] = c.stats.rankGap.split('-').map(s => parseInt(s.replace(/k/gi, '000').replace(/,/g, '')));
        return rank >= (minRank || 0) && rank <= (maxRank || 999999);
      }).slice(0, 8);

      if (relevantCombos.length === 0) {
        // Fallback: show top 5 combos
        relevantCombos.push(...combos.slice(0, 5));
      }

      relevantCombos.forEach((combo, ci) => {
        y = checkPageBreak(doc, y, 140);

        // Strategy card
        doc.roundedRect(MARGIN.left, y, CONTENT_W, 5, 2).fill(COLORS.chart[ci % COLORS.chart.length]);

        doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.primary);
        doc.text(`Strategy ${ci + 1}: ${combo.title}`, MARGIN.left, y + 12);
        doc.font('Helvetica').fontSize(9).fillColor(COLORS.mediumGray);
        doc.text(combo.subtitle, MARGIN.left, y + 28);
        y += 42;

        doc.font('Helvetica').fontSize(9).fillColor(COLORS.darkGray);
        doc.text(combo.description, MARGIN.left + 10, y, { width: CONTENT_W - 20 });
        y += 20;

        // Stats
        const statsRow = [
          `Matching Seats: ${combo.stats.matchingSeats}`,
          `Rank Range: ${combo.stats.rankGap}`,
          `Placement: ${combo.stats.placement}`,
        ];
        doc.font('Helvetica-Bold').fontSize(8).fillColor(COLORS.primaryLight);
        doc.text(statsRow.join('  |  '), MARGIN.left + 10, y);
        y += 14;

        // Branch focus
        doc.font('Helvetica').fontSize(8).fillColor(COLORS.darkGray);
        doc.text(`Branch Focus: ${combo.branchFocus.join(', ')}`, MARGIN.left + 10, y);
        y += 12;
        if (combo.blockedBranches.length > 0) {
          doc.text(`Blocked: ${combo.blockedBranches.join(', ')}`, MARGIN.left + 10, y);
          y += 12;
        }
        doc.text(`Location: ${combo.locationFocus}`, MARGIN.left + 10, y);
        y += 14;

        // Matching options from eligible list
        const matchingOpts = eligibleOptions.filter(opt => {
          const branch = opt.shortProgram.toLowerCase();
          return combo.branchFocus.some(bf => branch.includes(bf.toLowerCase()));
        }).slice(0, 5);

        if (matchingOpts.length > 0) {
          doc.font('Helvetica-Bold').fontSize(8).fillColor(COLORS.darkGray);
          doc.text('Top Matching Options at Your Rank:', MARGIN.left + 10, y);
          y += 12;

          matchingOpts.forEach(opt => {
            doc.font('Helvetica').fontSize(7).fillColor(COLORS.mediumGray);
            doc.text(`  ${opt.shortInstitute} — ${opt.shortProgram} (Cutoff: ${opt.closingRank.toLocaleString()}) [${opt.classification.label}]`, MARGIN.left + 15, y);
            y += 10;
          });
        }

        y += 8;
        doc.rect(MARGIN.left + 20, y, CONTENT_W - 40, 0.5).fill(COLORS.lightGray);
        y += 10;
      });

      // ── Round-by-Round Playbook ──
      y = checkPageBreak(doc, y, 200);
      tocEntries.push({ title: 'Round-by-Round Playbook', type: 'chapter', page: pageCount });

      y = drawChapterTitle(doc, 4, 'Round-by-Round Playbook');

      const roundGuide = [
        {
          title: 'Round 1 — The Opening',
          content: `At rank ${rank.toLocaleString()}, Round 1 is exploratory. You'll likely get a seat but probably not your top choice. Key actions:\n- Fill ALL preferences (up to 100+ choices)\n- Don't leave gaps — list even "backup" options\n- SELECT "Float" if you get a seat you're okay with but want better\n- SELECT "Freeze" ONLY if you get your dream choice`
        },
        {
          title: 'Round 2 — The Improvement',
          content: `Seats shuffle as students above you choose to freeze or leave. At rank ${rank.toLocaleString()}, expect 10-20% of your options to move.\n- UPDATE your preferences if your thinking has changed\n- "Float" is still the safe choice in most cases\n- Watch for new seats opening up as IIT students finalize`
        },
        {
          title: 'Round 3 — The Sweet Spot',
          content: `This is often the best round for significant upgrades. Many seats get vacated.\n- If you're happy with current allotment, "Freeze" to lock it\n- If still hoping for better, continue to "Float"\n- Check closing ranks from previous year's Round 3 for realistic expectations`
        },
        {
          title: 'Rounds 4-5 — Marginal Gains',
          content: `Movement slows down significantly. Only small changes expected.\n- "Freeze" if you have a good seat — risk of losing it increases\n- Only "Float" if you have nothing to lose\n- Start mentally preparing for your allocated college`
        },
        {
          title: 'Round 6 (Special) — Last Chance',
          content: `This round is for leftover seats and special cases. Unpredictable movement.\n- If you haven't been allotted, this is your last shot\n- Consider ALL options including branches you initially avoided\n- A seat at any NIT/IIIT > dropping a year for most students`
        },
      ];

      roundGuide.forEach(round => {
        y = checkPageBreak(doc, y, 100);

        doc.font('Helvetica-Bold').fontSize(10).fillColor(COLORS.primary);
        doc.text(round.title, MARGIN.left, y);
        y += 16;

        doc.font('Helvetica').fontSize(9).fillColor(COLORS.darkGray);
        const lines = round.content.split('\n');
        lines.forEach(line => {
          doc.text(line.trim(), MARGIN.left + 10, y, { width: CONTENT_W - 20 });
          y += line.startsWith('-') ? 13 : 15;
        });
        y += 10;
      });

      // Common mistakes
      y = checkPageBreak(doc, y, 120);
      doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.accentRed);
      doc.text('Common Mistakes to Avoid', MARGIN.left, y);
      y += 18;

      const mistakes = [
        'Not filling enough preferences — always fill 50+ choices minimum',
        'Choosing "Slide" when you should "Float" — Slide removes lower preferences permanently',
        'Prioritizing college brand over branch at your rank range',
        'Not researching placement data — a lower-ranked NIT\'s CSE may beat a top NIT\'s Civil',
        'Panic-freezing in Round 1 — wait for at least Round 2-3',
        'Ignoring newer IIITs — they often have better CS placements than older NITs for non-CS',
        'Not considering location — 4 years in a place you dislike affects your entire experience',
        'Following friends\' choices instead of your own research',
      ];

      mistakes.forEach(m => {
        y = checkPageBreak(doc, y, 16);
        doc.font('Helvetica').fontSize(8).fillColor(COLORS.darkGray);
        doc.text(`  ${m}`, MARGIN.left + 10, y, { width: CONTENT_W - 20 });
        y += 14;
      });

      // ── Category & Quota Guide ──
      y = checkPageBreak(doc, y, 200);
      tocEntries.push({ title: 'Category & Quota Guide', type: 'chapter', page: pageCount });

      y = drawChapterTitle(doc, 5, 'Category & Quota Guide');

      doc.font('Helvetica').fontSize(9).fillColor(COLORS.darkGray);
      doc.text(`Your category: ${category}`, MARGIN.left, y);
      y += 18;

      const categoryGuide = {
        'General': [
          'You compete on CRL (Common Rank List) only',
          'No category reservation benefit — pure merit',
          'EWS quota may be available if your family income is below 8 LPA',
          'Female supernumerary seats available at NITs (extra 20% seats for women)',
        ],
        'OBC-NCL': [
          'You get 27% reservation in central institutions',
          'Your OBC rank is used, not CRL',
          'Non-Creamy Layer certificate required — get it from your district magistrate',
          'OBC cutoffs are typically 1.5-2x the General cutoff rank',
        ],
        'SC': [
          'You get 15% reservation in central institutions',
          'SC rank is used for seat allocation',
          'Fee waiver available at most NITs and IIITs',
          'Preparatory course option if you don\'t get direct admission',
        ],
        'ST': [
          'You get 7.5% reservation in central institutions',
          'ST rank is used for seat allocation',
          'Fee waiver and scholarship available',
          'Fewer seats but also fewer applicants — reasonable chances',
        ],
        'EWS': [
          'You get 10% reservation (implemented from 2019)',
          'EWS rank is used for allocation',
          'Income certificate required (family income < 8 LPA)',
          'Cutoffs are typically between General and OBC',
        ],
      };

      const guideItems = categoryGuide[category] || categoryGuide['General'];
      guideItems.forEach(item => {
        doc.font('Helvetica').fontSize(9).fillColor(COLORS.darkGray);
        doc.text(`  ${item}`, MARGIN.left + 10, y, { width: CONTENT_W - 20 });
        y += 15;
      });

      y += 10;
      // Home state quota
      doc.font('Helvetica-Bold').fontSize(10).fillColor(COLORS.primary);
      doc.text('Home State Quota (HS)', MARGIN.left, y);
      y += 16;

      doc.font('Helvetica').fontSize(9).fillColor(COLORS.darkGray);
      const hsText = `NITs reserve 50% seats for home state students. If you belong to the state where a NIT is located, you get HS quota advantage — cutoffs are typically 20-40% higher ranks (lower scores needed). This is a significant advantage at mid-tier NITs where the HS/OS difference can be 5,000-10,000 ranks.`;
      doc.text(hsText, MARGIN.left + 10, y, { width: CONTENT_W - 20 });
      y += 55;

      // ═══════════════════════════════════════════════════════
      // PART 5: PLACEMENT INTELLIGENCE
      // ═══════════════════════════════════════════════════════
      drawPartTitle(doc, 'V', 'PLACEMENT INTELLIGENCE', 'Companies, packages, and career paths');
      tocEntries.push({ part: 'PART V: PLACEMENT INTELLIGENCE', title: 'Company Directory', type: 'chapter', page: pageCount + 1 });

      y = drawChapterTitle(doc, 6, 'Company Directory');

      doc.font('Helvetica').fontSize(9).fillColor(COLORS.darkGray);
      doc.text('Top companies that recruit from your eligible colleges, grouped by sector.', MARGIN.left, y, { width: CONTENT_W });
      y += 20;

      // Group companies by sector
      const companySectors = {};
      Object.entries(companies).forEach(([name, info]) => {
        const sector = info.sector;
        if (!companySectors[sector]) companySectors[sector] = [];
        companySectors[sector].push({ name, ...info });
      });

      Object.entries(companySectors).forEach(([sector, companyList]) => {
        y = checkPageBreak(doc, y, 80);

        doc.font('Helvetica-Bold').fontSize(10).fillColor(COLORS.primary);
        doc.text(sector, MARGIN.left, y);
        y += 16;

        const tableRows = companyList.map(c => [
          c.name,
          `${c.ctcRange[0]}-${c.ctcRange[1]} LPA`,
          c.roles.slice(0, 3).join(', '),
          Array.isArray(c.colleges) ? c.colleges.slice(0, 3).join(', ') : c.colleges,
        ]);

        y = drawTable(doc, {
          headers: ['Company', 'CTC Range', 'Roles', 'Key Colleges'],
          rows: tableRows,
          x: MARGIN.left,
          y: y,
          width: CONTENT_W,
          colWidths: [CONTENT_W * 0.2, CONTENT_W * 0.15, CONTENT_W * 0.3, CONTENT_W * 0.35],
        });

        y += 12;
      });

      // ── Package Analysis ──
      tocEntries.push({ title: 'Package Analysis', type: 'chapter', page: pageCount + 1 });
      y = drawChapterTitle(doc, 7, 'Package Analysis');

      // College-wise average package bar chart
      const pkgItems = sortedColleges
        .filter(c => placements[c.institute]?.average)
        .map(c => ({
          label: c.institute.replace('NIT ', '').replace('IIIT ', '').replace('IIITM ', '').replace('IIITDM ', ''),
          value: placements[c.institute].average,
          color: c.type === 'NIT' ? COLORS.primaryLight : c.type === 'IIIT' ? COLORS.accentBlue : COLORS.mediumGray,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 15);

      if (pkgItems.length > 0) {
        y = drawBarChart(doc, {
          title: 'Average Package by College (LPA) — Your Eligible Colleges',
          items: pkgItems,
          x: MARGIN.left,
          y: y,
          width: CONTENT_W,
          height: 250,
          showValues: true,
        });
        y += 20;
      }

      // Best ROI
      y = checkPageBreak(doc, y, 120);
      doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.primary);
      doc.text('Best Return on Investment (ROI)', MARGIN.left, y);
      y += 14;
      doc.font('Helvetica').fontSize(8).fillColor(COLORS.mediumGray);
      doc.text('ROI = Average Package / Total Fees (4 years). Higher is better.', MARGIN.left, y);
      y += 16;

      const roiItems = sortedColleges
        .filter(c => placements[c.institute]?.average && placements[c.institute]?.fees)
        .map(c => ({
          label: c.institute,
          value: Math.round((placements[c.institute].average / placements[c.institute].fees) * 100) / 100,
          avg: placements[c.institute].average,
          fees: placements[c.institute].fees,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10);

      if (roiItems.length > 0) {
        const roiRows = roiItems.map((item, i) => [
          i + 1, item.label, `${item.avg} LPA`, `${item.fees}L`, `${item.value}x`
        ]);

        y = drawTable(doc, {
          headers: ['#', 'College', 'Avg Package', 'Fees (4yr)', 'ROI'],
          rows: roiRows,
          x: MARGIN.left,
          y: y,
          width: CONTENT_W,
          colWidths: [CONTENT_W * 0.06, CONTENT_W * 0.44, CONTENT_W * 0.17, CONTENT_W * 0.17, CONTENT_W * 0.16],
        });
        y += 15;
      }

      // ── Career Paths ──
      tocEntries.push({ title: 'Career Paths by Branch', type: 'chapter', page: pageCount + 1 });
      y = drawChapterTitle(doc, 8, 'Career Paths by Branch');

      Object.entries(branchPaths).forEach(([branch, info]) => {
        y = checkPageBreak(doc, y, 130);

        doc.roundedRect(MARGIN.left, y, CONTENT_W, 4, 2).fill(COLORS.primaryLight);
        y += 8;

        doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.primary);
        doc.text(branch, MARGIN.left, y);
        y += 16;

        doc.font('Helvetica-Bold').fontSize(8).fillColor(COLORS.darkGray);
        doc.text('Career Options: ', MARGIN.left + 5, y, { continued: true });
        doc.font('Helvetica').fontSize(8).fillColor(COLORS.mediumGray);
        doc.text(info.careers.join(', '), { width: CONTENT_W - 90 });
        y += 14;

        doc.font('Helvetica-Bold').fontSize(8).fillColor(COLORS.darkGray);
        doc.text('Avg Package Range: ', MARGIN.left + 5, y, { continued: true });
        doc.font('Helvetica').fontSize(8).fillColor(COLORS.mediumGray);
        doc.text(info.avgPackage);
        y += 13;

        doc.font('Helvetica-Bold').fontSize(8).fillColor(COLORS.darkGray);
        doc.text('Key Sectors: ', MARGIN.left + 5, y, { continued: true });
        doc.font('Helvetica').fontSize(8).fillColor(COLORS.mediumGray);
        doc.text(info.sectors.join(', '));
        y += 13;

        doc.font('Helvetica-Bold').fontSize(8).fillColor(COLORS.darkGray);
        doc.text('Higher Studies: ', MARGIN.left + 5, y, { continued: true });
        doc.font('Helvetica').fontSize(8).fillColor(COLORS.mediumGray);
        doc.text(info.higherStudies, { width: CONTENT_W - 80 });
        y += 14;

        doc.font('Helvetica-Bold').fontSize(8).fillColor(COLORS.darkGray);
        doc.text('Demand Trend: ', MARGIN.left + 5, y, { continued: true });
        doc.font('Helvetica').fontSize(8).fillColor(COLORS.mediumGray);
        doc.text(info.demandTrend, { width: CONTENT_W - 80 });
        y += 14;

        doc.font('Helvetica-Bold').fontSize(8).fillColor(COLORS.accentGreen);
        doc.text('Pro Tip: ', MARGIN.left + 5, y, { continued: true });
        doc.font('Helvetica-Oblique').fontSize(8).fillColor(COLORS.darkGray);
        doc.text(info.tips, { width: CONTENT_W - 60 });
        y += 18;

        doc.rect(MARGIN.left + 20, y, CONTENT_W - 40, 0.5).fill(COLORS.lightGray);
        y += 12;
      });

      // ═══════════════════════════════════════════════════════
      // APPENDIX
      // ═══════════════════════════════════════════════════════
      drawPartTitle(doc, 'VI', 'APPENDIX', 'Complete reference data');
      tocEntries.push({ part: 'APPENDIX', title: 'Complete Preference List', type: 'chapter', page: pageCount + 1 });

      y = drawChapterTitle(doc, 9, 'Complete Preference List');

      doc.font('Helvetica').fontSize(9).fillColor(COLORS.darkGray);
      doc.text(`All ${eligibleOptions.length} options sorted by recommendation priority for Rank ${rank.toLocaleString()} (${category}).`, MARGIN.left, y, { width: CONTENT_W });
      y += 18;

      // Full preference table in batches
      const batchSize = 30;
      for (let i = 0; i < eligibleOptions.length; i += batchSize) {
        y = checkPageBreak(doc, y, 100);

        const batch = eligibleOptions.slice(i, i + batchSize);
        const tableRows = batch.map((opt, idx) => [
          (i + idx + 1).toString(),
          opt.shortInstitute,
          opt.shortProgram,
          opt.closingRank.toLocaleString(),
          opt.classification.label,
          opt.type,
        ]);

        y = drawTable(doc, {
          headers: ['#', 'Institute', 'Program', 'Cutoff', 'Class', 'Type'],
          rows: tableRows,
          x: MARGIN.left,
          y: y,
          width: CONTENT_W,
          colWidths: [CONTENT_W * 0.05, CONTENT_W * 0.3, CONTENT_W * 0.3, CONTENT_W * 0.12, CONTENT_W * 0.1, CONTENT_W * 0.13],
        });

        y += 10;
      }

      // ── Glossary ──
      tocEntries.push({ title: 'Glossary of JoSAA Terms', type: 'chapter', page: pageCount + 1 });
      y = drawChapterTitle(doc, 10, 'Glossary of JoSAA Terms');

      const glossary = [
        ['JoSAA', 'Joint Seat Allocation Authority — conducts centralized counselling for IITs, NITs, IIITs, and GFTIs'],
        ['CRL', 'Common Rank List — Overall merit list based on JEE Main score'],
        ['Opening Rank', 'The best (lowest) rank admitted in a particular round for a specific seat'],
        ['Closing Rank', 'The last (highest) rank admitted in a particular round for a specific seat'],
        ['Float', 'Accept current seat but remain eligible for upgrade in subsequent rounds'],
        ['Freeze', 'Lock your current seat — no changes in future rounds'],
        ['Slide', 'Accept current seat and remain eligible for upgrade within the SAME institute only'],
        ['HS', 'Home State quota — 50% seats reserved for students domiciled in the NIT\'s state'],
        ['OS', 'Other State quota — 50% seats for students from other states'],
        ['AI', 'All India quota — applies to IITs and some other institutes'],
        ['NIRF', 'National Institute Ranking Framework — Government of India ranking system'],
        ['CTC', 'Cost to Company — total annual package offered to a placed student'],
        ['LPA', 'Lakhs Per Annum — unit for annual salary (1 Lakh = 100,000 INR)'],
        ['Supernumerary', 'Extra seats beyond sanctioned intake (e.g., female supernumerary at NITs)'],
        ['Preparatory Course', 'One-year remedial course for reserved category students who missed direct cutoff'],
        ['CSAB', 'Central Seat Allocation Board — conducts special rounds after JoSAA'],
      ];

      glossary.forEach(([term, def]) => {
        y = checkPageBreak(doc, y, 25);
        doc.font('Helvetica-Bold').fontSize(9).fillColor(COLORS.primary);
        doc.text(term, MARGIN.left, y, { continued: true });
        doc.font('Helvetica').fontSize(9).fillColor(COLORS.darkGray);
        doc.text(` — ${def}`, { width: CONTENT_W - 80 });
        y += 16;
      });

      // ── Disclaimer & About ──
      y = checkPageBreak(doc, y, 150);
      tocEntries.push({ title: 'Disclaimer & About', type: 'sub', page: pageCount });

      y += 20;
      doc.rect(MARGIN.left, y, CONTENT_W, 1).fill(COLORS.primaryLight);
      y += 15;

      doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.primary);
      doc.text('Disclaimer', MARGIN.left, y);
      y += 16;

      doc.font('Helvetica').fontSize(8).fillColor(COLORS.darkGray);
      const disclaimer = `This guide has been compiled using data from publicly available sources including NIRF rankings, official college placement reports, and anonymous student surveys conducted by cutoffs.ai. All figures — including CTC packages, placement percentages, and cutoff ranks — are approximate and indicative. Actual values may vary from year to year. This guide is intended for informational purposes only and does not guarantee admission to any institute or program. Students are advised to verify information from official JoSAA and college websites before making decisions. cutoffs.ai is not affiliated with JoSAA, any NIT, IIIT, or IIT.`;
      doc.text(disclaimer, MARGIN.left, y, { width: CONTENT_W });
      y += 65;

      doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.primary);
      doc.text('About cutoffs.ai', MARGIN.left, y);
      y += 16;

      doc.font('Helvetica').fontSize(8).fillColor(COLORS.darkGray);
      doc.text('cutoffs.ai is an AI-powered JEE counselling platform that helps students make data-driven decisions about their college and branch preferences. We analyze 190,000+ cutoff data points across 3 years to provide personalized guidance.', MARGIN.left, y, { width: CONTENT_W });
      y += 40;

      doc.font('Helvetica-Bold').fontSize(12).fillColor(COLORS.primaryLight);
      doc.text('Thank you for choosing cutoffs.ai', 0, y, { width: PAGE_W, align: 'center' });
      y += 18;
      doc.font('Helvetica').fontSize(9).fillColor(COLORS.mediumGray);
      doc.text('We wish you the very best for your JoSAA counselling!', 0, y, { width: PAGE_W, align: 'center' });

      // ═══════════════════════════════════════════════════════
      // Finalize
      // ═══════════════════════════════════════════════════════
      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

// ─── IIT Demo Generation ─────────────────────────────────────

function generateIITDemo() {
  return new Promise((resolve, reject) => {
    try {
      // Reset module globals
      pageCount = 0;
      tocEntries = [];
      currentChapter = '';

      const cutoffData = loadCutoffData();
      const { placements } = loadPlacementData();

      // ── IIT Profiles ──
      const IIT_PROFILES = [
        {
          key: 'IIT Bombay', instIdx: 1, shortName: 'IIT BOMBAY', fullName: 'Indian Institute of Technology Bombay',
          colors: { primary: [0, 51, 160], accent: [41, 128, 255], gradDark: [0, 30, 100], gradDarker: [0, 12, 50] },
          closingRank2025: 66, avgPkg: 35, highPkg: '2.4 Cr', nirfRank: 3,
          location: 'Powai, Mumbai', established: 1958, campusArea: '550 acres',
        },
        {
          key: 'IIT Madras', instIdx: 9, shortName: 'IIT MADRAS', fullName: 'Indian Institute of Technology Madras',
          colors: { primary: [139, 0, 0], accent: [220, 50, 50], gradDark: [80, 0, 0], gradDarker: [35, 0, 0] },
          closingRank2025: 171, avgPkg: 30, highPkg: '1.8 Cr', nirfRank: 1,
          location: 'Chennai, Tamil Nadu', established: 1959, campusArea: '620 acres',
        },
        {
          key: 'IIT Kharagpur', instIdx: 5, shortName: 'IIT KHARAGPUR', fullName: 'Indian Institute of Technology Kharagpur',
          colors: { primary: [160, 82, 0], accent: [230, 140, 30], gradDark: [100, 50, 0], gradDarker: [45, 20, 0] },
          closingRank2025: 466, avgPkg: 28, highPkg: '1.5 Cr', nirfRank: 5,
          location: 'Kharagpur, West Bengal', established: 1951, campusArea: '2,100 acres',
        },
      ];

      // ── Extract cutoff data for each IIT ──
      const progIdx = 4; // CSE 4yr BTech
      const quotaIdx = 0; // AI
      const years = cutoffData.meta.years; // [2023, 2024, 2025]

      function getCutoffs(instIdx) {
        const result = {};
        years.forEach(year => {
          result[year] = [];
          const roundKeys = Object.keys(cutoffData.data).filter(k => k.startsWith(`${year}-`));
          roundKeys.forEach(rk => {
            const entries = cutoffData.data[rk];
            const match = entries.find(e => e[0] === instIdx && e[1] === progIdx && e[2] === quotaIdx && e[3] === 'OPEN' && e[4] === 0);
            if (match) {
              const roundNum = parseInt(rk.split('-')[1]);
              result[year].push({ round: roundNum, open: match[5], close: match[6] });
            }
          });
        });
        return result;
      }

      // ── Create PDF ──
      const doc = new PDFDocument({ size: 'A4', autoFirstPage: false, bufferPages: true,
        info: { Title: 'IIT Computer Science — The Definitive Guide 2025-26', Author: 'cutoffs.ai', Subject: 'IIT CSE Analysis', Creator: 'cutoffs.ai' }
      });
      const chunks = [];
      doc.on('data', c => chunks.push(c));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // ════════════════════════════════════════════════════════════
      // COVER PAGE
      // ════════════════════════════════════════════════════════════
      doc.addPage({ size: 'A4', margin: 0 });
      pageCount = 1;

      // Dark gradient background (purple to black)
      for (let i = 0; i < PAGE_H; i += 2) {
        const t = i / PAGE_H;
        const r = Math.max(10, 55 - t * 45);
        const g = Math.max(5, 0);
        const b = Math.max(15, 100 - t * 85);
        doc.rect(0, i, PAGE_W, 2).fill([r, g, b]);
      }

      // Subtle geometric accents
      doc.save();
      doc.strokeColor([212, 175, 55]).lineWidth(0.4).opacity(0.15);
      for (let i = 0; i < 8; i++) {
        doc.moveTo(PAGE_W - 150 + i * 15, 40).lineTo(PAGE_W - 80 + i * 15, 150).stroke();
      }
      for (let i = 0; i < 8; i++) {
        doc.moveTo(30 + i * 15, PAGE_H - 180).lineTo(100 + i * 15, PAGE_H - 80).stroke();
      }
      doc.restore();

      // Gold accent lines
      doc.rect(PAGE_W * 0.15, 100, PAGE_W * 0.7, 1.5).fill([212, 175, 55]);
      doc.rect(PAGE_W * 0.15, 680, PAGE_W * 0.7, 1.5).fill([212, 175, 55]);

      // Small top text
      doc.font('Helvetica').fontSize(11).fillColor([180, 180, 200]);
      doc.text('THE DEFINITIVE GUIDE TO', 0, 130, { width: PAGE_W, align: 'center' });

      // HUGE title
      doc.font('Helvetica-Bold').fontSize(44).fillColor([212, 175, 55]);
      doc.text('IIT COMPUTER', 0, 165, { width: PAGE_W, align: 'center' });
      doc.text('SCIENCE', 0, 220, { width: PAGE_W, align: 'center' });

      // Subtitle
      doc.font('Helvetica-Bold').fontSize(16).fillColor(COLORS.white);
      doc.text('The Definitive Guide', 0, 290, { width: PAGE_W, align: 'center' });

      // Edition
      doc.font('Helvetica-Bold').fontSize(14).fillColor([212, 175, 55]);
      doc.text('2025-26 EDITION', 0, 325, { width: PAGE_W, align: 'center' });

      // Divider
      doc.rect(PAGE_W * 0.35, 360, PAGE_W * 0.3, 1).fill([139, 92, 246]);

      // Featuring
      doc.font('Helvetica').fontSize(11).fillColor([180, 180, 200]);
      doc.text('Featuring', 0, 385, { width: PAGE_W, align: 'center' });

      doc.font('Helvetica-Bold').fontSize(14).fillColor(COLORS.white);
      doc.text('IIT Bombay  |  IIT Madras  |  IIT Kharagpur', 0, 410, { width: PAGE_W, align: 'center' });

      // What's inside
      doc.font('Helvetica-Bold').fontSize(10).fillColor([200, 200, 220]);
      doc.text("WHAT'S INSIDE", 0, 470, { width: PAGE_W, align: 'center' });

      const coverFeatures = [
        'Deep profiles of India\'s top 3 IITs for Computer Science',
        'Real JEE Advanced cutoff trends with round-by-round data',
        'Placement analytics — packages, sectors, top recruiters',
        'Campus life, pros & cons, ROI analysis',
        'Head-to-head comparison of the Big Three',
      ];
      doc.font('Helvetica').fontSize(9.5).fillColor([170, 170, 190]);
      coverFeatures.forEach((f, i) => {
        doc.text(f, 100, 498 + i * 17, { width: PAGE_W - 200, align: 'center' });
      });

      // Branding
      doc.font('Helvetica-Bold').fontSize(20).fillColor(COLORS.white);
      doc.text('cutoffs.ai', 0, 620, { width: PAGE_W, align: 'center' });
      doc.font('Helvetica').fontSize(9).fillColor([140, 140, 160]);
      doc.text('AI-Powered JEE Counselling Platform', 0, 648, { width: PAGE_W, align: 'center' });

      // Disclaimer
      doc.font('Helvetica').fontSize(6.5).fillColor([90, 90, 110]);
      doc.text(
        'Data sourced from JoSAA, NIRF reports, official college websites, and student surveys. All figures are approximate.',
        60, 750, { width: PAGE_W - 120, align: 'center' }
      );
      doc.text(`Generated on ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, 0, 770, { width: PAGE_W, align: 'center' });

      // ════════════════════════════════════════════════════════════
      // TABLE OF CONTENTS (placeholder — we'll fill page numbers)
      // ════════════════════════════════════════════════════════════
      const tocPageNum = pageCount + 1;
      addPage(doc, true);
      let y = CONTENT_START;
      doc.font('Helvetica-Bold').fontSize(24).fillColor(COLORS.primary);
      doc.text('Table of Contents', MARGIN.left, y);
      y += 40;
      doc.rect(MARGIN.left, y, CONTENT_W, 1.5).fill([212, 175, 55]);
      y += 20;

      // We build TOC entries as we go, then render them here via buffered pages
      // For simplicity, we write a static TOC with calculated page offsets
      const tocItems = [];
      // Page 2 = TOC itself. Pages start at 3 for IIT profiles.
      // Each IIT = 7 pages. Then comparison = 3 pages. Closing = 1 page.
      let pageOffset = 3;
      IIT_PROFILES.forEach((p, idx) => {
        tocItems.push({ title: `${p.shortName}`, page: pageOffset, bold: true, part: idx === 0 ? 'PART I — IIT PROFILES' : null });
        tocItems.push({ title: 'College Cover', page: pageOffset });
        tocItems.push({ title: 'At a Glance Dashboard', page: pageOffset + 1 });
        tocItems.push({ title: 'Cutoff Analysis', page: pageOffset + 2 });
        tocItems.push({ title: 'Placement Deep Dive', page: pageOffset + 3 });
        tocItems.push({ title: 'Company Tiers & Branch Comparison', page: pageOffset + 4 });
        tocItems.push({ title: 'Campus & Student Life', page: pageOffset + 5 });
        tocItems.push({ title: 'Pros, Cons & ROI', page: pageOffset + 6 });
        pageOffset += 7;
      });
      tocItems.push({ title: 'THE BIG THREE SHOWDOWN', page: pageOffset, bold: true, part: 'PART II — COMPARISON' });
      tocItems.push({ title: 'Comparison Table', page: pageOffset + 1 });
      tocItems.push({ title: 'Verdict & Analysis', page: pageOffset + 2 });
      tocItems.push({ title: 'Closing & Disclaimer', page: pageOffset + 3, part: 'CLOSING' });

      let currentPart = '';
      tocItems.forEach(item => {
        if (item.part && item.part !== currentPart) {
          currentPart = item.part;
          y += 6;
          doc.font('Helvetica-Bold').fontSize(10).fillColor(COLORS.primary);
          doc.text(item.part, MARGIN.left, y);
          y += 16;
        }
        const isBold = item.bold;
        const indent = isBold ? 0 : 15;
        doc.font(isBold ? 'Helvetica-Bold' : 'Helvetica').fontSize(isBold ? 10 : 9).fillColor(isBold ? COLORS.darkGray : COLORS.mediumGray);
        const titleW = CONTENT_W - 40 - indent;
        doc.text(item.title, MARGIN.left + indent, y, { width: titleW, lineBreak: false });
        doc.text(item.page.toString(), MARGIN.left + indent + titleW, y, { width: 40, align: 'right' });
        // Dots
        const tw = doc.widthOfString(item.title);
        const ds = MARGIN.left + indent + Math.min(tw, titleW) + 5;
        const de = MARGIN.left + CONTENT_W - 40;
        if (de > ds + 10) {
          doc.fontSize(8).fillColor(COLORS.lightGray);
          doc.text('.'.repeat(Math.floor((de - ds) / 3)), ds, y + 1, { width: de - ds, lineBreak: false });
        }
        y += isBold ? 18 : 14;
      });

      // ════════════════════════════════════════════════════════════
      // IIT PROFILE PAGES (7 pages each)
      // ════════════════════════════════════════════════════════════

      IIT_PROFILES.forEach((profile) => {
        const pd = placements[profile.key] || {};
        const cutoffs = getCutoffs(profile.instIdx);
        const clr = profile.colors;

        // ──────────────────────────────────────────────
        // PAGE 1: College Cover Spread
        // ──────────────────────────────────────────────
        doc.addPage({ size: 'A4', margin: 0 });
        pageCount++;
        currentChapter = profile.shortName;

        // Full-page gradient
        for (let i = 0; i < PAGE_H; i += 2) {
          const t = i / PAGE_H;
          const r = clr.gradDark[0] + (clr.gradDarker[0] - clr.gradDark[0]) * t;
          const g = clr.gradDark[1] + (clr.gradDarker[1] - clr.gradDark[1]) * t;
          const b = clr.gradDark[2] + (clr.gradDarker[2] - clr.gradDark[2]) * t;
          doc.rect(0, i, PAGE_W, 2).fill([Math.max(0, r), Math.max(0, g), Math.max(0, b)]);
        }

        // Gold accent lines top & bottom
        doc.rect(40, 50, PAGE_W - 80, 1.5).fill([212, 175, 55]);
        doc.rect(40, PAGE_H - 50, PAGE_W - 80, 1.5).fill([212, 175, 55]);

        // Small text at top
        doc.font('Helvetica').fontSize(10).fillColor([212, 175, 55]);
        doc.text('INDIAN INSTITUTE OF TECHNOLOGY', 0, 80, { width: PAGE_W, align: 'center' });

        // HUGE college name
        doc.font('Helvetica-Bold').fontSize(52).fillColor(COLORS.white);
        doc.text(profile.shortName, 0, 140, { width: PAGE_W, align: 'center' });

        // Program name
        doc.font('Helvetica').fontSize(16).fillColor([220, 220, 235]);
        doc.text('Computer Science & Engineering', 0, 220, { width: PAGE_W, align: 'center' });

        // Gold divider
        doc.rect(PAGE_W * 0.3, 260, PAGE_W * 0.4, 2).fill([212, 175, 55]);

        // "4-Year B.Tech" badge
        doc.font('Helvetica-Bold').fontSize(11).fillColor(clr.accent);
        doc.text('4-Year B.Tech  |  JEE Advanced', 0, 280, { width: PAGE_W, align: 'center' });

        // Hero stat boxes — 4 boxes at the bottom
        const boxW = 110;
        const boxH = 80;
        const boxGap = 15;
        const totalBoxW = boxW * 4 + boxGap * 3;
        const boxStartX = (PAGE_W - totalBoxW) / 2;
        const boxY = 380;

        const heroStats = [
          { label: 'JEE Advanced\nClosing Rank (2025)', value: profile.closingRank2025.toLocaleString() },
          { label: 'Average\nPackage', value: `₹${profile.avgPkg} LPA` },
          { label: 'Highest\nPackage', value: `₹${profile.highPkg}` },
          { label: 'NIRF\nRank 2024', value: `#${profile.nirfRank}` },
        ];

        heroStats.forEach((stat, i) => {
          const bx = boxStartX + i * (boxW + boxGap);
          // Semi-transparent box
          doc.save();
          doc.opacity(0.15);
          doc.roundedRect(bx, boxY, boxW, boxH, 6).fill(COLORS.white);
          doc.restore();
          doc.roundedRect(bx, boxY, boxW, boxH, 6).strokeColor([212, 175, 55]).lineWidth(0.5).stroke();

          // Value
          doc.font('Helvetica-Bold').fontSize(18).fillColor(COLORS.white);
          doc.text(stat.value, bx, boxY + 14, { width: boxW, align: 'center' });
          // Label
          doc.font('Helvetica').fontSize(7).fillColor([200, 200, 215]);
          doc.text(stat.label, bx + 5, boxY + 42, { width: boxW - 10, align: 'center' });
        });

        // Bottom info
        doc.font('Helvetica').fontSize(9).fillColor([180, 180, 200]);
        doc.text(`${profile.location}  |  Est. ${profile.established}  |  Campus: ${profile.campusArea}`, 0, 520, { width: PAGE_W, align: 'center' });

        // Page number footer
        doc.font('Helvetica').fontSize(7).fillColor([120, 120, 140]);
        doc.text(`Page ${pageCount}`, 0, PAGE_H - 30, { width: PAGE_W, align: 'center' });

        // ──────────────────────────────────────────────
        // PAGE 2: At a Glance Dashboard
        // ──────────────────────────────────────────────
        y = addPage(doc);

        // Section title with colored bar
        doc.rect(MARGIN.left, y, 4, 22).fill(clr.primary);
        doc.font('Helvetica-Bold').fontSize(16).fillColor(clr.primary);
        doc.text('AT A GLANCE', MARGIN.left + 12, y + 2);
        doc.rect(MARGIN.left, y + 26, CONTENT_W, 1).fill(clr.accent);
        y += 40;

        // 2x4 grid of metric boxes
        const metricBoxW = 120;
        const metricBoxH = 55;
        const metricGap = 5;
        const gridStartX = MARGIN.left;

        const glanceMetrics = [
          // Row 1
          { label: 'NIRF Rank', value: `#${pd.nirfRank || profile.nirfRank}` },
          { label: 'Established', value: `${pd.established || profile.established}` },
          { label: 'Campus Area', value: `${pd.campusArea || profile.campusArea}` },
          { label: 'Total Students', value: `${(pd.totalStudents || 11000).toLocaleString()}` },
          // Row 2
          { label: 'Highest CTC', value: `₹${pd.highest || 240} LPA` },
          { label: 'Average CTC', value: `₹${pd.average || profile.avgPkg} LPA` },
          { label: 'Median CTC', value: `₹${pd.median || 22} LPA` },
          { label: 'Placement %', value: `${pd.placementPct || 100}%` },
        ];

        glanceMetrics.forEach((m, i) => {
          const col = i % 4;
          const row = Math.floor(i / 4);
          const mx = gridStartX + col * (metricBoxW + metricGap);
          const my = y + row * (metricBoxH + metricGap);

          // Light gray background
          doc.roundedRect(mx, my, metricBoxW, metricBoxH, 4).fill(COLORS.veryLightGray);
          // Colored top border
          doc.rect(mx, my, metricBoxW, 3).fill(clr.primary);

          // Value
          doc.font('Helvetica-Bold').fontSize(14).fillColor(COLORS.darkGray);
          doc.text(m.value, mx + 5, my + 14, { width: metricBoxW - 10, align: 'center' });
          // Label
          doc.font('Helvetica').fontSize(7).fillColor(COLORS.mediumGray);
          doc.text(m.label, mx + 5, my + 35, { width: metricBoxW - 10, align: 'center' });
        });

        y += 2 * (metricBoxH + metricGap) + 15;

        // About paragraph
        doc.rect(MARGIN.left, y, 4, 16).fill(clr.accent);
        doc.font('Helvetica-Bold').fontSize(11).fillColor(clr.primary);
        doc.text('ABOUT', MARGIN.left + 12, y + 1);
        y += 24;

        const aboutTexts = {
          'IIT Bombay': 'IIT Bombay, established in 1958 in Powai, Mumbai, is consistently ranked among the top 3 engineering institutes in India. Its CSE department is renowned for producing world-class engineers who lead at Google, Microsoft, and top Wall Street firms. The 550-acre lakeside campus offers unmatched placement opportunities with access to Mumbai\'s corporate ecosystem.',
          'IIT Madras': 'IIT Madras, established in 1959, holds the #1 NIRF ranking among engineering colleges in India. Located on a stunning 620-acre campus inside Guindy National Park, Chennai, it is known for its exceptional research culture and India\'s first university-based Research Park. The CSE department is a powerhouse for AI/ML research and produces top talent for global tech companies.',
          'IIT Kharagpur': 'IIT Kharagpur, the first IIT established in 1951, boasts the largest campus of any IIT at 2,100 acres — a self-sufficient mini-city. Known for producing Sundar Pichai (Google CEO) and other industry leaders, its CSE program combines strong fundamentals with diverse exposure across 60+ departments. The institute\'s heritage and hall culture are unmatched.',
        };
        doc.font('Helvetica').fontSize(9).fillColor(COLORS.darkGray);
        doc.text(aboutTexts[profile.key], MARGIN.left, y, { width: CONTENT_W, lineGap: 2 });
        y += 65;

        // Quick highlights row
        y = checkPageBreak(doc, y, 80);
        doc.rect(MARGIN.left, y, 4, 16).fill(clr.accent);
        doc.font('Helvetica-Bold').fontSize(11).fillColor(clr.primary);
        doc.text('QUICK HIGHLIGHTS', MARGIN.left + 12, y + 1);
        y += 24;

        const highlights = (pd.pros || []).slice(0, 4);
        highlights.forEach(h => {
          doc.font('Helvetica').fontSize(8).fillColor(COLORS.accentGreen);
          doc.text('●', MARGIN.left + 5, y);
          doc.font('Helvetica').fontSize(8).fillColor(COLORS.darkGray);
          doc.text(h, MARGIN.left + 18, y, { width: CONTENT_W - 20 });
          y += 14;
        });

        // ──────────────────────────────────────────────
        // PAGE 3: Cutoff Analysis
        // ──────────────────────────────────────────────
        y = addPage(doc);

        // Section title
        doc.rect(MARGIN.left, y, 4, 22).fill(clr.primary);
        doc.font('Helvetica-Bold').fontSize(16).fillColor(clr.primary);
        doc.text('CUTOFF ANALYSIS', MARGIN.left + 12, y + 2);
        doc.rect(MARGIN.left, y + 26, CONTENT_W, 1).fill(clr.accent);
        y += 40;

        // 3-year trend line chart
        const openRanks = years.map(yr => {
          const rounds = cutoffs[yr];
          if (!rounds || rounds.length === 0) return null;
          return rounds[rounds.length - 1].open;
        });
        const closeRanks = years.map(yr => {
          const rounds = cutoffs[yr];
          if (!rounds || rounds.length === 0) return null;
          return rounds[rounds.length - 1].close;
        });

        drawLineChart(doc, {
          title: `${profile.shortName} CSE — Opening & Closing Rank Trend`,
          labels: years.map(String),
          datasets: [
            { label: 'Opening Rank', data: openRanks, color: [59, 130, 246] },
            { label: 'Closing Rank', data: closeRanks, color: [239, 68, 68] },
          ],
          x: MARGIN.left, y, width: CONTENT_W, height: 160,
        });
        y += 195;

        // Round-by-round cutoff TABLE for all 3 years
        doc.font('Helvetica-Bold').fontSize(10).fillColor(clr.primary);
        doc.text('Round-by-Round Cutoff Data (OPEN, Gender-Neutral, All India)', MARGIN.left, y);
        y += 16;

        const cutoffRows = [];
        years.forEach(yr => {
          const rounds = cutoffs[yr] || [];
          rounds.forEach(r => {
            cutoffRows.push([yr, `Round ${r.round}`, r.open.toLocaleString(), r.close.toLocaleString()]);
          });
        });

        y = drawTable(doc, {
          headers: ['Year', 'Round', 'Opening Rank', 'Closing Rank'],
          rows: cutoffRows,
          x: MARGIN.left, y, width: CONTENT_W,
          colWidths: [CONTENT_W * 0.15, CONTENT_W * 0.25, CONTENT_W * 0.3, CONTENT_W * 0.3],
          headerColor: clr.primary,
        });
        y += 15;

        // Trend Analysis text box
        y = checkPageBreak(doc, y, 60);
        doc.roundedRect(MARGIN.left, y, CONTENT_W, 45, 4).fill([245, 248, 255]);
        doc.rect(MARGIN.left, y, 4, 45).fill(clr.accent);
        doc.font('Helvetica-Bold').fontSize(8).fillColor(clr.primary);
        doc.text('TREND ANALYSIS', MARGIN.left + 12, y + 6);
        const lastYearClose = closeRanks[closeRanks.length - 1];
        const prevYearClose = closeRanks.length > 1 ? closeRanks[closeRanks.length - 2] : null;
        let trendVerdict = `The closing rank for ${profile.shortName} CSE in 2025 is ${lastYearClose}.`;
        if (prevYearClose) {
          const diff = lastYearClose - prevYearClose;
          if (diff > 0) trendVerdict += ` This is ${diff} ranks higher (easier) than 2024, indicating slight relaxation in competition.`;
          else if (diff < 0) trendVerdict += ` This is ${Math.abs(diff)} ranks lower (tougher) than 2024, reflecting increased competition.`;
          else trendVerdict += ' The cutoff remained stable compared to 2024.';
        }
        doc.font('Helvetica').fontSize(8).fillColor(COLORS.darkGray);
        doc.text(trendVerdict, MARGIN.left + 12, y + 20, { width: CONTENT_W - 25 });

        // ──────────────────────────────────────────────
        // PAGE 4: Placement Deep Dive
        // ──────────────────────────────────────────────
        y = addPage(doc);

        // Section title
        doc.rect(MARGIN.left, y, 4, 22).fill(clr.primary);
        doc.font('Helvetica-Bold').fontSize(16).fillColor(clr.primary);
        doc.text('PLACEMENTS', MARGIN.left + 12, y + 2);
        doc.rect(MARGIN.left, y + 26, CONTENT_W, 1).fill(clr.accent);
        y += 40;

        // 4 stat boxes in a row
        const placementStats = [
          { label: 'Highest CTC', value: `₹${pd.highest || 0} LPA`, color: [212, 175, 55] },
          { label: 'Average CTC', value: `₹${pd.average || 0} LPA`, color: COLORS.accentGreen },
          { label: 'Median CTC', value: `₹${pd.median || 0} LPA`, color: COLORS.accentBlue },
          { label: 'Placement %', value: `${pd.placementPct || 0}%`, color: clr.primary },
        ];

        const pStatW = (CONTENT_W - 30) / 4;
        placementStats.forEach((s, i) => {
          const sx = MARGIN.left + i * (pStatW + 10);
          doc.roundedRect(sx, y, pStatW, 50, 4).fill(COLORS.veryLightGray);
          doc.rect(sx, y, pStatW, 3).fill(s.color);
          doc.font('Helvetica-Bold').fontSize(14).fillColor(COLORS.darkGray);
          doc.text(s.value, sx, y + 12, { width: pStatW, align: 'center' });
          doc.font('Helvetica').fontSize(7).fillColor(COLORS.mediumGray);
          doc.text(s.label, sx, y + 34, { width: pStatW, align: 'center' });
        });
        y += 65;

        // Sector breakdown PIE CHART
        const sectorData = pd.sectorBreakdown || {};
        const sectorLabels = {
          itProduct: 'IT Product', itServices: 'IT Services', core: 'Core Engineering',
          finance: 'Finance', financeQuant: 'Finance & Quant', consulting: 'Consulting',
          startups: 'Startups', coreResearch: 'Core & Research',
        };
        const pieItems = Object.entries(sectorData).map(([k, v]) => ({
          label: sectorLabels[k] || k, value: v,
        }));

        if (pieItems.length > 0) {
          doc.font('Helvetica-Bold').fontSize(10).fillColor(clr.primary);
          doc.text('Sector-wise Placement Breakdown', MARGIN.left, y);
          y += 16;

          drawPieChart(doc, {
            title: '',
            items: pieItems,
            x: MARGIN.left + 100,
            y: y + 65,
            radius: 55,
          });
          y += 155;
        }

        // Top Recruiting Companies TABLE
        y = checkPageBreak(doc, y, 280);
        doc.font('Helvetica-Bold').fontSize(10).fillColor(clr.primary);
        doc.text('Top Recruiting Companies', MARGIN.left, y);
        y += 16;

        const topCompanies = pd.topCompanies || [];
        const roleMap = {
          'Google': 'SDE, ML Engineer, Research', 'Microsoft': 'SDE, PM, Research',
          'Apple': 'SDE, Hardware, ML', 'Amazon': 'SDE, BA, Data Engineer',
          'Goldman Sachs': 'Quant, SDE, Analyst', 'Tower Research': 'Quant Trader, SDE',
          'Jane Street': 'Quant Trader, SDE', 'Uber': 'SDE, Data Scientist',
          'Meta': 'SDE, ML Engineer', 'Flipkart': 'SDE, Product Manager',
          'DE Shaw': 'Quant, SDE, Analyst', 'Graviton': 'Quant, SDE',
          'WorldQuant': 'Quant Researcher', 'Rubrik': 'SDE, Cloud Engineer',
          'Atlassian': 'SDE, Product Manager', 'Sprinklr': 'SDE, ML Engineer',
          'Samsung': 'SDE, R&D, VLSI', 'Morgan Stanley': 'Quant, SDE, Analyst',
          'Qualcomm': 'SoC Design, VLSI, SDE', 'Adobe': 'SDE, Research, ML',
          'Oracle': 'SDE, Cloud, DB', 'PayPal': 'SDE, Risk Analyst',
          'Cisco': 'SDE, Network Engineer', 'Intel': 'VLSI, SDE, Firmware',
          'JP Morgan': 'Quant, SDE, Analyst', 'Schlumberger': 'Engineer, Data',
        };
        const ctcMap = {
          'Google': '₹30-55 LPA', 'Microsoft': '₹22-48 LPA', 'Apple': '₹25-50 LPA',
          'Amazon': '₹18-44 LPA', 'Goldman Sachs': '₹25-45 LPA', 'Tower Research': '₹50-240 LPA',
          'Jane Street': '₹60-200 LPA', 'Uber': '₹30-55 LPA', 'Meta': '₹30-50 LPA',
          'Flipkart': '₹18-38 LPA', 'DE Shaw': '₹35-60 LPA', 'Graviton': '₹50-100 LPA',
          'WorldQuant': '₹40-80 LPA', 'Rubrik': '₹25-40 LPA', 'Atlassian': '₹25-45 LPA',
          'Sprinklr': '₹20-35 LPA', 'Samsung': '₹14-32 LPA', 'Morgan Stanley': '₹25-45 LPA',
          'Qualcomm': '₹18-35 LPA', 'Adobe': '₹20-42 LPA', 'Oracle': '₹14-28 LPA',
          'PayPal': '₹18-30 LPA', 'Cisco': '₹14-28 LPA', 'Intel': '₹14-30 LPA',
          'JP Morgan': '₹20-40 LPA', 'Schlumberger': '₹14-25 LPA',
        };

        const companyRows = topCompanies.slice(0, 15).map(c => [
          c, ctcMap[c] || '₹12-30 LPA', roleMap[c] || 'SDE, Engineer',
        ]);

        y = drawTable(doc, {
          headers: ['Company', 'CTC Range', 'Roles'],
          rows: companyRows,
          x: MARGIN.left, y, width: CONTENT_W,
          colWidths: [CONTENT_W * 0.3, CONTENT_W * 0.3, CONTENT_W * 0.4],
          headerColor: clr.primary,
        });

        // ──────────────────────────────────────────────
        // PAGE 5: Company Tiers & Branch Comparison
        // ──────────────────────────────────────────────
        y = addPage(doc);

        // Section title
        doc.rect(MARGIN.left, y, 4, 22).fill(clr.primary);
        doc.font('Helvetica-Bold').fontSize(16).fillColor(clr.primary);
        doc.text('RECRUITER TIERS', MARGIN.left + 12, y + 2);
        doc.rect(MARGIN.left, y + 26, CONTENT_W, 1).fill(clr.accent);
        y += 40;

        // 3 tier boxes
        const tiers = pd.companyTiers || {};
        const tierConfig = [
          { key: 'superDream', label: 'SUPER DREAM', color: [16, 185, 129], bg: [240, 255, 245] },
          { key: 'dream', label: 'DREAM', color: [59, 130, 246], bg: [240, 248, 255] },
          { key: 'regular', label: 'REGULAR', color: [120, 120, 130], bg: [248, 248, 250] },
        ];

        tierConfig.forEach(tc => {
          const tierData = tiers[tc.key];
          if (!tierData) return;
          y = checkPageBreak(doc, y, 75);

          // Box
          doc.roundedRect(MARGIN.left, y, CONTENT_W, 65, 4).fill(tc.bg);
          doc.rect(MARGIN.left, y, CONTENT_W, 3).fill(tc.color);

          // Label and count
          doc.font('Helvetica-Bold').fontSize(10).fillColor(tc.color);
          doc.text(tc.label, MARGIN.left + 10, y + 10);
          doc.font('Helvetica').fontSize(8).fillColor(COLORS.darkGray);
          doc.text(`${tierData.count} companies  |  CTC: ${tierData.ctcRange}`, MARGIN.left + 10, y + 24);

          // Company names
          doc.font('Helvetica').fontSize(7.5).fillColor(COLORS.mediumGray);
          doc.text((tierData.companies || []).join(', '), MARGIN.left + 10, y + 40, { width: CONTENT_W - 20 });

          y += 72;
        });

        y += 10;

        // Branch-wise placements bar chart
        y = checkPageBreak(doc, y, 200);
        doc.rect(MARGIN.left, y, 4, 18).fill(clr.accent);
        doc.font('Helvetica-Bold').fontSize(13).fillColor(clr.primary);
        doc.text('BRANCH-WISE PLACEMENTS', MARGIN.left + 12, y + 1);
        y += 28;

        const branchData = pd.branchPlacements || {};
        const branchItems = Object.entries(branchData).map(([branch, data]) => ({
          label: branch, value: data.avg || 0, color: clr.primary,
        }));

        if (branchItems.length > 0) {
          drawBarChart(doc, {
            title: 'Average CTC by Branch (LPA)',
            items: branchItems,
            x: MARGIN.left, y, width: CONTENT_W, height: 160,
          });
          y += 20 + branchItems.length * 17;
        }

        // Branch table below
        y = checkPageBreak(doc, y, 120);
        const branchRows = Object.entries(branchData).map(([b, d]) => [
          b, `₹${d.avg} LPA`, `₹${d.median} LPA`, `${d.pct}%`,
        ]);
        y = drawTable(doc, {
          headers: ['Branch', 'Average CTC', 'Median CTC', 'Placed %'],
          rows: branchRows,
          x: MARGIN.left, y, width: CONTENT_W,
          colWidths: [CONTENT_W * 0.3, CONTENT_W * 0.25, CONTENT_W * 0.25, CONTENT_W * 0.2],
          headerColor: clr.primary,
        });

        // ──────────────────────────────────────────────
        // PAGE 6: Campus & Student Life
        // ──────────────────────────────────────────────
        y = addPage(doc);

        doc.rect(MARGIN.left, y, 4, 22).fill(clr.primary);
        doc.font('Helvetica-Bold').fontSize(16).fillColor(clr.primary);
        doc.text('CAMPUS & STUDENT LIFE', MARGIN.left + 12, y + 2);
        doc.rect(MARGIN.left, y + 26, CONTENT_W, 1).fill(clr.accent);
        y += 40;

        const campus = pd.campus || {};
        const campusItems = [
          { label: 'Campus Area', value: pd.campusArea || profile.campusArea, rating: 5 },
          { label: 'Location', value: campus.city || profile.location, rating: null },
          { label: 'Climate', value: campus.climate || 'Tropical', rating: 3 },
          { label: 'Hostel', value: campus.hostel || 'Good', rating: 4 },
          { label: 'Food & Mess', value: campus.food || 'Multiple messes', rating: 4 },
          { label: 'City Life', value: campus.city || '', rating: profile.key === 'IIT Bombay' ? 5 : (profile.key === 'IIT Madras' ? 4 : 2) },
        ];

        campusItems.forEach(item => {
          y = checkPageBreak(doc, y, 28);
          doc.font('Helvetica-Bold').fontSize(8.5).fillColor(clr.primary);
          doc.text(item.label, MARGIN.left, y);

          // Rating dots
          if (item.rating !== null) {
            const dotsX = MARGIN.left + 90;
            for (let d = 0; d < 5; d++) {
              const dotColor = d < item.rating ? clr.accent : [220, 220, 225];
              doc.circle(dotsX + d * 10, y + 4, 3).fill(dotColor);
            }
          }

          doc.font('Helvetica').fontSize(8).fillColor(COLORS.darkGray);
          doc.text(item.value, MARGIN.left + 150, y, { width: CONTENT_W - 155 });
          y += 20;
        });

        y += 10;

        // Technical & Cultural Fests
        y = checkPageBreak(doc, y, 60);
        doc.rect(MARGIN.left, y, 4, 14).fill(clr.accent);
        doc.font('Helvetica-Bold').fontSize(10).fillColor(clr.primary);
        doc.text('FESTS & CLUBS', MARGIN.left + 12, y);
        y += 20;
        doc.font('Helvetica').fontSize(8).fillColor(COLORS.darkGray);
        doc.text(pd.clubs || '', MARGIN.left, y, { width: CONTENT_W, lineGap: 2 });
        y += 30;

        // Sports
        y = checkPageBreak(doc, y, 50);
        doc.rect(MARGIN.left, y, 4, 14).fill(clr.accent);
        doc.font('Helvetica-Bold').fontSize(10).fillColor(clr.primary);
        doc.text('SPORTS FACILITIES', MARGIN.left + 12, y);
        y += 20;
        doc.font('Helvetica').fontSize(8).fillColor(COLORS.darkGray);
        doc.text(pd.sports || 'Excellent sports infrastructure with multiple facilities.', MARGIN.left, y, { width: CONTENT_W, lineGap: 2 });
        y += 30;

        // Nearby places
        y = checkPageBreak(doc, y, 60);
        doc.rect(MARGIN.left, y, 4, 14).fill(clr.accent);
        doc.font('Helvetica-Bold').fontSize(10).fillColor(clr.primary);
        doc.text('NEARBY PLACES', MARGIN.left + 12, y);
        y += 20;
        const nearbyPlaces = pd.location?.nearbyPlaces || [];
        if (nearbyPlaces.length > 0) {
          nearbyPlaces.forEach(place => {
            doc.font('Helvetica').fontSize(8).fillColor(COLORS.mediumGray);
            doc.text('●', MARGIN.left + 5, y);
            doc.font('Helvetica').fontSize(8).fillColor(COLORS.darkGray);
            doc.text(place, MARGIN.left + 18, y);
            y += 13;
          });
        }

        // ──────────────────────────────────────────────
        // PAGE 7: Pros, Cons & ROI
        // ──────────────────────────────────────────────
        y = addPage(doc);

        doc.rect(MARGIN.left, y, 4, 22).fill(clr.primary);
        doc.font('Helvetica-Bold').fontSize(16).fillColor(clr.primary);
        doc.text('PROS, CONS & ROI', MARGIN.left + 12, y + 2);
        doc.rect(MARGIN.left, y + 26, CONTENT_W, 1).fill(clr.accent);
        y += 40;

        // Two-column layout: Pros (left) and Cons (right)
        const colW = (CONTENT_W - 20) / 2;
        const prosX = MARGIN.left;
        const consX = MARGIN.left + colW + 20;

        // Pros header
        doc.font('Helvetica-Bold').fontSize(10).fillColor(COLORS.accentGreen);
        doc.text('PROS', prosX, y);
        // Cons header
        doc.font('Helvetica-Bold').fontSize(10).fillColor(COLORS.accentRed);
        doc.text('CONS', consX, y);
        y += 16;

        const pros = pd.pros || [];
        const cons = pd.cons || [];
        const maxRows = Math.max(pros.length, cons.length);
        let proConsY = y;

        for (let i = 0; i < maxRows; i++) {
          if (i < pros.length) {
            doc.font('Helvetica').fontSize(7.5).fillColor(COLORS.accentGreen);
            doc.text('+', prosX, proConsY);
            doc.font('Helvetica').fontSize(7.5).fillColor(COLORS.darkGray);
            doc.text(pros[i], prosX + 10, proConsY, { width: colW - 15, lineGap: 1 });
          }
          if (i < cons.length) {
            doc.font('Helvetica').fontSize(7.5).fillColor(COLORS.accentRed);
            doc.text('-', consX, proConsY);
            doc.font('Helvetica').fontSize(7.5).fillColor(COLORS.darkGray);
            doc.text(cons[i], consX + 10, proConsY, { width: colW - 15, lineGap: 1 });
          }
          proConsY += 16;
        }
        y = proConsY + 10;

        // Alumni Network
        y = checkPageBreak(doc, y, 55);
        doc.roundedRect(MARGIN.left, y, CONTENT_W, 42, 4).fill([248, 248, 255]);
        doc.rect(MARGIN.left, y, 4, 42).fill(clr.accent);
        doc.font('Helvetica-Bold').fontSize(9).fillColor(clr.primary);
        doc.text('ALUMNI NETWORK', MARGIN.left + 12, y + 6);
        doc.font('Helvetica').fontSize(7.5).fillColor(COLORS.darkGray);
        doc.text(pd.alumni || '', MARGIN.left + 12, y + 20, { width: CONTENT_W - 25, lineGap: 1 });
        y += 50;

        // Research & Internships
        y = checkPageBreak(doc, y, 55);
        doc.roundedRect(MARGIN.left, y, CONTENT_W, 42, 4).fill([248, 255, 248]);
        doc.rect(MARGIN.left, y, 4, 42).fill(COLORS.accentGreen);
        doc.font('Helvetica-Bold').fontSize(9).fillColor(clr.primary);
        doc.text('RESEARCH & INTERNSHIPS', MARGIN.left + 12, y + 6);
        doc.font('Helvetica').fontSize(7.5).fillColor(COLORS.darkGray);
        doc.text((pd.research || '') + ' ' + (pd.internship || ''), MARGIN.left + 12, y + 20, { width: CONTENT_W - 25, lineGap: 1 });
        y += 50;

        // Fee Structure table
        y = checkPageBreak(doc, y, 140);
        doc.font('Helvetica-Bold').fontSize(10).fillColor(clr.primary);
        doc.text('FEE STRUCTURE', MARGIN.left, y);
        y += 16;

        const fb = pd.feeBreakdown || { tuition: '2L/year', hostel: '25K/year', mess: '35K/year', other: '25K/year', total4yr: '~10L' };
        const feeRows = [
          ['Tuition Fee', fb.tuition, `~₹${parseFloat(fb.tuition) * 4 || 8}L`],
          ['Hostel Fee', fb.hostel, `~₹${parseFloat(fb.hostel) * 4 || 1}L`],
          ['Mess Charges', fb.mess, `~₹${parseFloat(fb.mess) * 4 || 1.4}L`],
          ['Other Charges', fb.other, `~₹${parseFloat(fb.other) * 4 || 1}L`],
          ['TOTAL', '', fb.total4yr || '~10L'],
        ];

        y = drawTable(doc, {
          headers: ['Component', 'Per Year', '4-Year Total'],
          rows: feeRows,
          x: MARGIN.left, y, width: CONTENT_W * 0.7,
          colWidths: [CONTENT_W * 0.7 * 0.4, CONTENT_W * 0.7 * 0.3, CONTENT_W * 0.7 * 0.3],
          headerColor: clr.primary,
        });
        y += 15;

        // ROI box
        y = checkPageBreak(doc, y, 45);
        const totalFees = pd.fees || 10;
        const avgCTC = pd.average || profile.avgPkg;
        const roi = (avgCTC / totalFees).toFixed(1);

        doc.roundedRect(MARGIN.left, y, CONTENT_W, 38, 4).fill([255, 250, 235]);
        doc.rect(MARGIN.left, y, CONTENT_W, 3).fill([212, 175, 55]);
        doc.font('Helvetica-Bold').fontSize(10).fillColor([212, 175, 55]);
        doc.text('RETURN ON INVESTMENT', MARGIN.left + 12, y + 10);
        doc.font('Helvetica-Bold').fontSize(10).fillColor(COLORS.darkGray);
        doc.text(`ROI = Avg CTC (₹${avgCTC} LPA) / Total Fees (₹${totalFees}L) = ${roi}x`, MARGIN.left + 180, y + 10, { width: CONTENT_W - 190 });
        doc.font('Helvetica').fontSize(7).fillColor(COLORS.mediumGray);
        doc.text(`You earn back your entire college investment in the first year itself.`, MARGIN.left + 12, y + 26);

      }); // end IIT_PROFILES loop

      // ════════════════════════════════════════════════════════════
      // COMPARISON CHAPTER
      // ════════════════════════════════════════════════════════════

      // Part divider page
      doc.addPage({ size: 'A4', margin: 0 });
      pageCount++;
      currentChapter = 'Comparison';

      // Background
      doc.rect(0, 0, PAGE_W, PAGE_H).fill([245, 245, 255]);
      doc.rect(0, PAGE_H * 0.33, PAGE_W, PAGE_H * 0.34).fill([40, 10, 80]);

      // Accent lines
      doc.rect(60, PAGE_H * 0.33, PAGE_W - 120, 1.5).fill([212, 175, 55]);
      doc.rect(60, PAGE_H * 0.33 + PAGE_H * 0.34, PAGE_W - 120, 1.5).fill([212, 175, 55]);

      doc.font('Helvetica-Bold').fontSize(12).fillColor([139, 92, 246]);
      doc.text('PART II', 0, PAGE_H * 0.27, { width: PAGE_W, align: 'center' });

      doc.font('Helvetica-Bold').fontSize(32).fillColor(COLORS.white);
      doc.text('THE BIG THREE', 0, PAGE_H * 0.40, { width: PAGE_W, align: 'center' });
      doc.text('SHOWDOWN', 0, PAGE_H * 0.46, { width: PAGE_W, align: 'center' });

      doc.font('Helvetica').fontSize(12).fillColor([200, 200, 220]);
      doc.text('IIT Bombay vs IIT Madras vs IIT Kharagpur', 0, PAGE_H * 0.54, { width: PAGE_W, align: 'center' });

      doc.rect(PAGE_W * 0.4, PAGE_H * 0.60, PAGE_W * 0.2, 2).fill([212, 175, 55]);

      // Page number
      doc.font('Helvetica').fontSize(7).fillColor(COLORS.mediumGray);
      doc.text(`Page ${pageCount}`, 0, PAGE_H - 25, { width: PAGE_W, align: 'center' });

      // ── Comparison Table Page ──
      y = addPage(doc);

      doc.rect(MARGIN.left, y, 4, 22).fill(COLORS.primary);
      doc.font('Helvetica-Bold').fontSize(16).fillColor(COLORS.primary);
      doc.text('HEAD-TO-HEAD COMPARISON', MARGIN.left + 12, y + 2);
      doc.rect(MARGIN.left, y + 26, CONTENT_W, 1).fill([212, 175, 55]);
      y += 40;

      const p0 = placements['IIT Bombay'] || {};
      const p1 = placements['IIT Madras'] || {};
      const p2 = placements['IIT Kharagpur'] || {};

      const comparisonRows = [
        ['NIRF Rank', '#3', '#1', '#5'],
        ['Established', '1958', '1959', '1951'],
        ['Campus Area', '550 acres', '620 acres', '2,100 acres'],
        ['Closing Rank (2025)', '66', '171', '466'],
        ['Highest CTC', `₹${p0.highest} LPA`, `₹${p1.highest} LPA`, `₹${p2.highest} LPA`],
        ['Average CTC', `₹${p0.average} LPA`, `₹${p1.average} LPA`, `₹${p2.average} LPA`],
        ['Median CTC', `₹${p0.median} LPA`, `₹${p1.median} LPA`, `₹${p2.median} LPA`],
        ['Placement %', `${p0.placementPct}%`, `${p1.placementPct}%`, `${p2.placementPct}%`],
        ['Total Fees (4yr)', `₹${p0.fees}L`, `₹${p1.fees}L`, `₹${p2.fees}L`],
        ['ROI', `${(p0.average / p0.fees).toFixed(1)}x`, `${(p1.average / p1.fees).toFixed(1)}x`, `${(p2.average / p2.fees).toFixed(1)}x`],
        ['Location', 'Mumbai (Metro)', 'Chennai (Metro)', 'Kharagpur (Town)'],
        ['Best For', 'Finance + Tech', 'Research + Tech', 'Heritage + Core'],
      ];

      y = drawTable(doc, {
        headers: ['Metric', 'IIT Bombay', 'IIT Madras', 'IIT Kharagpur'],
        rows: comparisonRows,
        x: MARGIN.left, y, width: CONTENT_W,
        colWidths: [CONTENT_W * 0.22, CONTENT_W * 0.26, CONTENT_W * 0.26, CONTENT_W * 0.26],
        headerColor: [40, 10, 80],
      });
      y += 20;

      // Bar chart comparing avg CTC
      y = checkPageBreak(doc, y, 120);
      drawBarChart(doc, {
        title: 'Average CTC Comparison (LPA)',
        items: [
          { label: 'IIT Bombay', value: p0.average, color: [0, 51, 160] },
          { label: 'IIT Madras', value: p1.average, color: [139, 0, 0] },
          { label: 'IIT Kharagpur', value: p2.average, color: [160, 82, 0] },
        ],
        x: MARGIN.left, y, width: CONTENT_W, height: 80,
      });
      y += 90;

      // ── Verdict Page ──
      y = addPage(doc);

      doc.rect(MARGIN.left, y, 4, 22).fill(COLORS.primary);
      doc.font('Helvetica-Bold').fontSize(16).fillColor(COLORS.primary);
      doc.text('THE VERDICT', MARGIN.left + 12, y + 2);
      doc.rect(MARGIN.left, y + 26, CONTENT_W, 1).fill([212, 175, 55]);
      y += 45;

      // IIT Bombay verdict
      const verdicts = [
        {
          name: 'IIT BOMBAY', color: [0, 51, 160], bg: [235, 240, 255],
          text: 'IIT Bombay is the undisputed king for CSE placements with the highest packages in India (₹2.4 Cr). Located in Mumbai, it offers unmatched access to finance (quant firms) and tech giants. If you have a rank under 70, this should be your top choice. The Mumbai ecosystem, startup culture, and global alumni network make it the most versatile IIT for career options.',
        },
        {
          name: 'IIT MADRAS', color: [139, 0, 0], bg: [255, 240, 240],
          text: 'IIT Madras holds the #1 NIRF ranking and is India\'s best for research. Its Research Park is a game-changer for industry-academia collaboration. If you love AI/ML research or plan for higher studies, IITM edges out even Bombay. Packages are excellent (₹1.8 Cr highest), and Chennai\'s IT corridor provides strong internship pipelines. Best for research-oriented students.',
        },
        {
          name: 'IIT KHARAGPUR', color: [160, 82, 0], bg: [255, 248, 235],
          text: 'IIT Kharagpur is India\'s first IIT and has the largest campus (2,100 acres). It produced Sundar Pichai and has the strongest heritage. While packages are slightly lower than Bombay/Madras, the breadth of exposure across 60+ departments is unmatched. Kharagpur is a small town, so campus life is self-contained. Best for students who want a traditional college experience with strong placements.',
        },
      ];

      verdicts.forEach(v => {
        y = checkPageBreak(doc, y, 100);
        doc.roundedRect(MARGIN.left, y, CONTENT_W, 85, 5).fill(v.bg);
        doc.rect(MARGIN.left, y, 5, 85).fill(v.color);

        doc.font('Helvetica-Bold').fontSize(12).fillColor(v.color);
        doc.text(v.name, MARGIN.left + 15, y + 10);

        doc.font('Helvetica').fontSize(8).fillColor(COLORS.darkGray);
        doc.text(v.text, MARGIN.left + 15, y + 28, { width: CONTENT_W - 30, lineGap: 2 });

        y += 95;
      });

      // Summary recommendation
      y = checkPageBreak(doc, y, 80);
      y += 10;
      doc.roundedRect(MARGIN.left, y, CONTENT_W, 60, 5).fill([255, 250, 235]);
      doc.rect(MARGIN.left, y, CONTENT_W, 3).fill([212, 175, 55]);
      doc.font('Helvetica-Bold').fontSize(10).fillColor([212, 175, 55]);
      doc.text('BOTTOM LINE', MARGIN.left + 15, y + 12);
      doc.font('Helvetica').fontSize(8.5).fillColor(COLORS.darkGray);
      doc.text(
        'All three IITs offer world-class CSE education with 100% placement rates. IIT Bombay leads in packages and city life, IIT Madras leads in research and NIRF ranking, and IIT Kharagpur leads in campus size and heritage. Your choice should depend on your career goals, city preference, and rank. Any of these three will set you up for an exceptional career.',
        MARGIN.left + 15, y + 28, { width: CONTENT_W - 30, lineGap: 2 }
      );

      // ════════════════════════════════════════════════════════════
      // CLOSING PAGE
      // ════════════════════════════════════════════════════════════
      doc.addPage({ size: 'A4', margin: 0 });
      pageCount++;

      // Dark gradient
      for (let i = 0; i < PAGE_H; i += 2) {
        const t = i / PAGE_H;
        doc.rect(0, i, PAGE_W, 2).fill([Math.max(10, 40 - t * 30), Math.max(5, 5), Math.max(15, 70 - t * 55)]);
      }

      doc.rect(PAGE_W * 0.2, 200, PAGE_W * 0.6, 1.5).fill([212, 175, 55]);

      doc.font('Helvetica-Bold').fontSize(11).fillColor([200, 200, 220]);
      doc.text('THANK YOU FOR READING', 0, 240, { width: PAGE_W, align: 'center' });

      doc.font('Helvetica-Bold').fontSize(28).fillColor(COLORS.white);
      doc.text('cutoffs.ai', 0, 280, { width: PAGE_W, align: 'center' });

      doc.font('Helvetica').fontSize(11).fillColor([180, 180, 200]);
      doc.text('AI-Powered JEE Counselling Platform', 0, 320, { width: PAGE_W, align: 'center' });

      doc.rect(PAGE_W * 0.35, 355, PAGE_W * 0.3, 1).fill([139, 92, 246]);

      doc.font('Helvetica').fontSize(9).fillColor([160, 160, 180]);
      doc.text('Visit cutoffs.ai for personalized college recommendations,', 0, 385, { width: PAGE_W, align: 'center' });
      doc.text('cutoff analysis, and AI-powered counselling.', 0, 400, { width: PAGE_W, align: 'center' });

      doc.rect(PAGE_W * 0.2, 450, PAGE_W * 0.6, 1.5).fill([212, 175, 55]);

      // Disclaimer
      doc.font('Helvetica-Bold').fontSize(8).fillColor([160, 160, 180]);
      doc.text('DISCLAIMER', 0, 490, { width: PAGE_W, align: 'center' });
      doc.font('Helvetica').fontSize(7).fillColor([120, 120, 140]);
      doc.text(
        'This guide is generated using publicly available data from JoSAA, NIRF reports, official college websites, and anonymous student surveys. All figures including CTC packages, placement percentages, and fee structures are approximate and may vary year to year. This guide is for informational purposes only and should not be the sole basis for any admission or career decision. Always verify data from official sources. cutoffs.ai is not affiliated with JoSAA, IITs, or any government body.',
        60, 510, { width: PAGE_W - 120, align: 'center', lineGap: 2 }
      );

      doc.font('Helvetica').fontSize(7).fillColor([100, 100, 120]);
      doc.text(`Generated on ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, 0, 580, { width: PAGE_W, align: 'center' });

      // ═══════════════════════════════════════════════════════
      // Finalize
      // ═══════════════════════════════════════════════════════
      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

// ─── API Route ──────────────────────────────────────────────

export async function POST(request) {
  try {
    const body = await request.json();

    if (body.mode === 'iit-demo') {
      const pdfBuffer = await generateIITDemo();
      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="IIT_CSE_Guide_2025.pdf"',
          'Content-Length': pdfBuffer.length.toString(),
        },
      });
    }

    const rank = parseInt(body.rank);
    const category = body.category || 'General';

    if (!rank || rank < 1 || rank > 500000) {
      return NextResponse.json({ error: 'Invalid rank. Must be between 1 and 500000.' }, { status: 400 });
    }

    const pdfBuffer = await generateBook(rank, category);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="JoSAA_Guide_Rank_${rank}_${category}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF. ' + error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'JoSAA Book Generator API',
    usage: 'POST with { rank: number, category: "General"|"OBC-NCL"|"SC"|"ST"|"EWS" }',
  });
}
