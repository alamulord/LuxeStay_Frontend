import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../../lib/utils';

interface BookingsLineChartProps {
  data: number[];
  labels: string[];
  title?: string;
  isCurrency?: boolean;
}

export function BookingsLineChart({ data, labels, title = "Bookings Overview", isCurrency = false }: BookingsLineChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const width = 600;
  const height = 300;
  const paddingX = 50;
  const paddingY = 40;

  const maxValue = Math.max(...data, 10);
  const minValue = Math.min(...data, 0);
  const range = maxValue - minValue || 1;

  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  const xStep = data.length > 1 ? chartWidth / (data.length - 1) : chartWidth;
  const yScale = chartHeight / range;

  // Calculate SVG points
  const points = data.map((value, index) => {
    const x = paddingX + index * xStep;
    const y = height - paddingY - (value - minValue) * yScale;
    return { x, y, value, label: labels[index] };
  });

  // Construct Line Path string (e.g. M 50 200 L 100 150 ...)
  const linePath = points.reduce((path, p, i) => {
    return path + `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y} `;
  }, '');

  // Construct Fill Path string (area under the line)
  const fillPath = points.length > 0 
    ? `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`
    : '';

  // Construct horizontal gridlines
  const gridTicks = 5;
  const gridLines = Array.from({ length: gridTicks }).map((_, i) => {
    const yVal = minValue + (range / (gridTicks - 1)) * i;
    const y = height - paddingY - (yVal - minValue) * yScale;
    return { y, label: isCurrency ? formatCurrency(yVal) : Math.round(yVal).toString() };
  });

  return (
    <div className="bg-white rounded-xl p-6 shadow-ambient border border-slate-100">
      <h3 className="font-headline font-bold text-[#191c1e] mb-6 text-xs uppercase tracking-wider">{title}</h3>
      
      <div className="relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
          <defs>
            {/* Gradient for area fill */}
            <linearGradient id="chartFillGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3525cd" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3525cd" stopOpacity="0.0" />
            </linearGradient>
            {/* Gradient for line stroke */}
            <linearGradient id="chartStrokeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3525cd" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>

          {/* Horizontal Gridlines */}
          {gridLines.map((line, idx) => (
            <g key={idx} className="opacity-40">
              <line 
                x1={paddingX} 
                y1={line.y} 
                x2={width - paddingX} 
                y2={line.y} 
                stroke="#e2e8f0" 
                strokeWidth={1} 
                strokeDasharray="4 4"
              />
              <text 
                x={paddingX - 10} 
                y={line.y + 4} 
                textAnchor="end" 
                className="fill-slate-400 font-medium" 
                style={{ fontSize: '10px' }}
              >
                {line.label}
              </text>
            </g>
          ))}

          {/* Chart Paths */}
          {points.length > 0 && (
            <>
              {/* Fill Area (Glow) */}
              <motion.path
                d={fillPath}
                fill="url(#chartFillGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              />

              {/* Line Stroke */}
              <motion.path
                d={linePath}
                fill="none"
                stroke="url(#chartStrokeGradient)"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />

              {/* Interactive Data Dots & Hover zones */}
              {points.map((p, idx) => {
                const isHovered = hoveredIndex === idx;
                return (
                  <g key={idx}>
                    {/* Active point hover ring */}
                    {isHovered && (
                      <circle 
                        cx={p.x} 
                        cy={p.y} 
                        r={8} 
                        fill="#3525cd" 
                        fillOpacity={0.15} 
                        className="animate-ping"
                      />
                    )}
                    {/* Data Point circle */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isHovered ? 5 : 3.5}
                      className="fill-white stroke-indigo-600 transition-all"
                      strokeWidth={isHovered ? 3 : 2}
                    />
                    {/* Invisible hover guide rect zone */}
                    <rect
                      x={p.x - xStep / 2}
                      y={paddingY}
                      width={xStep}
                      height={chartHeight}
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    />
                  </g>
                );
              })}
            </>
          )}

          {/* X Axis Labels */}
          {points.map((p, idx) => (
            <text
              key={idx}
              x={p.x}
              y={height - paddingY + 20}
              textAnchor="middle"
              className="fill-slate-400 font-semibold"
              style={{ fontSize: '10px' }}
            >
              {p.label}
            </text>
          ))}
        </svg>

        {/* Dynamic HTML Tooltip Overlay */}
        <AnimatePresence>
          {hoveredIndex !== null && points[hoveredIndex] && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute z-20 bg-slate-900 text-white rounded-lg p-2.5 shadow-md pointer-events-none text-xs"
              style={{
                left: `${(points[hoveredIndex].x / width) * 100}%`,
                top: `${(points[hoveredIndex].y / height) * 100 - 15}%`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <p className="font-bold">{points[hoveredIndex].label}</p>
              <p className="text-[10px] text-indigo-200 mt-0.5">
                {isCurrency 
                  ? formatCurrency(points[hoveredIndex].value) 
                  : `${points[hoveredIndex].value} Booking${points[hoveredIndex].value !== 1 ? 's' : ''}`
                }
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}