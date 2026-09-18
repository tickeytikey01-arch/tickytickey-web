"use client";

import { Clock, FileText, Heart, Lightbulb, TrendingUp, Users } from "lucide-react";
import Image from "next/image";

export default function KeyInsightsCard({ items }: { items?: string[] }) {
  const defaultInsights = [
    {
      icon: TrendingUp,
      text: "Consultations increased 18% this month.",
    },
    {
      icon: Users,
      text: "Fever and cough remain the top concerns.",
    },
    {
      icon: Clock,
      text: "Appointment completion rate is at 92%.",
    },
    {
      icon: Heart,
      text: "Average response time improved by 22%.",
    },
    {
      icon: FileText,
      text: "Community engagement is growing with 16 announcements this month.",
    },
  ];
  const icons = [TrendingUp, Users, Clock, Heart, FileText];
  const insights = items ? items.map((text, index) => ({ text, icon: icons[index % icons.length] })) : defaultInsights;

  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs flex flex-col justify-between h-full overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-green-50 text-[#246b38] flex items-center justify-center">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-gray-900">Key Insights</h3>
        </div>
      </div>

      {/* Body: Insights list on left, Mascot on right */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center pt-3 flex-1">
        {/* Bullets list */}
        <div className="sm:col-span-7 space-y-2.5">
          {insights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 leading-snug">
                <div className="w-5 h-5 rounded-full bg-green-50 text-[#246b38] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-3 h-3" />
                </div>
                <span className="font-medium">{item.text}</span>
              </div>
            );
          })}
        </div>

        {/* Mascot artwork */}
        <div className="sm:col-span-5 flex flex-col items-center justify-center relative pt-2">
          {/* Dr. Ticky Mascot */}
          <div className="relative w-28 h-28">
            <Image
              src="/assets/dashboard-banner-right.webp"
              alt="Dr. Ticky Mascot"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
