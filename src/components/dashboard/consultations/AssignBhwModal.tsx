"use client";

import Modal from "@/components/ui/Modal";
import { UserCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface AssignBhwModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBhwName: string;
  onAssign: (bhw: { name: string; role: string; phone: string; avatar: string }) => void;
}

export default function AssignBhwModal({
  isOpen,
  onClose,
  currentBhwName,
  onAssign,
}: AssignBhwModalProps) {
  const bhwList = [
    {
      name: "Ana Reyes",
      role: "Barangay Health Worker (BHW)",
      phone: "0928 765 4321",
      assignedPurok: "Purok 1 & 3",
      avatar: "/assets/doctor.png",
      status: "Available",
    },
    {
      name: "Lito Cruz",
      role: "Barangay Health Worker (BHW)",
      phone: "0929 111 2233",
      assignedPurok: "Purok 2 & 5",
      avatar: "/assets/doctor.png",
      status: "Available",
    },
    {
      name: "May Castro",
      role: "Barangay Nutrition Scholar (BNS)",
      phone: "0920 555 6677",
      assignedPurok: "Purok 4 & 6",
      avatar: "/assets/doctor.png",
      status: "On Duty",
    },
    {
      name: "Dr. Roberto Mendoza",
      role: "Visiting Municipal Physician",
      phone: "0917 888 9911",
      assignedPurok: "Central Health Center",
      avatar: "/assets/doctor.png",
      status: "In Clinic",
    },
  ];

  const [selectedBhw, setSelectedBhw] = useState(currentBhwName);

  const handleConfirm = () => {
    const found = bhwList.find((b) => b.name === selectedBhw) || bhwList[0];
    onAssign(found);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Health Personnel"
      icon={<UserCheck className="w-5 h-5 text-[#246b38]" />}
    >
      <div className="space-y-4 text-xs">
        <p className="text-gray-500 leading-relaxed">
          Select an active Barangay Health Worker or clinic physician to handle triage and resident consultation inquiries.
        </p>

        <div className="space-y-2">
          {bhwList.map((b) => {
            const isSelected = selectedBhw === b.name;
            return (
              <div
                key={b.name}
                onClick={() => setSelectedBhw(b.name)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? "border-[#246b38] bg-green-50/70 shadow-xs"
                    : "border-gray-100 hover:bg-gray-50/70"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-green-200 flex-shrink-0 bg-white">
                    <Image src={b.avatar} alt={b.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-gray-900 text-xs truncate">{b.name}</div>
                    <div className="text-[10px] text-gray-500 truncate">{b.role}</div>
                    <div className="text-[10px] text-[#1b552b] font-medium mt-0.5">
                      {b.assignedPurok} • {b.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                    {b.status}
                  </span>
                  <input
                    type="radio"
                    checked={isSelected}
                    onChange={() => setSelectedBhw(b.name)}
                    className="accent-[#246b38] w-4 h-4 cursor-pointer"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-2.5 rounded-full bg-[#246b38] hover:bg-[#1a552b] text-white font-bold shadow-md transition-all cursor-pointer"
          >
            Confirm Assignment
          </button>
        </div>
      </div>
    </Modal>
  );
}
