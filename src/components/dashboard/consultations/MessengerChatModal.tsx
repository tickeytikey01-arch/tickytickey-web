"use client";

import { ConsultationItem } from "@/types/dashboard";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Image as ImageIcon,
  Info,
  Phone,
  PlusCircle,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  ThumbsUp,
  User,
  X
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface MessengerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeConsultation: ConsultationItem;
  allConsultations: ConsultationItem[];
  onSelectConsultation: (c: ConsultationItem) => void;
  onSendMessage: (id: string, text: string) => void;
  onChangeBhw: () => void;
  onViewProfile: (c: ConsultationItem) => void;
}

export default function MessengerChatModal({
  isOpen,
  onClose,
  activeConsultation,
  allConsultations,
  onSelectConsultation,
  onSendMessage,
  onChangeBhw,
  onViewProfile,
}: MessengerModalProps) {
  const [chatSearch, setChatSearch] = useState("");
  const [messageText, setMessageText] = useState("");
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  const [showQuickTemplates, setShowQuickTemplates] = useState(true);

  // Accordion toggle states in right sidebar
  const [chatInfoOpen, setChatInfoOpen] = useState(true);
  const [symptomsOpen, setSymptomsOpen] = useState(true);
  const [assignedBhwOpen, setAssignedBhwOpen] = useState(true);
  const [mediaFilesOpen, setMediaFilesOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  // Auto scroll to bottom when conversation updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConsultation.conversation]);

  if (!isOpen) return null;

  const cannedResponses = [
    {
      id: "fever",
      label: "Fever Advice",
      icon: "💊",
      text: "Panatilihing uminom ng maraming tubig at oral rehydration salts (ORS). Maaaring uminom ng Paracetamol 500mg tuwing 4-6 oras kung mataas ang lagnat.",
    },
    {
      id: "cough",
      label: "Cough & Cold",
      icon: "🍃",
      text: "Uminom ng maligamgam na tubig na may kalamansi. May available tayong cough syrup at Vit C sa health center na pwedeng i-claim.",
    },
    {
      id: "urgent",
      label: "Urgent Clinic Visit",
      icon: "🚨",
      text: "Kailangan po kayong ma-check agad ng ating resident physician sa clinic ngayong araw para sa laboratory test at reseta.",
    },
    {
      id: "immunization",
      label: "Immunization Info",
      icon: "👶",
      text: "Ang ating regular immunization schedule ay tuwing Miyerkules, 8:00 AM - 11:30 AM sa Health Station. Dalhin ang Baby Book.",
    },
    {
      id: "bp",
      label: "BP Follow-up",
      icon: "🩺",
      text: "Paalala po na sukatin ang presyon sa umaga at gabi. Libre ang BP monitoring at gamot refill sa ating barangay station.",
    },
    {
      id: "general",
      label: "General Health Care",
      icon: "📋",
      text: "Naitala na po ang inyong konsultasyon sa ating barangay database. Magpahinga po at mag-chat agad kung may bagong sintomas.",
    },
  ];

  const handleApplyCanned = (text: string) => {
    setMessageText(text);
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const textToSend = messageText.trim();
    if (!textToSend) return;

    onSendMessage(activeConsultation.id, textToSend);
    setMessageText("");
  };

  const handleThumbsUp = () => {
    onSendMessage(activeConsultation.id, "👍 (Acknowledged by Health Center)");
  };

  const handleFile = async (file?: File) => {
    if (!file || uploading) return;
    setUploading(true);
    try {
      const body = new FormData(); body.append("file", file);
      const response = await fetch(`/api/consultations/${activeConsultation.id}/attachments`, { method: "POST", body });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to upload attachment.");
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Unable to upload attachment.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Filter left chat list
  const filteredChats = allConsultations.filter(
    (c) =>
      c.residentName.toLowerCase().includes(chatSearch.toLowerCase()) ||
      c.concern.toLowerCase().includes(chatSearch.toLowerCase())
  );

  const bhw = activeConsultation.bhwDetails || {
    name: activeConsultation.assignedBHW || "Ana Reyes",
    role: "Barangay Health Worker",
    phone: "0928 765 4321",
    avatar: "/assets/doctor.png",
  };

  const conversation = activeConsultation.conversation || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      {/* 3-Column Messenger Container */}
      <div
        className="bg-white w-full max-w-7xl h-[92vh] rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-row animate-in zoom-in-95 duration-150 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================= */}
        {/* COLUMN 1: LEFT CHATS SIDEBAR (Matching Messenger left list) */}
        {/* ========================================================= */}
        <div className="w-72 sm:w-80 border-r border-gray-100 flex flex-col bg-[#fdfdfd] flex-shrink-0 hidden md:flex min-h-0">
          {/* Chats Header */}
          <div className="p-4 pb-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-black text-gray-900 tracking-tight">
              Chats
            </h2>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              {allConsultations.length} Active
            </span>
          </div>

          {/* Search Messenger Input */}
          <div className="px-3.5 py-2.5">
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200/70 transition-colors">
              <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={chatSearch}
                onChange={(e) => setChatSearch(e.target.value)}
                placeholder="Search Messenger..."
                className="bg-transparent text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none w-full"
              />
            </div>
          </div>

          {/* Resident Conversations Scroll List */}
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-2 space-y-1 scrollbar-thin">
            {filteredChats.map((c) => {
              const isSelected = c.id === activeConsultation.id;
              const lastMsg = c.conversation && c.conversation.length > 0
                ? c.conversation[c.conversation.length - 1]
                : null;

              return (
                <div
                  key={c.id}
                  onClick={() => onSelectConsultation(c)}
                  className={`p-2.5 rounded-2xl flex items-center gap-3 transition-all cursor-pointer select-none group ${
                    isSelected
                      ? "bg-[#edf7ef] text-gray-900 shadow-2xs border border-green-200"
                      : "hover:bg-gray-100/80 text-gray-700"
                  }`}
                >
                  {/* Avatar with live green indicator */}
                  <div className="relative flex-shrink-0">
                    <div className="w-11 h-11 rounded-full bg-[#dcf0dd] text-[#1c552c] font-black text-xs flex items-center justify-center border border-white shadow-2xs">
                      {c.initials}
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>

                  {/* Name + Snippet */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-gray-900 truncate">
                        {c.residentName}
                      </h4>
                      <span className="text-[10px] text-gray-400 flex-shrink-0 ml-1">
                        {c.timeAgo ? c.timeAgo.replace(" ago", "") : "Now"}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 truncate leading-tight mt-0.5">
                      {lastMsg ? `${lastMsg.sender === "bhw" ? "You: " : ""}${lastMsg.text}` : c.concern}
                    </p>
                  </div>

                  {/* Unread / Active Dot */}
                  {c.status === "Waiting" && (
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* COLUMN 2: CENTER ACTIVE CHAT THREAD (Messenger Chat Area)  */}
        {/* ========================================================= */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full bg-white">
          {/* Messenger Top Navigation Bar */}
          <div className="p-3.5 px-4 sm:px-6 border-b border-gray-100 flex items-center justify-between gap-3 shadow-2xs bg-white z-10">
            {/* Contact Details on Left */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#dcf0dd] text-[#1c552c] font-black text-xs flex items-center justify-center border border-white shadow-2xs">
                  {activeConsultation.initials}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">
                    {activeConsultation.residentName}
                  </h3>
                  <span className="text-[10px] font-mono text-gray-400 hidden sm:inline">
                    {activeConsultation.caseNumber || `#CONS-${activeConsultation.id}`}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1.5 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Secure thread</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500 truncate">{activeConsultation.purok || "Purok not provided"}</span>
                </div>
              </div>
            </div>

            {/* Messenger Header Controls on Right */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {/* Call Button */}
              <button
                type="button"
                onClick={() => { if (activeConsultation.phone) window.location.href = `tel:${activeConsultation.phone}`; }}
                disabled={!activeConsultation.phone}
                className="w-9 h-9 rounded-full hover:bg-gray-100 text-[#246b38] flex items-center justify-center transition-colors cursor-pointer"
                title="Start Voice Call"
              >
                <Phone className="w-4 h-4" />
              </button>

              {/* Toggle Info Sidebar (Messenger 'i' button) */}
              <button
                type="button"
                onClick={() => setShowRightSidebar(!showRightSidebar)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  showRightSidebar
                    ? "bg-green-100 text-[#133d23]"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
                title="Chat Information & Details"
              >
                <Info className="w-4 h-4" />
              </button>

              <div className="w-px h-5 bg-gray-200 mx-1" />

              {/* Close Modal Button */}
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer"
                title="Close Messenger"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Conversation Stream */}
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4 bg-gradient-to-b from-white to-[#fbfdfc] scrollbar-thin">
            {/* Top Identity Stamp in Chat (Authentic Messenger Style) */}
            <div className="flex flex-col items-center justify-center py-6 text-center select-none">
              <div className="w-16 h-16 rounded-full bg-[#dcf0dd] text-[#1c552c] font-black text-xl flex items-center justify-center shadow-xs mb-2">
                {activeConsultation.initials}
              </div>
              <h3 className="text-base font-bold text-gray-900">
                {activeConsultation.residentName}
              </h3>
              <p className="text-xs text-gray-500">
                {activeConsultation.gender || "Resident"} • {activeConsultation.age ? `${activeConsultation.age} yrs old` : "Adult"} • {activeConsultation.purok || "Purok 3"}
              </p>
              <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-gray-100 text-[11px] font-medium text-gray-600">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>End-to-end encrypted • SMS &amp; Mobile App Synced</span>
              </div>
            </div>

            {/* Conversation Messages */}
            {conversation.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-xs">
                No previous messages. Type a reply below or pick a clinical suggestion.
              </div>
            ) : (
              conversation.map((msg, index) => {
                const isBhw = msg.sender === "bhw";
                const isLastMsg = index === conversation.length - 1;

                return (
                  <div
                    key={msg.id || index}
                    className={`flex items-end gap-2 ${
                      isBhw ? "justify-end" : "justify-start"
                    }`}
                  >
                    {/* Incoming Avatar */}
                    {!isBhw && (
                      <div className="w-7 h-7 rounded-full bg-[#dcf0dd] text-[#1c552c] font-bold text-[10px] flex items-center justify-center flex-shrink-0 mb-1">
                        {activeConsultation.initials}
                      </div>
                    )}

                    <div className={`flex flex-col ${isBhw ? "items-end" : "items-start"} max-w-[80%] sm:max-w-[70%]`}>
                      {/* Sender Tag & Timestamp */}
                      <div className="flex items-center gap-1.5 px-1 mb-0.5">
                        <span className="text-[10px] font-bold text-gray-400">
                          {isBhw ? bhw.name : msg.senderName}
                        </span>
                        <span className="text-[9px] text-gray-400">
                          {msg.timestamp}
                        </span>
                      </div>

                      {/* Bubble with Messenger curvature */}
                      <div
                        className={`p-3 sm:p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed select-text ${
                          isBhw
                            ? "bg-gradient-to-r from-[#246b38] to-[#1c552c] text-white rounded-br-xs shadow-xs"
                            : "bg-[#f0f2f5] text-gray-900 rounded-bl-xs border border-gray-200/50 shadow-2xs"
                        }`}
                      >
                        {msg.text}
                      </div>

                      {/* Delivery / Seen receipt */}
                      {isBhw && isLastMsg && (
                        <div className="text-[10px] text-gray-400 font-medium mt-1 flex items-center gap-1 pr-1">
                          <span>✓ Seen</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Clinical Guidance Chips (Messenger Quick Suggestion Bar) */}
          {showQuickTemplates && (
            <div className="px-4 py-2 border-t border-gray-100 bg-[#fafcfb] flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[11px] font-bold text-gray-500 whitespace-nowrap flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#246b38]" />
                <span>Templates:</span>
              </span>
              {cannedResponses.map((cr) => (
                <button
                  key={cr.id}
                  type="button"
                  onClick={() => handleApplyCanned(cr.text)}
                  className="px-3 py-1.5 rounded-full bg-white hover:bg-green-50 border border-gray-200 hover:border-green-300 text-[11px] font-bold text-gray-700 hover:text-[#133d23] whitespace-nowrap transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
                >
                  <span>{cr.icon}</span>
                  <span>{cr.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Messenger Bottom Input Bar (Authentic Pill Layout) */}
          <form
            onSubmit={handleSend}
            className="p-3 px-4 sm:px-6 bg-white border-t border-gray-100 flex items-center gap-2 sm:gap-3"
          >
            {/* Left Tools */}
            <div className="flex items-center gap-1 text-[#246b38]">
              <button
                type="button"
                onClick={() => setShowQuickTemplates(!showQuickTemplates)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  showQuickTemplates ? "bg-green-100 text-[#133d23]" : "hover:bg-gray-100"
                }`}
                title="Toggle Medical Templates"
              >
                <PlusCircle className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
                title="Send Photo"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,application/pdf" className="sr-only" onChange={(event) => void handleFile(event.target.files?.[0])} />
            </div>

            {/* Pill Text Input */}
            <div className="flex-1 flex items-center bg-[#f0f2f5] hover:bg-[#e4e6eb]/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#246b38] rounded-full px-4 py-2 transition-all">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Aa"
                className="bg-transparent text-xs sm:text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none w-full"
              />
              <button
                type="button"
                onClick={() => setMessageText((prev) => `${prev} 💚`)}
                className="text-gray-400 hover:text-gray-600 transition-colors ml-1 cursor-pointer text-sm"
                title="Insert Emoji"
              >
                😊
              </button>
            </div>

            {/* Send or Thumbs Up Action */}
            {messageText.trim() ? (
              <button
                type="submit"
                className="w-9 h-9 rounded-full bg-[#246b38] hover:bg-[#1a552b] text-white flex items-center justify-center transition-transform hover:scale-105 shadow-xs cursor-pointer flex-shrink-0"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleThumbsUp}
                className="w-9 h-9 rounded-full hover:bg-gray-100 text-[#246b38] flex items-center justify-center transition-transform hover:scale-110 cursor-pointer flex-shrink-0"
                title="Send Thumbs Up"
              >
                <ThumbsUp className="w-5 h-5" />
              </button>
            )}
          </form>
        </div>

        {/* ========================================================= */}
        {/* COLUMN 3: RIGHT PROFILE / CHAT INFO SIDEBAR (Messenger)   */}
        {/* ========================================================= */}
        {showRightSidebar && (
          <div className="w-72 sm:w-80 border-l border-gray-100 bg-[#fdfdfd] flex flex-col flex-shrink-0 h-full min-h-0 overflow-y-auto overscroll-contain scrollbar-thin">
            {/* Top Identity Card */}
            <div className="p-5 flex flex-col items-center text-center border-b border-gray-100">
              <div className="w-18 h-18 rounded-full bg-[#dcf0dd] text-[#1c552c] font-black text-2xl flex items-center justify-center shadow-xs mb-2.5">
                {activeConsultation.initials}
              </div>
              <h3 className="text-base font-bold text-gray-900">
                {activeConsultation.residentName}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {activeConsultation.gender || "Resident"} • {activeConsultation.purok || "Purok not provided"}
              </p>

              {/* 3 Circular Messenger Actions */}
              <div className="flex items-center gap-5 mt-4">
                <button
                  type="button"
                  onClick={() => onViewProfile(activeConsultation)}
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-gray-100 group-hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-600">Profile</span>
                </button>

              </div>
            </div>

            {/* Collapsible Section 1: Chat Info & Status */}
            <div className="border-b border-gray-100">
              <button
                type="button"
                onClick={() => setChatInfoOpen(!chatInfoOpen)}
                className="w-full p-3.5 px-4 flex items-center justify-between text-xs font-bold text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <span>Chat &amp; Resident Info</span>
                {chatInfoOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {chatInfoOpen && (
                <div className="p-4 pt-1 space-y-2.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Case ID:</span>
                    <span className="font-mono font-bold text-gray-800">{activeConsultation.caseNumber || `#CONS-${activeConsultation.id}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contact:</span>
                    <span className="font-mono font-bold text-[#246b38]">{activeConsultation.phone || "0917 123 4567"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Priority:</span>
                    <span className="font-bold px-2 py-0.5 rounded-md text-[11px] bg-amber-50 text-amber-700 border border-amber-200">
                      {activeConsultation.priority || "Medium"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Status:</span>
                    <span className="font-bold px-2 py-0.5 rounded-md text-[11px] bg-green-50 text-green-700 border border-green-200">
                      {activeConsultation.status}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Collapsible Section 2: Chief Complaint & Symptoms */}
            <div className="border-b border-gray-100">
              <button
                type="button"
                onClick={() => setSymptomsOpen(!symptomsOpen)}
                className="w-full p-3.5 px-4 flex items-center justify-between text-xs font-bold text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <span>Chief Complaint &amp; Symptoms</span>
                {symptomsOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {symptomsOpen && (
                <div className="p-4 pt-1 space-y-2.5 text-xs">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block mb-0.5">Complaint:</span>
                    <p className="font-semibold text-gray-800 leading-tight">
                      {activeConsultation.chiefComplaint || activeConsultation.concern}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block mb-1">Symptoms:</span>
                    <div className="flex flex-wrap gap-1">
                      {activeConsultation.symptoms && activeConsultation.symptoms.length > 0 ? (
                        activeConsultation.symptoms.map((s, idx) => (
                          <span key={idx} className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-[11px]">None logged</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Collapsible Section 3: Assigned Health Staff */}
            <div className="border-b border-gray-100">
              <button
                type="button"
                onClick={() => setAssignedBhwOpen(!assignedBhwOpen)}
                className="w-full p-3.5 px-4 flex items-center justify-between text-xs font-bold text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <span>Assigned Health Worker</span>
                {assignedBhwOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {assignedBhwOpen && (
                <div className="p-4 pt-1 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                        <Image src={bhw.avatar} alt={bhw.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{bhw.name}</div>
                        <div className="text-[10px] text-gray-400">{bhw.role}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={onChangeBhw}
                      className="text-[11px] font-bold text-[#246b38] hover:underline"
                    >
                      Change
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Collapsible Section 4: Media & Files */}
            <div className="border-b border-gray-100">
              <button
                type="button"
                onClick={() => setMediaFilesOpen(!mediaFilesOpen)}
                className="w-full p-3.5 px-4 flex items-center justify-between text-xs font-bold text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <span>Media &amp; Shared Files</span>
                {mediaFilesOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {mediaFilesOpen && (
                <div className="p-4 pt-1 space-y-2 text-xs text-gray-600">
                  <div className="p-2 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#246b38]" />
                      <span className="text-[11px] font-medium">Barangay_Rx_Paracetamol.pdf</span>
                    </div>
                    <span className="text-[10px] text-gray-400">142 KB</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
