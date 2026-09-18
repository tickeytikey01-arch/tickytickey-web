"use client";

import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface CalendarViewProps {
  selectedDate: string; // e.g. "2025-04-26"
  onSelectDate: (date: string) => void;
  dayDots?: Record<number, ("green" | "orange" | "blue")[]>;
}

export default function CalendarView({
  selectedDate,
  onSelectDate,
  dayDots,
}: CalendarViewProps) {
  const initialDate = new Date(`${selectedDate}T00:00:00`);
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const activeDots = dayDots ?? {};

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleGoToday = () => {
    const today = new Date();
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    onSelectDate(today.toISOString().slice(0, 10));
  };

  // First day of current month:
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  // Grid building: 5 or 6 weeks (35 or 42 cells)
  const prevDays = [];
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    prevDays.push(daysInPrevMonth - i);
  }

  const currentDays = [];
  for (let d = 1; d <= daysInMonth; d++) {
    currentDays.push(d);
  }

  const totalFilled = prevDays.length + currentDays.length;
  const nextDays = [];
  const remainingCells = totalFilled <= 35 ? 35 - totalFilled : 42 - totalFilled;
  for (let d = 1; d <= remainingCells; d++) {
    nextDays.push(d);
  }

  const selectedDayNum =
    selectedDate.startsWith(
      `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`
    )
      ? parseInt(selectedDate.split("-")[2], 10)
      : null;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-xs flex flex-col h-full">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 gap-2">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-[#246b38]" />
          <h3 className="text-base sm:text-lg font-black text-gray-900">
            Calendar View
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Month / Year Navigator */}
          <div className="flex items-center bg-gray-50 border border-gray-200/80 rounded-2xl px-1.5 py-1">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-white transition-colors cursor-pointer"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs sm:text-sm font-bold text-gray-800 px-3 min-w-[100px] text-center select-none">
              {monthNames[currentMonth]} {currentYear}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-white transition-colors cursor-pointer"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Today Button */}
          <button
            type="button"
            onClick={handleGoToday}
            className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer shadow-2xs"
          >
            Today
          </button>
        </div>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 pt-4 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-[11px] sm:text-xs font-semibold text-gray-400 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 pt-2 flex-1 items-stretch">
        {/* Previous Month Days */}
        {prevDays.map((d, idx) => (
          <div
            key={`prev-${idx}`}
            className="h-11 sm:h-12 flex flex-col items-center justify-center text-xs text-gray-300 select-none"
          >
            {d}
          </div>
        ))}

        {/* Current Month Days */}
        {currentDays.map((d) => {
          const isSelected = selectedDayNum === d;
          const dots = activeDots[d] || [];
          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
            2,
            "0"
          )}-${String(d).padStart(2, "0")}`;

          return (
            <button
              key={`curr-${d}`}
              type="button"
              onClick={() => onSelectDate(dateStr)}
              className={`h-11 sm:h-12 rounded-2xl flex flex-col items-center justify-center relative transition-all cursor-pointer select-none group ${
                isSelected
                  ? "bg-[#dcf0dd] text-[#133d23] font-black ring-2 ring-[#246b38]/40 shadow-xs"
                  : "text-gray-700 hover:bg-gray-50 font-semibold"
              }`}
            >
              <span className="text-xs sm:text-[13px]">{d}</span>

              {/* Event dots */}
              {dots.length > 0 && (
                <div className="flex items-center gap-1 mt-0.5">
                  {dots.map((dot, dotIdx) => (
                    <span
                      key={dotIdx}
                      className={`w-1.5 h-1.5 rounded-full ${
                        dot === "green"
                          ? "bg-emerald-500"
                          : dot === "orange"
                          ? "bg-amber-500"
                          : "bg-blue-500"
                      }`}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}

        {/* Next Month Days */}
        {nextDays.map((d, idx) => (
          <div
            key={`next-${idx}`}
            className="h-11 sm:h-12 flex flex-col items-center justify-center text-xs text-gray-300 select-none"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Legend at Bottom */}
      <div className="pt-4 mt-2 border-t border-gray-100 flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-600">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>Confirmed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span>Pending</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span>Other/Requested</span>
        </div>
      </div>
    </div>
  );
}
