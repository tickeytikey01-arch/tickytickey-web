"use client";

import { ConsultationItem } from "@/types/dashboard";
import { ArrowUpDown, CheckCircle2, ChevronRight, Clock, MessageSquare, Play } from "lucide-react";
import { useState } from "react";

interface QueueProps {
  consultations: ConsultationItem[];
  selectedId: string;
  onSelect: (consultation: ConsultationItem) => void;
}

export default function ConsultationQueue({
  consultations,
  selectedId,
  onSelect,
}: QueueProps) {
  const [sortAsc, setSortAsc] = useState(false);

  const getStatusBadge = (status: ConsultationItem["status"]) => {
    switch (status) {
      case "Waiting":
        return {
          badge: "bg-[#fef8ed] text-[#b45309] border-[#fbe4bd]",
          icon: Clock,
        };
      case "Active":
        return {
          badge: "bg-[#edf9f0] text-[#15803d] border-[#bfe8cb]",
          icon: Play,
        };
      case "Replied":
        return {
          badge: "bg-[#edf6fe] text-[#1d4ed8] border-[#c0e0fc]",
          icon: MessageSquare,
        };
      case "Resolved":
      case "Completed":
        return {
          badge: "bg-[#f5eefb] text-[#7e22ce] border-[#e2cef6]",
          icon: CheckCircle2,
        };
      default:
        return {
          badge: "bg-gray-50 text-gray-700 border-gray-200",
          icon: Clock,
        };
    }
  };

  const sortedList = [...consultations].sort((a, b) => {
    return sortAsc ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
  });

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-xs flex flex-col h-full min-h-0 justify-between">
      {/* Top Header matching ConsultationDetailsCard */}
      <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 mb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <h3 className="text-base sm:text-lg font-black text-gray-900">
            Consultation Queue
          </h3>
          <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full border border-gray-200">
            {sortedList.length} cases
          </span>
        </div>
        <button
          type="button"
          onClick={() => setSortAsc(!sortAsc)}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-500 hover:text-gray-800 transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-gray-50"
        >
          <span>{sortAsc ? "Oldest first" : "Latest first"}</span>
          <ArrowUpDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Scrollable Queue List with Mouse Wheel & Touch scrolling */}
      <div
        className="flex-1 min-h-0 overflow-y-auto overscroll-contain pr-1.5 space-y-2.5 scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {sortedList.length === 0 ? (
          <div className="text-center py-16 text-xs text-gray-400">
            No consultations match your filter.
          </div>
        ) : (
          sortedList.map((item) => {
            const isSelected = item.id === selectedId;
            const { badge, icon: StatusIcon } = getStatusBadge(item.status);

            return (
              <div
                key={item.id}
                onClick={() => onSelect(item)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 select-none ${
                  isSelected
                    ? "border-[#246b38] bg-green-50/60 shadow-2xs border-l-4 border-l-[#246b38]"
                    : "border-gray-100 hover:border-green-200 hover:bg-gray-50/70"
                }`}
              >
                {/* Left: Avatar & Text */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-[#dcf0dd] text-[#1c552c] font-black text-xs flex items-center justify-center flex-shrink-0">
                    {item.initials}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 truncate">
                      {item.residentName}
                    </h4>
                    <p className="text-[11px] text-gray-500 truncate leading-tight mt-0.5">
                      {item.concern}
                    </p>
                    <span className="text-[10px] text-gray-400 block mt-0.5">
                      {item.purok || "Purok 1"} • {item.timeAgo || "Recently"}
                    </span>
                  </div>
                </div>

                {/* Right: Status & Chevron */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${badge}`}
                  >
                    <StatusIcon className="w-3 h-3" />
                    <span>{item.status}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
