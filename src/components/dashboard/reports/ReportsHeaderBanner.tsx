"use client";

import { Calendar, ChevronDown, FileDown, FileSpreadsheet } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  onExportPDF?: () => void;
  onExportCSV?: () => void;
  dateRange?: string;
  onDateRangeChange?: (range: string) => void;
}

export default function ReportsHeaderBanner({
  onExportPDF,
  onExportCSV,
  dateRange = "Apr 1, 2025 - Apr 30, 2025",
  onDateRangeChange,
}: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const ranges = [
    "Apr 1, 2025 - Apr 30, 2025",
    "Last 30 Days",
    "First Quarter 2025",
    "Year to Date (2025)",
  ];

  return (
    <div className="relative bg-gradient-to-r from-[#edf7ed] via-[#e6f4e8] to-[#edf7ed] rounded-3xl border border-[#cbe6cf] shadow-xs p-6 sm:p-7 overflow-hidden">
      {/* Village Skyline and Trees Silhouette at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-12 pointer-events-none opacity-35 z-0">
        <svg viewBox="0 0 900 60" preserveAspectRatio="none" className="w-full h-full fill-[#458e57]">
          <path d="M0 60 L0 35 Q150 20 300 32 Q450 44 600 28 Q750 15 900 35 L900 60 Z" opacity="0.4" />
          <path d="M0 60 L0 42 Q200 30 400 40 Q600 50 800 36 L900 45 L900 60 Z" opacity="0.6" />
          <polygon points="120,40 135,28 150,40 150,55 120,55" opacity="0.8" />
          <rect x="131" y="44" width="8" height="11" fill="#ffffff" opacity="0.6" />
          <polygon points="260,38 275,26 290,38 290,55 260,55" opacity="0.8" />
          <rect x="271" y="42" width="8" height="13" fill="#ffffff" opacity="0.6" />
          <circle cx="165" cy="42" r="10" opacity="0.7" />
          <circle cx="305" cy="40" r="11" opacity="0.7" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left: Title & Subtitle */}
        <div className="space-y-1.5 text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#133d23] tracking-tight">
            Reports &amp; Analytics
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-medium">
            Data-driven insights for a healthier barangay.
          </p>
        </div>

        {/* Center: Dr. Ticky Mascot with Speech Bubble */}
        <div className="flex items-center gap-2">
          {/* Cloud Speech Bubble */}
          <div className="bg-[#489958] text-white font-bold text-[10.5px] sm:text-xs py-2 px-3.5 rounded-2xl shadow-md text-center max-w-[155px] leading-tight border border-green-300 rotate-[-1deg]">
            <span>Better insights for a healthier tomorrow!</span>
          </div>

          {/* Mascot Asset */}
          <div className="relative w-20 sm:w-24 h-20 sm:h-24 flex-shrink-0">
            <Image
              src="/assets/dashboard-banner-right.png"
              alt="Dr. Ticky Mascot"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Right: Date Range Selector & Export Actions */}
        <div className="flex flex-col items-center lg:items-end gap-2.5">
          {/* Date Range Dropdown */}
          <div className="relative">
            <div className="text-[11px] font-bold text-gray-500 mb-1 text-center lg:text-left">
              Date Range
            </div>
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-gray-200 text-xs font-bold text-gray-800 shadow-2xs hover:bg-gray-50 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>{dateRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-56 bg-white rounded-2xl border border-gray-100 shadow-xl py-1.5 z-30 animate-in fade-in">
                {ranges.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      onDateRangeChange?.(r);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-green-50 transition-colors ${
                      r === dateRange ? "text-[#246b38] bg-green-50/60 font-bold" : "text-gray-700"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export Buttons (PDF and CSV) matching mockup */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onExportPDF}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fef2f2] border border-red-200 text-[11px] font-bold text-red-600 hover:bg-red-100 shadow-2xs transition-colors cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5 text-red-500" />
              <span>Export PDF</span>
            </button>

            <button
              type="button"
              onClick={onExportCSV}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f0fdf4] border border-green-200 text-[11px] font-bold text-[#16a34a] hover:bg-green-100 shadow-2xs transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-green-600" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
