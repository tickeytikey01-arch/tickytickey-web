"use client";

import { BhwAvailabilityItem } from "@/types/appointment";
import { ArrowRight, Users } from "lucide-react";

interface BhwAvailabilityCardProps {
  staff?: BhwAvailabilityItem[];
  onViewAll?: () => void;
}

export default function BhwAvailabilityCard({
  staff,
  onViewAll,
}: BhwAvailabilityCardProps) {
  const defaultStaff: BhwAvailabilityItem[] = [
    {
      id: "bhw-1",
      name: "Ana Reyes",
      activeSlots: 5,
      totalSlots: 6,
      percentage: 83,
      status: "available",
    },
    {
      id: "bhw-2",
      name: "Lito Cruz",
      activeSlots: 4,
      totalSlots: 6,
      percentage: 67,
      status: "available",
    },
    {
      id: "bhw-3",
      name: "May Castro",
      activeSlots: 3,
      totalSlots: 6,
      percentage: 50,
      status: "available",
    },
    {
      id: "bhw-4",
      name: "Rosa Alvero",
      activeSlots: 5,
      totalSlots: 6,
      percentage: 83,
      status: "available",
    },
  ];

  const items = staff || defaultStaff;

  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-green-100/70 text-[#246b38] flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <h3 className="text-base font-black text-gray-900">
            BHW Availability
          </h3>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#246b38] hover:text-[#133d23] transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Staff Availability Meters */}
      <div className="pt-3.5 space-y-3">
        {items.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between gap-3 text-xs"
          >
            {/* Status Dot + Name */}
            <div className="flex items-center gap-2 min-w-[110px]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#246b38] flex-shrink-0 ring-2 ring-green-100" />
              <span className="font-bold text-gray-800 truncate">
                {member.name}
              </span>
            </div>

            {/* Slots Counter */}
            <div className="text-[11px] font-semibold text-gray-500 whitespace-nowrap min-w-[65px] text-right">
              {member.activeSlots} / {member.totalSlots} slots
            </div>

            {/* Progress Meter Bar */}
            <div className="flex-1 max-w-[140px] h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#246b38] rounded-full transition-all duration-300"
                style={{ width: `${member.percentage}%` }}
              />
            </div>

            {/* Percentage Value */}
            <div className="w-9 text-right font-bold text-gray-700 text-[11px]">
              {member.percentage}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
