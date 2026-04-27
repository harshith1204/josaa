'use client';
import { useRef, useEffect } from 'react';

export default function CutoffChart({ dataA, dataB, labelA, labelB }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    // Background
    ctx.fillStyle = '#13131a';
    ctx.fillRect(0, 0, w, h);

    // Grid
    const pad = { top: 20, right: 15, bottom: 35, left: 45 };
    const plotW = w - pad.left - pad.right;
    const plotH = h - pad.top - pad.bottom;

    const allVals = [...dataA, ...dataB].filter(Boolean);
    if (allVals.length === 0) return;
    const maxVal = Math.max(...allVals) * 1.1;
    const minVal = Math.min(...allVals) * 0.9;

    // Grid lines
    ctx.strokeStyle = '#ffffff10';
    ctx.lineWidth = 1;
    const gridSteps = 4;
    for (let i = 0; i <= gridSteps; i++) {
      const y = pad.top + (plotH / gridSteps) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();

      // Y labels
      const val = maxVal - ((maxVal - minVal) / gridSteps) * i;
      ctx.fillStyle = '#71717a';
      ctx.font = '10px system-ui';
      ctx.textAlign = 'right';
      ctx.fillText(val >= 1000 ? Math.round(val / 1000) + 'k' : Math.round(val), pad.left - 6, y + 3);
    }

    // X labels
    const labels = ['2023', '2024', '2025'];
    ctx.fillStyle = '#71717a';
    ctx.font = '11px system-ui';
    ctx.textAlign = 'center';
    labels.forEach((l, i) => {
      const x = pad.left + (plotW / (labels.length - 1)) * i;
      ctx.fillText(l, x, h - pad.bottom + 18);
    });

    // Vertical grid at each x
    labels.forEach((_, i) => {
      const x = pad.left + (plotW / (labels.length - 1)) * i;
      ctx.beginPath();
      ctx.moveTo(x, pad.top);
      ctx.lineTo(x, pad.top + plotH);
      ctx.stroke();
    });

    // Draw line
    function drawLine(data, color) {
      if (!data || data.length === 0) return;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = 'round';
      ctx.beginPath();
      data.forEach((val, i) => {
        if (val == null) return;
        const x = pad.left + (plotW / (labels.length - 1)) * i;
        const y = pad.top + plotH - ((val - minVal) / (maxVal - minVal)) * plotH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Dots
      data.forEach((val, i) => {
        if (val == null) return;
        const x = pad.left + (plotW / (labels.length - 1)) * i;
        const y = pad.top + plotH - ((val - minVal) / (maxVal - minVal)) * plotH;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    drawLine(dataA, '#3b82f6');
    if (dataB && dataB.length > 0) drawLine(dataB, '#ef4444');

    // Legend
    if (labelA) {
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(pad.left, h - 12, 10, 3);
      ctx.fillStyle = '#a1a1aa';
      ctx.font = '10px system-ui';
      ctx.textAlign = 'left';
      ctx.fillText(labelA, pad.left + 14, h - 8);
    }
    if (labelB) {
      const xOff = pad.left + 14 + ctx.measureText(labelA || '').width + 20;
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(xOff, h - 12, 10, 3);
      ctx.fillStyle = '#a1a1aa';
      ctx.fillText(labelB, xOff + 14, h - 8);
    }
  }, [dataA, dataB, labelA, labelB]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full rounded-xl"
      style={{ height: '200px' }}
    />
  );
}
