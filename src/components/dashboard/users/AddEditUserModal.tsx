"use client";

import { UserItem, UserRole, UserStatus } from "@/types/user";
import { Save, UserPlus, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userToEdit: UserItem | null;
  onSave: (user: UserItem) => void;
}

export default function AddEditUserModal({
  isOpen,
  onClose,
  userToEdit,
  onSave,
}: Props) {
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("BHW");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [purok, setPurok] = useState("Purok 1");
  const [station, setStation] = useState("Health Station 04");
  const [status, setStatus] = useState<UserStatus>("Active");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [philHealthId, setPhilHealthId] = useState("");

  useEffect(() => {
    if (userToEdit) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset the controlled form when the selected record changes
      setName(userToEdit.name);
      setRole(userToEdit.role);
      setEmail(userToEdit.email);
      setPhone(userToEdit.phone);
      setPurok(userToEdit.purok);
      setStation(userToEdit.station);
      setStatus(userToEdit.status);
      setLicenseNumber(userToEdit.licenseNumber || "");
      setPhilHealthId(userToEdit.philHealthId || "");
    } else {
      setName("");
      setRole("BHW");
      setEmail("");
      setPhone("0917 ");
      setPurok("Purok 1");
      setStation("Health Station 04");
      setStatus("Active");
      setLicenseNumber("");
      setPhilHealthId("");
    }
  }, [userToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter full name.");
      return;
    }

    const savedUser: UserItem = {
      id: userToEdit ? userToEdit.id : `u-${Date.now()}`,
      name: name.trim(),
      role,
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, ".")}@barangay.gov.ph`,
      phone: phone.trim() || "0917 000 0000",
      purok,
      station,
      status,
      lastActive: "Just now",
      joinedDate: userToEdit ? userToEdit.joinedDate : new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      licenseNumber: role === "Doctor" || role === "Nurse" ? licenseNumber : undefined,
      philHealthId: role === "Resident" ? philHealthId : undefined,
    };

    onSave(savedUser);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-green-50 text-[#246b38] flex items-center justify-center border border-green-100">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-gray-900 leading-tight">
                {userToEdit ? "Edit User Profile" : "Add New User / Staff"}
              </h3>
              <p className="text-xs text-gray-400">
                {userToEdit ? "Update account credentials and assignment" : "Register a health worker, doctor, or resident"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Maria Santos, MD"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#246b38] focus:bg-white"
            />
          </div>

          {/* Role & Status Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Role *</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-[#246b38]"
              >
                <option value="BHW">Barangay Health Worker (BHW)</option>
                <option value="Doctor">Doctor / Physician</option>
                <option value="Nurse">Public Health Nurse</option>
                <option value="Admin">System Administrator</option>
                <option value="Resident">Barangay Resident</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Status *</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as UserStatus)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-[#246b38]"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending Approval</option>
                <option value="Inactive">Inactive / Suspended</option>
              </select>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@barangay.gov.ph"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#246b38]"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Mobile Phone *</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0917 123 4567"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#246b38]"
              />
            </div>
          </div>

          {/* Assigned Purok & Station */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Assigned Purok</label>
              <select
                value={purok}
                onChange={(e) => setPurok(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-[#246b38]"
              >
                <option value="Purok 1">Purok 1</option>
                <option value="Purok 2">Purok 2</option>
                <option value="Purok 3">Purok 3</option>
                <option value="Purok 4">Purok 4</option>
                <option value="Purok 5">Purok 5</option>
                <option value="Purok 6">Purok 6</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Health Station</label>
              <input
                type="text"
                value={station}
                onChange={(e) => setStation(e.target.value)}
                placeholder="e.g. Health Station 04"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#246b38]"
              />
            </div>
          </div>

          {/* Conditional Role-based fields */}
          {(role === "Doctor" || role === "Nurse") && (
            <div>
              <label className="block text-gray-700 font-bold mb-1">PRC License Number</label>
              <input
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                placeholder="PRC-0091823"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#246b38]"
              />
            </div>
          )}

          {role === "Resident" && (
            <div>
              <label className="block text-gray-700 font-bold mb-1">PhilHealth ID Number</label>
              <input
                type="text"
                value={philHealthId}
                onChange={(e) => setPhilHealthId(e.target.value)}
                placeholder="12-345678901-2"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#246b38]"
              />
            </div>
          )}

          {/* Modal Footer inside form */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-bold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#246b38] hover:bg-[#1b552b] text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{userToEdit ? "Save Changes" : "Create User"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
