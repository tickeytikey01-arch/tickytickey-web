export type UserRole = "Doctor" | "Nurse" | "BHW" | "Admin" | "Resident";
export type UserStatus = "Active" | "Inactive" | "Pending";

export interface UserItem {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  purok: string;
  station: string;
  status: UserStatus;
  lastActive: string;
  avatar?: string;
  licenseNumber?: string;
  philHealthId?: string;
  assignedCasesCount?: number;
  joinedDate: string;
}

export interface UserMetrics {
  totalStaff: number;
  activeBhws: number;
  verifiedResidents: number;
  pendingApprovals: number;
}
