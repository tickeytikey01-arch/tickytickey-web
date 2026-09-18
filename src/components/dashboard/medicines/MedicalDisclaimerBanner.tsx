"use client";

import { Settings, ShieldCheck } from "lucide-react";
import Image from "next/image";

interface DisclaimerProps {
  onEditDisclaimer: () => void;
}

export default function MedicalDisclaimerBanner({ onEditDisclaimer }: DisclaimerProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden mt-6">
      {/* Left Details */}
      <div className="flex items-center gap-4 z-10">
        <div className="w-12 h-12 rounded-2xl bg-green-50 text-[#246b38] flex items-center justify-center flex-shrink-0 border border-green-100">
          <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div>
          <h3 className="text-base font-black text-gray-900">
            Medical Disclaimer Settings
          </h3>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Manage the disclaimer shown on medicine information across the system.
          </p>
        </div>
      </div>

      {/* Right Action & Mascot with Speech Bubble */}
      <div className="flex items-center gap-4 z-10 w-full md:w-auto justify-between md:justify-end">
        <button
          type="button"
          onClick={onEditDisclaimer}
          className="px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Edit Disclaimer</span>
        </button>

        {/* Mascot + Speech Bubble */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="bg-[#246b38] text-white font-bold text-[10px] leading-tight py-1.5 px-3 rounded-2xl shadow-xs max-w-[150px] text-center hidden sm:block">
            Accurate information for a healthier tomorrow!
          </div>

          <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
            <Image
              src="/assets/dashboard-banner-right.webp"
              alt="Mascot"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
