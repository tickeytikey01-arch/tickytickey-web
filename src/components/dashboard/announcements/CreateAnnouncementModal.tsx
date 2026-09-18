"use client";

import {
  AnnouncementCategory,
  AnnouncementItem,
  AnnouncementPriority,
  AnnouncementStatus,
  BroadcastChannel,
} from "@/types/announcement";
import { Megaphone, Send, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  announcementToEdit: AnnouncementItem | null;
  onSave: (a: AnnouncementItem) => void;
}

export default function CreateAnnouncementModal({
  isOpen,
  onClose,
  announcementToEdit,
  onSave,
}: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<AnnouncementCategory>("Vaccination Drive");
  const [priority, setPriority] = useState<AnnouncementPriority>("Normal");
  const [status, setStatus] = useState<AnnouncementStatus>("Published");
  const [targetAudience, setTargetAudience] = useState("All Barangays");
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [bulletinEnabled, setBulletinEnabled] = useState(true);

  useEffect(() => {
    if (announcementToEdit) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset the controlled form when the selected record changes
      setTitle(announcementToEdit.title);
      setContent(announcementToEdit.content);
      setCategory(announcementToEdit.category);
      setPriority(announcementToEdit.priority);
      setStatus(announcementToEdit.status);
      setTargetAudience(announcementToEdit.targetAudience);
      setPushEnabled(announcementToEdit.broadcastChannels.includes("Push Notification"));
      setSmsEnabled(announcementToEdit.broadcastChannels.includes("SMS Sync"));
      setBulletinEnabled(announcementToEdit.broadcastChannels.includes("Barangay Bulletin"));
    } else {
      setTitle("");
      setContent("");
      setCategory("Vaccination Drive");
      setPriority("Normal");
      setStatus("Published");
      setTargetAudience("All Barangays");
      setPushEnabled(true);
      setSmsEnabled(true);
      setBulletinEnabled(true);
    }
  }, [announcementToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both the title and announcement content.");
      return;
    }

    const channels: BroadcastChannel[] = [];
    if (pushEnabled) channels.push("Push Notification");
    if (smsEnabled) channels.push("SMS Sync");
    if (bulletinEnabled) channels.push("Barangay Bulletin");

    const saved: AnnouncementItem = {
      id: announcementToEdit ? announcementToEdit.id : `ann-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      category,
      priority,
      status,
      targetAudience,
      broadcastChannels: channels.length > 0 ? channels : ["Push Notification"],
      author: announcementToEdit ? announcementToEdit.author : "Admin Maria Santos",
      publishedDate: announcementToEdit
        ? announcementToEdit.publishedDate
        : new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      reachCount: announcementToEdit ? announcementToEdit.reachCount : 1284,
    };

    onSave(saved);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-green-50 text-[#246b38] flex items-center justify-center border border-green-100">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-gray-900 leading-tight">
                {announcementToEdit ? "Edit Announcement" : "Create Announcement / Advisory"}
              </h3>
              <p className="text-xs text-gray-400">
                Broadcast public health advisories to resident mobile apps and SMS
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Announcement Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Free Dengue Screening &amp; Clean-Up Drive"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#246b38] focus:bg-white"
            />
          </div>

          {/* Category & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AnnouncementCategory)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-[#246b38]"
              >
                <option value="Vaccination Drive">Vaccination Drive</option>
                <option value="Health Advisory">Health Advisory</option>
                <option value="Medical Mission">Medical Mission</option>
                <option value="Emergency Alert">Emergency Alert</option>
                <option value="Clinic Hours">Clinic Hours Notice</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Priority Level *</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as AnnouncementPriority)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-[#246b38]"
              >
                <option value="Normal">Normal (Routine Info)</option>
                <option value="Important">Important (Action Needed)</option>
                <option value="Urgent">Urgent (Immediate Warning)</option>
              </select>
            </div>
          </div>

          {/* Target Audience & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Target Audience</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-[#246b38]"
              >
                <option value="All Barangays">All Barangays (General)</option>
                <option value="Purok 1-3">Puroks 1 to 3</option>
                <option value="Purok 4-6">Puroks 4 to 6</option>
                <option value="Senior Citizens">Senior Citizens (60+)</option>
                <option value="Mothers & Infants">Mothers &amp; Infants</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Publish Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as AnnouncementStatus)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-[#246b38]"
              >
                <option value="Published">Publish Immediately</option>
                <option value="Draft">Save as Draft</option>
                <option value="Scheduled">Schedule for Later</option>
              </select>
            </div>
          </div>

          {/* Content Body */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Advisory Content *</label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write the full advisory message here. Provide clinic hours, instructions, requirements, or emergency contacts..."
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#246b38] focus:bg-white resize-none"
            />
          </div>

          {/* Broadcast Channels Selection */}
          <div className="p-3.5 bg-[#edf7ef]/60 rounded-2xl border border-green-100 space-y-2">
            <span className="text-[11px] font-bold text-[#1b552b] block">
              Multi-Channel Broadcast Sync
            </span>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pushEnabled}
                  onChange={(e) => setPushEnabled(e.target.checked)}
                  className="rounded text-[#246b38] focus:ring-[#246b38]"
                />
                <span>Mobile App Push Notification</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={smsEnabled}
                  onChange={(e) => setSmsEnabled(e.target.checked)}
                  className="rounded text-[#246b38] focus:ring-[#246b38]"
                />
                <span>SMS Broadcast (Semaphore Synced)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bulletinEnabled}
                  onChange={(e) => setBulletinEnabled(e.target.checked)}
                  className="rounded text-[#246b38] focus:ring-[#246b38]"
                />
                <span>Community Web Bulletin</span>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-bold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#246b38] hover:bg-[#1b552b] text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{announcementToEdit ? "Update Announcement" : "Publish & Broadcast"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
