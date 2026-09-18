"use client";

import { UserItem, UserRole, UserStatus } from "@/types/user";
import { CheckCircle2, Edit2, Eye, MapPin, Phone, XCircle } from "lucide-react";

interface Props {
  users: UserItem[];
  onViewUser: (u: UserItem) => void;
  onEditUser: (u: UserItem) => void;
  onToggleStatus: (id: string) => void;
}

export default function UsersTable({
  users,
  onViewUser,
  onEditUser,
  onToggleStatus,
}: Props) {
  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "Doctor":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Nurse":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "BHW":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Admin":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Resident":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case "Active":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          dot: "bg-emerald-500",
        };
      case "Pending":
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-200",
          dot: "bg-amber-500",
        };
      case "Inactive":
        return {
          bg: "bg-gray-100 text-gray-600 border-gray-200",
          dot: "bg-gray-400",
        };
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-2xs flex flex-col justify-between">
      {/* Table responsive container */}
      <div className="overflow-x-auto overflow-y-auto max-h-[500px] overscroll-contain scrollbar-thin">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 font-bold text-[11px]">
              <th className="py-3 px-3">User</th>
              <th className="py-3 px-3">Role</th>
              <th className="py-3 px-3">Assigned Station / Purok</th>
              <th className="py-3 px-3">Contact</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Last Active</th>
              <th className="py-3 px-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 font-medium">
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-gray-400">
                  No users found matching your filters.
                </td>
              </tr>
            ) : (
              users.map((u) => {
                const statusBadge = getStatusBadge(u.status);

                return (
                  <tr
                    key={u.id}
                    className="hover:bg-gray-50/70 transition-colors cursor-pointer"
                    onClick={() => onViewUser(u)}
                  >
                    {/* User info */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#edf7ee] text-[#1c552c] font-black text-xs flex items-center justify-center flex-shrink-0 border border-green-200">
                          {u.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 leading-tight">
                            {u.name}
                          </div>
                          <div className="text-[11px] text-gray-400 mt-0.5">{u.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getRoleBadge(
                          u.role
                        )}`}
                      >
                        {u.role}
                      </span>
                    </td>

                    {/* Purok / Station */}
                    <td className="py-3.5 px-3 text-gray-700 whitespace-nowrap">
                      <div className="flex items-center gap-1 font-semibold">
                        <MapPin className="w-3 h-3 text-[#246b38]" />
                        <span>{u.station || u.purok}</span>
                      </div>
                      <div className="text-[10px] text-gray-400 pl-4">{u.purok}</div>
                    </td>

                    {/* Contact */}
                    <td className="py-3.5 px-3 text-gray-700 whitespace-nowrap font-mono text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span>{u.phone}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${statusBadge.bg}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                        <span>{u.status}</span>
                      </span>
                    </td>

                    {/* Last Active */}
                    <td className="py-3.5 px-3 text-gray-500 whitespace-nowrap text-[11px]">
                      {u.lastActive}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-3 whitespace-nowrap text-center">
                      <div
                        className="flex items-center justify-center gap-1.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => onViewUser(u)}
                          className="px-2.5 py-1 rounded-lg border border-green-200 bg-green-50/70 hover:bg-green-100 text-[#246b38] font-bold text-xs transition-colors cursor-pointer flex items-center gap-1"
                          title="View Dossier"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onEditUser(u)}
                          className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 hover:text-[#246b38] transition-colors cursor-pointer"
                          title="Edit User"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleStatus(u.id)}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            u.status === "Active"
                              ? "border-amber-200 bg-amber-50/60 hover:bg-amber-100 text-amber-700"
                              : "border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100 text-emerald-700"
                          }`}
                          title={u.status === "Active" ? "Deactivate User" : "Activate User"}
                        >
                          {u.status === "Active" ? (
                            <XCircle className="w-3.5 h-3.5" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <div>Showing {users.length} registered accounts</div>
        <div className="flex items-center gap-1.5 font-bold">
          <span className="text-gray-400">Page 1 of 1</span>
        </div>
      </div>
    </div>
  );
}
