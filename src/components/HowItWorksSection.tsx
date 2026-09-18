"use client";

import { BellRing, Sparkles, Stethoscope, UserPlus } from "lucide-react";
import Link from "next/link";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Register Your Household",
      description: "Sign up via the mobile app or visit your Barangay Health Center. Family records are quickly linked for effortless future visits.",
      icon: UserPlus,
      color: "bg-emerald-500",
    },
    {
      number: "02",
      title: "Connect with Health Workers",
      description: "Directly message your designated Barangay Health Worker (BHW), book doctor visits, or request maintenance medications.",
      icon: Stethoscope,
      color: "bg-green-600",
    },
    {
      number: "03",
      title: "Receive Timely Care & Updates",
      description: "Get automated SMS and app reminders for vaccinations, clinic appointments, medicine pickup notifications, and health bulletins.",
      icon: BellRing,
      color: "bg-[#246b38]",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-100/80 text-[#246b38] text-xs sm:text-sm font-bold tracking-wide">
            <Sparkles className="w-4 h-4" />
            <span>Simple, Accessible Healthcare</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#133d23] tracking-tight">
            How TickyTICKEY Works
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Three simple steps to transform health management in your local barangay community.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-[#fbfdfa] rounded-3xl p-8 border border-green-100 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className={`w-14 h-14 rounded-2xl ${step.color} text-white flex items-center justify-center shadow-md`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-black text-green-900/20">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100">
                  <span className="text-xs font-bold text-[#246b38]">Step {step.number} of 03</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#174825] to-[#29783f] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold">Ready to modernize your Barangay Health Center?</h3>
            <p className="text-green-100 text-sm sm:text-base">
              Set up TickyTICKEY for your local government unit or barangay council in under 24 hours.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-white text-[#174825] font-bold text-sm shadow-md hover:bg-green-50 transition-colors"
            >
              Request Barangay Demo
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
