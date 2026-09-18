import type { DashboardData } from "@/types/dashboard";

export const emptyDashboardData: DashboardData = {
  adminName: "Health Partner",
  role: "Staff",
  dateString: "",
  metrics: {
    totalResidents: { count: 0, trendText: "Registered residents" },
    consultationsToday: { count: 0, trendText: "Today" },
    pendingAppointments: { count: 0, trendText: "Upcoming" },
    activeBHWs: { count: 0, statusText: "Active staff" },
  },
  consultationTrend: [],
  commonSymptoms: { totalCases: 0, breakdown: [] },
  pendingConsultations: [],
  upcomingAppointments: [],
  recentActivity: [],
};

