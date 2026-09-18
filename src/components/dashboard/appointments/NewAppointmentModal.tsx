"use client";

import { CalendarAppointment } from "@/types/appointment";
import { Check, X } from "lucide-react";
import { useState } from "react";

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDate?: string;
  onAddAppointment: (appointment: CalendarAppointment) => void;
  healthWorkers?: string[];
}

export default function NewAppointmentModal({
  isOpen,
  onClose,
  defaultDate = new Date().toISOString().slice(0, 10),
  onAddAppointment,
  healthWorkers = [],
}: NewAppointmentModalProps) {
  const [residentName, setResidentName] = useState("");
  const [service, setService] = useState("General Check-up");
  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState("09:00 AM");
  const [assignedBhw, setAssignedBhw] = useState(healthWorkers[0] ?? "Unassigned");
  const [status, setStatus] = useState<CalendarAppointment["status"]>("Confirmed");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!residentName.trim()) return;

    const initials = residentName
      .trim()
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    const newAppt: CalendarAppointment = {
      id: `appt-${Date.now()}`,
      residentName: residentName.trim(),
      initials,
      service,
      date,
      time,
      assignedBhw,
      status,
      dotColor: status === "Confirmed" ? "green" : status === "Pending" ? "orange" : "blue",
      notes: notes.trim(),
    };

    onAddAppointment(newAppt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#133d23] to-[#246b38] text-white flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black">Book New Appointment</h2>
            <p className="text-xs text-green-100">Schedule clinic consultation or medical mission.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Resident Name */}
          <div className="space-y-1">
            <label className="font-bold text-gray-700 block">Resident Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Maria Santos"
              value={residentName}
              onChange={(e) => setResidentName(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3fa04e]"
            />
          </div>

          {/* Service Category */}
          <div className="space-y-1">
            <label className="font-bold text-gray-700 block">Medical Service</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3fa04e] bg-white"
            >
              <option value="General Check-up">General Check-up</option>
              <option value="Child Immunization">Child Immunization</option>
              <option value="Prenatal Check-up">Prenatal Check-up</option>
              <option value="Follow-up Consultation">Follow-up Consultation</option>
              <option value="Family Planning">Family Planning</option>
              <option value="Senior Health Wellness">Senior Health Wellness</option>
              <option value="Dental Examination">Dental Examination</option>
            </select>
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-gray-700 block">Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3fa04e] bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-gray-700 block">Time Slot</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3fa04e] bg-white"
              >
                <option value="08:00 AM">08:00 AM</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="09:30 AM">09:30 AM</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="01:00 PM">01:00 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:30 PM">03:30 PM</option>
                <option value="04:00 PM">04:00 PM</option>
              </select>
            </div>
          </div>

          {/* Assigned BHW */}
          <div className="space-y-1">
            <label className="font-bold text-gray-700 block">Assigned Health Worker</label>
            <select
              value={assignedBhw}
              onChange={(e) => setAssignedBhw(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3fa04e] bg-white"
            >
              <option value="Unassigned">Unassigned</option>
              {healthWorkers.map((name) => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className="font-bold text-gray-700 block">Initial Status</label>
            <div className="flex gap-2">
              {(["Confirmed", "Pending", "Walk-in"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                    status === s
                      ? "bg-green-50 border-[#246b38] text-[#133d23] shadow-2xs"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-1">
            <label className="font-bold text-gray-700 block">Notes / Reason (Optional)</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Regular monthly prenatal check, bring baby book..."
              className="w-full p-3 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3fa04e] resize-none"
            />
          </div>

          {/* Buttons */}
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
              <span>Confirm Appointment</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
