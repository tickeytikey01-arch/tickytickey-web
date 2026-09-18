"use client";

import Modal from "@/components/ui/Modal";
import { ConsultationItem } from "@/types/dashboard";
import { FileSpreadsheet, HeartPulse, MapPin, Phone, Shield, User } from "lucide-react";

interface ResidentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  consultation: ConsultationItem | null;
}

export default function ResidentProfileModal({
  isOpen,
  onClose,
  consultation,
}: ResidentProfileModalProps) {
  if (!consultation) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Resident Health Record"
      maxWidth="max-w-lg"
      icon={<User className="w-5 h-5 text-[#246b38]" />}
    >
      <div className="space-y-4 text-xs">
        {/* Profile Card */}
        <div className="p-4 rounded-2xl bg-green-50/70 border border-green-100 flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-full bg-[#246b38] text-white font-black text-base flex items-center justify-center flex-shrink-0">
            {consultation.initials}
          </div>
          <div>
            <h4 className="text-base font-bold text-gray-900 leading-tight">
              {consultation.residentName}
            </h4>
            <div className="text-gray-500 font-medium text-xs mt-0.5">
              {consultation.gender || "Resident"} • {consultation.age ? `${consultation.age} years old` : "Adult"}
            </div>
            <div className="text-[11px] text-emerald-700 font-bold mt-1 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>PhilHealth ID: PH-2025-{consultation.id.toUpperCase()}-882</span>
            </div>
          </div>
        </div>

        {/* Contact & Demographics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-[10px] text-gray-400 font-bold block mb-1">Mobile Contact</span>
            <div className="flex items-center gap-1.5 font-bold text-gray-800">
              <Phone className="w-3.5 h-3.5 text-[#246b38]" />
              <span>{consultation.phone || "0917 123 4567"}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-[10px] text-gray-400 font-bold block mb-1">Barangay Zone</span>
            <div className="flex items-center gap-1.5 font-bold text-gray-800">
              <MapPin className="w-3.5 h-3.5 text-[#246b38]" />
              <span>{consultation.purok || "Purok 3"}, Barangay 1</span>
            </div>
          </div>
        </div>

        {/* Health History */}
        <div className="p-3.5 rounded-2xl border border-gray-100 bg-white space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#133d23]">
            <HeartPulse className="w-4 h-4 text-[#246b38]" />
            <span>Clinical Vitals & Past Records</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="p-2 rounded-xl bg-gray-50">
              <div className="text-[10px] text-gray-400">Blood Pressure</div>
              <div className="font-bold text-gray-800 text-xs">120/80 mmHg</div>
            </div>
            <div className="p-2 rounded-xl bg-gray-50">
              <div className="text-[10px] text-gray-400">Blood Type</div>
              <div className="font-bold text-gray-800 text-xs">O Positive</div>
            </div>
            <div className="p-2 rounded-xl bg-gray-50">
              <div className="text-[10px] text-gray-400">Last Clinic Visit</div>
              <div className="font-bold text-gray-800 text-xs">Mar 12, 2025</div>
            </div>
          </div>
        </div>

        {/* Past Consultations */}
        <div className="p-3.5 rounded-2xl border border-gray-100 bg-white space-y-2">
          <div className="flex items-center justify-between font-bold text-gray-800">
            <div className="flex items-center gap-2 text-[#133d23]">
              <FileSpreadsheet className="w-4 h-4 text-[#246b38]" />
              <span>Past Recorded Consultations</span>
            </div>
            <span className="text-[10px] text-gray-400">3 consultations</span>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="p-2 rounded-xl bg-gray-50 flex items-center justify-between text-[11px]">
              <div>
                <span className="font-bold text-gray-800">Cough & Flu Checkup</span>
                <span className="text-gray-400 block text-[10px]">Attended by BHW Ana Reyes</span>
              </div>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                Resolved
              </span>
            </div>
            <div className="p-2 rounded-xl bg-gray-50 flex items-center justify-between text-[11px]">
              <div>
                <span className="font-bold text-gray-800">Annual Wellness Screening</span>
                <span className="text-gray-400 block text-[10px]">Barangay Health Center Mission</span>
              </div>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                Completed
              </span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-[#246b38] hover:bg-[#1a552b] text-white font-bold transition-all shadow-sm cursor-pointer"
          >
            Close Resident Record
          </button>
        </div>
      </div>
    </Modal>
  );
}
