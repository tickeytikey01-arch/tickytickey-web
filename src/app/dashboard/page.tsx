"use client";

import Banner from "@/components/dashboard/Banner";
import ConsultationTrendChart from "@/components/dashboard/ConsultationTrendChart";
import Header from "@/components/dashboard/Header";
import MetricCards from "@/components/dashboard/MetricCards";
import PendingConsultationsTable from "@/components/dashboard/PendingConsultationsTable";
import RecentActivityFeed from "@/components/dashboard/RecentActivityFeed";
import Sidebar from "@/components/dashboard/Sidebar";
import SymptomsDonutChart from "@/components/dashboard/SymptomsDonutChart";
import UpcomingAppointmentsList from "@/components/dashboard/UpcomingAppointmentsList";
import AnnouncementsView from "@/components/dashboard/announcements/AnnouncementsView";
import AppointmentsScheduleView from "@/components/dashboard/appointments/AppointmentsScheduleView";
import ConsultationsView from "@/components/dashboard/consultations/ConsultationsView";
import MedicineLibraryView from "@/components/dashboard/medicines/MedicineLibraryView";
import HealthRecordsView from "@/components/dashboard/records/HealthRecordsView";
import ReportsAnalyticsView from "@/components/dashboard/reports/ReportsAnalyticsView";
import SettingsView from "@/components/dashboard/settings/SettingsView";
import UsersView from "@/components/dashboard/users/UsersView";
import { emptyDashboardData } from "@/lib/dashboardDefaults";
import { fetchAdminResources } from "@/lib/adminClient";
import { createClient } from "@/lib/supabase/client";
import { ConsultationItem, DashboardData } from "@/types/dashboard";
import type { AdminResources } from "@/types/admin";
import { emptySystemSettings } from "@/lib/settingsDefaults";
import { MOCK_DASHBOARD_DATA, MOCK_ADMIN_RESOURCES } from "@/lib/webMockData";
import { useCallback, useEffect, useState } from "react";

export default function DashboardPage() {
  const [currentTab, setCurrentTab] = useState("overview");
  const [selectedConsultationId, setSelectedConsultationId] = useState<string>("c-1");
  const [data, setData] = useState<DashboardData>(emptyDashboardData);
  const [resources, setResources] = useState<AdminResources>({ appointments: [], appointmentRequests: [], staffAvailability: [], medicines: [], announcements: [], users: [], healthRecords: [], settings: emptySystemSettings, permissions: [] });
  const [searchFilter, setSearchFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);

  const loadDashboard = useCallback(async (showLoading = true) => {
    if (isDemoMode) {
      setData(MOCK_DASHBOARD_DATA);
      setResources(MOCK_ADMIN_RESOURCES);
      return;
    }
    try {
      if (showLoading) setIsLoading(true);
      setErrorMessage("");
      const [res, adminData] = await Promise.all([fetch("/api/dashboard", { cache: "no-store" }), fetchAdminResources()]);
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Unable to load dashboard.");
      setData(json.data);
      setResources(adminData);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Unable to load dashboard.");
    } finally {
      if (showLoading) setIsLoading(false);
    }
  }, [isDemoMode]);

  // Read saved demo mode preference on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("tickytickey_dev_demo_mode");
      if (saved === "true") {
        setIsDemoMode(true);
        setData(MOCK_DASHBOARD_DATA);
        setResources(MOCK_ADMIN_RESOURCES);
        return;
      }
    }
    void loadDashboard();
  }, [loadDashboard]);

  const handleToggleDemoMode = (targetMode: boolean) => {
    setIsDemoMode(targetMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("tickytickey_dev_demo_mode", targetMode ? "true" : "false");
    }
    if (targetMode) {
      setData(MOCK_DASHBOARD_DATA);
      setResources(MOCK_ADMIN_RESOURCES);
      setErrorMessage("");
    } else {
      void loadDashboard(true);
    }
  };

  useEffect(() => {
    if (isDemoMode) return;
    const supabase = createClient();
    let timer: ReturnType<typeof setTimeout> | undefined;
    const refreshSoon = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => void loadDashboard(false), 300);
    };
    const channel = supabase.channel("admin-dashboard-sync")
      .on("postgres_changes", { event: "*", schema: "public", table: "consultations" }, refreshSoon)
      .on("postgres_changes", { event: "*", schema: "public", table: "consultation_messages" }, refreshSoon)
      .on("postgres_changes", { event: "*", schema: "public", table: "appointments" }, refreshSoon)
      .on("postgres_changes", { event: "*", schema: "public", table: "announcements" }, refreshSoon)
      .subscribe();
    return () => {
      if (timer) clearTimeout(timer);
      void supabase.removeChannel(channel);
    };
  }, [loadDashboard, isDemoMode]);

  // Backend Mutation: Update Consultation Status
  const handleStatusChange = async (id: string, newStatus: ConsultationItem["status"]) => {
    const previous = data;
    setData((prev) => ({
      ...prev,
      pendingConsultations: prev.pendingConsultations.map((c) =>
        c.id === id ? { ...c, status: newStatus } : c
      ),
    }));

    if (isDemoMode) return;

    try {
      const response = await fetch("/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "updateConsultationStatus",
          payload: { id, status: newStatus },
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to update consultation.");
      setData(result.data);
    } catch (err) {
      setData(previous);
      setErrorMessage(err instanceof Error ? err.message : "Unable to update consultation.");
    }
  };

  // Consultation Messenger Reply Handler
  const handleSendMessage = async (consultationId: string, text: string) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: "bhw" as const,
      senderName: "Ana Reyes (BHW)",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setData((prev) => ({
      ...prev,
      pendingConsultations: prev.pendingConsultations.map((c) =>
        c.id === consultationId
          ? {
              ...c,
              status: "Replied",
              conversation: [...(c.conversation || []), newMsg],
            }
          : c
      ),
      recentActivity: [
        {
          id: `act-${Date.now()}`,
          actor: "BHW Ana Reyes",
          action: `Replied to consultation inquiry for ${
            prev.pendingConsultations.find((c) => c.id === consultationId)?.residentName || "Resident"
          }`,
          timeAgo: "Just now",
          type: "consultation",
        },
        ...prev.recentActivity,
      ],
    }));

    if (isDemoMode) return;

    try {
      const response = await fetch("/api/dashboard", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "sendConsultationMessage", payload: { consultationId, text } }) });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to send message.");
      setData(result.data);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to send message.");
      const response = await fetch("/api/dashboard", { cache: "no-store" });
      if (response.ok) setData((await response.json()).data);
    }
  };

  // Re-assign BHW Handler
  const handleAssignBhw = async (
    consultationId: string,
    bhw: { name: string; role: string; phone: string; avatar: string }
  ) => {
    setData((prev) => ({
      ...prev,
      pendingConsultations: prev.pendingConsultations.map((c) =>
        c.id === consultationId
          ? {
              ...c,
              assignedBHW: bhw.name,
              bhwDetails: bhw,
            }
          : c
      ),
    }));

    if (isDemoMode) return;

    try {
      const response = await fetch("/api/dashboard", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "assignBhw", payload: { consultationId, staffName: bhw.name } }) });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to assign health worker.");
      setData(result.data);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to assign health worker.");
    }
  };

  // Direct selection from Overview Table into Split View
  const handleSelectConsultation = (consultation: ConsultationItem) => {
    setSelectedConsultationId(consultation.id);
    setCurrentTab("consultations");
  };

  // Backend Mutation: Add Announcement
  const handleAddAnnouncement = async (title: string) => {
    if (isDemoMode) {
      const newAnc: any = {
        id: `anc-${Date.now()}`,
        title,
        content: "Barangay health update broadcasted to all registered residents.",
        category: "Health Advisory",
        priority: "Normal",
        status: "Published",
        targetAudience: "All Barangays",
        broadcastChannels: ["Push Notification", "SMS Sync"],
        author: "Admin Desk",
        publishedDate: "Just now",
        reachCount: 850,
      };
      setResources((prev) => ({
        ...prev,
        announcements: [newAnc, ...prev.announcements],
      }));
      setData((prev) => ({
        ...prev,
        recentActivity: [
          {
            id: `act-${Date.now()}`,
            actor: "Admin Desk",
            action: `Published announcement: ${title}`,
            timeAgo: "Just now",
            type: "announcement",
          },
          ...prev.recentActivity,
        ],
      }));
      return;
    }

    try {
      const res = await fetch("/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "addAnnouncement",
          payload: { title },
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      }
    } catch (err) {
      console.error("Failed to add announcement to backend:", err);
    }
  };

  // Backend Mutation: Add Medicine
  const handleAddMedicine = async (name: string, quantity: number) => {
    if (isDemoMode) {
      const newMed: any = {
        id: `med-${Date.now()}`,
        name,
        genericName: name,
        category: "Fever & Pain",
        use: "General dispensary medication.",
        dosage: "Standard",
        adultDosage: "As directed by physician.",
        pediatricDosage: "As directed.",
        stockStatus: "In Stock",
        stockQuantity: quantity,
        updatedBy: "Admin Desk",
        updatedDate: "Just now",
        caution: "Keep in a cool, dry place.",
        symptomTags: ["General"],
        imageType: "tablet",
        isActive: true,
      };
      setResources((prev) => ({
        ...prev,
        medicines: [newMed, ...prev.medicines],
      }));
      setData((prev) => ({
        ...prev,
        recentActivity: [
          {
            id: `act-${Date.now()}`,
            actor: "Admin Desk",
            action: `Added ${quantity} units of ${name} to pharmacy stock`,
            timeAgo: "Just now",
            type: "medicine",
          },
          ...prev.recentActivity,
        ],
      }));
      return;
    }

    try {
      const res = await fetch("/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "addMedicine",
          payload: { name, quantity },
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      }
    } catch (err) {
      console.error("Failed to add medicine to backend:", err);
    }
  };

  // Backend Export: Generate CSV download
  const handleExportReport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Type,Name,Detail,Status\n" +
      data.pendingConsultations
        .map((c) => `Consultation,"${c.residentName}","${c.concern}",${c.status}`)
        .join("\n") +
      "\n" +
      data.upcomingAppointments
        .map((a) => `Appointment,"${a.residentName}","${a.category}",${a.timeSlot}`)
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Barangay_Health_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered lists based on search
  const filteredConsultations = data.pendingConsultations.filter(
    (c) =>
      c.residentName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.concern.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.assignedBHW.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const filteredAppointments = data.upcomingAppointments.filter(
    (a) =>
      a.residentName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      a.category.toLowerCase().includes(searchFilter.toLowerCase())
  );
  const allowedTabs = ["overview", "consultations", "appointments", "records", "medicines", "reports", ...(resources.permissions.includes("users.manage") ? ["users"] : []), ...(resources.permissions.includes("announcements.manage") ? ["announcements"] : []), ...(resources.permissions.includes("settings.manage") ? ["settings"] : [])];

  return (
    <div className="min-h-screen bg-[#f1f7f2] flex flex-col md:flex-row text-gray-800 font-sans relative">
      {/* Sidebar with mobile drawer support & desktop sticky position */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        allowedTabs={allowedTabs}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Controls: stays sticky at top when scrolling */}
        <Header
          adminName={data.adminName}
          role={data.role}
          dateString={data.dateString}
          onSearch={setSearchFilter}
          onToggleSidebar={() => setMobileMenuOpen((prev) => !prev)}
          onNavigateTab={setCurrentTab}
          isDemoMode={isDemoMode}
          onToggleDemoMode={handleToggleDemoMode}
          directoryItems={[
            ...data.pendingConsultations.map((item) => ({ id: item.id, name: item.residentName, category: "Consultation", tab: "consultations", desc: `${item.concern} • ${item.status}` })),
            ...resources.medicines.map((item) => ({ id: item.id, name: `${item.name} ${item.dosage}`, category: "Medicine", tab: "medicines", desc: `${item.category} • ${item.stockQuantity} in stock` })),
            ...resources.healthRecords.map((item) => ({ id: item.id, name: item.residentName, category: "Record", tab: "records", desc: `${item.purok} • ${item.primaryCategory}` })),
            ...resources.users.map((item) => ({ id: item.id, name: item.name, category: "Staff", tab: "users", desc: `${item.role} • ${item.station}` })),
          ]}
          notificationItems={[
            ...data.pendingConsultations.filter((item) => item.status === "Waiting").slice(0, 3).map((item) => `New consultation request from ${item.residentName}.`),
            ...resources.medicines.filter((item) => item.stockStatus !== "In Stock").slice(0, 3).map((item) => `${item.name} is ${item.stockStatus.toLowerCase()} (${item.stockQuantity} remaining).`),
          ]}
          allowedTabs={allowedTabs}
        />

        {/* Dynamic Page Views */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          {/* Developer Demo Mode Banner */}
          {isDemoMode && (
            <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50/90 px-4 py-3 text-xs sm:text-sm font-semibold text-amber-900 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse" />
                <span>
                  <strong>Developer Demo Mode Active:</strong> Operating in full interactive mock mode with realistic barangay consultations, calendar appointments, EHR records, and pharmacy stocks.
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleToggleDemoMode(false)}
                className="ml-3 text-xs font-bold text-amber-800 underline hover:text-amber-950 flex-shrink-0 cursor-pointer"
              >
                Switch to Live Prod
              </button>
            </div>
          )}
          {errorMessage && (
            <div role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {errorMessage}
            </div>
          )}
          {isLoading && <p role="status" className="sr-only">Loading dashboard data</p>}
          {currentTab === "overview" && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <Banner />

              {/* 4 Top KPI Cards */}
              <MetricCards metrics={data.metrics} />

              {/* Middle Charts Grid with perfectly aligned equal heights */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <div className="lg:col-span-7 flex flex-col h-full">
                  <ConsultationTrendChart data={data.consultationTrend} />
                </div>
                <div className="lg:col-span-5 flex flex-col h-full">
                  <SymptomsDonutChart
                    totalCases={data.commonSymptoms.totalCases}
                    breakdown={data.commonSymptoms.breakdown}
                  />
                </div>
              </div>

              {/* Bottom Activity & Management Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5">
                  <PendingConsultationsTable
                    consultations={filteredConsultations}
                    onStatusChange={handleStatusChange}
                    onSelectConsultation={handleSelectConsultation}
                    onViewAll={() => setCurrentTab("consultations")}
                  />
                </div>
                <div className="lg:col-span-4">
                  <UpcomingAppointmentsList
                    appointments={filteredAppointments}
                    onViewAll={() => setCurrentTab("appointments")}
                  />
                </div>
                <div className="lg:col-span-3">
                  <RecentActivityFeed
                    activities={data.recentActivity}
                    onAddAnnouncement={handleAddAnnouncement}
                    onAddMedicine={handleAddMedicine}
                    onExportReport={handleExportReport}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Sub-view: Consultations - Split Screen Master/Detail with Messenger Conversation */}
          {currentTab === "consultations" && (
            <ConsultationsView
              consultations={data.pendingConsultations}
              onStatusChange={handleStatusChange}
              onSendMessage={handleSendMessage}
              onAssignBhw={handleAssignBhw}
              initialSelectedId={selectedConsultationId}
            />
          )}

          {/* Sub-view: Appointments & Schedule Master View */}
          {currentTab === "appointments" && (
            <AppointmentsScheduleView appointments={resources.appointments} requests={resources.appointmentRequests} staffList={resources.staffAvailability} onDataChange={(next) => setResources((current) => ({ ...current, ...next }))} onError={setErrorMessage} />
          )}

          {/* Sub-view: Medicine Library */}
          {currentTab === "medicines" && (
            <MedicineLibraryView medicines={resources.medicines} canManage={resources.permissions.includes("medicines.manage")} onDataChange={(medicines) => setResources((current) => ({ ...current, medicines }))} onError={setErrorMessage} />
          )}

          {/* Sub-view: Reports & Analytics */}
          {currentTab === "reports" && (
            <ReportsAnalyticsView dashboard={data} resources={resources} />
          )}

          {/* Sub-view: Users Management */}
          {currentTab === "users" && (
            <UsersView users={resources.users} onDataChange={(users) => setResources((current) => ({ ...current, users }))} onError={setErrorMessage} />
          )}

          {/* Sub-view: Announcements & Advisories */}
          {currentTab === "announcements" && (
            <AnnouncementsView announcements={resources.announcements} canManage={resources.permissions.includes("announcements.manage")} onDataChange={(announcements) => setResources((current) => ({ ...current, announcements }))} onError={setErrorMessage} />
          )}

          {/* Sub-view: Settings */}
          {currentTab === "settings" && (
            <SettingsView initialSettings={resources.settings} onDataChange={(settings) => setResources((current) => ({ ...current, settings }))} onError={setErrorMessage} />
          )}

          {/* Sub-view: Records */}
          {currentTab === "records" && (
            <HealthRecordsView records={resources.healthRecords} canManage={resources.permissions.includes("records.manage")} onDataChange={(healthRecords) => setResources((current) => ({ ...current, healthRecords }))} onError={setErrorMessage} />
          )}
        </main>
      </div>
    </div>
  );
}
