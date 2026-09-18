import { z } from "zod";

const uuid = z.string().uuid();
const optionalText = (max: number) => z.string().trim().max(max).optional().default("");

const medicine = z.object({
  id: z.string(), name: z.string().trim().min(2).max(120), genericName: optionalText(120),
  category: z.enum(["Fever & Pain", "Cough & Cold", "Allergy", "Hydration", "Hypertension", "Antibiotic", "Supplements"]),
  use: optionalText(1000), dosage: z.string().trim().min(1).max(80), adultDosage: optionalText(300), pediatricDosage: optionalText(300),
  stockQuantity: z.number().int().min(0).max(100000), caution: optionalText(1000), symptomTags: z.array(z.string().trim().min(1).max(60)).max(30), imageType: z.enum(["tablet", "capsule", "syrup", "sachet"]),
});
const announcement = z.object({
  id: z.string(), title: z.string().trim().min(3).max(160), content: z.string().trim().min(3).max(5000),
  category: z.enum(["Vaccination Drive", "Health Advisory", "Medical Mission", "Emergency Alert", "Clinic Hours"]),
  priority: z.enum(["Normal", "Important", "Urgent"]), status: z.enum(["Published", "Draft", "Scheduled"]),
  targetAudience: z.string().trim().min(2).max(120), broadcastChannels: z.array(z.enum(["Push Notification", "SMS Sync", "Barangay Bulletin"])).max(3), scheduledDate: z.string().optional(),
});
const user = z.object({
  id: z.string(), name: z.string().trim().min(2).max(120), role: z.enum(["Doctor", "Nurse", "BHW", "Admin", "Resident"]),
  email: z.string().trim().email().max(254), phone: z.string().trim().max(30), purok: z.string().trim().max(100), station: z.string().trim().max(120),
  status: z.enum(["Active", "Inactive", "Pending"]), licenseNumber: z.string().trim().max(100).optional(), philHealthId: z.string().trim().max(100).optional(),
});
const healthRecord = z.object({
  id: z.string(), residentName: z.string().trim().min(2).max(120), bloodType: optionalText(20), primaryCategory: z.enum(["Hypertension", "Diabetes", "Maternal/Prenatal", "Senior Care", "Pediatric", "General"]),
  assignedBhw: optionalText(120), status: z.enum(["Active", "Archived", "Pending"]), chronicConditions: z.array(z.string().trim().min(1).max(160)).max(50), allergies: z.array(z.string().trim().min(1).max(160)).max(50),
  vitals: z.object({ bp: optionalText(30), heartRate: optionalText(30), temp: optionalText(30), weight: optionalText(30), height: optionalText(30), bmi: optionalText(30), bloodSugar: optionalText(30), lastUpdated: optionalText(80) }),
  prescriptions: z.array(z.object({ id: z.string(), medicineName: z.string().trim().min(1).max(160), dosage: optionalText(80), frequency: optionalText(160), duration: optionalText(100), prescribedBy: optionalText(120), status: z.enum(["Active", "Completed", "Discontinued"]) })).max(200),
  vaccinations: z.array(z.object({ id: z.string(), vaccineName: z.string().trim().min(1).max(160), dose: optionalText(80), dateAdministered: optionalText(80), healthcareProvider: optionalText(120) })).max(200),
  clinicalNotes: z.array(z.object({ id: z.string(), date: optionalText(80), author: optionalText(120), role: optionalText(80), note: z.string().trim().min(1).max(4000) })).max(500),
});
const systemSettings = z.object({
  clinic: z.object({ stationName: optionalText(160), barangay: optionalText(120), cityMunicipality: optionalText(120), province: optionalText(120), headPhysician: optionalText(120), contactNumber: optionalText(30), emergencyHotline: optionalText(30), operatingDays: optionalText(120), operatingHours: optionalText(120), address: optionalText(300) }),
  triage: z.object({ autoAssignBhws: z.boolean(), telemedicineEnabled: z.boolean(), maxCasesPerBhw: z.number().int().min(1).max(100), urgentEscalationPhone: optionalText(30), responseTemplateFever: optionalText(2000), responseTemplateCough: optionalText(2000) }),
  notifications: z.object({ smsGatewayProvider: z.enum(["Semaphore", "Twilio", "GlobeLabs"]), smsApiKey: z.literal(""), smsSenderName: optionalText(20), enableResidentSmsAlerts: z.boolean(), lowStockThresholdPcs: z.number().int().min(0).max(100000), enableDailyDigestEmail: z.boolean(), digestRecipientEmail: z.union([z.literal(""), z.string().email().max(254)]) }),
  security: z.object({ sessionTimeoutMinutes: z.number().int().min(5).max(1440), requireTwoFactorAuth: z.boolean(), strictPasswordPolicy: z.boolean(), dataPrivacyNoticeVersion: optionalText(80), auditLoggingEnabled: z.boolean() }),
});

export const adminMutationSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("saveMedicine"), payload: medicine }),
  z.object({ action: z.literal("deactivateMedicine"), payload: z.object({ id: uuid }) }),
  z.object({ action: z.literal("saveAnnouncement"), payload: announcement }),
  z.object({ action: z.literal("setAnnouncementStatus"), payload: z.object({ id: uuid, status: z.enum(["Published", "Draft"]) }) }),
  z.object({ action: z.literal("deleteAnnouncement"), payload: z.object({ id: uuid }) }),
  z.object({ action: z.literal("saveUser"), payload: user }),
  z.object({ action: z.literal("setUserStatus"), payload: z.object({ id: uuid, status: z.enum(["Active", "Inactive"]) }) }),
  z.object({ action: z.literal("setAppointmentStatus"), payload: z.object({ id: uuid, status: z.enum(["confirmed", "cancelled", "completed"]) }) }),
  z.object({ action: z.literal("saveAppointment"), payload: z.object({ residentName: z.string().trim().min(2).max(120), service: z.string().trim().min(2).max(160), date: z.iso.date(), time: z.string().trim().min(4).max(20), assignedBhw: z.string().trim().max(120), notes: optionalText(1000) }) }),
  z.object({ action: z.literal("rescheduleAppointment"), payload: z.object({ id: uuid, preferredTime: z.string().trim().min(8).max(80), assignedBhw: z.string().trim().max(120) }) }),
  z.object({ action: z.literal("saveHealthRecord"), payload: healthRecord }),
  z.object({ action: z.literal("saveSettings"), payload: systemSettings }),
]);

export type AdminMutation = z.infer<typeof adminMutationSchema>;
