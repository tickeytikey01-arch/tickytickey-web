"use client";

import Banner from "@/components/dashboard/Banner";
import { useState } from "react";
import AppointmentsByDayChart from "./AppointmentsByDayChart";
import ConsultationsTrendChart from "./ConsultationsTrendChart";
import KeyInsightsCard from "./KeyInsightsCard";
import MonthlySummaryTable from "./MonthlySummaryTable";
import ReportsMetricCards from "./ReportsMetricCards";
import ReportsToolbar from "./ReportsToolbar";
import ResidentsByBarangayChart from "./ResidentsByBarangayChart";
import SymptomDistributionChart from "./SymptomDistributionChart";
import type { AdminResources } from "@/types/admin";
import type { DashboardData } from "@/types/dashboard";
import type { MonthlyReportRow, ReportsMetrics } from "@/types/reports";

export default function ReportsAnalyticsView({ dashboard, resources }: { dashboard: DashboardData; resources: AdminResources }) {
  const [dateRange, setDateRange] = useState(new Date().toLocaleDateString("en-PH", { month: "long", year: "numeric" }));
  const completed = resources.appointments.filter((item) => item.status === "Confirmed").length;
  const totalAppointments = resources.appointments.length + resources.appointmentRequests.length;
  const commonSymptom = dashboard.commonSymptoms.breakdown[0];
  const metrics: ReportsMetrics = { totalConsultations: dashboard.pendingConsultations.length, consultationsGrowthPercent: 0, appointmentCompletionRate: totalAppointments ? Math.round(completed / totalAppointments * 100) : 0, appointmentGrowthPercent: 0, commonSymptom: commonSymptom?.name ?? "No data", commonSymptomSharePercent: commonSymptom?.percentage ?? 0, avgResponseTime: "Not tracked", avgResponseImprovementPercent: 0 };
  const appointmentTallies = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => ({ day, count: resources.appointments.filter((item) => new Date(`${item.date}T00:00:00`).getDay() === index).length }));
  const purokCounts = new Map<string, number>(); resources.users.filter((item) => item.role === "Resident").forEach((item) => purokCounts.set(item.purok || "Unassigned", (purokCounts.get(item.purok || "Unassigned") ?? 0) + 1));
  const residents = [...purokCounts.entries()].map(([barangay, count], index) => ({ barangay, count, color: ["#246b38", "#3a844f", "#529e67", "#6cb880", "#88d09b", "#a6e5b6"][index % 6] }));
  const currentMonth: MonthlyReportRow = { month: new Date().toLocaleDateString("en-PH", { month: "long" }), consultations: String(dashboard.pendingConsultations.length), appointments: String(totalAppointments), resolvedCases: String(dashboard.pendingConsultations.filter((item) => item.status === "Resolved" || item.status === "Completed").length), announcements: resources.announcements.length, isCurrent: true };

  // Export handlers
  const handleExportPDF = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const csvRows = [
      ["Metric", "Value", "Notes"],
      ["Total Consultations", String(metrics.totalConsultations), ""],
      ["Appointment Completion Rate", `${metrics.appointmentCompletionRate}%`, ""],
      ["Top Symptom", metrics.commonSymptom, `${metrics.commonSymptomSharePercent}% of total`],
      ["Registered Residents", String(resources.users.filter((item) => item.role === "Resident").length), ""],
      ["Date Range", dateRange, ""],
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `barangay_health_report_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Master Reusable Banner (Standardized with Overview, Consultations, Appointments, Records) */}
      <Banner
        title="Reports & Analytics"
        subtitle="Data-driven health insights, consultations census, and epidemiological analysis."
        cardTitle="Health Census & Analytics"
        cardSubtitle="Comprehensive barangay health indicators & reporting."
        className="mb-6"
      />

      {/* 2. Reports Action & Date Range Toolbar */}
      <ReportsToolbar
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onExportPDF={handleExportPDF}
        onExportCSV={handleExportCSV}
      />

      {/* 2. Top 4 KPI Metric Cards */}
      <ReportsMetricCards metrics={metrics} />

      {/* 3. Middle 3-Column Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch min-h-[300px]">
        <ConsultationsTrendChart data={dashboard.consultationTrend.map((item) => ({ label: item.date, count: item.count }))} />
        <SymptomDistributionChart totalCount={dashboard.commonSymptoms.totalCases} data={dashboard.commonSymptoms.breakdown} />
        <AppointmentsByDayChart data={appointmentTallies} />
      </div>

      {/* 4. Bottom 3-Column Insights & Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch min-h-[340px]">
        <ResidentsByBarangayChart data={residents} />
        <MonthlySummaryTable rows={[currentMonth]} />
        <KeyInsightsCard items={[`${metrics.totalConsultations} consultations are currently in the reporting window.`, `${metrics.commonSymptom} is the most frequently reported symptom.`, `${totalAppointments} appointments and requests are recorded.`, `${resources.healthRecords.length} electronic health records are available.`, `${resources.announcements.length} advisories are stored.`]} />
      </div>
    </div>
  );
}
