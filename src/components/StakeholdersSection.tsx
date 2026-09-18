"use client";

import { ArrowRight, Check, HeartHandshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function StakeholdersSection() {
  const stakeholders = [
    {
      title: "For Families & Residents",
      subtitle: "Kababayan Health Made Simple",
      description:
        "Every household gains direct mobile access to free clinic bookings, vaccination reminders, maintenance medicine requests, and family health folders.",
      asset: "/assets/family-asset.png",
      badge: "Mobile App Access",
      highlights: [
        "Check barangay doctor visit schedules",
        "Request maintenance vitamins & medicines",
        "One-tap Emergency SOS response",
        "Keep records for children & seniors",
      ],
      ctaText: "Explore Resident Benefits",
      ctaLink: "/for-barangays#residents",
    },
    {
      title: "For Health Workers (BHW) & Doctors",
      subtitle: "Empowering Frontline Caregivers",
      description:
        "Streamlined digital tools to log consultations, manage queues, track home visits, and eliminate repetitive paper forms so you can focus on patient care.",
      asset: "/assets/doctor.png",
      badge: "Clinical Dashboard",
      highlights: [
        "Rapid patient check-in & vital signs recording",
        "Instant medical history lookup",
        "Automated immunization follow-ups",
        "Direct chat with visiting doctors",
      ],
      ctaText: "Explore BHW Tools",
      ctaLink: "/for-barangays#workers",
    },
    {
      title: "For Barangay Captains & Leaders",
      subtitle: "Transparent, Data-Driven Governance",
      description:
        "Real-time visibility into disease trends, health center inventory, emergency response times, and program coverage to make informed municipal decisions.",
      asset: "/assets/man.png",
      badge: "Executive Oversight",
      highlights: [
        "Live symptom breakdown & outbreak alerts",
        "Audit medicine stock & supply requests",
        "Comprehensive health reports for LGU / DOH",
        "Coordinate emergency rescue dispatch",
      ],
      ctaText: "Explore Admin Portal",
      ctaLink: "/for-barangays#leaders",
    },
  ];

  return (
    <section id="for-barangays" className="py-20 lg:py-28 bg-[#f4f9f4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-200/60 text-[#1f6333] text-xs sm:text-sm font-bold tracking-wide">
            <HeartHandshake className="w-4 h-4 text-[#2a7a40]" />
            <span>Inclusive Barangay Healthcare</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#133d23] tracking-tight">
            Designed for Every Member of <br />
            <span className="text-[#25753b]">Our Barangay Community</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Connecting citizens, health workers, and municipal leaders on one unified, reliable platform.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="space-y-16 lg:space-y-20">
          {stakeholders.map((s, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={idx}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-green-100 transition-all duration-300 hover:shadow-xl`}
              >
                {/* Image / Asset Column */}
                <div
                  className={`lg:col-span-5 flex justify-center ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative w-72 h-80 sm:w-80 sm:h-96 filter drop-shadow-xl transition-transform duration-300 hover:scale-105">
                    <Image
                      src={s.asset}
                      alt={s.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Content Column */}
                <div
                  className={`lg:col-span-7 space-y-6 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="inline-block px-3 py-1 rounded-full bg-green-50 text-[#246b38] text-xs font-bold border border-green-200/60">
                    {s.badge}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#133d23]">
                      {s.title}
                    </h3>
                    <p className="text-sm font-semibold text-[#2f7e45]">
                      {s.subtitle}
                    </p>
                    <p className="text-gray-600 text-base leading-relaxed pt-2">
                      {s.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {s.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-[#e8f5e9] text-[#246b38] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 leading-snug">
                          {h}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3">
                    <Link
                      href={s.ctaLink}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#246b38] hover:bg-[#1a552b] text-white font-bold text-sm shadow-sm hover:shadow-md transition-all group"
                    >
                      <span>{s.ctaText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
