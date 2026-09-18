"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturesSection() {
  const features = [
    {
      title: "Online Consultation",
      tagline: "Consult Health Worker",
      description: "Chat or video consult directly with assigned Barangay Health Workers (BHW) and visiting community doctors without leaving home.",
      asset: "/assets/online-consulation.webp",
      color: "from-emerald-50 to-teal-50",
      border: "border-emerald-200/70",
      badge: "Fast & Convenient",
    },
    {
      title: "Appointment Schedule",
      tagline: "Clinic & Checkup Visits",
      description: "Book maternal checkups, child immunizations, and dental missions in advance with automatic SMS and app reminders.",
      asset: "/assets/appointment.webp",
      color: "from-green-50 to-emerald-50",
      border: "border-green-200/70",
      badge: "Zero Queues",
    },
    {
      title: "Medicine Library",
      tagline: "Inventory & Refill Requests",
      description: "Check free municipal and barangay medicine stock in real-time, submit maintenance refill requests, and track delivery status.",
      asset: "/assets/medicine.webp",
      color: "from-amber-50 to-yellow-50",
      border: "border-amber-200/70",
      badge: "Real-Time Stock",
    },
    {
      title: "Digital Health Records",
      tagline: "Secure Resident History",
      description: "Centralized medical cards, allergy histories, immunization booklets, and vital stats accessible anytime for faster emergency care.",
      asset: "/assets/health-records.webp",
      color: "from-blue-50 to-sky-50",
      border: "border-blue-200/70",
      badge: "Encrypted & Private",
    },
    {
      title: "Emergency Assistance",
      tagline: "Immediate 24/7 Hotline",
      description: "One-touch SOS button notifying barangay tanods, BDRRMO rescue ambulances, and nearest first responders with instant GPS location.",
      asset: "/assets/emergency-help.webp",
      color: "from-rose-50 to-red-50",
      border: "border-rose-200/70",
      badge: "24/7 Dispatch",
    },
    {
      title: "Barangay Health Reports",
      tagline: "Analytics & Monitoring",
      description: "Comprehensive public health dashboards for barangay leaders to track symptom outbreaks, vaccination coverage, and medical supplies.",
      asset: "/assets/reports.webp",
      color: "from-indigo-50 to-purple-50",
      border: "border-indigo-200/70",
      badge: "Data-Driven Action",
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-[#fbfdfa] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-100/70 text-[#246b38] text-xs sm:text-sm font-bold tracking-wide">
            <span>✨ Complete Healthcare Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#133d23] tracking-tight">
            Everything Your Barangay Needs <br />
            <span className="text-[#25753b]">for Accessible Public Health</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Built hand-in-hand with Filipino barangay health workers and local communities to ensure no resident is left behind.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 bg-gradient-to-b ${item.color} border ${item.border} shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="relative w-18 h-18 sm:w-20 sm:h-20 transition-transform duration-300 group-hover:scale-110 drop-shadow-md">
                    <Image
                      src={item.asset}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/90 text-gray-700 shadow-2xs border border-gray-100">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#246b38] uppercase tracking-wider block">
                    {item.tagline}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#246b38] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-900/5 flex items-center justify-between text-xs font-bold text-[#246b38]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3fa04e]" />
                  Integrated Service
                </span>
                <Link
                  href="/features"
                  className="inline-flex items-center gap-1 hover:translate-x-1 transition-transform"
                >
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
