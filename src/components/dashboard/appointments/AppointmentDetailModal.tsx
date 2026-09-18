"use client";

import { CalendarAppointment } from "@/types/appointment";
import { Ban, Calendar, Check, Clock, MapPin, Phone, X } from "lucide-react";

interface AppointmentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: CalendarAppointment | null;
  onStatusChange: (id: string, status: CalendarAppointment["status"]) => void;
}

export default function AppointmentDetailModal({
  isOpen,
  onClose,
  appointment,
  onStatusChange,
}: AppointmentDetailModalProps) {
  if (!isOpen || !appointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#133d23] to-[#246b38] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#dcf0dd] text-[#1c552c] font-black text-sm flex items-center justify-center">
              {appointment.initials}
            </div>
            <div>
              <h2 className="text-base font-black">{appointment.residentName}</h2>
              <p className="text-xs text-green-100">{appointment.service}</p>
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
        <div className="p-5 space-y-4 text-xs">
          {/* Status & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-[10px] text-gray-400 font-bold block mb-1">Appointment Time</span>
              <div className="flex items-center gap-1.5 font-bold text-gray-800">
                <Clock className="w-3.5 h-3.5 text-[#246b38]" />
                <span>{appointment.time}</span>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-[10px] text-gray-400 font-bold block mb-1">Date</span>
              <div className="flex items-center gap-1.5 font-bold text-gray-800">
                <Calendar className="w-3.5 h-3.5 text-[#246b38]" />
                <span>{appointment.date}</span>
              </div>
            </div>
          </div>

          {/* Assigned BHW */}
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 font-bold block mb-1">Assigned Health Worker</span>
              <div className="font-bold text-gray-800">{appointment.assignedBhw}</div>
            </div>
            <span
              className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                appointment.status === "Confirmed"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : appointment.status === "Pending"
                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                  : "bg-sky-50 text-sky-700 border border-sky-200"
              }`}
            >
              {appointment.status}
            </span>
          </div>

          {/* Contact Details */}
          <div className="p-3 bg-green-50/50 rounded-2xl border border-green-100 space-y-1.5">
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <Phone className="w-3.5 h-3.5 text-[#246b38]" />
              <span>{appointment.contact || "0917 456 7890 (SMS Enabled)"}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#246b38]" />
              <span>{appointment.purok || "Purok 2, Barangay Health Station Zone"}</span>
            </div>
          </div>

          {/* Notes */}
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
            <span className="text-[10px] text-gray-400 font-bold block mb-1">Clinical Notes</span>
            <p className="text-gray-600 leading-relaxed">
              {appointment.notes || "Regular scheduled checkup. Resident advised to arrive 10 minutes early."}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                onStatusChange(appointment.id, "Cancelled");
                onClose();
              }}
              className="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Ban className="w-3.5 h-3.5" />
              <span>Cancel</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold"
              >
                Close
              </button>
              {appointment.status !== "Confirmed" && (
                <button
                  type="button"
                  onClick={() => {
                    onStatusChange(appointment.id, "Confirmed");
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl bg-[#246b38] hover:bg-[#1a552b] text-white font-bold flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Confirm Slot</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
