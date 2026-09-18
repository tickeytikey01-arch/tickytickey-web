"use client";

import { SymptomBreakdown } from "@/types/dashboard";
import { Activity, ChevronDown } from "lucide-react";

interface SymptomsDonutChartProps {
  totalCases: number;
  breakdown: SymptomBreakdown[];
}

export default function SymptomsDonutChart({ totalCases, breakdown }: SymptomsDonutChartProps) {
  const range = "This Month";

  // Donut geometry
  const size = 180;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Compute stroke offsets
  const slices = breakdown.map((item, index) => {
    const accumulatedPercent = breakdown.slice(0, index).reduce((sum, current) => sum + current.percentage, 0);
    const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
    return { ...item, strokeDasharray, strokeDashoffset };
  });

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-green-50 text-[#246b38] flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-gray-900">Common Symptoms</h3>
        </div>

        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <span>{range}</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </button>
      </div>

      {/* Donut and Legend Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center pt-2 flex-1">
        
        {/* Donut SVG */}
        <div className="sm:col-span-5 flex justify-center relative">
          <svg width={size} height={size} className="transform -rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#f1f5f9"
              strokeWidth={strokeWidth}
            />
            {slices.map((slice, idx) => (
              <circle
                key={idx}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={slice.color}
                strokeWidth={strokeWidth}
                strokeDasharray={slice.strokeDasharray}
                strokeDashoffset={slice.strokeDashoffset}
                strokeLinecap="butt"
                className="transition-all duration-300 hover:opacity-85"
              />
            ))}
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-black text-gray-900 tracking-tight">
              {totalCases}
            </span>
            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
              Total
            </span>
          </div>
        </div>

        {/* Legend with matching color dots and percentages */}
        <div className="sm:col-span-7 space-y-2 text-xs">
          {breakdown.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between pr-2">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-700 font-medium">{item.name}</span>
              </div>
              <span className="font-bold text-gray-900">{item.percentage}%</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
