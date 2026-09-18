"use client";

import { DashboardMetrics } from "@/types/dashboard";
import { Calendar, Stethoscope, UserCheck, Users } from "lucide-react";

interface MetricCardsProps {
  metrics: DashboardMetrics;
}

export default function MetricCards({ metrics }: MetricCardsProps) {
  const cards = [
    {
      title: "Total Residents",
      value: metrics.totalResidents.count.toLocaleString(),
      trend: metrics.totalResidents.trendText,
      trendColor: "text-emerald-600 bg-emerald-50",
      icon: Users,
      iconBg: "bg-[#d7ecd9] text-[#1b5e20]",
      border: "border-green-100",
    },
    {
      title: "Consultations Today",
      value: metrics.consultationsToday.count.toString(),
      trend: metrics.consultationsToday.trendText,
      trendColor: "text-emerald-600 bg-emerald-50",
      icon: Stethoscope,
      iconBg: "bg-[#e1f3fb] text-[#0277bd]",
      border: "border-blue-100",
    },
    {
      title: "Pending Appointments",
      value: metrics.pendingAppointments.count.toString(),
      trend: metrics.pendingAppointments.trendText,
      trendColor: "text-amber-600 bg-amber-50",
      icon: Calendar,
      iconBg: "bg-[#fff3e0] text-[#e65100]",
      border: "border-amber-100",
    },
    {
      title: "Active BHWs",
      value: metrics.activeBHWs.count.toString(),
      trend: metrics.activeBHWs.statusText,
      trendColor: "text-emerald-600 bg-emerald-50",
      icon: UserCheck,
      iconBg: "bg-[#f3e5f5] text-[#6a1b9a]",
      border: "border-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`bg-white rounded-3xl p-5 border ${card.border} shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-between gap-4`}
          >
            <div className="space-y-1">
              <span className="text-xs font-semibold text-gray-500 block">
                {card.title}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                {card.value}
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full mt-1">
                <span className={card.trendColor.split(" ")[0]}>
                  {card.trend.includes("100%") ? "● " : ""}
                  {card.trend}
                </span>
              </div>
            </div>

            <div className={`w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center flex-shrink-0 shadow-2xs`}>
              <Icon className="w-7 h-7" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
