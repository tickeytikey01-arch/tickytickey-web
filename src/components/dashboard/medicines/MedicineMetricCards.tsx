"use client";

import { MedicineStats } from "@/types/medicine";
import { AlertTriangle, ArrowUpRight, Clock, Pill, Tag } from "lucide-react";

interface MetricCardsProps {
  stats?: Partial<MedicineStats>;
}

export default function MedicineMetricCards({ stats }: MetricCardsProps) {
  const data: MedicineStats = {
    totalMedicines: stats?.totalMedicines ?? 58,
    totalChange: stats?.totalChange ?? "+ 8 this month",
    lowStock: stats?.lowStock ?? 6,
    symptomTagsCount: stats?.symptomTagsCount ?? 12,
    lastUpdated: stats?.lastUpdated ?? "Today",
    lastUpdatedDate: stats?.lastUpdatedDate ?? new Date().toLocaleDateString("en-PH"),
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* 1. Total Medicines */}
      <div className="bg-[#edf7ef]/70 rounded-3xl p-5 border border-green-100/80 shadow-xs flex items-center gap-4 transition-transform hover:-translate-y-0.5">
        <div className="w-13 h-13 rounded-2xl bg-white text-[#246b38] flex items-center justify-center shadow-xs flex-shrink-0 border border-green-100">
          <Pill className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div className="min-w-0">
          <span className="text-xs font-semibold text-gray-500 block truncate">
            Total Medicines
          </span>
          <div className="text-2xl font-black text-gray-900 leading-tight">
            {data.totalMedicines}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 mt-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>{data.totalChange}</span>
          </div>
        </div>
      </div>

      {/* 2. Low Stock */}
      <div className="bg-[#fef9f0] rounded-3xl p-5 border border-amber-100/80 shadow-xs flex items-center gap-4 transition-transform hover:-translate-y-0.5">
        <div className="w-13 h-13 rounded-2xl bg-white text-amber-600 flex items-center justify-center shadow-xs flex-shrink-0 border border-amber-100">
          <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div className="min-w-0">
          <span className="text-xs font-semibold text-gray-500 block truncate">
            Low Stock
          </span>
          <div className="text-2xl font-black text-gray-900 leading-tight">
            {data.lowStock}
          </div>
          <span className="text-[11px] font-semibold text-amber-600 block mt-0.5">
            Needs restocking
          </span>
        </div>
      </div>

      {/* 3. Common Symptom Tags */}
      <div className="bg-[#faf6fe] rounded-3xl p-5 border border-purple-100/80 shadow-xs flex items-center gap-4 transition-transform hover:-translate-y-0.5">
        <div className="w-13 h-13 rounded-2xl bg-white text-purple-700 flex items-center justify-center shadow-xs flex-shrink-0 border border-purple-100">
          <Tag className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div className="min-w-0">
          <span className="text-xs font-semibold text-gray-500 block truncate">
            Common Symptom Tags
          </span>
          <div className="text-2xl font-black text-gray-900 leading-tight">
            {data.symptomTagsCount}
          </div>
          <span className="text-[11px] font-medium text-gray-500 block truncate mt-0.5">
            Across all medicines
          </span>
        </div>
      </div>

      {/* 4. Last Updated */}
      <div className="bg-[#f0f7ff] rounded-3xl p-5 border border-blue-100/80 shadow-xs flex items-center gap-4 transition-transform hover:-translate-y-0.5">
        <div className="w-13 h-13 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-xs flex-shrink-0 border border-blue-100">
          <Clock className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div className="min-w-0">
          <span className="text-xs font-semibold text-gray-500 block truncate">
            Last Updated
          </span>
          <div className="text-2xl font-black text-gray-900 leading-tight">
            {data.lastUpdated}
          </div>
          <span className="text-[11px] font-medium text-gray-500 block truncate mt-0.5">
            {data.lastUpdatedDate}
          </span>
        </div>
      </div>
    </div>
  );
}
