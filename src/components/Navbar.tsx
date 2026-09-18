"use client";

import { HeartPulse, Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavbarProps {
  onOpenSearch?: () => void;
}

export default function Navbar({ onOpenSearch }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "For Barangays", href: "/#for-barangays" },
    { name: "Contact", href: "/#contact" },
  ];

  const handleSearchClick = () => {
    if (onOpenSearch) {
      onOpenSearch();
    } else {
      setSearchModalOpen(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="relative h-12 w-44 sm:h-14 sm:w-52 transition-transform duration-200 group-hover:scale-[1.02]">
              <Image
                src="/assets/logo-header.png"
                alt="TickyTICKEY - Your Barangay Health Partner"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) => {
              const isHome = link.name === "Home" && pathname === "/";

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
                    isHome
                      ? "bg-[#eaf4eb] text-[#246b38]"
                      : "text-gray-600 hover:text-[#246b38] hover:bg-green-50/60"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Search Button */}
            <button
              type="button"
              onClick={handleSearchClick}
              aria-label="Search services"
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text-[#246b38] hover:bg-green-50 transition-colors border border-transparent hover:border-green-100"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Log In Button */}
            <Link
              href="/login"
              className="px-5 py-2 rounded-full text-sm font-semibold border border-[#34a853] text-[#246b38] hover:bg-green-50/80 transition-all duration-150 shadow-2xs"
            >
              Log In
            </Link>

            {/* Get Started Button */}
            <Link
              href="/#features"
              className="px-5 py-2 rounded-full text-sm font-semibold bg-[#3fa04e] hover:bg-[#348a41] text-white shadow-xs hover:shadow-md transition-all duration-150 flex items-center gap-1.5"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={handleSearchClick}
              aria-label="Search"
              className="p-2 text-gray-600 hover:text-[#246b38]"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-[#246b38]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-100 bg-white/98 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-base font-semibold text-gray-700 hover:bg-green-50 hover:text-[#246b38]"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-full text-base font-semibold border border-[#34a853] text-[#246b38] hover:bg-green-50"
              >
                Log In
              </Link>
              <Link
                href="/#features"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-full text-base font-semibold bg-[#3fa04e] text-white shadow-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Interactive Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6 border border-gray-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2 text-[#246b38] font-bold">
                <HeartPulse className="w-5 h-5 text-[#3fa04e]" />
                <span>Search Barangay Health Services</span>
              </div>
              <button
                type="button"
                onClick={() => setSearchModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 relative">
              <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search consultations, medicine inventory, doctors, barangay clinic..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3fa04e] focus:border-transparent text-sm"
                autoFocus
              />
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Quick Suggestions</p>
              <div className="flex flex-wrap gap-2">
                {["Online Consultation", "Free Medicine Refill", "Vaccine Schedule", "Barangay Health Center", "Emergency Ambulance"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSearchQuery(item)}
                    className="text-xs px-3 py-1.5 rounded-full bg-green-50 text-[#246b38] hover:bg-green-100 transition-colors font-medium"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
