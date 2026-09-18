"use client";

import { HealthRecordMetrics } from "@/types/record";
import { FolderHeart, Pill, ShieldCheck, Syringe } from "lucide-react";

interface HealthRecordMetricCardsProps {
  metrics: HealthRecordMetrics;
}

export default function HealthRecordMetricCards({ metrics }: HealthRecordMetricCardsProps) {
  const cards = [
    {
      label: "Total Resident EHRs",
      value: metrics.totalRecords.toLocaleString(),
      change: "+18 new this month",
      icon: FolderHeart,
      iconBg: "bg-[#edf7ef]",
      iconColor: "text-[#246b38]",
      badgeBg: "bg-green-100 text-green-800",
    },
    {
      label: "PhilHealth Enrolled",
      value: metrics.philHealthEnrolled.toLocaleString(),
      change: "85% coverage rate",
      icon: ShieldCheck,
      iconBg: "bg-[#e8f5e9]",
      iconColor: "text-[#1b5e20]",
      badgeBg: "bg-emerald-100 text-emerald-800",
    },
    {
      label: "Active Maintenance Plans",
      value: metrics.activeMaintenancePlans.toLocaleString(),
      change: "Hypertension & Diabetes",
      icon: Pill,
      iconBg: "bg-[#e0f2f1]",
      iconColor: "text-[#00695c]",
      badgeBg: "bg-teal-100 text-teal-800",
    },
    {
      label: "Immunization Passports",
      value: metrics.immunizationPassports.toLocaleString(),
      change: "Pediatric & Senior verified",
      icon: Syringe,
      iconBg: "bg-[#f1f8e9]",
      iconColor: "text-[#33691e]",
      badgeBg: "bg-lime-100 text-lime-800",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-3xl p-5 border border-green-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-11 h-11 rounded-2xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shadow-inner`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${card.badgeBg}`}>
                {card.change}
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">{card.label}</p>
              <h3 className="text-2xl font-black text-[#133d23] tracking-tight">{card.value}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
