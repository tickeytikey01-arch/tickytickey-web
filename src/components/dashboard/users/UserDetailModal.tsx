"use client";

import { UserItem } from "@/types/user";
import { Award, Calendar, Edit2, Mail, MapPin, Phone, Shield, X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: UserItem | null;
  onEdit: (u: UserItem) => void;
}

export default function UserDetailModal({
  isOpen,
  onClose,
  user,
  onEdit,
}: Props) {
  if (!isOpen || !user) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Avatar & Role */}
        <div className="p-6 bg-gradient-to-b from-[#eef7ee] to-white border-b border-gray-100 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#246b38] text-white font-black text-xl flex items-center justify-center shadow-md mb-3 border-2 border-white">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>

            <h3 className="text-lg font-black text-gray-900 leading-tight">
              {user.name}
            </h3>

            <div className="flex items-center gap-2 mt-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-[#1b552b] border border-green-200">
                {user.role}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                  user.status === "Active"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }`}
              >
                {user.status}
              </span>
            </div>
          </div>
        </div>

        {/* Dossier Body */}
        <div className="p-6 space-y-3.5 text-xs text-gray-700">
          <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
            <span className="text-gray-400 font-semibold flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-gray-400" />
              <span>Email</span>
            </span>
            <span className="font-bold text-gray-900">{user.email}</span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
            <span className="text-gray-400 font-semibold flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gray-400" />
              <span>Phone</span>
            </span>
            <span className="font-mono font-bold text-gray-900">{user.phone}</span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
            <span className="text-gray-400 font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              <span>Assigned Station</span>
            </span>
            <span className="font-bold text-gray-900">{user.station} ({user.purok})</span>
          </div>

          {user.licenseNumber && (
            <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
              <span className="text-gray-400 font-semibold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-gray-400" />
                <span>PRC License</span>
              </span>
              <span className="font-mono font-bold text-purple-700">{user.licenseNumber}</span>
            </div>
          )}

          {user.philHealthId && (
            <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
              <span className="text-gray-400 font-semibold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-gray-400" />
                <span>PhilHealth ID</span>
              </span>
              <span className="font-mono font-bold text-blue-700">{user.philHealthId}</span>
            </div>
          )}

          <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
            <span className="text-gray-400 font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>Registered Date</span>
            </span>
            <span className="font-medium text-gray-600">{user.joinedDate}</span>
          </div>

          {/* Quick permissions pill card */}
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 mt-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Authorized Capabilities
            </span>
            <div className="flex flex-wrap gap-1.5">
              {user.role === "Doctor" && (
                <>
                  <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-bold">Telemedicine</span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-bold">Prescription Signing</span>
                </>
              )}
              {user.role === "BHW" && (
                <>
                  <span className="px-2 py-0.5 rounded-md bg-green-50 text-green-700 text-[10px] font-bold">Patient Triage</span>
                  <span className="px-2 py-0.5 rounded-md bg-green-50 text-green-700 text-[10px] font-bold">Home Care Visits</span>
                  <span className="px-2 py-0.5 rounded-md bg-green-50 text-green-700 text-[10px] font-bold">SMS Broadcast</span>
                </>
              )}
              {user.role === "Resident" && (
                <>
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold">Consultation Requests</span>
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold">Clinic Booking</span>
                </>
              )}
              {user.role === "Admin" && (
                <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[10px] font-bold">Full Barangay Super Admin</span>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-200 font-bold text-xs transition-colors"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onEdit(user);
            }}
            className="px-5 py-2 rounded-xl bg-[#246b38] hover:bg-[#1b552b] text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
