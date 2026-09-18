"use client";

import Modal from "@/components/ui/Modal";
import { Settings } from "lucide-react";
import Image from "next/image";

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeUser: {
    id: string;
    name: string;
    role: string;
    avatar: string;
  };
}

export default function ProfileSettingsModal({
  isOpen,
  onClose,
  activeUser,
}: ProfileSettingsModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Profile & Clinic Settings"
      icon={<Settings className="w-5 h-5 text-[#246b38]" />}
    >
      <div className="space-y-4">
        {/* Active Profile Header */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-green-50/70 border border-green-100">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#246b38] flex-shrink-0 bg-white">
            <Image src={activeUser.avatar} alt={activeUser.name} fill className="object-cover" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#133d23]">{activeUser.name}</div>
            <div className="text-xs text-gray-500">{activeUser.role}</div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
              ● Terminal ID: BGY-01-T04
            </div>
          </div>
        </div>

        {/* Settings Fields */}
        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Assigned Station / Health Center
            </label>
            <input
              type="text"
              disabled
              value="Barangay 1 Central Health Center, Pasig City"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 font-medium cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Accreditation ID</label>
              <input
                type="text"
                disabled
                value="DOH-NCR-2025-0819"
                className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 font-medium cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Duty Shift</label>
              <input
                type="text"
                disabled
                value="Morning (08:00 - 17:00)"
                className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 font-medium cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Contact Email / Mobile</label>
            <input
              type="text"
              defaultValue="maria.santos@pasighealth.gov.ph"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-800 font-medium focus:ring-2 focus:ring-[#3fa04e] focus:outline-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full border border-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full bg-[#246b38] text-white text-xs font-bold hover:bg-[#1b552b] shadow-md transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}
