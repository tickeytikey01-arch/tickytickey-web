"use client";

import { ChevronDown, Plus, Search } from "lucide-react";

interface HealthRecordFilterToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedPurok: string;
  onPurokChange: (p: string) => void;
  selectedCategory: string;
  onCategoryChange: (c: string) => void;
  selectedStatus: string;
  onStatusChange: (s: string) => void;
  onAddRecord: () => void;
}

export default function HealthRecordFilterToolbar({
  searchQuery,
  onSearchChange,
  selectedPurok,
  onPurokChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  onAddRecord,
}: HealthRecordFilterToolbarProps) {
  const puroks = [
    "All",
    "Purok 1",
    "Purok 2",
    "Purok 3",
    "Purok 4",
    "Purok 5",
    "Purok 6",
  ];

  const categories = [
    "All",
    "Hypertension",
    "Diabetes",
    "Maternal/Prenatal",
    "Senior Care",
    "Pediatric",
    "General",
  ];

  const statuses = ["All", "Active", "Archived", "Pending"];

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-2xs flex flex-col xl:flex-row items-center justify-between gap-4">
      {/* Left: Search Bar */}
      <div className="relative w-full xl:w-80">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search resident name, PhilHealth ID, Purok..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50/70 border border-gray-200 rounded-2xl text-xs font-semibold text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#246b38] focus:bg-white transition-colors"
        />
      </div>

      {/* Right: Filters & Action Button */}
      <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto justify-start xl:justify-end">
        {/* Purok Filter */}
        <div className="relative">
          <select
            value={selectedPurok}
            aria-label="Filter by Purok"
            onChange={(e) => onPurokChange(e.target.value)}
            className="appearance-none bg-gray-50 border border-gray-200 rounded-2xl pl-3.5 pr-8 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:border-[#246b38] cursor-pointer"
          >
            {puroks.map((p) => (
              <option key={p} value={p}>
                {p === "All" ? "All Puroks" : p}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={selectedCategory}
            aria-label="Filter by Category"
            onChange={(e) => onCategoryChange(e.target.value)}
            className="appearance-none bg-gray-50 border border-gray-200 rounded-2xl pl-3.5 pr-8 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:border-[#246b38] cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "All Categories" : c}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={selectedStatus}
            aria-label="Filter by Status"
            onChange={(e) => onStatusChange(e.target.value)}
            className="appearance-none bg-gray-50 border border-gray-200 rounded-2xl pl-3.5 pr-8 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:border-[#246b38] cursor-pointer"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All Statuses" : `Status: ${s}`}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Create EHR Button */}
        <button
          type="button"
          onClick={onAddRecord}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#246b38] hover:bg-[#1b552b] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Health Record</span>
        </button>
      </div>
    </div>
  );
}
