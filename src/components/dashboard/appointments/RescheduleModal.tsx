"use client";

import { AppointmentRequestItem } from "@/types/appointment";
import { Check, X } from "lucide-react";
import { useState } from "react";

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: AppointmentRequestItem | null;
  onConfirmReschedule: (id: string, newTime: string, assignedBhw: string) => void;
}

export default function RescheduleModal({
  isOpen,
  onClose,
  request,
  onConfirmReschedule,
}: RescheduleModalProps) {
  const [newDate, setNewDate] = useState("2025-04-30");
  const [newTime, setNewTime] = useState("10:00 AM");
  const [assignedBhw, setAssignedBhw] = useState("BHW Ana Reyes");

  if (!isOpen || !request) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = `${newDate} ${newTime}`;
    onConfirmReschedule(request.id, formatted, assignedBhw);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#133d23] to-[#246b38] text-white flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black">Reschedule Appointment</h2>
            <p className="text-xs text-green-100">Set a new consultation slot for {request.residentName}.</p>
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
        <form onSubmit={handleConfirm} className="p-5 space-y-4 text-xs">
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Resident:</span>
              <span className="font-bold text-gray-900">{request.residentName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Service:</span>
              <span className="font-bold text-[#1a552b]">{request.serviceType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Original Slot:</span>
              <span className="font-bold text-amber-700">{request.preferredTime}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-gray-700 block">New Date</label>
              <input
                type="date"
                required
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3fa04e] bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-gray-700 block">New Time</label>
              <select
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3fa04e] bg-white"
              >
                <option value="08:30 AM">08:30 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="01:30 PM">01:30 PM</option>
                <option value="03:00 PM">03:00 PM</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700 block">Assigned Health Worker</label>
            <select
              value={assignedBhw}
              onChange={(e) => setAssignedBhw(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3fa04e] bg-white"
            >
              <option value="BHW Ana Reyes">BHW Ana Reyes</option>
              <option value="BHW Lito Cruz">BHW Lito Cruz</option>
              <option value="BHW May Castro">BHW May Castro</option>
              <option value="BHW Rosa Alvero">BHW Rosa Alvero</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-gray-600 font-medium pt-1 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="rounded text-[#246b38] focus:ring-[#246b38]"
            />
            <span>Send automated SMS notification to resident</span>
          </label>

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
              className="px-5 py-2 rounded-xl bg-[#246b38] hover:bg-[#1a552b] text-white font-bold shadow-xs transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Update Schedule</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
