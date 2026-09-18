"use client";

import {
  BarChart3,
  Calendar,
  FileText,
  Home,
  Megaphone,
  Pill,
  Settings,
  Stethoscope,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  allowedTabs?: string[];
}

export default function Sidebar({
  currentTab,
  onTabChange,
  mobileOpen = false,
  onCloseMobile,
  allowedTabs,
}: SidebarProps) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "consultations", label: "Consultations", icon: Stethoscope },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "records", label: "Health Records", icon: FileText },
    { id: "medicines", label: "Medicine Library", icon: Pill },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "announcements", label: "Announcements", icon: Megaphone },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden animate-in fade-in"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar: Responsive Drawer on Mobile, Pinned on Desktop */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 md:z-20 h-screen w-64 md:w-56 lg:w-60 bg-[#edf7ef] border-r border-green-200/70 flex flex-col justify-between overflow-y-auto flex-shrink-0 transition-transform duration-300 ease-in-out scrollbar-none ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Top Header & Navigation */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            {/* Brand Logo Header - enlarged for prominence */}
            <Link href="/" className="inline-block group px-1">
              <div className="relative h-16 sm:h-20 w-48 sm:w-52 transition-transform group-hover:scale-102">
                <Image
                  src="/assets/logo-header.png"
                  alt="TickyTICKEY Logo"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Close Button on Mobile */}
            <button
              type="button"
              onClick={onCloseMobile}
              className="md:hidden p-1.5 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-green-100/60 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="space-y-1">
            {menuItems.filter((item) => !allowedTabs || allowedTabs.includes(item.id)).map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onTabChange(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-150 text-left ${
                    isActive
                      ? "bg-[#c9e7cc] text-[#134924] shadow-2xs font-bold"
                      : "text-gray-600 hover:bg-white/70 hover:text-[#185329]"
                  }`}
                >
                  <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${isActive ? "text-[#185329]" : "text-gray-500"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

      {/* Bottom Mascot Graphic - pushed naturally to the bottom of the sidebar */}
      <div className="relative w-full mt-auto pt-2 select-none flex flex-col items-center">
        {/* Mascot watercolor artwork from dashboard-sidebar.png filling naturally without any container card */}
        <div className="relative w-full h-56 sm:h-64">
          <Image
            src="/assets/dashboard-sidebar.png"
            alt="Ticky Sprout Mascot"
            fill
            priority
            className="object-contain object-bottom"
          />
        </div>

        {/* System Version Footer */}
        <div className="text-center pb-4 pt-1 text-[11px] text-gray-500 leading-tight">
          <div className="font-bold text-[#1a552b]">TickyTICKEY v1.0</div>
          <div className="text-[10px] text-gray-400">Barangay Health System</div>
        </div>
      </div>
    </aside>
    </>
  );
}
