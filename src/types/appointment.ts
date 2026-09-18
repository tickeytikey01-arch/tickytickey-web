export interface CalendarAppointment {
  id: string;
  residentName: string;
  initials: string;
  service: string;
  time: string;
  date: string; // e.g. "2025-04-26"
  assignedBhw: string;
  status: "Confirmed" | "Pending" | "Walk-in" | "Cancelled";
  dotColor: "green" | "orange" | "blue";
  notes?: string;
  contact?: string;
  purok?: string;
}

export interface AppointmentRequestItem {
  id: string;
  residentName: string;
  initials: string;
  serviceType: string;
  preferredTime: string; // e.g. "Apr 28, 2025 9:00 AM"
  assignedBhw: string;
  status: "Pending" | "Approved" | "Rescheduled" | "Cancelled";
  avatarBg?: string;
  contact?: string;
  purok?: string;
}

export interface BhwAvailabilityItem {
  id: string;
  name: string;
  activeSlots: number;
  totalSlots: number;
  percentage: number;
  status: "available" | "busy" | "off-duty";
}

export interface ScheduleStats {
  todayAppointments: number;
  todayChange: string;
  pendingRequests: number;
  pendingChange: string;
  confirmedAppointments: number;
  confirmedChange: string;
  availableBhwSlots: number;
  totalBhwSlots: number;
}
