"use client";

import { CalendarAppointment } from "@/types/appointment";
import { Calendar, ChevronRight, User } from "lucide-react";

interface DailyScheduleListProps {
  selectedDate: string; // "2025-04-26"
  appointments: CalendarAppointment[];
  onSelectAppointment: (appointment: CalendarAppointment) => void;
}

export default function DailyScheduleList({
  selectedDate,
  appointments,
  onSelectAppointment,
}: DailyScheduleListProps) {
  const formattedDate = (() => {
    try {
      const [y, m, d] = selectedDate.split("-").map(Number);
      const dateObj = new Date(y, m - 1, d);
      return dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return selectedDate;
    }
  })();

  const isToday = selectedDate === new Date().toISOString().slice(0, 10);

  const getStatusBadge = (status: CalendarAppointment["status"]) => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "Walk-in":
        return "bg-sky-50 text-sky-700 border border-sky-200";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 border border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  const getDotBg = (dot: CalendarAppointment["dotColor"]) => {
    switch (dot) {
      case "green":
        return "bg-emerald-500";
      case "orange":
        return "bg-amber-500";
      case "blue":
        return "bg-blue-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-xs flex flex-col h-full min-h-0 justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#246b38]" />
          <h3 className="text-base sm:text-lg font-black text-gray-900">
            Schedule for {formattedDate}
          </h3>
        </div>

        {isToday && (
          <span className="px-3 py-1 rounded-full text-xs font-bold text-emerald-800 bg-[#edf7ef] border border-green-200">
            Today
          </span>
        )}
      </div>

      {/* Timeline Schedule Items */}
      <div className="pt-4 flex-1 min-h-0 overflow-y-auto overscroll-contain space-y-3.5 scrollbar-thin">
        {appointments.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-xs">
            No appointments scheduled for {formattedDate}.
          </div>
        ) : (
          appointments.map((item) => {
            const [timeVal, timePeriod] = item.time.split(" ");
            return (
              <div
                key={item.id}
                onClick={() => onSelectAppointment(item)}
                className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3.5 rounded-2xl hover:bg-gray-50/80 border border-transparent hover:border-gray-200 transition-all cursor-pointer group"
              >
                {/* Time Display */}
                <div className="w-14 sm:w-16 flex-shrink-0 text-right">
                  <div className="text-xs sm:text-[13px] font-black text-gray-900 leading-tight">
                    {timeVal}
                  </div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase">
                    {timePeriod}
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="flex items-center justify-center flex-shrink-0">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${getDotBg(
                      item.dotColor
                    )} ring-4 ring-white shadow-2xs`}
                  />
                </div>

                {/* Patient / Resident Card Box */}
                <div className="flex-1 min-w-0 bg-[#fbfdfc] group-hover:bg-white rounded-2xl p-2.5 sm:p-3 border border-gray-100/90 shadow-2xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Avatar */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#dcf0dd] text-[#1c552c] font-black text-xs sm:text-sm flex items-center justify-center flex-shrink-0">
                      {item.initials}
                    </div>

                    {/* Patient Name & Service */}
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                        {item.residentName}
                      </div>
                      <div className="text-[11px] text-gray-500 truncate">
                        {item.service}
                      </div>
                    </div>
                  </div>

                  {/* Assigned BHW + Status Badge + Chevron */}
                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <div className="hidden md:flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <span>{item.assignedBhw}</span>
                    </div>

                    <span
                      className={`text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full ${getStatusBadge(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>

                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
