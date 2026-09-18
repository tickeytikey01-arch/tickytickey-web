"use client";

import { AlertTriangle, Check, Clock, X } from "lucide-react";
import { useState } from "react";

interface BlockTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmBlock: (details: { reason: string; date: string; timeRange: string }) => void;
}

export default function BlockTimeModal({
  isOpen,
  onClose,
  onConfirmBlock,
}: BlockTimeModalProps) {
  const [reason, setReason] = useState("Weekly Clinic Sanitization & Disinfection");
  const [date, setDate] = useState("2025-04-26");
  const [timeRange, setTimeRange] = useState("12:00 PM - 01:30 PM");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmBlock({ reason, date, timeRange });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5" />
            <div>
              <h2 className="text-lg font-black">Block Time Slot</h2>
              <p className="text-xs text-blue-100">Reserve clinic hours for internal activities.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-gray-700 block">Reason for Blocking</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="Weekly Clinic Sanitization & Disinfection">
                Weekly Clinic Sanitization & Disinfection
              </option>
              <option value="BHW Assembly & Health Staff Meeting">
                BHW Assembly & Health Staff Meeting
              </option>
              <option value="Doctor On Official Barangay Mission">
                Doctor On Official Barangay Mission
              </option>
              <option value="Medical Supply Inventory Audit">
                Medical Supply Inventory Audit
              </option>
              <option value="National Holiday / Barangay Fiesta">
                National Holiday / Barangay Fiesta
              </option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-gray-700 block">Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-gray-700 block">Time Duration</label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
                <option value="12:00 PM - 01:30 PM">12:00 PM - 01:30 PM (Lunch Break)</option>
                <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM</option>
                <option value="All Day (Closed)">All Day (Closed)</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-2.5 text-amber-800 text-[11px]">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>
              Residents attempting to book during this period will be automatically redirected to adjacent available slots.
            </span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Block Time Slot</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
