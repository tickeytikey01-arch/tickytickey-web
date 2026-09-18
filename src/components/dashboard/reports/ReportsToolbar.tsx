"use client";

import { Activity, Calendar, ChevronDown, FileDown, FileSpreadsheet } from "lucide-react";
import { useState } from "react";

interface ReportsToolbarProps {
  dateRange: string;
  onDateRangeChange: (range: string) => void;
  onExportPDF: () => void;
  onExportCSV: () => void;
}

export default function ReportsToolbar({
  dateRange,
  onDateRangeChange,
  onExportPDF,
  onExportCSV,
}: ReportsToolbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const year = new Date().getFullYear();
  const ranges = [new Date().toLocaleDateString("en-PH", { month: "long", year: "numeric" }), "Last 30 Days", `First Quarter ${year}`, `Year to Date (${year})`];

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Left: Date Range Selector & Status Indicator */}
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-800 shadow-2xs hover:bg-white hover:border-[#246b38] transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#246b38]" />
            <span>{dateRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-1.5 w-60 bg-white rounded-2xl border border-gray-100 shadow-xl py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                Reporting Period
              </div>
              {ranges.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    onDateRangeChange(r);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-green-50 transition-colors flex items-center justify-between cursor-pointer ${
                    r === dateRange ? "text-[#246b38] font-bold bg-green-50/50" : "text-gray-700"
                  }`}
                >
                  <span>{r}</span>
                  {r === dateRange && <span className="w-1.5 h-1.5 rounded-full bg-[#246b38]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#edf7ee] border border-green-200 text-[11px] font-bold text-[#1c552c]">
          <Activity className="w-3 h-3 text-[#246b38]" />
          <span>Barangay San Isidro Census Data</span>
        </div>
      </div>

      {/* Right: Export Actions */}
      <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
        <button
          type="button"
          onClick={onExportCSV}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-2xs transition-colors cursor-pointer"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
          <span>Export CSV</span>
        </button>

        <button
          type="button"
          onClick={onExportPDF}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-[#246b38] hover:bg-[#1b552b] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <FileDown className="w-3.5 h-3.5 text-white" />
          <span>Export Official PDF</span>
        </button>
      </div>
    </div>
  );
}
