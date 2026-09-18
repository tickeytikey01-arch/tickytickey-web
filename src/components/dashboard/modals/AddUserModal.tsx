"use client";

import Modal from "@/components/ui/Modal";
import { UserPlus } from "lucide-react";
import { useState } from "react";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (name: string, role: string) => void;
}

export default function AddUserModal({ isOpen, onClose, onAddUser }: AddUserModalProps) {
  const [newUserName, setNewUserName] = useState("");
  const [newUserRole, setNewUserRole] = useState("Barangay Health Worker (BHW)");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim()) return;
    onAddUser(newUserName.trim(), newUserRole);
    setNewUserName("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add User to Session"
      icon={<UserPlus className="w-5 h-5 text-[#246b38]" />}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-xs text-gray-500 leading-relaxed">
          Add another health worker or barangay officer to this terminal for fast multi-user switching without logging out.
        </p>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Personnel Full Name</label>
          <input
            type="text"
            required
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="e.g. Dr. Jose Mercado, BHW Maria Ramos"
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:ring-2 focus:ring-[#3fa04e] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Role / Designation</label>
          <select
            value={newUserRole}
            onChange={(e) => setNewUserRole(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:ring-2 focus:ring-[#3fa04e] focus:outline-none bg-white"
          >
            <option>Barangay Health Worker (BHW)</option>
            <option>Visiting Physician / Doctor</option>
            <option>Barangay Nutrition Scholar (BNS)</option>
            <option>Barangay Captain / Kagawad</option>
            <option>Midwife / Clinic Nurse</option>
          </select>
        </div>

        <div className="pt-2 flex gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full border border-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2.5 rounded-full bg-[#246b38] hover:bg-[#1b552b] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            Authorize & Add
          </button>
        </div>
      </form>
    </Modal>
  );
}
