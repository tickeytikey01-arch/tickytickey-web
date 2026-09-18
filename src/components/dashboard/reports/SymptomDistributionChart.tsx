"use client";

import { ReportSymptomSlice } from "@/types/reports";
import { Tag } from "lucide-react";

interface Props {
  totalCount?: number;
  data?: ReportSymptomSlice[];
}

export default function SymptomDistributionChart({ totalCount = 1462, data }: Props) {
  const slices: ReportSymptomSlice[] = data || [
    { name: "Cough", percentage: 28, color: "#246b38" },
    { name: "Fever", percentage: 24, color: "#48a25c" },
    { name: "Headache", percentage: 15, color: "#eab308" },
    { name: "Colds", percentage: 12, color: "#facc15" },
    { name: "Stomachache", percentage: 10, color: "#38bdf8" },
    { name: "Body Pain", percentage: 6, color: "#a855f7" },
    { name: "Others", percentage: 5, color: "#cbd5e1" },
  ];

  // Donut geometry
  const size = 150;
  const strokeWidth = 26;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const arcs = slices.map((item, index) => {
    const accumulatedPercent = slices.slice(0, index).reduce((sum, current) => sum + current.percentage, 0);
    const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
    return { ...item, strokeDasharray, strokeDashoffset };
  });

  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-green-50 text-[#246b38] flex items-center justify-center">
            <Tag className="w-4 h-4" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-gray-900">Symptom Distribution</h3>
        </div>
      </div>

      {/* Donut and Legend Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-3 flex-1">
        {/* Donut graphic */}
        <div className="sm:col-span-6 flex justify-center relative">
          <svg width={size} height={size} className="transform -rotate-90">
            {arcs.map((item, idx) => (
              <circle
                key={idx}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={item.strokeDasharray}
                strokeDashoffset={item.strokeDashoffset}
                strokeLinecap="butt"
              />
            ))}
          </svg>

          {/* Centered Total */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-base sm:text-lg font-black text-[#133d23] leading-none">
              {totalCount.toLocaleString()}
            </span>
            <span className="text-[10px] font-bold text-gray-400 mt-0.5">Total</span>
          </div>
        </div>

        {/* Legend list */}
        <div className="sm:col-span-6 space-y-1.5 pl-1">
          {slices.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-700 font-semibold">{item.name}</span>
              </div>
              <span className="font-bold text-gray-900">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
