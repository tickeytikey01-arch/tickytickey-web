"use client";

import { BhwAvailabilityItem } from "@/types/appointment";
import { Check, ShieldCheck, Users, X } from "lucide-react";
import { useState } from "react";

interface ManageBhwModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: BhwAvailabilityItem[];
  onUpdateStaff: (staff: BhwAvailabilityItem[]) => void;
}

export default function ManageBhwModal({
  isOpen,
  onClose,
  staff,
  onUpdateStaff,
}: ManageBhwModalProps) {
  const [currentStaff, setCurrentStaff] = useState<BhwAvailabilityItem[]>(staff);

  if (!isOpen) return null;

  const handleAdjustSlot = (id: string, delta: number) => {
    setCurrentStaff((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newActive = Math.max(0, Math.min(item.totalSlots, item.activeSlots + delta));
          const newPercentage = Math.round((newActive / item.totalSlots) * 100);
          return {
            ...item,
            activeSlots: newActive,
            percentage: newPercentage,
          };
        }
        return item;
      })
    );
  };

  const handleSave = () => {
    onUpdateStaff(currentStaff);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-purple-800 to-indigo-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5" />
            <div>
              <h2 className="text-lg font-black">Manage BHW Schedules & Shifts</h2>
              <p className="text-xs text-purple-200">Adjust daily capacity and assign duty slots.</p>
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

        {/* Staff List */}
        <div className="p-5 space-y-3.5 text-xs">
          {currentStaff.map((member) => (
            <div
              key={member.id}
              className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 font-black flex items-center justify-center text-xs">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{member.name}</div>
                  <div className="text-[11px] text-gray-500">
                    {member.activeSlots} of {member.totalSlots} slots assigned ({member.percentage}%)
                  </div>
                </div>
              </div>

              {/* Adjust slot buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleAdjustSlot(member.id, -1)}
                  disabled={member.activeSlots <= 0}
                  className="w-7 h-7 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 font-bold flex items-center justify-center disabled:opacity-30 cursor-pointer"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold text-gray-800">
                  {member.activeSlots}
                </span>
                <button
                  type="button"
                  onClick={() => handleAdjustSlot(member.id, 1)}
                  disabled={member.activeSlots >= member.totalSlots}
                  className="w-7 h-7 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 font-bold flex items-center justify-center disabled:opacity-30 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 flex items-center gap-2 text-purple-800 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-purple-600 flex-shrink-0" />
            <span>Duty quotas comply with Barangay Health Station staffing standards.</span>
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
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold shadow-xs transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Schedule</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
