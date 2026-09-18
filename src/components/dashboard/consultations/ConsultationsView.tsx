"use client";

import Banner from "@/components/dashboard/Banner";
import { ConsultationItem } from "@/types/dashboard";
import { ArrowLeft, Heart } from "lucide-react";
import { useMemo, useState } from "react";
import AssignBhwModal from "./AssignBhwModal";
import ConsultationDetailsCard from "./ConsultationDetailsCard";
import ConsultationQueue from "./ConsultationQueue";
import ConsultationStatsRow from "./ConsultationStatsRow";
import ConsultationToolbar from "./ConsultationToolbar";
import MessengerChatModal from "./MessengerChatModal";
import ResidentProfileModal from "./ResidentProfileModal";

interface ConsultationsViewProps {
  consultations: ConsultationItem[];
  onStatusChange: (id: string, newStatus: ConsultationItem["status"]) => void;
  onSendMessage: (id: string, text: string) => void;
  onAssignBhw: (
    consultationId: string,
    bhw: { name: string; role: string; phone: string; avatar: string }
  ) => void;
  initialSelectedId?: string;
}

export default function ConsultationsView({
  consultations,
  onStatusChange,
  onSendMessage,
  onAssignBhw,
  initialSelectedId,
}: ConsultationsViewProps) {
  const [selectedId, setSelectedId] = useState<string>(
    initialSelectedId || consultations[0]?.id || "c-1"
  );
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileTab, setMobileTab] = useState<"queue" | "details">("queue");

  // Modals
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [messengerOpen, setMessengerOpen] = useState(false);

  // Live stats matching mockup base
  const counts = useMemo(() => {
    return {
      total: 128,
      all: 128,
      waiting: 18,
      active: 24,
      replied: 86,
      resolved: 86,
    };
  }, []);

  // Filter consultations
  const filteredConsultations = useMemo(() => {
    return consultations.filter((c) => {
      const matchFilter =
        statusFilter === "All" ||
        c.status.toLowerCase() === statusFilter.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        c.residentName.toLowerCase().includes(q) ||
        c.concern.toLowerCase().includes(q) ||
        (c.purok && c.purok.toLowerCase().includes(q)) ||
        (c.caseNumber && c.caseNumber.toLowerCase().includes(q));

      return matchFilter && matchSearch;
    });
  }, [consultations, statusFilter, searchQuery]);

  // Selected consultation item - strictly independent of queue search or status filter
  const selectedConsultation = useMemo(() => {
    return (
      consultations.find((c) => c.id === selectedId) ||
      consultations[0]
    );
  }, [consultations, selectedId]);

  const handleSelectCase = (c: ConsultationItem) => {
    setSelectedId(c.id);
    setMobileTab("details");
  };

  const handleAssignBhwConfirm = (bhw: {
    name: string;
    role: string;
    phone: string;
    avatar: string;
  }) => {
    if (selectedConsultation) {
      onAssignBhw(selectedConsultation.id, bhw);
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* 1. Reusable Banner Component */}
      <Banner
        title="Consultations"
        subtitle="Manage and respond to resident health consultations."
        cardTitle="Community Health Inquiries"
        cardSubtitle="Every question matters. Healthier communities together!"
        speechBubbleNode={
          <div className="bg-white/95 backdrop-blur-xs text-[#1b552b] font-bold text-[10px] sm:text-xs py-2 px-3.5 rounded-2xl shadow-md border border-green-200 text-center max-w-[190px] leading-tight flex items-center gap-1.5 rotate-[1deg]">
            <span>Every question matters!</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 flex-shrink-0" />
          </div>
        }
        className="mb-6"
      />

      {/* 2. Stats Row */}
      <ConsultationStatsRow
        stats={counts}
        activeFilter={statusFilter}
        onSelectFilter={setStatusFilter}
      />

      {/* 3. Toolbar: Status Pills, Search, + Assign BHW */}
      <ConsultationToolbar
        currentStatus={statusFilter}
        onSelectStatus={setStatusFilter}
        counts={counts}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAssignBhw={() => setAssignModalOpen(true)}
      />

      {/* Mobile Navigation toggle when on small screens */}
      <div className="lg:hidden flex items-center justify-between bg-white p-2.5 rounded-2xl border border-gray-100 shadow-2xs mb-3">
        {mobileTab === "details" ? (
          <button
            type="button"
            onClick={() => setMobileTab("queue")}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#246b38] bg-green-50 px-3 py-1.5 rounded-xl hover:bg-green-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to Queue</span>
          </button>
        ) : (
          <span className="text-xs font-bold text-gray-700 px-2">
            Select a consultation to view details &amp; messenger chat
          </span>
        )}

        <span className="text-[11px] font-mono text-gray-400">
          {selectedConsultation?.residentName}
        </span>
      </div>

      {/* 4. Perfectly Balanced 50/50 2-Column Layout with exact height for smooth list scrolling */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch lg:h-[720px] min-h-[660px]">
        {/* Column 1: Consultation Queue (Left 50%) */}
        <div
          className={`h-full flex flex-col min-h-0 ${
            mobileTab === "details" ? "hidden lg:flex" : "flex"
          }`}
        >
          <ConsultationQueue
            consultations={filteredConsultations}
            selectedId={selectedConsultation?.id || ""}
            onSelect={handleSelectCase}
          />
        </div>

        {/* Column 2: Consultation Details (Right 50%) */}
        {selectedConsultation && (
          <div
            className={`h-full flex flex-col min-h-0 ${
              mobileTab === "queue" ? "hidden lg:flex" : "flex"
            }`}
          >
            <ConsultationDetailsCard
              consultation={selectedConsultation}
              allConsultations={consultations}
              onSelectConsultationId={(id) => setSelectedId(id)}
              onViewProfile={() => setProfileModalOpen(true)}
              onStatusChange={onStatusChange}
              onOpenChatModal={() => setMessengerOpen(true)}
            />
          </div>
        )}
      </div>

      {/* 5. Authentic Facebook Messenger-Style 3-Panel Modal */}
      {selectedConsultation && (
        <MessengerChatModal
          isOpen={messengerOpen}
          onClose={() => setMessengerOpen(false)}
          activeConsultation={selectedConsultation}
          allConsultations={filteredConsultations}
          onSelectConsultation={(c) => setSelectedId(c.id)}
          onSendMessage={onSendMessage}
          onChangeBhw={() => setAssignModalOpen(true)}
          onViewProfile={() => setProfileModalOpen(true)}
        />
      )}

      {/* Staff Assignment Modal */}
      <AssignBhwModal
        isOpen={assignModalOpen}
        onClose={() => setAssignModalOpen(false)}
        currentBhwName={selectedConsultation?.assignedBHW || "Ana Reyes"}
        onAssign={handleAssignBhwConfirm}
      />

      {/* Resident Full Profile Modal */}
      <ResidentProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        consultation={selectedConsultation || null}
      />
    </div>
  );
}
