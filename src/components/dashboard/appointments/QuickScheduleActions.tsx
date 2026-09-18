"use client";

import { CalendarPlus, Clock, Download, Users, Zap } from "lucide-react";

interface QuickActionsProps {
  onNewAppointment: () => void;
  onBlockTimeSlot: () => void;
  onManageBhw: () => void;
  onExportSchedule: () => void;
}

export default function QuickScheduleActions({
  onNewAppointment,
  onBlockTimeSlot,
  onManageBhw,
  onExportSchedule,
}: QuickActionsProps) {
  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3.5 border-b border-gray-100">
        <Zap className="w-4 h-4 text-[#246b38] fill-[#246b38]" />
        <h3 className="text-base font-black text-gray-900">
          Quick Schedule Actions
        </h3>
      </div>

      {/* 4 Action Tiles Grid */}
      <div className="pt-3.5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* 1. New Appointment */}
        <button
          type="button"
          onClick={onNewAppointment}
          className="p-3 rounded-2xl bg-[#edf7ef]/90 hover:bg-[#dcf0dd] border border-green-100 text-left transition-all group flex flex-col items-center justify-center text-center cursor-pointer shadow-2xs hover:shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-white text-[#246b38] flex items-center justify-center mb-2 shadow-2xs group-hover:scale-105 transition-transform border border-green-100">
            <CalendarPlus className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-black text-gray-900 leading-tight">
            New Appointment
          </span>
        </button>

        {/* 2. Block Time Slot */}
        <button
          type="button"
          onClick={onBlockTimeSlot}
          className="p-3 rounded-2xl bg-[#eff6ff]/90 hover:bg-[#dbeafe] border border-blue-100 text-left transition-all group flex flex-col items-center justify-center text-center cursor-pointer shadow-2xs hover:shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center mb-2 shadow-2xs group-hover:scale-105 transition-transform border border-blue-100">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-black text-gray-900 leading-tight">
            Block Time Slot
          </span>
        </button>

        {/* 3. Manage BHW Schedule */}
        <button
          type="button"
          onClick={onManageBhw}
          className="p-3 rounded-2xl bg-[#f5efff]/90 hover:bg-[#ede0fe] border border-purple-100 text-left transition-all group flex flex-col items-center justify-center text-center cursor-pointer shadow-2xs hover:shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-white text-purple-600 flex items-center justify-center mb-2 shadow-2xs group-hover:scale-105 transition-transform border border-purple-100">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-black text-gray-900 leading-tight">
            Manage BHW Schedule
          </span>
        </button>

        {/* 4. Export Schedule */}
        <button
          type="button"
          onClick={onExportSchedule}
          className="p-3 rounded-2xl bg-[#f8fafc]/90 hover:bg-[#eef2f6] border border-slate-200 text-left transition-all group flex flex-col items-center justify-center text-center cursor-pointer shadow-2xs hover:shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-white text-slate-700 flex items-center justify-center mb-2 shadow-2xs group-hover:scale-105 transition-transform border border-slate-200">
            <Download className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-black text-gray-900 leading-tight">
            Export Schedule
          </span>
        </button>
      </div>
    </div>
  );
}
