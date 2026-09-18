import type { AnnouncementItem } from "./announcement";
import type { AppointmentRequestItem, BhwAvailabilityItem, CalendarAppointment } from "./appointment";
import type { MedicineItem } from "./medicine";
import type { UserItem } from "./user";
import type { HealthRecordItem } from "./record";
import type { SystemSettings } from "./settings";

export interface AdminResources {
  appointments: CalendarAppointment[];
  appointmentRequests: AppointmentRequestItem[];
  staffAvailability: BhwAvailabilityItem[];
  medicines: MedicineItem[];
  announcements: AnnouncementItem[];
  users: UserItem[];
  healthRecords: HealthRecordItem[];
  settings: SystemSettings;
  permissions: string[];
}
