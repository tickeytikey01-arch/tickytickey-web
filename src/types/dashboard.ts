export interface DashboardMetrics {
  totalResidents: {
    count: number;
    trendText: string;
  };
  consultationsToday: {
    count: number;
    trendText: string;
  };
  pendingAppointments: {
    count: number;
    trendText: string;
  };
  activeBHWs: {
    count: number;
    statusText: string;
  };
}

export interface ConsultationTrendPoint {
  day: string;
  date: string;
  count: number;
}

export interface SymptomBreakdown {
  name: string;
  percentage: number;
  color: string;
}

export interface ChatMessage {
  id: string;
  sender: "resident" | "bhw" | "system";
  senderName: string;
  text: string;
  timestamp: string;
}

export interface ConsultationItem {
  id: string;
  initials: string;
  residentName: string;
  concern: string;
  assignedBHW: string;
  status: "Waiting" | "Active" | "Replied" | "Completed" | "Resolved";
  caseNumber?: string;
  gender?: string;
  age?: number;
  phone?: string;
  purok?: string;
  timeAgo?: string;
  createdDate?: string;
  priority?: "Low" | "Medium" | "High" | "Urgent";
  chiefComplaint?: string;
  symptoms?: string[];
  additionalNotes?: string;
  bhwDetails?: {
    name: string;
    role: string;
    phone: string;
    avatar: string;
  };
  conversation?: ChatMessage[];
}

export interface AppointmentItem {
  id: string;
  month: string;
  day: string;
  residentName: string;
  category: string;
  timeSlot: string;
}

export interface ActivityLog {
  id: string;
  actor: string;
  action: string;
  timeAgo: string;
  type: "consultation" | "medicine" | "appointment" | "announcement" | "user";
}

export interface DashboardData {
  adminName: string;
  role: string;
  dateString: string;
  metrics: DashboardMetrics;
  consultationTrend: ConsultationTrendPoint[];
  commonSymptoms: {
    totalCases: number;
    breakdown: SymptomBreakdown[];
  };
  pendingConsultations: ConsultationItem[];
  upcomingAppointments: AppointmentItem[];
  recentActivity: ActivityLog[];
}
