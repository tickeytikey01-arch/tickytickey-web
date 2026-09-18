"use client";

import { UserMetrics } from "@/types/user";
import { ArrowUpRight, ShieldCheck, UserCheck, UserPlus, Users } from "lucide-react";

interface Props {
  metrics?: UserMetrics;
}

export default function UserMetricCards({ metrics }: Props) {
  const m = metrics || {
    totalStaff: 16,
    activeBhws: 12,
    verifiedResidents: 1284,
    pendingApprovals: 3,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Health Staff */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs hover:shadow-xs transition-shadow flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-bold text-gray-500 block">Total Health Staff</span>
          <div className="text-2xl sm:text-3xl font-black text-[#133d23] tracking-tight">
            {m.totalStaff}
          </div>
          <span className="text-[11px] font-semibold text-gray-400">
            Doctors, Nurses &amp; BHWs
          </span>
        </div>
        <div className="w-13 h-13 rounded-2xl bg-green-50 text-[#246b38] flex items-center justify-center flex-shrink-0 border border-green-100">
          <ShieldCheck className="w-6 h-6" />
        </div>
      </div>

      {/* 2. Active BHWs on Duty */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs hover:shadow-xs transition-shadow flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-bold text-gray-500 block">Active BHWs on Duty</span>
          <div className="text-2xl sm:text-3xl font-black text-[#133d23] tracking-tight">
            {m.activeBhws}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#15803d]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>100% active shift today</span>
          </div>
        </div>
        <div className="w-13 h-13 rounded-2xl bg-[#e0f2f1] text-[#00695c] flex items-center justify-center flex-shrink-0 border border-teal-100">
          <UserCheck className="w-6 h-6" />
        </div>
      </div>

      {/* 3. Verified Residents */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs hover:shadow-xs transition-shadow flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-bold text-gray-500 block">Registered Residents</span>
          <div className="text-2xl sm:text-3xl font-black text-[#133d23] tracking-tight">
            {m.verifiedResidents.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#15803d]">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+24 this month</span>
          </div>
        </div>
        <div className="w-13 h-13 rounded-2xl bg-[#eef7ff] text-[#1d4ed8] flex items-center justify-center flex-shrink-0 border border-blue-100">
          <Users className="w-6 h-6" />
        </div>
      </div>

      {/* 4. Pending Registrations */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs hover:shadow-xs transition-shadow flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-bold text-gray-500 block">Pending Approvals</span>
          <div className="text-2xl sm:text-3xl font-black text-[#b45309] tracking-tight">
            {m.pendingApprovals}
          </div>
          <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 inline-block">
            Needs verification
          </span>
        </div>
        <div className="w-13 h-13 rounded-2xl bg-[#fff8ed] text-[#b45309] flex items-center justify-center flex-shrink-0 border border-amber-100">
          <UserPlus className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
