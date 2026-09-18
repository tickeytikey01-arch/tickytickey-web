"use client";

import { ReportTrendDataPoint } from "@/types/reports";
import { ChevronDown, TrendingUp } from "lucide-react";
import { useState } from "react";

interface Props {
  data?: ReportTrendDataPoint[];
}

export default function ConsultationsTrendChart({ data }: Props) {
  const [range, setRange] = useState("This Month");

  const trendData: ReportTrendDataPoint[] = data || [
    { label: "Apr 1", count: 72 },
    { label: "Apr 5", count: 108 },
    { label: "Apr 10", count: 85 },
    { label: "Apr 15", count: 112 },
    { label: "Apr 20", count: 138 },
    { label: "Apr 25", count: 125 },
    { label: "Apr 30", count: 186 },
  ];

  const maxVal = 200;
  const yTicks = [200, 150, 100, 50, 0];

  const width = 460;
  const height = 190;
  const paddingLeft = 36;
  const paddingRight = 24;
  const paddingTop = 32;
  const paddingBottom = 26;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const points = trendData.map((d, index) => {
    const x = paddingLeft + (index / (trendData.length - 1)) * chartWidth;
    const y = paddingTop + (1 - d.count / maxVal) * chartHeight;
    return { ...d, x, y };
  });

  // Curved SVG path
  const pathD = points.reduce((acc, curr, idx) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    const prev = points[idx - 1];
    const cx = (prev.x + curr.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`;
  }, "");

  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];
  const areaD = `${pathD} L ${lastPoint.x} ${paddingTop + chartHeight} L ${firstPoint.x} ${paddingTop + chartHeight} Z`;

  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-green-50 text-[#246b38] flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-gray-900">Consultations Trend</h3>
        </div>

        <button
          type="button"
          onClick={() => {
            setRange((prev) => (prev === "This Month" ? "Last 30 Days" : "This Month"));
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <span>{range}</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </button>
      </div>

      {/* SVG Canvas */}
      <div className="relative flex-1 flex items-center justify-center pt-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id="consultationGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#246b38" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#246b38" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Horizontal Gridlines & Y-labels */}
          {yTicks.map((val) => {
            const y = paddingTop + (1 - val / maxVal) * chartHeight;
            return (
              <g key={val}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#f1f5f2"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="9.5"
                  fill="#9ca3af"
                  fontWeight="600"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaD} fill="url(#consultationGrad)" />

          {/* Line Stroke */}
          <path d={pathD} fill="none" stroke="#246b38" strokeWidth="2.5" strokeLinecap="round" />

          {/* Data Points */}
          {points.map((p, idx) => (
            <circle
              key={idx}
              cx={p.x}
              cy={p.y}
              r="3.5"
              fill="#246b38"
              stroke="#ffffff"
              strokeWidth="2"
            />
          ))}

          {/* X Axis Labels */}
          {points.map((p, idx) => (
            <text
              key={idx}
              x={p.x}
              y={height - 6}
              textAnchor="middle"
              fontSize="9.5"
              fill="#9ca3af"
              fontWeight="600"
            >
              {p.label}
            </text>
          ))}

          {/* Active Tooltip on Apr 30 matching mockup */}
          <g transform={`translate(${lastPoint.x - 36}, ${lastPoint.y - 44})`}>
            <rect
              width="72"
              height="34"
              rx="8"
              fill="#1b552b"
              className="filter drop-shadow-md"
            />
            <text
              x="36"
              y="15"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="11"
              fontWeight="800"
            >
              186
            </text>
            <text
              x="36"
              y="27"
              textAnchor="middle"
              fill="#d1fae5"
              fontSize="8"
              fontWeight="600"
            >
              consultations
            </text>
            {/* Triangle pointer */}
            <polygon
              points="31,34 41,34 36,39"
              fill="#1b552b"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
