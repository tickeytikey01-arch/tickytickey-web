"use client";

import Banner from "@/components/dashboard/Banner";
import { mutateAdminResources } from "@/lib/adminClient";
import type { AnnouncementItem, AnnouncementMetrics } from "@/types/announcement";
import { useMemo, useState } from "react";
import AnnouncementDetailModal from "./AnnouncementDetailModal";
import AnnouncementFilterToolbar from "./AnnouncementFilterToolbar";
import AnnouncementMetricCards from "./AnnouncementMetricCards";
import AnnouncementsList from "./AnnouncementsList";
import CreateAnnouncementModal from "./CreateAnnouncementModal";

interface Props { announcements: AnnouncementItem[]; canManage: boolean; onDataChange: (items: AnnouncementItem[]) => void; onError: (message: string) => void; }

export default function AnnouncementsView({ announcements, canManage, onDataChange, onError }: Props) {
  const [searchQuery, setSearchQuery] = useState(""); const [selectedCategory, setSelectedCategory] = useState("All"); const [selectedPriority, setSelectedPriority] = useState("All"); const [selectedStatus, setSelectedStatus] = useState("All");
  const [createModalOpen, setCreateModalOpen] = useState(false); const [announcementToEdit, setAnnouncementToEdit] = useState<AnnouncementItem | null>(null); const [previewAnnouncement, setPreviewAnnouncement] = useState<AnnouncementItem | null>(null); const [saving, setSaving] = useState(false);
  const metrics: AnnouncementMetrics = useMemo(() => ({ publishedCount: announcements.filter((item) => item.status === "Published").length, smsBroadcastsCount: announcements.reduce((sum, item) => sum + item.reachCount, 0), scheduledCount: announcements.filter((item) => item.status === "Scheduled").length, residentReachPercent: announcements.length ? Math.min(100, Math.round(announcements.filter((item) => item.status === "Published").length / announcements.length * 100)) : 0 }), [announcements]);
  const filtered = useMemo(() => announcements.filter((item) => { const query = searchQuery.toLowerCase().trim(); return (!query || [item.title, item.content, item.author, item.targetAudience].some((value) => value.toLowerCase().includes(query))) && (selectedCategory === "All" || item.category === selectedCategory) && (selectedPriority === "All" || item.priority === selectedPriority) && (selectedStatus === "All" || item.status === selectedStatus); }), [announcements, searchQuery, selectedCategory, selectedPriority, selectedStatus]);
  const mutate = async (action: string, payload: unknown) => { if (saving || !canManage) return; setSaving(true); try { onDataChange((await mutateAdminResources(action, payload)).announcements); } catch (error) { onError(error instanceof Error ? error.message : "Unable to save announcement."); } finally { setSaving(false); } };
  return <div className="space-y-6 pb-12" aria-busy={saving}>
    <Banner title="Announcements & Advisories" subtitle="Broadcast clinic schedules, immunization drives, and emergency health alerts." cardTitle="Community Health Bulletin" cardSubtitle="Informed barangay, healthier families!" className="mb-6" />
    <AnnouncementMetricCards metrics={metrics} />
    <AnnouncementFilterToolbar searchQuery={searchQuery} onSearchChange={setSearchQuery} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} selectedPriority={selectedPriority} onPriorityChange={setSelectedPriority} selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} onAddAnnouncement={() => { if (canManage) { setAnnouncementToEdit(null); setCreateModalOpen(true); } }} />
    <AnnouncementsList announcements={filtered} onPreview={setPreviewAnnouncement} onEdit={(item) => { if (canManage) { setAnnouncementToEdit(item); setCreateModalOpen(true); } }} onToggleStatus={(id) => { const item = announcements.find((entry) => entry.id === id); if (item) void mutate("setAnnouncementStatus", { id, status: item.status === "Published" ? "Draft" : "Published" }); }} onBroadcastSMS={() => onError("SMS delivery requires a configured transactional SMS provider; no message was queued.")} onDelete={(id) => { if (canManage && window.confirm("Delete this announcement?")) void mutate("deleteAnnouncement", { id }); }} />
    <CreateAnnouncementModal isOpen={createModalOpen && canManage} onClose={() => setCreateModalOpen(false)} announcementToEdit={announcementToEdit} onSave={(item) => { void mutate("saveAnnouncement", item); setCreateModalOpen(false); }} />
    <AnnouncementDetailModal isOpen={!!previewAnnouncement} onClose={() => setPreviewAnnouncement(null)} announcement={previewAnnouncement} />
  </div>;
}
