export type AnnouncementCategory =
  | "Vaccination Drive"
  | "Health Advisory"
  | "Medical Mission"
  | "Emergency Alert"
  | "Clinic Hours";

export type AnnouncementPriority = "Normal" | "Important" | "Urgent";
export type AnnouncementStatus = "Published" | "Draft" | "Scheduled";

export type BroadcastChannel = "Push Notification" | "SMS Sync" | "Barangay Bulletin";

export interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  category: AnnouncementCategory;
  priority: AnnouncementPriority;
  status: AnnouncementStatus;
  targetAudience: string; // e.g. "All Barangays", "Purok 1-3", "Senior Citizens", "Mothers & Infants"
  broadcastChannels: BroadcastChannel[];
  author: string;
  publishedDate: string;
  scheduledDate?: string;
  reachCount: number;
}

export interface AnnouncementMetrics {
  publishedCount: number;
  smsBroadcastsCount: number;
  scheduledCount: number;
  residentReachPercent: number;
}
