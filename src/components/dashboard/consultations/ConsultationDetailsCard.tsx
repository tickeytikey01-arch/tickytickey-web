"use client";

import { ConsultationItem } from "@/types/dashboard";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  ListChecks,
  MapPin,
  MessageSquare,
  Phone,
  Stethoscope,
  User,
} from "lucide-react";

interface DetailsProps {
  consultation: ConsultationItem;
  allConsultations?: ConsultationItem[];
  onSelectConsultationId?: (id: string) => void;
  onViewProfile: (consultation: ConsultationItem) => void;
  onStatusChange?: (id: string, newStatus: ConsultationItem["status"]) => void;
  onOpenChatModal: () => void;
}

export default function ConsultationDetailsCard({
  consultation,
  allConsultations,
  onSelectConsultationId,
  onViewProfile,
  onOpenChatModal,
}: DetailsProps) {
  const getPriorityStyle = (priority?: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "High":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "Medium":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-green-50 text-green-700 border-green-200";
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Waiting":
        return "bg-[#fef8ed] text-[#b45309] border-[#fbe4bd]";
      case "Active":
        return "bg-[#edf9f0] text-[#15803d] border-[#bfe8cb]";
      case "Replied":
        return "bg-[#edf6fe] text-[#1d4ed8] border-[#c0e0fc]";
      case "Resolved":
      case "Completed":
        return "bg-[#f5eefb] text-[#7e22ce] border-[#e2cef6]";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const conversation = consultation.conversation || [];
  const latestMessage = conversation[conversation.length - 1];

  const currentIndex = allConsultations
    ? allConsultations.findIndex((c) => c.id === consultation.id)
    : -1;

  const handlePrev = () => {
    if (allConsultations && currentIndex > 0) {
      onSelectConsultationId?.(allConsultations[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (allConsultations && currentIndex < allConsultations.length - 1) {
      onSelectConsultationId?.(allConsultations[currentIndex + 1].id);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-xs flex flex-col h-full min-h-0 justify-between space-y-4">
      {/* Top Header: Standalone Independent Case Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <h3 className="text-base sm:text-lg font-black text-gray-900">
            Consultation Details
          </h3>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active Case
          </span>
        </div>

        {/* Independent Case Switcher Controls */}
        <div className="flex items-center gap-2">
          {allConsultations && allConsultations.length > 1 && (
            <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200/80 p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex <= 0}
                title="Previous Case"
                className="p-1 rounded-lg text-gray-600 hover:bg-white hover:text-[#246b38] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <select
                value={consultation.id}
                aria-label="Select Active Consultation"
                onChange={(e) => onSelectConsultationId?.(e.target.value)}
                className="bg-transparent text-xs font-bold text-gray-800 py-1 px-1.5 focus:outline-none cursor-pointer max-w-[170px] truncate"
              >
                {allConsultations.map((c, idx) => (
                  <option key={c.id} value={c.id}>
                    #{idx + 1}: {c.residentName} ({c.status})
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex >= allConsultations.length - 1}
                title="Next Case"
                className="p-1 rounded-lg text-gray-600 hover:bg-white hover:text-[#246b38] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <span className="text-[11px] font-mono font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 hidden sm:inline-block">
            {consultation.caseNumber || `#CONS-${consultation.id}`}
          </span>
        </div>
      </div>

      {/* Scrollable details container so heights remain balanced */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain space-y-4 pr-1 scrollbar-thin">
        {/* Resident Info Box */}
        <div className="p-4 rounded-2xl bg-[#edf7ef]/60 border border-green-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#dcf0dd] text-[#1c552c] font-black text-sm flex items-center justify-center flex-shrink-0">
              {consultation.initials}
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-900 leading-tight">
                {consultation.residentName}
              </h4>
              <div className="text-xs text-gray-500 font-medium mt-0.5">
                {consultation.gender || "Resident"} • {consultation.age ? `${consultation.age} years old` : "Adult"}
              </div>
              <div className="flex items-center gap-3 text-[11px] text-gray-600 mt-1">
                <span className="inline-flex items-center gap-1 font-mono">
                  <Phone className="w-3 h-3 text-[#246b38]" />
                  <span>{consultation.phone || "0917 123 4567"}</span>
                </span>
                <span className="inline-flex items-center gap-1 font-medium">
                  <MapPin className="w-3 h-3 text-[#246b38]" />
                  <span>{consultation.purok || "Purok 3"}</span>
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onViewProfile(consultation)}
            className="px-3.5 py-1.5 rounded-full bg-white border border-green-200 text-[#1b552b] hover:bg-[#dcf0dd] text-xs font-bold transition-colors shadow-2xs self-stretch sm:self-auto text-center cursor-pointer"
          >
            View Profile
          </button>
        </div>

        {/* Meta 3-Tile Row */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 text-xs">
          {/* Priority */}
          <div className="p-3 rounded-2xl bg-gray-50/80 border border-gray-100">
            <span className="text-[10px] text-gray-400 font-bold block mb-1">Priority</span>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold border ${getPriorityStyle(
                consultation.priority
              )}`}
            >
              <AlertTriangle className="w-3 h-3" />
              <span>{consultation.priority || "Medium"}</span>
            </span>
          </div>

          {/* Status */}
          <div className="p-3 rounded-2xl bg-gray-50/80 border border-gray-100">
            <span className="text-[10px] text-gray-400 font-bold block mb-1">Status</span>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold border ${getStatusStyle(
                consultation.status
              )}`}
            >
              <Clock className="w-3 h-3" />
              <span>{consultation.status}</span>
            </span>
          </div>

          {/* Assigned BHW */}
          <div className="p-3 rounded-2xl bg-gray-50/80 border border-gray-100">
            <span className="text-[10px] text-gray-400 font-bold block mb-1">Assigned BHW</span>
            <div className="flex items-center gap-1 text-[11px] font-bold text-gray-800 truncate">
              <User className="w-3 h-3 text-[#246b38] flex-shrink-0" />
              <span className="truncate">{consultation.assignedBHW || "Ana Reyes"}</span>
            </div>
          </div>
        </div>

        {/* Details: Chief Complaint & Symptoms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Chief Complaint */}
          <div className="p-3.5 rounded-2xl bg-white border border-gray-100">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-[#133d23]">
              <Stethoscope className="w-4 h-4 text-[#246b38]" />
              <span>Chief Complaint</span>
            </div>
            <p className="text-xs text-gray-800 font-semibold pl-6">
              {consultation.chiefComplaint || consultation.concern}
            </p>
          </div>

          {/* Symptoms Checklist */}
          <div className="p-3.5 rounded-2xl bg-white border border-gray-100">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-[#133d23]">
              <ListChecks className="w-4 h-4 text-[#246b38]" />
              <span>Reported Symptoms</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pl-6">
              {consultation.symptoms && consultation.symptoms.length > 0 ? (
                consultation.symptoms.map((sym, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-green-50 text-[#133d23] font-medium px-2 py-0.5 rounded-md border border-green-100"
                  >
                    {sym}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 italic text-xs">No symptoms logged</span>
              )}
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="p-3.5 rounded-2xl bg-white border border-gray-100">
          <div className="flex items-center gap-2 mb-1 text-xs font-bold text-[#133d23]">
            <FileText className="w-4 h-4 text-[#246b38]" />
            <span>Clinical &amp; Triage Notes</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed pl-6">
            {consultation.additionalNotes || "No previous allergic reactions or medical history reported."}
          </p>
        </div>
      </div>

      {/* MESSENGER LIVE CONSULTATION CHAT WIDGET (Clicking opens Messenger modal) */}
      <button
        type="button"
        onClick={onOpenChatModal}
        className="w-full text-left p-4 rounded-2xl bg-gradient-to-br from-[#f2f9f3] via-[#edf7ef] to-[#e1f1e4] border-2 border-[#b8e4c0] hover:border-[#246b38] hover:shadow-md transition-all cursor-pointer group flex flex-col gap-2.5 flex-shrink-0"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#246b38] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-black text-gray-900 group-hover:text-[#133d23]">
                  Live Consultation Chat
                </h4>
                <span className="text-[11px] font-bold text-emerald-800 bg-white border border-green-200 px-2.5 py-0.5 rounded-full shadow-2xs">
                  {conversation.length} {conversation.length === 1 ? "message" : "messages"}
                </span>
              </div>
              <span className="text-[11px] text-gray-500 font-medium block mt-0.5">
                Click to open Facebook Messenger-style chat &amp; response
              </span>
            </div>
          </div>

          <span className="px-3.5 py-1.5 rounded-xl bg-[#246b38] group-hover:bg-[#1a552b] text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5 flex-shrink-0">
            <span>Open Chat</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Latest Message Preview */}
        {latestMessage ? (
          <div className="p-2.5 rounded-xl bg-white/90 border border-green-100 text-xs flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-bold text-[#133d23] flex-shrink-0">
                {latestMessage.senderName}:
              </span>
              <span className="text-gray-700 truncate font-medium">
                &ldquo;{latestMessage.text}&rdquo;
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-mono flex-shrink-0">
              {latestMessage.timestamp}
            </span>
          </div>
        ) : (
          <div className="p-2.5 rounded-xl bg-white/80 border border-dashed border-green-200 text-xs text-gray-400 text-center">
            Click to start consultation conversation.
          </div>
        )}
      </button>
    </div>
  );
}
