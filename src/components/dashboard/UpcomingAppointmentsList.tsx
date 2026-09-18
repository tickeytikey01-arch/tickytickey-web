"use client";

import { AppointmentItem } from "@/types/dashboard";
import { ArrowRight, Calendar, User } from "lucide-react";

interface UpcomingAppointmentsListProps {
  appointments: AppointmentItem[];
  onViewAll?: () => void;
}

export default function UpcomingAppointmentsList({
  appointments,
  onViewAll,
}: UpcomingAppointmentsListProps) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-green-50 text-[#246b38] flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-gray-900">Upcoming Appointments</h3>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-bold text-[#246b38] hover:text-[#184e27] inline-flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Appointment items */}
      <div className="space-y-3.5 max-h-[350px] overflow-y-auto overscroll-contain scrollbar-thin pr-1">
        {appointments.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-green-50/40 transition-colors"
          >
            {/* Calendar Date Badge */}
            <div className="w-12 h-12 rounded-2xl bg-[#eef7ef] border border-green-200/80 flex flex-col items-center justify-center flex-shrink-0 leading-none">
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-wider">
                {item.month}
              </span>
              <span className="text-base font-black text-[#1a552b] mt-0.5">
                {item.day}
              </span>
            </div>

            {/* Resident Info & Category */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <h4 className="text-xs font-bold text-gray-900 truncate">
                  {item.residentName}
                </h4>
              </div>
              <p className="text-[11px] text-gray-500 font-medium truncate mt-0.5">
                {item.category}
              </p>
              <p className="text-[10px] text-green-700 font-semibold mt-0.5">
                {item.timeSlot}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
