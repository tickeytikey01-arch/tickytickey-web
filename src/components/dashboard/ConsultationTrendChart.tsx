"use client";

import { ConsultationTrendPoint } from "@/types/dashboard";
import { BarChart2, ChevronDown } from "lucide-react";
import { useState } from "react";

interface ConsultationTrendChartProps {
  data: ConsultationTrendPoint[];
}

export default function ConsultationTrendChart({ data }: ConsultationTrendChartProps) {
  const selectedRange = "This Week";
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const width = 600;
  const height = 185;
  const paddingX = 45;
  const paddingY = 22;

  const maxVal = 80;
  const yTicks = [80, 60, 40, 20, 0];

  // Calculate coordinates
  const points = data.map((d, index) => {
    const x = paddingX + (index / Math.max(1, data.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - (d.count / maxVal) * (height - paddingY * 2);
    return { ...d, x, y };
  });

  // SVG path string
  const pathD = points.reduce((acc, curr, idx) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    const prev = points[idx - 1];
    const cx = (prev.x + curr.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`;
  }, "");

  // Area under curve path
  const areaD = points.length > 0 ? `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z` : "";

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-green-50 text-[#246b38] flex items-center justify-center">
            <BarChart2 className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-gray-900">Consultations This Week</h3>
        </div>

        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <span>{selectedRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full overflow-x-auto pt-2 flex-1 flex items-center">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[440px]">
          <defs>
            <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2e7d32" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2e7d32" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines and Y-axis labels */}
          {yTicks.map((val) => {
            const y = height - paddingY - (val / maxVal) * (height - paddingY * 2);
            return (
              <g key={val}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 12}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="#94a3b8"
                  fontWeight="600"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Gradient Area Fill */}
          <path d={areaD} fill="url(#greenGrad)" />

          {/* Trend Polyline */}
          <path d={pathD} fill="none" stroke="#2e7d32" strokeWidth="2.5" strokeLinecap="round" />

          {/* Data points */}
          {points.map((pt, i) => (
            <g key={i} className="cursor-pointer" onMouseEnter={() => setHoveredPoint(i)}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredPoint === i ? "6" : "4"}
                fill="#2e7d32"
                stroke="#ffffff"
                strokeWidth="2"
                className="transition-all"
              />

              {/* X-axis Day & Date */}
              <text
                x={pt.x}
                y={height - 12}
                textAnchor="middle"
                fontSize="9"
                fontWeight="600"
                fill="#64748b"
              >
                {pt.day}
              </text>
              <text
                x={pt.x}
                y={height - 2}
                textAnchor="middle"
                fontSize="8"
                fontWeight="500"
                fill="#94a3b8"
              >
                {pt.date}
              </text>
            </g>
          ))}
        </svg>

        {/* Floating Tooltip matching mockup (e.g. 64 consultations) */}
        {hoveredPoint !== null && points[hoveredPoint] && (
          <div
            className="absolute z-20 pointer-events-none transition-all duration-150"
            style={{
              left: `${(points[hoveredPoint].x / width) * 100}%`,
              top: `${(points[hoveredPoint].y / height) * 100 - 18}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="bg-[#246b38] text-white text-[11px] font-bold px-3 py-1 rounded-xl shadow-lg whitespace-nowrap">
              {points[hoveredPoint].count} consultations
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
