"use client";

import Image from "next/image";
import { ReactNode } from "react";

interface BannerProps {
  title?: string;
  subtitle?: string;
  cardTitle?: string;
  cardSubtitle?: string;
  speechBubbleNode?: ReactNode;
  className?: string;
}

export default function Banner({
  title = "Dashboard Overview",
  subtitle = "Monitor barangay health activity at a glance.",
  cardTitle = "Good morning, Admin!",
  cardSubtitle = "A healthier community starts with better coordination.",
  speechBubbleNode,
  className = "mb-6 sm:mb-8",
}: BannerProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center ${className}`}>
      
      {/* Left Title and Subtitle */}
      <div className="lg:col-span-4 space-y-1">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#133d23] tracking-tight">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-medium">
          {subtitle}
        </p>
      </div>

      {/* Right Welcome Banner Card: rich, cozy, proportional, no stretched feeling */}
      <div className="lg:col-span-8 bg-gradient-to-r from-[#eef7ee] via-[#edf7ed] to-[#e4f3e6] rounded-3xl border border-[#cbe6cf] shadow-xs relative overflow-hidden flex items-center min-h-[155px] sm:min-h-[175px] lg:min-h-[185px]">
        
        {/* Watercolor Barangay village skyline at bottom so card never feels empty or stretched */}
        <div className="absolute bottom-0 left-0 right-0 h-9 sm:h-12 pointer-events-none opacity-40 z-0">
          <svg
            viewBox="0 0 900 60"
            preserveAspectRatio="none"
            className="w-full h-full fill-[#458e57]"
          >
            {/* Soft rolling green hills */}
            <path d="M0 60 L0 35 Q150 20 300 32 Q450 44 600 28 Q750 15 900 35 L900 60 Z" opacity="0.4" />
            <path d="M0 60 L0 42 Q200 30 400 40 Q600 50 800 36 L900 45 L900 60 Z" opacity="0.6" />
            {/* Barangay clinic & houses */}
            <polygon points="120,40 135,28 150,40 150,55 120,55" opacity="0.8" />
            <rect x="131" y="44" width="8" height="11" fill="#ffffff" opacity="0.6" />
            <polygon points="260,38 275,26 290,38 290,55 260,55" opacity="0.8" />
            <rect x="271" y="42" width="8" height="13" fill="#ffffff" opacity="0.6" />
            <polygon points="410,42 425,30 440,42 440,55 410,55" opacity="0.8" />
            <rect x="421" y="45" width="8" height="10" fill="#ffffff" opacity="0.6" />
            {/* Trees */}
            <circle cx="165" cy="42" r="10" opacity="0.7" />
            <circle cx="180" cy="45" r="8" opacity="0.6" />
            <circle cx="305" cy="40" r="11" opacity="0.7" />
            <circle cx="320" cy="44" r="9" opacity="0.6" />
            <circle cx="455" cy="43" r="10" opacity="0.7" />
          </svg>
        </div>

        {/* 1. Left foliage: anchored to left, responsive width */}
        <div className="absolute left-0 bottom-0 top-0 h-full w-[80px] sm:w-[130px] lg:w-[170px] pointer-events-none select-none z-0 opacity-40 sm:opacity-100">
          <Image
            src="/assets/dashboard-banner-left.png"
            alt=""
            fill
            priority
            className="object-contain object-left-bottom"
          />
        </div>

        {/* 2. Right artwork: mascot with heart & right foliage */}
        <div className="absolute right-0 bottom-0 top-0 h-full w-[150px] sm:w-[220px] md:w-[270px] lg:w-[320px] pointer-events-none select-none z-0">
          <Image
            src="/assets/dashboard-banner-right.png"
            alt="Ticky Sprout Mascot"
            fill
            priority
            className="object-contain object-right-bottom"
          />
        </div>

        {/* 3. Center Text Pill: gives structure so text doesn't float adrift */}
        <div className="relative z-10 ml-3 sm:ml-8 md:ml-12 lg:ml-16 mr-auto max-w-[210px] sm:max-w-xs md:max-w-sm lg:max-w-md py-3 sm:py-4">
          <div className="bg-white/85 backdrop-blur-xs rounded-2xl p-3 sm:p-4 md:p-5 border border-green-200/60 shadow-2xs">
            <h2 className="text-sm sm:text-lg md:text-xl lg:text-[22px] font-black text-[#133d23] tracking-tight leading-tight">
              {cardTitle}
            </h2>
            <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 font-medium leading-relaxed mt-1">
              {cardSubtitle}
            </p>
          </div>
        </div>

        {/* 4. Speech Bubble: optional custom node */}
        {speechBubbleNode && (
          <div className="hidden md:flex absolute right-4 lg:right-6 top-3 z-10 pointer-events-none">
            {speechBubbleNode}
          </div>
        )}

      </div>

    </div>
  );
}
