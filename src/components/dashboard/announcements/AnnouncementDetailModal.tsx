"use client";

import { AnnouncementItem } from "@/types/announcement";
import { AlertTriangle, Bell, Smartphone, X } from "lucide-react";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  announcement: AnnouncementItem | null;
}

export default function AnnouncementDetailModal({
  isOpen,
  onClose,
  announcement,
}: Props) {
  if (!isOpen || !announcement) return null;

  const isUrgent = announcement.priority === "Urgent";

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-sm shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Device Header Bar */}
        <div className="bg-[#133d23] text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>Resident App View Simulator</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Device Frame Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs bg-[#f7faf8]">
          {/* Simulated Mobile Notification Card */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[11px] text-gray-400">
              <div className="flex items-center gap-1.5 font-bold text-[#1b552b]">
                <div className="w-4 h-4 relative">
                  <Image src="/assets/app-icon.webp" alt="App" fill className="object-contain" />
                </div>
                <span>TickyTICKEY • San Isidro</span>
              </div>
              <span>Just now</span>
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isUrgent ? "bg-rose-100 text-rose-700" : "bg-green-100 text-green-700"
                }`}
              >
                {isUrgent ? <AlertTriangle className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
              </div>
              <div>
                <h4 className="font-black text-gray-900 leading-tight">
                  {announcement.title}
                </h4>
                <span className="text-[10px] font-bold text-gray-500">
                  {announcement.category} • {announcement.targetAudience}
                </span>
              </div>
            </div>
          </div>

          {/* Full Announcement Mobile Page Card */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
            {/* Top Mascot Sprout Badge */}
            <div className="p-3 bg-[#edf7ee] rounded-xl border border-green-200 flex items-center gap-3">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/assets/dashboard-banner-right.webp"
                  alt="Mascot"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-[#133d23] text-xs block">
                  Official Barangay Advisory
                </span>
                <span className="text-[10px] text-gray-500 font-medium">
                  Issued by {announcement.author}
                </span>
              </div>
            </div>

            {/* Content text */}
            <div className="space-y-2 text-gray-800 leading-relaxed font-medium">
              <p>{announcement.content}</p>
            </div>

            {/* Channels & Reach stamps */}
            <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-500 space-y-1">
              <div className="flex items-center justify-between">
                <span>Broadcast Channels:</span>
                <span className="font-bold text-gray-800">
                  {announcement.broadcastChannels.join(", ")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Estimated Reach:</span>
                <span className="font-bold text-[#15803d]">
                  {announcement.reachCount.toLocaleString()} residents
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Date:</span>
                <span className="font-medium text-gray-700">{announcement.publishedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Close */}
        <div className="p-3.5 bg-white border-t border-gray-100 text-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-xs text-gray-700 transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
