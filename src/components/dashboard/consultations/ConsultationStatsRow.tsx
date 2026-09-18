"use client";

import { CheckCircle2, Clock, MessageSquare, Play, Users } from "lucide-react";

interface StatsRowProps {
  stats: {
    total: number;
    waiting: number;
    active: number;
    replied: number;
    resolved: number;
  };
  activeFilter?: string;
  onSelectFilter?: (filter: string) => void;
}

export default function ConsultationStatsRow({
  stats,
  activeFilter,
  onSelectFilter,
}: StatsRowProps) {
  const cards = [
    {
      id: "all",
      label: "Total Consultations",
      count: stats.total,
      subtext: "↑ 12% from last month",
      icon: Users,
      bg: "bg-[#edf7ee]",
      border: "border-[#cbe6cf]",
      iconBg: "bg-[#dcf0dd] text-[#1c552c]",
      numberColor: "text-[#133d23]",
      subtextColor: "text-[#1c552c]",
    },
    {
      id: "waiting",
      label: "Waiting",
      count: stats.waiting,
      subtext: "14%",
      icon: Clock,
      bg: "bg-[#fef8ed]",
      border: "border-[#fbe4bd]",
      iconBg: "bg-[#fdeece] text-[#b45309]",
      numberColor: "text-[#92400e]",
      subtextColor: "text-[#b45309]",
    },
    {
      id: "active",
      label: "Active",
      count: stats.active,
      subtext: "19%",
      icon: Play,
      bg: "bg-[#edf9f0]",
      border: "border-[#bfe8cb]",
      iconBg: "bg-[#d6f5de] text-[#15803d]",
      numberColor: "text-[#14532d]",
      subtextColor: "text-[#15803d]",
    },
    {
      id: "replied",
      label: "Replied",
      count: stats.replied,
      subtext: "↑ 28%",
      icon: MessageSquare,
      bg: "bg-[#edf6fe]",
      border: "border-[#c0e0fc]",
      iconBg: "bg-[#d4ebfd] text-[#1d4ed8]",
      numberColor: "text-[#1e40af]",
      subtextColor: "text-[#2563eb]",
    },
    {
      id: "resolved",
      label: "Resolved",
      count: stats.resolved,
      subtext: "↑ 28%",
      icon: CheckCircle2,
      bg: "bg-[#f5eefb]",
      border: "border-[#e2cef6]",
      iconBg: "bg-[#ecdcfa] text-[#7e22ce]",
      numberColor: "text-[#581c87]",
      subtextColor: "text-[#7e22ce]",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-6">
      {cards.map((c) => {
        const Icon = c.icon;
        const isSelected = activeFilter?.toLowerCase() === c.id;

        return (
          <div
            key={c.id}
            onClick={() => onSelectFilter && onSelectFilter(c.id === "all" ? "All" : c.label)}
            className={`p-4 rounded-2xl border ${c.bg} ${c.border} transition-all duration-200 cursor-pointer hover:shadow-xs hover:scale-[1.01] ${
              isSelected ? "ring-2 ring-[#246b38] shadow-xs" : ""
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-8 h-8 rounded-xl ${c.iconBg} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-bold text-gray-700 leading-tight line-clamp-1">
                {c.label}
              </div>
            </div>

            <div className="flex items-baseline justify-between mt-1">
              <span className={`text-2xl sm:text-3xl font-black ${c.numberColor} tracking-tight`}>
                {c.count}
              </span>
              <span className={`text-[10px] font-bold ${c.subtextColor}`}>
                {c.subtext}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
