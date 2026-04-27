// PDF Chart Drawing Helpers using PDFKit's vector graphics
import { COLORS, FONTS, SIZES } from './pdf-styles.js';

/**
 * Draw a line chart (e.g., cutoff trends over years/rounds)
 * @param {PDFDocument} doc
 * @param {Object} options - { title, labels, datasets: [{ label, data, color }], x, y, width, height }
 */
export function drawLineChart(doc, { title, labels, datasets, x, y, width, height }) {
  const chartX = x + 40;
  const chartY = y + (title ? 20 : 0);
  const chartW = width - 55;
  const chartH = height - (title ? 45 : 25);

  // Title
  if (title) {
    doc.font(FONTS.bodyBold).fontSize(9).fillColor(COLORS.darkGray);
    doc.text(title, x, y, { width, align: 'center' });
  }

  // Find min/max for Y axis
  const allValues = datasets.flatMap(d => d.data).filter(v => v != null);
  if (allValues.length === 0) return;
  let minVal = Math.min(...allValues);
  let maxVal = Math.max(...allValues);
  const padding = (maxVal - minVal) * 0.1 || 100;
  minVal = Math.max(0, minVal - padding);
  maxVal = maxVal + padding;

  // Draw axes
  doc.strokeColor(COLORS.lightGray).lineWidth(0.5);
  doc.moveTo(chartX, chartY).lineTo(chartX, chartY + chartH).stroke();
  doc.moveTo(chartX, chartY + chartH).lineTo(chartX + chartW, chartY + chartH).stroke();

  // Y-axis labels (5 ticks)
  doc.font(FONTS.body).fontSize(7).fillColor(COLORS.mediumGray);
  for (let i = 0; i <= 4; i++) {
    const val = minVal + (maxVal - minVal) * (1 - i / 4);
    const yPos = chartY + (chartH * i) / 4;

    doc.text(Math.round(val).toLocaleString(), x, yPos - 4, { width: 35, align: 'right' });

    // Grid line
    doc.strokeColor([230, 230, 235]).lineWidth(0.3);
    doc.moveTo(chartX + 1, yPos).lineTo(chartX + chartW, yPos).stroke();
  }

  // X-axis labels
  doc.font(FONTS.body).fontSize(7).fillColor(COLORS.mediumGray);
  const stepX = chartW / (labels.length - 1 || 1);
  labels.forEach((label, i) => {
    const lx = chartX + stepX * i;
    doc.text(label, lx - 15, chartY + chartH + 4, { width: 30, align: 'center' });
  });

  // Draw each dataset line
  datasets.forEach((dataset) => {
    const color = dataset.color || COLORS.primaryLight;
    doc.strokeColor(color).lineWidth(1.5);

    let firstPoint = true;
    dataset.data.forEach((val, i) => {
      if (val == null) return;
      const px = chartX + stepX * i;
      const py = chartY + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;

      if (firstPoint) {
        doc.moveTo(px, py);
        firstPoint = false;
      } else {
        doc.lineTo(px, py);
      }
    });
    doc.stroke();

    // Draw dots
    dataset.data.forEach((val, i) => {
      if (val == null) return;
      const px = chartX + stepX * i;
      const py = chartY + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;

      doc.circle(px, py, 2.5).fill(color);
    });
  });

  // Legend (if multiple datasets)
  if (datasets.length > 1) {
    let legendX = chartX;
    const legendY = chartY + chartH + 18;
    doc.fontSize(7);
    datasets.forEach((ds) => {
      doc.rect(legendX, legendY, 8, 4).fill(ds.color || COLORS.primaryLight);
      doc.fillColor(COLORS.darkGray).text(ds.label, legendX + 11, legendY - 1, { continued: false });
      legendX += doc.widthOfString(ds.label) + 22;
    });
  }
}

/**
 * Draw a horizontal bar chart
 * @param {PDFDocument} doc
 * @param {Object} options - { title, items: [{ label, value, color }], x, y, width, height, showValues }
 */
export function drawBarChart(doc, { title, items, x, y, width, height, showValues = true }) {
  if (!items || items.length === 0) return;

  let currentY = y;

  // Title
  if (title) {
    doc.font(FONTS.bodyBold).fontSize(9).fillColor(COLORS.darkGray);
    doc.text(title, x, currentY, { width, align: 'center' });
    currentY += 16;
  }

  const maxVal = Math.max(...items.map(i => i.value));
  const barHeight = Math.min(16, (height - (title ? 20 : 0)) / items.length - 4);
  const labelWidth = 80;
  const barAreaWidth = width - labelWidth - (showValues ? 45 : 5);

  items.forEach((item, i) => {
    const barY = currentY + i * (barHeight + 4);

    // Label
    doc.font(FONTS.body).fontSize(7).fillColor(COLORS.darkGray);
    doc.text(item.label, x, barY + 2, { width: labelWidth - 5, align: 'right', lineBreak: false });

    // Bar background
    doc.rect(x + labelWidth, barY, barAreaWidth, barHeight)
       .fill(COLORS.veryLightGray);

    // Bar fill
    const barWidth = (item.value / maxVal) * barAreaWidth;
    const color = item.color || COLORS.primaryLight;
    doc.rect(x + labelWidth, barY, barWidth, barHeight).fill(color);

    // Value
    if (showValues) {
      doc.font(FONTS.bodyBold).fontSize(7).fillColor(COLORS.darkGray);
      doc.text(item.value.toString(), x + labelWidth + barAreaWidth + 5, barY + 2, { width: 40 });
    }
  });
}

/**
 * Draw a pie chart
 * @param {PDFDocument} doc
 * @param {Object} options - { title, items: [{ label, value, color }], x, y, radius }
 */
export function drawPieChart(doc, { title, items, x, y, radius }) {
  if (!items || items.length === 0) return;

  const centerX = x;
  const centerY = y + (title ? 15 : 0);

  // Title
  if (title) {
    doc.font(FONTS.bodyBold).fontSize(9).fillColor(COLORS.darkGray);
    doc.text(title, centerX - radius - 20, y - radius - 15, { width: (radius + 20) * 2, align: 'center' });
  }

  const total = items.reduce((sum, i) => sum + i.value, 0);
  if (total === 0) return;

  let startAngle = -Math.PI / 2; // Start from top

  items.forEach((item, i) => {
    const sliceAngle = (item.value / total) * Math.PI * 2;
    const endAngle = startAngle + sliceAngle;
    const color = item.color || COLORS.chart[i % COLORS.chart.length];

    // Draw slice using path
    const x1 = centerX + Math.cos(startAngle) * radius;
    const y1 = centerY + Math.sin(startAngle) * radius;
    const x2 = centerX + Math.cos(endAngle) * radius;
    const y2 = centerY + Math.sin(endAngle) * radius;
    const largeArc = sliceAngle > Math.PI ? 1 : 0;

    doc.save();
    doc.path(`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`);
    doc.fill(color);
    doc.restore();

    // Label
    const midAngle = startAngle + sliceAngle / 2;
    const labelR = radius + 12;
    const lx = centerX + Math.cos(midAngle) * labelR;
    const ly = centerY + Math.sin(midAngle) * labelR;
    const pct = Math.round((item.value / total) * 100);

    if (pct >= 5) {
      doc.font(FONTS.body).fontSize(6).fillColor(COLORS.darkGray);
      doc.text(`${pct}%`, lx - 12, ly - 4, { width: 24, align: 'center' });
    }

    startAngle = endAngle;
  });

  // Legend below the pie
  let legendY = centerY + radius + 20;
  doc.font(FONTS.body).fontSize(7);
  items.forEach((item, i) => {
    const color = item.color || COLORS.chart[i % COLORS.chart.length];
    const legendX = centerX - radius;
    doc.rect(legendX, legendY, 8, 6).fill(color);
    doc.fillColor(COLORS.darkGray).text(
      `${item.label} (${Math.round((item.value / total) * 100)}%)`,
      legendX + 12, legendY - 1
    );
    legendY += 11;
  });
}

/**
 * Draw a styled data table
 * @param {PDFDocument} doc
 * @param {Object} options - { headers, rows, x, y, width, colWidths, headerColor }
 * @returns {number} - Y position after the table
 */
export function drawTable(doc, { headers, rows, x, y, width, colWidths, headerColor }) {
  const hColor = headerColor || COLORS.tableHeader;
  const rowHeight = 18;
  const headerHeight = 22;
  let currentY = y;

  // Auto-calculate column widths if not provided
  const cw = colWidths || headers.map(() => width / headers.length);

  // Header row
  doc.rect(x, currentY, width, headerHeight).fill(hColor);
  doc.font(FONTS.bodyBold).fontSize(8).fillColor(COLORS.tableHeaderText);

  let colX = x;
  headers.forEach((header, i) => {
    doc.text(header, colX + 4, currentY + 6, { width: cw[i] - 8, align: 'left' });
    colX += cw[i];
  });
  currentY += headerHeight;

  // Data rows
  rows.forEach((row, rowIdx) => {
    const bgColor = rowIdx % 2 === 0 ? COLORS.tableRowEven : COLORS.tableRowOdd;
    doc.rect(x, currentY, width, rowHeight).fill(bgColor);

    // Border
    doc.rect(x, currentY, width, rowHeight).strokeColor(COLORS.tableBorder).lineWidth(0.3).stroke();

    doc.font(FONTS.body).fontSize(8).fillColor(COLORS.darkGray);
    colX = x;
    row.forEach((cell, i) => {
      const cellStr = cell != null ? cell.toString() : '';
      doc.text(cellStr, colX + 4, currentY + 5, { width: cw[i] - 8, align: 'left', lineBreak: false });
      colX += cw[i];
    });
    currentY += rowHeight;
  });

  return currentY;
}

/**
 * Draw a progress/percentage bar
 * @param {PDFDocument} doc
 * @param {Object} options - { label, value (0-100), x, y, width, height, color }
 */
export function drawProgressBar(doc, { label, value, x, y, width, height = 12, color }) {
  const barColor = color || COLORS.primaryLight;
  const pct = Math.min(100, Math.max(0, value));

  // Label
  if (label) {
    doc.font(FONTS.body).fontSize(8).fillColor(COLORS.darkGray);
    doc.text(label, x, y - 12);
  }

  // Background
  doc.roundedRect(x, y, width, height, 3).fill(COLORS.veryLightGray);

  // Fill
  if (pct > 0) {
    doc.roundedRect(x, y, (width * pct) / 100, height, 3).fill(barColor);
  }

  // Percentage text
  doc.font(FONTS.bodyBold).fontSize(7).fillColor(pct > 50 ? COLORS.white : COLORS.darkGray);
  doc.text(`${pct}%`, x, y + 2, { width, align: 'center' });
}

/**
 * Draw a comparison table for head-to-head battles
 * @param {PDFDocument} doc
 * @param {Object} options - { colleges: [name1, name2], metrics: [{ label, values: [v1, v2], better: 0|1 }], x, y, width }
 * @returns {number} - Y position after
 */
export function drawComparisonTable(doc, { colleges, metrics, x, y, width }) {
  const colWidth = width / 3;
  let currentY = y;
  const rowH = 20;

  // Header
  doc.rect(x, currentY, width, 24).fill(COLORS.primary);
  doc.font(FONTS.bodyBold).fontSize(8).fillColor(COLORS.white);
  doc.text('Metric', x + 5, currentY + 7, { width: colWidth - 10, align: 'center' });
  doc.text(colleges[0], x + colWidth + 5, currentY + 7, { width: colWidth - 10, align: 'center' });
  doc.text(colleges[1], x + colWidth * 2 + 5, currentY + 7, { width: colWidth - 10, align: 'center' });
  currentY += 24;

  // Rows
  metrics.forEach((metric, i) => {
    const bg = i % 2 === 0 ? COLORS.veryLightGray : COLORS.white;
    doc.rect(x, currentY, width, rowH).fill(bg);
    doc.rect(x, currentY, width, rowH).strokeColor(COLORS.tableBorder).lineWidth(0.3).stroke();

    doc.font(FONTS.bodyBold).fontSize(8).fillColor(COLORS.darkGray);
    doc.text(metric.label, x + 5, currentY + 5, { width: colWidth - 10, align: 'center' });

    // Values — highlight the better one
    [0, 1].forEach(idx => {
      const isBetter = metric.better === idx;
      doc.font(isBetter ? FONTS.bodyBold : FONTS.body)
         .fontSize(8)
         .fillColor(isBetter ? COLORS.accentGreen : COLORS.darkGray);
      const val = metric.values[idx] != null ? metric.values[idx].toString() : '-';
      doc.text(val, x + colWidth * (idx + 1) + 5, currentY + 5, { width: colWidth - 10, align: 'center' });
    });

    currentY += rowH;
  });

  return currentY;
}

/**
 * Draw a badge/tag
 * @param {PDFDocument} doc
 * @param {Object} options - { text, x, y, color, textColor }
 */
export function drawBadge(doc, { text, x, y, color, textColor }) {
  const bgColor = color || COLORS.primaryLight;
  const txtColor = textColor || COLORS.white;
  const textWidth = doc.font(FONTS.bodyBold).fontSize(8).widthOfString(text);
  const padding = 6;
  const badgeWidth = textWidth + padding * 2;
  const badgeHeight = 16;

  doc.roundedRect(x, y, badgeWidth, badgeHeight, 8).fill(bgColor);
  doc.font(FONTS.bodyBold).fontSize(8).fillColor(txtColor);
  doc.text(text, x + padding, y + 4);

  return badgeWidth;
}

/**
 * Draw a rating/score indicator (filled circles)
 * @param {PDFDocument} doc
 * @param {Object} options - { score (1-5), x, y, color }
 */
export function drawRating(doc, { score, x, y, color, maxScore = 5 }) {
  const dotColor = color || COLORS.accentGold;
  const emptyColor = COLORS.lightGray;
  const dotRadius = 4;
  const spacing = 12;

  for (let i = 0; i < maxScore; i++) {
    const filled = i < score;
    doc.circle(x + i * spacing + dotRadius, y + dotRadius, dotRadius)
       .fill(filled ? dotColor : emptyColor);
  }
}
