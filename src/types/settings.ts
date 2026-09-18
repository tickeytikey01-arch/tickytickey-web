export interface ClinicProfileSettings {
  stationName: string;
  barangay: string;
  cityMunicipality: string;
  province: string;
  headPhysician: string;
  contactNumber: string;
  emergencyHotline: string;
  operatingDays: string;
  operatingHours: string;
  address: string;
}

export interface TriageSettings {
  autoAssignBhws: boolean;
  telemedicineEnabled: boolean;
  maxCasesPerBhw: number;
  urgentEscalationPhone: string;
  responseTemplateFever: string;
  responseTemplateCough: string;
}

export interface NotificationSettings {
  smsGatewayProvider: "Semaphore" | "Twilio" | "GlobeLabs";
  smsApiKey: string;
  smsSenderName: string;
  enableResidentSmsAlerts: boolean;
  lowStockThresholdPcs: number;
  enableDailyDigestEmail: boolean;
  digestRecipientEmail: string;
}

export interface SecuritySettings {
  sessionTimeoutMinutes: number;
  requireTwoFactorAuth: boolean;
  strictPasswordPolicy: boolean;
  dataPrivacyNoticeVersion: string;
  auditLoggingEnabled: boolean;
}

export interface SystemSettings {
  clinic: ClinicProfileSettings;
  triage: TriageSettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
}
