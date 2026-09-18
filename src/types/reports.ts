export interface ReportsMetrics {
  totalConsultations: number;
  consultationsGrowthPercent: number;
  appointmentCompletionRate: number;
  appointmentGrowthPercent: number;
  commonSymptom: string;
  commonSymptomSharePercent: number;
  avgResponseTime: string;
  avgResponseImprovementPercent: number;
}

export interface ReportTrendDataPoint {
  label: string;
  count: number;
}

export interface ReportSymptomSlice {
  name: string;
  percentage: number;
  color: string;
}

export interface ReportDayTally {
  day: string;
  count: number;
}

export interface BarangayResidentItem {
  barangay: string;
  count: number;
  color: string;
}

export interface MonthlyReportRow {
  month: string;
  consultations: string;
  appointments: string;
  resolvedCases: string;
  announcements: number;
  isCurrent?: boolean;
}
