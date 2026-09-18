"use client";

import { AnnouncementCategory, AnnouncementPriority, AnnouncementStatus } from "@/types/announcement";
import { ChevronDown, Plus, Search } from "lucide-react";

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (c: string) => void;
  selectedPriority: string;
  onPriorityChange: (p: string) => void;
  selectedStatus: string;
  onStatusChange: (s: string) => void;
  onAddAnnouncement: () => void;
}

export default function AnnouncementFilterToolbar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedPriority,
  onPriorityChange,
  selectedStatus,
  onStatusChange,
  onAddAnnouncement,
}: Props) {
  const categories: ("All" | AnnouncementCategory)[] = [
    "All",
    "Vaccination Drive",
    "Health Advisory",
    "Medical Mission",
    "Emergency Alert",
    "Clinic Hours",
  ];

  const priorities: ("All" | AnnouncementPriority)[] = ["All", "Urgent", "Important", "Normal"];
  const statuses: ("All" | AnnouncementStatus)[] = ["All", "Published", "Draft", "Scheduled"];

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Search Bar */}
      <div className="relative w-full md:w-80">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search advisories, campaigns, or topics..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50/70 border border-gray-200 rounded-2xl text-xs font-semibold text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#246b38] focus:bg-white transition-colors"
        />
      </div>

      {/* Dropdown Filters & Actions */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
        {/* Category Dropdown */}
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

        {/* Priority Dropdown */}
        <div className="relative">
          <select
            value={selectedPriority}
            aria-label="Filter by Priority"
            onChange={(e) => onPriorityChange(e.target.value)}
            className="appearance-none bg-gray-50 border border-gray-200 rounded-2xl pl-3.5 pr-8 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:border-[#246b38] cursor-pointer"
          >
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p === "All" ? "All Priorities" : `Priority: ${p}`}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Status Dropdown */}
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

        {/* Create Button */}
        <button
          type="button"
          onClick={onAddAnnouncement}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#246b38] hover:bg-[#1b552b] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Announcement</span>
        </button>
      </div>
    </div>
  );
}
