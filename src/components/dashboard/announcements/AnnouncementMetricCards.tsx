"use client";

import { AnnouncementMetrics } from "@/types/announcement";
import { ArrowUpRight, CalendarClock, Megaphone, MessageSquare, Radio } from "lucide-react";

interface Props {
  metrics?: AnnouncementMetrics;
}

export default function AnnouncementMetricCards({ metrics }: Props) {
  const m = metrics || {
    publishedCount: 16,
    smsBroadcastsCount: 8420,
    scheduledCount: 3,
    residentReachPercent: 94,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Active Published Advisories */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs hover:shadow-xs transition-shadow flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-bold text-gray-500 block">Published Advisories</span>
          <div className="text-2xl sm:text-3xl font-black text-[#133d23] tracking-tight">
            {m.publishedCount}
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 inline-block">
            Live on App &amp; SMS
          </span>
        </div>
        <div className="w-13 h-13 rounded-2xl bg-green-50 text-[#246b38] flex items-center justify-center flex-shrink-0 border border-green-100">
          <Megaphone className="w-6 h-6" />
        </div>
      </div>

      {/* 2. SMS Broadcasts Sent */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs hover:shadow-xs transition-shadow flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-bold text-gray-500 block">SMS Broadcasts Sent</span>
          <div className="text-2xl sm:text-3xl font-black text-[#133d23] tracking-tight">
            {m.smsBroadcastsCount.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#15803d]">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>99.2% delivery rate</span>
          </div>
        </div>
        <div className="w-13 h-13 rounded-2xl bg-[#e0f2f1] text-[#00695c] flex items-center justify-center flex-shrink-0 border border-teal-100">
          <MessageSquare className="w-6 h-6" />
        </div>
      </div>

      {/* 3. Scheduled Health Drives */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs hover:shadow-xs transition-shadow flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-bold text-gray-500 block">Upcoming Drives</span>
          <div className="text-2xl sm:text-3xl font-black text-[#133d23] tracking-tight">
            {m.scheduledCount}
          </div>
          <span className="text-[11px] font-semibold text-gray-400">
            Vaccination &amp; Dental missions
          </span>
        </div>
        <div className="w-13 h-13 rounded-2xl bg-[#f5eefb] text-[#7e22ce] flex items-center justify-center flex-shrink-0 border border-purple-100">
          <CalendarClock className="w-6 h-6" />
        </div>
      </div>

      {/* 4. Estimated Resident Reach */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs hover:shadow-xs transition-shadow flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-bold text-gray-500 block">Resident Reach</span>
          <div className="text-2xl sm:text-3xl font-black text-[#133d23] tracking-tight">
            {m.residentReachPercent}%
          </div>
          <span className="text-[11px] font-semibold text-gray-400">
            Across Puroks 1 to 6
          </span>
        </div>
        <div className="w-13 h-13 rounded-2xl bg-[#fff8ed] text-[#b45309] flex items-center justify-center flex-shrink-0 border border-amber-100">
          <Radio className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
