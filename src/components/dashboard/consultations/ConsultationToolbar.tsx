"use client";

import { Search, SlidersHorizontal, UserPlus } from "lucide-react";

interface ToolbarProps {
  currentStatus: string;
  onSelectStatus: (status: string) => void;
  counts: {
    all: number;
    waiting: number;
    active: number;
    replied: number;
    resolved: number;
  };
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenAssignBhw: () => void;
}

export default function ConsultationToolbar({
  currentStatus,
  onSelectStatus,
  counts,
  searchQuery,
  onSearchChange,
  onOpenAssignBhw,
}: ToolbarProps) {
  const tabs = [
    { id: "All", label: "All", count: counts.all },
    { id: "Waiting", label: "Waiting", count: counts.waiting },
    { id: "Active", label: "Active", count: counts.active },
    { id: "Replied", label: "Replied", count: counts.replied },
    { id: "Resolved", label: "Resolved", count: counts.resolved },
  ];

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5 mb-6">
      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = currentStatus.toLowerCase() === tab.id.toLowerCase();
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectStatus(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#246b38] text-white shadow-xs"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                  isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Actions */}
      <div className="flex items-center gap-2.5">
        <div className="relative flex-1 sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search consultations..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-gray-200 bg-white text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3fa04e]"
          />
        </div>

        <button
          type="button"
          title="Filter preferences"
          className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4 text-gray-600" />
        </button>

        <button
          type="button"
          onClick={onOpenAssignBhw}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#246b38] hover:bg-[#1a552b] text-white text-xs font-bold shadow-xs transition-all cursor-pointer whitespace-nowrap"
        >
          <UserPlus className="w-4 h-4" />
          <span>Assign BHW</span>
        </button>
      </div>
    </div>
  );
}
