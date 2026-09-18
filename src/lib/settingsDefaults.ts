import type { SystemSettings } from "@/types/settings";

export const emptySystemSettings: SystemSettings = {
  clinic: { stationName: "", barangay: "", cityMunicipality: "", province: "", headPhysician: "", contactNumber: "", emergencyHotline: "", operatingDays: "", operatingHours: "", address: "" },
  triage: { autoAssignBhws: false, telemedicineEnabled: false, maxCasesPerBhw: 15, urgentEscalationPhone: "", responseTemplateFever: "", responseTemplateCough: "" },
  notifications: { smsGatewayProvider: "Semaphore", smsApiKey: "", smsSenderName: "", enableResidentSmsAlerts: false, lowStockThresholdPcs: 20, enableDailyDigestEmail: false, digestRecipientEmail: "" },
  security: { sessionTimeoutMinutes: 30, requireTwoFactorAuth: false, strictPasswordPolicy: true, dataPrivacyNoticeVersion: "", auditLoggingEnabled: true },
};
