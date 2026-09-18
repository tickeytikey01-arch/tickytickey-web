"use client";

import Modal from "@/components/ui/Modal";
import { ActivityLog } from "@/types/dashboard";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  FileSpreadsheet,
  Megaphone,
  Pill,
  User,
  Zap
} from "lucide-react";
import { useState } from "react";

interface RecentActivityFeedProps {
  activities: ActivityLog[];
  onAddAnnouncement?: (title: string) => void;
  onAddMedicine?: (name: string, quantity: number) => void;
  onExportReport?: () => void;
}

export default function RecentActivityFeed({
  activities,
  onAddAnnouncement,
  onAddMedicine,
  onExportReport,
}: RecentActivityFeedProps) {
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [medicineModalOpen, setMedicineModalOpen] = useState(false);
  const [announcementText, setAnnouncementText] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [medicineQty, setMedicineQty] = useState(100);
  const [exportNotice, setExportNotice] = useState(false);

  const getActivityIcon = (type: ActivityLog["type"]) => {
    switch (type) {
      case "consultation":
        return { icon: User, bg: "bg-blue-50 text-blue-600" };
      case "medicine":
        return { icon: Pill, bg: "bg-purple-50 text-purple-600" };
      case "appointment":
        return { icon: Calendar, bg: "bg-emerald-50 text-emerald-600" };
      case "announcement":
        return { icon: Megaphone, bg: "bg-amber-50 text-amber-600" };
      case "user":
        return { icon: User, bg: "bg-teal-50 text-teal-600" };
    }
  };

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddAnnouncement && announcementText) {
      onAddAnnouncement(announcementText);
      setAnnouncementText("");
      setAnnouncementModalOpen(false);
    }
  };

  const handlePostMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddMedicine && medicineName) {
      onAddMedicine(medicineName, medicineQty);
      setMedicineName("");
      setMedicineModalOpen(false);
    }
  };

  const handleExport = () => {
    setExportNotice(true);
    if (onExportReport) onExportReport();
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between space-y-6">
      
      {/* Activity Feed Section */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-green-50 text-[#246b38] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Recent Activity</h3>
          </div>
          <button
            type="button"
            className="text-xs font-bold text-[#246b38] hover:text-[#184e27] inline-flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3 max-h-[220px] overflow-y-auto overscroll-contain scrollbar-thin pr-1">
          {activities.slice(0, 6).map((item) => {
            const { icon: Icon, bg } = getActivityIcon(item.type);
            return (
              <div key={item.id} className="flex items-start gap-3 text-xs">
                <div className={`w-7 h-7 rounded-xl ${bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 leading-snug">
                    <strong className="font-bold text-gray-900">{item.actor}</strong> {item.action}
                  </p>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {item.timeAgo}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-800">
          <Zap className="w-4 h-4 text-[#246b38] fill-[#246b38]" />
          <span>Quick Actions</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Add Announcement */}
          <button
            type="button"
            onClick={() => setAnnouncementModalOpen(true)}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-[#eef7ef] hover:bg-[#dcf0dd] text-[#1c552c] border border-green-200/60 shadow-2xs transition-all text-center group"
          >
            <Megaphone className="w-4 h-4 mb-1 transition-transform group-hover:scale-110" />
            <span className="text-[10px] font-bold leading-tight">Add Announcement</span>
          </button>

          {/* Add Medicine */}
          <button
            type="button"
            onClick={() => setMedicineModalOpen(true)}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-[#e6f4fb] hover:bg-[#d5edf8] text-[#0277bd] border border-blue-200/60 shadow-2xs transition-all text-center group"
          >
            <Pill className="w-4 h-4 mb-1 transition-transform group-hover:scale-110" />
            <span className="text-[10px] font-bold leading-tight">Add Medicine</span>
          </button>

          {/* Export Report */}
          <button
            type="button"
            onClick={handleExport}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-[#f5eefb] hover:bg-[#ecdcf7] text-[#6a1b9a] border border-purple-200/60 shadow-2xs transition-all text-center group"
          >
            <FileSpreadsheet className="w-4 h-4 mb-1 transition-transform group-hover:scale-110" />
            <span className="text-[10px] font-bold leading-tight">Export Report</span>
          </button>
        </div>

        {exportNotice && (
          <div className="mt-2.5 p-2 rounded-xl bg-purple-50 text-purple-700 text-[11px] font-semibold flex items-center justify-center gap-1 animate-in fade-in">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Health report exported successfully (.CSV)!</span>
          </div>
        )}
      </div>

      {/* Modal: Add Announcement */}
      <Modal
        isOpen={announcementModalOpen}
        onClose={() => setAnnouncementModalOpen(false)}
        title="Post Barangay Health Announcement"
        icon={
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Megaphone className="w-4 h-4" />
          </div>
        }
      >
        <form onSubmit={handlePostAnnouncement} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Announcement Message</label>
            <textarea
              required
              rows={3}
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder="e.g. Free flu vaccination drive this Saturday at Barangay Gym..."
              className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#3fa04e] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-[#246b38] hover:bg-[#1a552b] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Publish to All Residents
          </button>
        </form>
      </Modal>

      {/* Modal: Add Medicine */}
      <Modal
        isOpen={medicineModalOpen}
        onClose={() => setMedicineModalOpen(false)}
        title="Add Medicine Stock"
        icon={
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Pill className="w-4 h-4" />
          </div>
        }
      >
        <form onSubmit={handlePostMedicine} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Medicine Name</label>
            <input
              type="text"
              required
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              placeholder="e.g. Amoxicillin 500mg, Paracetamol"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#3fa04e] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Quantity Received</label>
            <input
              type="number"
              min="1"
              required
              value={medicineQty}
              onChange={(e) => setMedicineQty(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#3fa04e] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-[#0277bd] hover:bg-[#01579b] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Update Inventory Stock
          </button>
        </form>
      </Modal>

    </div>
  );
}
