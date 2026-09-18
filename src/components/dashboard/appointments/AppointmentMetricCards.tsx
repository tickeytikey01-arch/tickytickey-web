"use client";

import { ScheduleStats } from "@/types/appointment";
import { ArrowUpRight, Calendar, Clock, Info, UserCheck, Users } from "lucide-react";

interface MetricCardsProps {
  stats?: Partial<ScheduleStats>;
}

export default function AppointmentMetricCards({ stats }: MetricCardsProps) {
  const data: ScheduleStats = {
    todayAppointments: stats?.todayAppointments ?? 32,
    todayChange: stats?.todayChange ?? "+14% from yesterday",
    pendingRequests: stats?.pendingRequests ?? 11,
    pendingChange: stats?.pendingChange ?? "+3% from yesterday",
    confirmedAppointments: stats?.confirmedAppointments ?? 18,
    confirmedChange: stats?.confirmedChange ?? "+20% from yesterday",
    availableBhwSlots: stats?.availableBhwSlots ?? 7,
    totalBhwSlots: stats?.totalBhwSlots ?? 25,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* 1. Today's Appointments */}
      <div className="bg-[#edf7ef]/70 rounded-3xl p-5 border border-green-100/80 shadow-xs flex items-center gap-4 transition-transform hover:-translate-y-0.5">
        <div className="w-13 h-13 rounded-2xl bg-white text-[#246b38] flex items-center justify-center shadow-xs flex-shrink-0 border border-green-100">
          <Calendar className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div className="min-w-0">
          <span className="text-xs font-semibold text-gray-500 block truncate">
            Today&apos;s Appointments
          </span>
          <div className="text-2xl font-black text-gray-900 leading-tight">
            {data.todayAppointments}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 mt-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>{data.todayChange}</span>
          </div>
        </div>
      </div>

      {/* 2. Pending Requests */}
      <div className="bg-[#fef9f0] rounded-3xl p-5 border border-amber-100/80 shadow-xs flex items-center gap-4 transition-transform hover:-translate-y-0.5">
        <div className="w-13 h-13 rounded-2xl bg-white text-amber-600 flex items-center justify-center shadow-xs flex-shrink-0 border border-amber-100">
          <Clock className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div className="min-w-0">
          <span className="text-xs font-semibold text-gray-500 block truncate">
            Pending Requests
          </span>
          <div className="text-2xl font-black text-gray-900 leading-tight">
            {data.pendingRequests}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 mt-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>{data.pendingChange}</span>
          </div>
        </div>
      </div>

      {/* 3. Confirmed Appointments */}
      <div className="bg-[#edf7ef]/70 rounded-3xl p-5 border border-green-100/80 shadow-xs flex items-center gap-4 transition-transform hover:-translate-y-0.5">
        <div className="w-13 h-13 rounded-2xl bg-white text-[#246b38] flex items-center justify-center shadow-xs flex-shrink-0 border border-green-100">
          <Users className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div className="min-w-0">
          <span className="text-xs font-semibold text-gray-500 block truncate">
            Confirmed Appointments
          </span>
          <div className="text-2xl font-black text-gray-900 leading-tight">
            {data.confirmedAppointments}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 mt-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>{data.confirmedChange}</span>
          </div>
        </div>
      </div>

      {/* 4. Available BHW Slots */}
      <div className="bg-[#faf6fe] rounded-3xl p-5 border border-purple-100/80 shadow-xs flex items-center gap-4 transition-transform hover:-translate-y-0.5">
        <div className="w-13 h-13 rounded-2xl bg-white text-purple-700 flex items-center justify-center shadow-xs flex-shrink-0 border border-purple-100">
          <UserCheck className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold text-gray-500 block truncate">
              Available BHW Slots
            </span>
            <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-purple-600" />
          </div>
          <div className="text-2xl font-black text-gray-900 leading-tight">
            {data.availableBhwSlots}
          </div>
          <span className="text-[11px] font-medium text-gray-500 block truncate mt-0.5">
            out of {data.totalBhwSlots} total slots
          </span>
        </div>
      </div>
    </div>
  );
}
