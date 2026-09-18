"use client";

import ContactSupportModal from "@/components/dashboard/modals/ContactSupportModal";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  FileText,
  HelpCircle,
  Home,
  LogOut,
  Megaphone,
  Menu,
  Pill,
  Search,
  Settings,
  Stethoscope,
  Users
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface HeaderProps {
  adminName: string;
  role: string;
  dateString: string;
  onSearch?: (query: string) => void;
  onToggleSidebar?: () => void;
  onNavigateTab?: (tab: string) => void;
  directoryItems?: Array<{ id: string; name: string; category: string; tab: string; desc: string }>;
  notificationItems?: string[];
  allowedTabs?: string[];
  isDemoMode?: boolean;
  onToggleDemoMode?: (val: boolean) => void;
}

interface UserAccount {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export default function Header({
  adminName,
  role,
  dateString,
  onSearch,
  onToggleSidebar,
  onNavigateTab,
  directoryItems = [],
  notificationItems = [],
  allowedTabs,
  isDemoMode,
  onToggleDemoMode,
}: HeaderProps) {
  const router = useRouter();
  const [searchVal, setSearchVal] = useState("");
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  const activeUser: UserAccount = { id: "current", name: adminName, role, avatar: "/assets/doctor.webp" };

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Search items index across pages, consultations, medicines, and staff
  const searchableItems = [
    // Core Modules
    { id: "p-overview", name: "Overview Dashboard", category: "Page", tab: "overview", icon: Home, desc: "Key health metrics & real-time activity" },
    { id: "p-consultations", name: "Online Consultations", category: "Page", tab: "consultations", icon: Stethoscope, desc: "Triage resident health inquiries & messenger" },
    { id: "p-appointments", name: "Appointments & Schedule", category: "Page", tab: "appointments", icon: Calendar, desc: "Doctor schedule, calendar & clinic visits" },
    { id: "p-records", name: "Health Records (EHR)", category: "Page", tab: "records", icon: FileText, desc: "Resident digital health passports & medical history" },
    { id: "p-medicines", name: "Medicine Library", category: "Page", tab: "medicines", icon: Pill, desc: "Pharmacy inventory & therapeutic guidance" },
    { id: "p-reports", name: "Reports & Analytics", category: "Page", tab: "reports", icon: BarChart3, desc: "Health census, symptom donut & trends" },
    { id: "p-users", name: "Users Management", category: "Page", tab: "users", icon: Users, desc: "Health workers, doctors & resident accounts" },
    { id: "p-announcements", name: "Announcements & Advisories", category: "Page", tab: "announcements", icon: Megaphone, desc: "Broadcast advisories, SMS & health drives" },
    { id: "p-settings", name: "Clinic Settings", category: "Page", tab: "settings", icon: Settings, desc: "Station profile, SMS gateway & security" },

    ...directoryItems.map((item) => ({ ...item, icon: item.category === "Medicine" ? Pill : item.category === "Consultation" ? Stethoscope : item.category === "Record" ? FileText : Users })),
  ];

  // Filter items based on query
  const filteredSearchItems = searchableItems.filter((item) => {
    if (allowedTabs && !allowedTabs.includes(item.tab)) return false;
    if (!searchVal.trim()) return true;
    const q = searchVal.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSearchDropdownOpen(false);
        setProfileDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    setSearchDropdownOpen(true);
    if (onSearch) onSearch(e.target.value);
  };

  const handleSelectSearchItem = (item: (typeof searchableItems)[0]) => {
    if (onNavigateTab) {
      onNavigateTab(item.tab);
    }
    setSearchVal("");
    setSearchDropdownOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#f1f7f2]/95 backdrop-blur-md border-b border-green-200/70 flex items-center justify-between gap-2.5 sm:gap-4 px-4 sm:px-6 lg:px-8 py-3.5 transition-all shadow-xs">
        {/* Left: Mobile hamburger menu & Search Bar */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-lg">
          {/* Mobile Hamburger Button (< md) */}
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label="Open sidebar menu"
            className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200/90 flex items-center justify-center text-gray-700 hover:text-[#246b38] hover:bg-green-50 shadow-2xs transition-all flex-shrink-0"
          >
            <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Search Bar with Command Palette Dropdown */}
          <div ref={searchContainerRef} className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchVal}
              onChange={handleSearch}
              onFocus={() => setSearchDropdownOpen(true)}
              placeholder="Search pages, residents, medicines..."
              className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-full bg-white border border-gray-200/90 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3fa04e] focus:border-transparent shadow-2xs transition-all"
            />

            {/* Interactive Search Results Dropdown */}
            {searchDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-3xl border border-gray-100 shadow-2xl z-50 max-h-[420px] overflow-y-auto overscroll-contain scrollbar-thin p-2.5 space-y-1.5 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between border-b border-gray-100">
                  <span>{searchVal.trim() ? "Search Results" : "Quick Jump & Directory"}</span>
                  <span>{filteredSearchItems.length} items</span>
                </div>

                {filteredSearchItems.length === 0 ? (
                  <div className="py-8 text-center text-xs text-gray-400">
                    No results found for &ldquo;{searchVal}&rdquo;. Try another term.
                  </div>
                ) : (
                  filteredSearchItems.map((item) => {
                    const Icon = item.icon;
                    const isPage = item.category === "Page";

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectSearchItem(item)}
                        className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#edf7ee] text-left transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-gray-50 group-hover:bg-white text-[#246b38] flex items-center justify-center flex-shrink-0 border border-gray-100 group-hover:border-green-200 transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-gray-900 group-hover:text-[#1b552b] truncate">
                                {item.name}
                              </span>
                              <span
                                className={`text-[9.5px] font-bold px-2 py-0.2 rounded-full border ${
                                  isPage
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : item.category === "Consultation"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : item.category === "Medicine"
                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                    : "bg-purple-50 text-purple-700 border-purple-200"
                                }`}
                              >
                                {item.category}
                              </span>
                            </div>
                            <div className="text-[11px] text-gray-500 truncate">
                              {item.desc}
                            </div>
                          </div>
                        </div>

                        <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#246b38] flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Controls: Dev Mode -> Date -> Notification -> Profile */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Dev Mode Pill Toggle */}
          <div className="flex items-center bg-white border border-gray-200/90 rounded-2xl p-1 shadow-2xs">
            <button
              type="button"
              onClick={() => onToggleDemoMode && onToggleDemoMode(false)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                !isDemoMode
                  ? "bg-green-100 text-green-800 shadow-2xs"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
              title="Live Supabase Cloud Backend"
            >
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span>PROD</span>
            </button>
            <div className="w-[1px] h-3.5 bg-gray-200 mx-0.5" />
            <button
              type="button"
              onClick={() => onToggleDemoMode && onToggleDemoMode(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isDemoMode
                  ? "bg-amber-100 text-amber-800 shadow-2xs"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
              title="Interactive Full Mock Data Mode"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>DEMO</span>
            </button>
          </div>

          {/* 1. Date Display Badge */}
          <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white border border-gray-200/90 shadow-2xs text-gray-700">
            <div className="w-8 h-8 rounded-xl bg-green-50 text-[#246b38] flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="text-left leading-tight">
              <div className="text-xs font-bold text-gray-900">{dateString}</div>
              <div className="text-[10px] text-gray-400 font-medium">Saturday</div>
            </div>
          </div>

          {/* 2. Notification Bell (Right next to profile) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileDropdownOpen(false);
              }}
              aria-label="Notifications"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200/90 flex items-center justify-center text-gray-600 hover:text-green-700 hover:bg-green-50 shadow-2xs transition-all relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-xl border border-gray-100 p-4 animate-in fade-in z-50">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-2">
                  <span className="text-xs font-bold text-gray-900">Notifications</span>
                  <span className="text-[10px] text-green-700 font-semibold bg-green-50 px-2 py-0.5 rounded-full">
                    {notificationItems.length} new
                  </span>
                </div>
                <div className="space-y-2 text-xs text-gray-600">
                  {notificationItems.length ? notificationItems.map((item) => <p key={item} className="p-1.5 hover:bg-green-50 rounded-lg">{item}</p>) : <p className="p-1.5">No new notifications.</p>}
                </div>
              </div>
            )}
          </div>

          {/* 3. Profile with Dropdown Menu (No divider line) */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => {
                setProfileDropdownOpen(!profileDropdownOpen);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-2 p-1 sm:pr-3 rounded-full hover:bg-white/80 transition-all border border-transparent hover:border-gray-200/80 shadow-2xs"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-green-600 shadow-2xs flex-shrink-0 bg-green-100">
                <Image
                  src={activeUser.avatar}
                  alt={activeUser.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="hidden md:block text-left leading-tight">
                <div className="text-xs font-bold text-gray-900">{activeUser.name}</div>
                <div className="text-[10px] text-gray-500 font-medium">{activeUser.role}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
            </button>

            {/* Profile Dropdown Card */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-32px)] bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 z-50 animate-in fade-in zoom-in-95">
                {/* Active User Header */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-green-50/70 border border-green-100 mb-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#246b38] flex-shrink-0 bg-white">
                    <Image
                      src={activeUser.avatar}
                      alt={activeUser.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black text-[#123c21] truncate">{activeUser.name}</div>
                    <div className="text-[11px] text-gray-500 truncate">{activeUser.role}</div>
                    <div className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Active Session</span>
                    </div>
                  </div>
                </div>

                {/* Menu actions */}
                <div className="space-y-1 pb-3 border-b border-gray-100">
                  {/* 4. Contact Support */}
                  <button
                    type="button"
                    onClick={() => {
                      setSupportModalOpen(true);
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-gray-700 hover:text-[#246b38] hover:bg-green-50 transition-colors text-left"
                  >
                    <HelpCircle className="w-4 h-4 text-gray-500" />
                    <span>Contact Support</span>
                  </button>
                </div>

                {/* Log Out */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={async () => {
                      await createClient().auth.signOut();
                      router.replace("/login");
                      router.refresh();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out of Session</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Portal Modals: Mounted directly to document.body, free from any header stacking context */}
      <ContactSupportModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
      />
    </>
  );
}
