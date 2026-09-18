"use client";

import { UserRole, UserStatus } from "@/types/user";
import { ChevronDown, Search, UserPlus } from "lucide-react";

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedRole: string;
  onRoleChange: (r: string) => void;
  selectedStatus: string;
  onStatusChange: (s: string) => void;
  onAddUser: () => void;
}

export default function UserFilterToolbar({
  searchQuery,
  onSearchChange,
  selectedRole,
  onRoleChange,
  selectedStatus,
  onStatusChange,
  onAddUser,
}: Props) {
  const roles: ("All" | UserRole)[] = ["All", "Doctor", "Nurse", "BHW", "Admin", "Resident"];
  const statuses: ("All" | UserStatus)[] = ["All", "Active", "Inactive", "Pending"];

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Left: Search Bar */}
      <div className="relative w-full md:w-80">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, phone, purok, or email..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50/70 border border-gray-200 rounded-2xl text-xs font-semibold text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#246b38] focus:bg-white transition-colors"
        />
      </div>

      {/* Right: Filters & Action Button */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
        {/* Role Dropdown */}
        <div className="relative">
          <select
            value={selectedRole}
            aria-label="Filter by User Role"
            onChange={(e) => onRoleChange(e.target.value)}
            className="appearance-none bg-gray-50 border border-gray-200 rounded-2xl pl-3.5 pr-8 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:border-[#246b38] cursor-pointer"
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r === "All" ? "All Roles" : `Role: ${r}`}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Status Dropdown */}
        <div className="relative">
          <select
            value={selectedStatus}
            aria-label="Filter by User Status"
            onChange={(e) => onStatusChange(e.target.value)}
            className="appearance-none bg-gray-50 border border-gray-200 rounded-2xl pl-3.5 pr-8 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:border-[#246b38] cursor-pointer"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All Statuses" : `Status: ${s}`}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Add User Button */}
        <button
          type="button"
          onClick={onAddUser}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#246b38] hover:bg-[#1b552b] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Add User / Staff</span>
        </button>
      </div>
    </div>
  );
}
