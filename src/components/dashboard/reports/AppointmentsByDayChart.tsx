"use client";

import { ReportDayTally } from "@/types/reports";
import { BarChart3, ChevronDown } from "lucide-react";
import { useState } from "react";

interface Props {
  data?: ReportDayTally[];
}

export default function AppointmentsByDayChart({ data }: Props) {
  const [range, setRange] = useState("This Month");

  const tallies: ReportDayTally[] = data || [
    { day: "Mon", count: 120 },
    { day: "Tue", count: 145 },
    { day: "Wed", count: 132 },
    { day: "Thu", count: 168 },
    { day: "Fri", count: 156 },
    { day: "Sat", count: 98 },
    { day: "Sun", count: 76 },
  ];

  const maxVal = 200;
  const yTicks = [200, 150, 100, 50, 0];

  const width = 460;
  const height = 190;
  const paddingLeft = 36;
  const paddingRight = 16;
  const paddingTop = 28;
  const paddingBottom = 26;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  const barWidth = 24;
  const step = chartWidth / tallies.length;

  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-green-50 text-[#246b38] flex items-center justify-center">
            <BarChart3 className="w-4 h-4" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-gray-900">Appointments by Day</h3>
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

          {/* Vertical Bars and Value Labels */}
          {tallies.map((item, idx) => {
            const barHeight = (item.count / maxVal) * chartHeight;
            const x = paddingLeft + idx * step + (step - barWidth) / 2;
            const y = paddingTop + chartHeight - barHeight;

            return (
              <g key={item.day}>
                {/* Bar Value Label on Top */}
                <text
                  x={x + barWidth / 2}
                  y={y - 6}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="700"
                  fill="#246b38"
                >
                  {item.count}
                </text>

                {/* Rounded Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx="6"
                  fill="#4fa963"
                  className="hover:fill-[#246b38] transition-colors cursor-pointer"
                />

                {/* Day Label */}
                <text
                  x={x + barWidth / 2}
                  y={height - 6}
                  textAnchor="middle"
                  fontSize="9.5"
                  fill="#6b7280"
                  fontWeight="600"
                >
                  {item.day}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
