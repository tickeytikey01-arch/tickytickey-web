"use client";

import { AnnouncementItem, AnnouncementPriority, AnnouncementStatus } from "@/types/announcement";
import {
  Edit2,
  Eye,
  Send,
  Smartphone,
  Trash2,
  Users
} from "lucide-react";

interface Props {
  announcements: AnnouncementItem[];
  onPreview: (a: AnnouncementItem) => void;
  onEdit: (a: AnnouncementItem) => void;
  onToggleStatus: (id: string) => void;
  onBroadcastSMS: (a: AnnouncementItem) => void;
  onDelete: (id: string) => void;
}

export default function AnnouncementsList({
  announcements,
  onPreview,
  onEdit,
  onToggleStatus,
  onBroadcastSMS,
  onDelete,
}: Props) {
  const getPriorityBadge = (p: AnnouncementPriority) => {
    switch (p) {
      case "Urgent":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Important":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Normal":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
  };

  const getStatusBadge = (s: AnnouncementStatus) => {
    switch (s) {
      case "Published":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          dot: "bg-emerald-500",
        };
      case "Scheduled":
        return {
          bg: "bg-purple-50 text-purple-700 border-purple-200",
          dot: "bg-purple-500",
        };
      case "Draft":
        return {
          bg: "bg-gray-100 text-gray-600 border-gray-200",
          dot: "bg-gray-400",
        };
    }
  };

  if (announcements.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-2xs text-center text-gray-400">
        No announcements found matching your current filter criteria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
      {announcements.map((item) => {
        const priorityBadge = getPriorityBadge(item.priority);
        const statusBadge = getStatusBadge(item.status);

        return (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between space-y-4"
          >
            {/* Top Meta Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${priorityBadge}`}
                >
                  {item.priority}
                </span>

                <span className="text-[11px] font-bold text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                  {item.category}
                </span>
              </div>

              {/* Status Badge */}
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${statusBadge.bg}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                <span>{item.status}</span>
              </span>
            </div>

            {/* Content Body */}
            <div className="space-y-2 flex-1">
              <h3 className="text-base font-black text-gray-900 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                {item.content}
              </p>

              {/* Target Audience & Channels */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                  <Users className="w-3 h-3 text-blue-500" />
                  <span>{item.targetAudience}</span>
                </span>

                {item.broadcastChannels.map((ch, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[10.5px] font-medium text-gray-600 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100"
                  >
                    <Smartphone className="w-3 h-3 text-[#246b38]" />
                    <span>{ch}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer: Metadata & Actions */}
            <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-[11px] text-gray-400 space-y-0.5">
                <div>By <span className="font-semibold text-gray-700">{item.author}</span></div>
                <div>{item.publishedDate} • <span className="font-bold text-[#15803d]">{item.reachCount.toLocaleString()} reached</span></div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onPreview(item)}
                  className="p-1.5 rounded-xl border border-green-200 bg-green-50/70 hover:bg-green-100 text-[#246b38] transition-colors cursor-pointer"
                  title="Preview Mobile Display"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onBroadcastSMS(item)}
                  className="p-1.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-blue-700 transition-colors cursor-pointer"
                  title="Broadcast SMS to Residents"
                >
                  <Send className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onEdit(item)}
                  className="p-1.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-600 hover:text-[#246b38] transition-colors cursor-pointer"
                  title="Edit Announcement"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onToggleStatus(item.id)}
                  className="px-2 py-1 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-700 text-[11px] font-bold transition-colors cursor-pointer"
                  title={item.status === "Published" ? "Unpublish" : "Publish"}
                >
                  {item.status === "Published" ? "Unpublish" : "Publish"}
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  className="p-1.5 rounded-xl border border-rose-200 bg-rose-50/60 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
