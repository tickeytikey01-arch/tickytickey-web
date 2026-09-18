"use client";

import { ReportsMetrics } from "@/types/reports";
import { ArrowDownRight, ArrowUpRight, Calendar, Clock, FileText, Stethoscope } from "lucide-react";

interface Props {
  metrics?: ReportsMetrics;
}

export default function ReportsMetricCards({ metrics }: Props) {
  const defaultMetrics: ReportsMetrics = {
    totalConsultations: 1462,
    consultationsGrowthPercent: 18,
    appointmentCompletionRate: 92,
    appointmentGrowthPercent: 5,
    commonSymptom: "Cough",
    commonSymptomSharePercent: 28,
    avgResponseTime: "14 min",
    avgResponseImprovementPercent: 22,
  };

  const m = metrics || defaultMetrics;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Consultations */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs hover:shadow-xs transition-shadow flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-bold text-gray-500 block">Total Consultations</span>
          <div className="text-2xl sm:text-3xl font-black text-[#133d23] tracking-tight">
            {m.totalConsultations.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#15803d]">
            <ArrowUpRight className="w-3.5 h-3.5 text-[#15803d]" />
            <span>{m.consultationsGrowthPercent}%</span>
            <span className="text-gray-400 font-normal">vs. last month</span>
          </div>
        </div>

        <div className="w-13 h-13 rounded-2xl bg-[#e8f5e9] text-[#246b38] flex items-center justify-center flex-shrink-0 border border-green-100">
          <Stethoscope className="w-6 h-6" />
        </div>
      </div>

      {/* 2. Appointment Completion Rate */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs hover:shadow-xs transition-shadow flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-bold text-gray-500 block">Appointment Completion Rate</span>
          <div className="text-2xl sm:text-3xl font-black text-[#133d23] tracking-tight">
            {m.appointmentCompletionRate}%
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#15803d]">
            <ArrowUpRight className="w-3.5 h-3.5 text-[#15803d]" />
            <span>{m.appointmentGrowthPercent}%</span>
            <span className="text-gray-400 font-normal">vs. last month</span>
          </div>
        </div>

        <div className="w-13 h-13 rounded-2xl bg-[#e0f2f1] text-[#00695c] flex items-center justify-center flex-shrink-0 border border-teal-100">
          <Calendar className="w-6 h-6" />
        </div>
      </div>

      {/* 3. Common Symptom This Month */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs hover:shadow-xs transition-shadow flex items-center justify-between">
        <div className="space-y-1">
          <div>
            <span className="text-xs font-bold text-gray-500 block">Common Symptom</span>
            <span className="text-[10px] font-semibold text-gray-400">This Month</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#133d23] tracking-tight">
            {m.commonSymptom}
          </div>
          <div className="text-[11px] font-semibold text-gray-400">
            {m.commonSymptomSharePercent}% of inquiries
          </div>
        </div>

        <div className="w-13 h-13 rounded-2xl bg-[#fff3e0] text-[#e65100] flex items-center justify-center flex-shrink-0 border border-amber-100">
          <FileText className="w-6 h-6" />
        </div>
      </div>

      {/* 4. Average Response Time */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs hover:shadow-xs transition-shadow flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-bold text-gray-500 block">Average Response Time</span>
          <div className="text-2xl sm:text-3xl font-black text-[#133d23] tracking-tight">
            {m.avgResponseTime}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#15803d]">
            <ArrowDownRight className="w-3.5 h-3.5 text-[#15803d]" />
            <span>{m.avgResponseImprovementPercent}%</span>
            <span className="text-gray-400 font-normal">vs. last month</span>
          </div>
        </div>

        <div className="w-13 h-13 rounded-2xl bg-[#ede7f6] text-[#512da8] flex items-center justify-center flex-shrink-0 border border-purple-100">
          <Clock className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
