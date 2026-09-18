import "server-only";

import { permissionsFor, requirePermission } from "@/lib/auth/permissions";
import type { AdminMutation } from "@/lib/validation/admin";
import type { AdminResources } from "@/types/admin";
import type { AnnouncementItem } from "@/types/announcement";
import type { AppointmentRequestItem, BhwAvailabilityItem, CalendarAppointment } from "@/types/appointment";
import type { MedicineItem } from "@/types/medicine";
import type { UserItem, UserRole, UserStatus } from "@/types/user";
import type { HealthRecordItem } from "@/types/record";
import type { SystemSettings } from "@/types/settings";
import { emptySystemSettings } from "@/lib/settingsDefaults";
import { createClient as createAdminClient } from "@supabase/supabase-js";

const titleCase = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
const initials = (name: string) => name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
const isUuid = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
const normalizedPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (!digits) return null;
  if (digits.startsWith("63") && digits.length === 12) return `+${digits}`;
  if (digits.startsWith("0") && digits.length === 11) return `+63${digits.slice(1)}`;
  throw new Error("Enter a valid Philippine mobile number.");
};

export async function getAdminResources(): Promise<AdminResources> {
  const { supabase, profile } = await requirePermission("dashboard.read");
  const [appointmentsResult, medicinesResult, announcementsResult, profilesResult, recordsResult, settingsResult] = await Promise.all([
    supabase.from("appointments").select("id, category, title, starts_at, status, notes, resident:profiles!appointments_resident_id_fkey(full_name,mobile,purok), staff:profiles!appointments_assigned_staff_id_fkey(id,full_name)").order("starts_at", { ascending: false }).limit(300),
    supabase.from("medicines").select("id,name,generic_name,category,dosage,adult_dosage,pediatric_dosage,description,cautions,symptom_tags,form,stock_quantity,low_stock_threshold,is_active,updated_at,updated_by_profile:profiles!medicines_updated_by_fkey(full_name)").eq("is_active", true).order("name").limit(300),
    supabase.from("announcements").select("id,title,content,category,priority,status,target_audience,broadcast_channels,scheduled_at,published_at,reach_count,created_at,author:profiles!announcements_author_id_fkey(full_name)").order("created_at", { ascending: false }).limit(200),
    supabase.from("profiles").select("id,full_name,role,email,mobile,purok,station,status,license_number,philhealth_id,created_at").order("created_at", { ascending: false }).limit(500),
    supabase.from("health_records").select("id,resident_id,chronic_conditions,allergies,vitals,prescriptions,vaccinations,clinical_notes,primary_category,status,last_visit_at,resident:profiles!health_records_resident_id_fkey(full_name,birth_date,gender,blood_type,purok,philhealth_id,mobile,emergency_contact),staff:profiles!health_records_assigned_staff_id_fkey(full_name)").order("updated_at", { ascending: false }).limit(500),
    supabase.from("system_settings").select("value").eq("id", true).maybeSingle(),
  ]);
  const error = appointmentsResult.error || medicinesResult.error || announcementsResult.error || profilesResult.error || recordsResult.error || settingsResult.error;
  if (error) throw error;

  const rawAppointments = appointmentsResult.data ?? [];
  const appointments: CalendarAppointment[] = rawAppointments.filter((item) => item.status !== "pending").map((item) => {
    const resident = Array.isArray(item.resident) ? item.resident[0] : item.resident;
    const staff = Array.isArray(item.staff) ? item.staff[0] : item.staff;
    const residentName = resident?.full_name ?? "Resident";
    const status = item.status === "confirmed" ? "Confirmed" : item.status === "cancelled" ? "Cancelled" : "Walk-in";
    return { id: item.id, date: item.starts_at.slice(0, 10), time: new Date(item.starts_at).toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" }), residentName, initials: initials(residentName), service: item.title || item.category, assignedBhw: staff?.full_name ?? "Unassigned", status, dotColor: status === "Confirmed" ? "green" : status === "Cancelled" ? "blue" : "orange", contact: resident?.mobile ?? "", purok: resident?.purok ?? "", notes: item.notes ?? undefined };
  });
  const appointmentRequests: AppointmentRequestItem[] = rawAppointments.filter((item) => item.status === "pending").map((item) => {
    const resident = Array.isArray(item.resident) ? item.resident[0] : item.resident;
    const staff = Array.isArray(item.staff) ? item.staff[0] : item.staff;
    const residentName = resident?.full_name ?? "Resident";
    return { id: item.id, residentName, initials: initials(residentName), serviceType: item.title || item.category, preferredTime: new Date(item.starts_at).toLocaleString("en-PH"), assignedBhw: staff?.full_name ?? "Unassigned", status: "Pending", contact: resident?.mobile ?? "", purok: resident?.purok ?? "" };
  });

  const medicines: MedicineItem[] = (medicinesResult.data ?? []).map((item) => {
    const updater = Array.isArray(item.updated_by_profile) ? item.updated_by_profile[0] : item.updated_by_profile;
    const quantity = item.stock_quantity;
    return { id: item.id, name: item.name, genericName: item.generic_name ?? "", category: item.category as MedicineItem["category"], use: item.description, dosage: item.dosage, adultDosage: item.adult_dosage ?? "", pediatricDosage: item.pediatric_dosage ?? "", stockStatus: quantity === 0 ? "Out of Stock" : quantity <= item.low_stock_threshold ? "Low Stock" : "In Stock", stockQuantity: quantity, updatedBy: updater?.full_name ?? "System", updatedDate: new Date(item.updated_at).toLocaleDateString("en-PH"), caution: (item.cautions ?? []).join(" "), symptomTags: item.symptom_tags ?? [], imageType: (["tablet", "capsule", "syrup", "sachet"].includes(item.form.toLowerCase()) ? item.form.toLowerCase() : "tablet") as MedicineItem["imageType"], isActive: item.is_active };
  });
  const announcements: AnnouncementItem[] = (announcementsResult.data ?? []).map((item) => {
    const author = Array.isArray(item.author) ? item.author[0] : item.author;
    return { id: item.id, title: item.title, content: item.content, category: item.category as AnnouncementItem["category"], priority: item.priority as AnnouncementItem["priority"], status: item.status as AnnouncementItem["status"], targetAudience: item.target_audience, broadcastChannels: item.broadcast_channels as AnnouncementItem["broadcastChannels"], author: author?.full_name ?? "Clinic staff", publishedDate: new Date(item.published_at ?? item.created_at).toLocaleDateString("en-PH"), scheduledDate: item.scheduled_at ? new Date(item.scheduled_at).toLocaleDateString("en-PH") : undefined, reachCount: item.reach_count };
  });
  const users: UserItem[] = (profilesResult.data ?? []).map((item) => ({ id: item.id, name: item.full_name, role: titleCase(item.role) as UserRole, email: item.email ?? "", phone: item.mobile ?? "", purok: item.purok ?? "", station: item.station ?? "", status: titleCase(item.status) as UserStatus, lastActive: "Account registered", licenseNumber: item.license_number ?? undefined, philHealthId: item.philhealth_id ?? undefined, joinedDate: new Date(item.created_at).toLocaleDateString("en-PH") }));
  const staffAvailability: BhwAvailabilityItem[] = users.filter((user) => ["BHW", "Nurse", "Doctor"].includes(user.role)).map((user) => { const activeSlots = rawAppointments.filter((appointment) => { const staff = Array.isArray(appointment.staff) ? appointment.staff[0] : appointment.staff; return staff?.id === user.id && appointment.status === "confirmed"; }).length; return { id: user.id, name: user.name, activeSlots, totalSlots: 8, percentage: Math.min(100, Math.round(activeSlots / 8 * 100)), status: user.status === "Active" ? activeSlots >= 8 ? "busy" : "available" : "off-duty" }; });
  const healthRecords: HealthRecordItem[] = (recordsResult.data ?? []).map((item) => { const resident = Array.isArray(item.resident) ? item.resident[0] : item.resident; const staff = Array.isArray(item.staff) ? item.staff[0] : item.staff; const name = resident?.full_name ?? "Resident"; const emergency = (resident?.emergency_contact ?? "").split(" - "); const birth = resident?.birth_date ? new Date(resident.birth_date) : null; const recordVitals = (item.vitals ?? {}) as unknown as HealthRecordItem["vitals"]; return { id: item.id, residentName: name, initials: initials(name), age: birth ? Math.max(0, Math.floor((Date.now() - birth.getTime()) / 31_557_600_000)) : 0, gender: resident?.gender === "Male" ? "Male" : "Female", bloodType: resident?.blood_type ?? "", purok: resident?.purok ?? "", philHealthId: resident?.philhealth_id ?? undefined, residentId: `EHR-${item.resident_id.slice(0, 8).toUpperCase()}`, contactPhone: resident?.mobile ?? "", emergencyContact: { name: emergency[0] ?? "", relationship: "", phone: emergency[1] ?? "" }, chronicConditions: item.chronic_conditions ?? [], allergies: item.allergies ?? [], vitals: { bp: recordVitals.bp ?? "", heartRate: recordVitals.heartRate ?? "", temp: recordVitals.temp ?? "", weight: recordVitals.weight ?? "", height: recordVitals.height ?? "", bmi: recordVitals.bmi ?? "", bloodSugar: recordVitals.bloodSugar, lastUpdated: recordVitals.lastUpdated ?? "" }, primaryCategory: item.primary_category as HealthRecordItem["primaryCategory"], assignedBhw: staff?.full_name ?? "Unassigned", status: item.status as HealthRecordItem["status"], lastVisitDate: item.last_visit_at ? new Date(item.last_visit_at).toLocaleDateString("en-PH") : "No visit recorded", prescriptions: item.prescriptions as unknown as HealthRecordItem["prescriptions"], vaccinations: item.vaccinations as unknown as HealthRecordItem["vaccinations"], clinicalNotes: item.clinical_notes as unknown as HealthRecordItem["clinicalNotes"] }; });
  const savedSettings = (settingsResult.data?.value ?? {}) as Partial<SystemSettings>;
  const settings: SystemSettings = { clinic: { ...emptySystemSettings.clinic, ...savedSettings.clinic }, triage: { ...emptySystemSettings.triage, ...savedSettings.triage }, notifications: { ...emptySystemSettings.notifications, ...savedSettings.notifications, smsApiKey: "" }, security: { ...emptySystemSettings.security, ...savedSettings.security } };
  const permissions = permissionsFor(profile.role);
  return { appointments, appointmentRequests, staffAvailability, medicines, announcements, users: permissions.includes("users.manage") ? users : [], healthRecords, settings: permissions.includes("settings.manage") ? settings : emptySystemSettings, permissions };
}

export async function mutateAdminResource(input: AdminMutation) {
  const permission = input.action.includes("Medicine") ? "medicines.manage" : input.action.includes("Announcement") ? "announcements.manage" : input.action.includes("User") ? "users.manage" : input.action.includes("HealthRecord") ? "records.manage" : input.action.includes("Settings") ? "settings.manage" : "appointments.manage";
  const { supabase, user } = await requirePermission(permission);
  let resourceId = "id" in input.payload ? input.payload.id : undefined;
  if (input.action === "saveMedicine") {
    const p = input.payload; const values = { name: p.name, generic_name: p.genericName || null, category: p.category, description: p.use, dosage: p.dosage, adult_dosage: p.adultDosage || null, pediatric_dosage: p.pediatricDosage || null, stock_quantity: p.stockQuantity, cautions: p.caution ? [p.caution] : [], symptom_tags: p.symptomTags, form: titleCase(p.imageType), is_active: true, updated_by: user.id };
    const result = isUuid(p.id) ? await supabase.from("medicines").update(values).eq("id", p.id).select("id").single() : await supabase.from("medicines").insert(values).select("id").single(); if (result.error) throw result.error; resourceId = result.data.id;
  } else if (input.action === "deactivateMedicine") { const { error } = await supabase.from("medicines").update({ is_active: false, updated_by: user.id }).eq("id", input.payload.id); if (error) throw error;
  } else if (input.action === "saveAnnouncement") {
    const p = input.payload; const values = { title: p.title, content: p.content, category: p.category, priority: p.priority, status: p.status, target_audience: p.targetAudience, broadcast_channels: p.broadcastChannels, scheduled_at: p.status === "Scheduled" && p.scheduledDate ? new Date(p.scheduledDate).toISOString() : null, published_at: p.status === "Published" ? new Date().toISOString() : null, author_id: user.id };
    const result = isUuid(p.id) ? await supabase.from("announcements").update(values).eq("id", p.id).select("id").single() : await supabase.from("announcements").insert(values).select("id").single(); if (result.error) throw result.error; resourceId = result.data.id;
  } else if (input.action === "setAnnouncementStatus") { const { error } = await supabase.from("announcements").update({ status: input.payload.status, published_at: input.payload.status === "Published" ? new Date().toISOString() : null }).eq("id", input.payload.id); if (error) throw error;
  } else if (input.action === "deleteAnnouncement") { const { error } = await supabase.from("announcements").delete().eq("id", input.payload.id); if (error) throw error;
  } else if (input.action === "setAppointmentStatus") { const { error } = await supabase.from("appointments").update({ status: input.payload.status }).eq("id", input.payload.id); if (error) throw error;
  } else if (input.action === "saveAppointment") {
    const p = input.payload; const startsAt = new Date(`${p.date} ${p.time}`); if (Number.isNaN(startsAt.getTime())) throw new Error("Select a valid appointment date and time."); const endsAt = new Date(startsAt.getTime() + 30 * 60_000);
    const { data: resident, error: residentError } = await supabase.from("profiles").select("id").eq("full_name", p.residentName).eq("role", "resident").limit(1).maybeSingle(); if (residentError || !resident) throw residentError ?? new Error("The selected resident was not found.");
    const staffName = p.assignedBhw.replace(/^BHW\s+/i, ""); const { data: staff } = staffName && staffName !== "Unassigned" ? await supabase.from("profiles").select("id").ilike("full_name", `%${staffName}%`).in("role", ["bhw", "nurse", "doctor"]).limit(1).maybeSingle() : { data: null };
    const { data, error } = await supabase.from("appointments").insert({ resident_id: resident.id, assigned_staff_id: staff?.id ?? null, category: "General Checkup", title: p.service, starts_at: startsAt.toISOString(), ends_at: endsAt.toISOString(), location: "Barangay Health Center", notes: p.notes || null, status: "confirmed" }).select("id").single(); if (error) throw error; resourceId = data.id;
  } else if (input.action === "rescheduleAppointment") {
    const p = input.payload; const startsAt = new Date(p.preferredTime); if (Number.isNaN(startsAt.getTime())) throw new Error("Select a valid appointment time."); const staffName = p.assignedBhw.replace(/^BHW\s+/i, ""); const { data: staff } = await supabase.from("profiles").select("id").ilike("full_name", `%${staffName}%`).in("role", ["bhw", "nurse", "doctor"]).limit(1).maybeSingle(); const { error } = await supabase.from("appointments").update({ starts_at: startsAt.toISOString(), ends_at: new Date(startsAt.getTime() + 30 * 60_000).toISOString(), assigned_staff_id: staff?.id ?? null, status: "confirmed" }).eq("id", p.id); if (error) throw error;
  } else if (input.action === "setUserStatus") { const { error } = await supabase.from("profiles").update({ status: input.payload.status.toLowerCase() }).eq("id", input.payload.id); if (error) throw error;
  } else if (input.action === "saveUser") {
    const p = input.payload; let id = p.id;
    if (!isUuid(id)) {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL; const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (!url || !serviceKey) throw new Error("Staff invitations require SUPABASE_SERVICE_ROLE_KEY on the server.");
      const admin = createAdminClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
      const { data, error } = await admin.auth.admin.inviteUserByEmail(p.email, { data: { full_name: p.name, purok: p.purok } }); if (error || !data.user) throw error ?? new Error("Unable to invite user."); id = data.user.id;
    }
    const { error } = await supabase.from("profiles").update({ full_name: p.name, role: p.role.toLowerCase(), email: p.email, mobile: normalizedPhone(p.phone), purok: /^Purok [1-6]$/.test(p.purok) ? p.purok : null, station: p.station || null, status: p.status.toLowerCase(), license_number: p.licenseNumber || null, philhealth_id: p.philHealthId || null }).eq("id", id); if (error) throw error; resourceId = id;
  } else if (input.action === "saveHealthRecord") {
    const p = input.payload; const { data: resident, error: residentError } = await supabase.from("profiles").select("id").eq("full_name", p.residentName).eq("role", "resident").limit(1).maybeSingle(); if (residentError || !resident) throw residentError ?? new Error("The selected resident was not found."); const staffName = p.assignedBhw.replace(/^BHW\s+/i, ""); const { data: staff } = staffName && staffName !== "Unassigned" ? await supabase.from("profiles").select("id").ilike("full_name", `%${staffName}%`).in("role", ["bhw", "nurse", "doctor"]).limit(1).maybeSingle() : { data: null }; const { data, error } = await supabase.from("health_records").upsert({ resident_id: resident.id, chronic_conditions: p.chronicConditions, allergies: p.allergies, vitals: p.vitals, prescriptions: p.prescriptions, vaccinations: p.vaccinations, clinical_notes: p.clinicalNotes, primary_category: p.primaryCategory, assigned_staff_id: staff?.id ?? null, status: p.status, last_visit_at: new Date().toISOString() }, { onConflict: "resident_id" }).select("id").single(); if (error) throw error; resourceId = data.id;
  } else if (input.action === "saveSettings") {
    const value = { ...input.payload, notifications: { ...input.payload.notifications, smsApiKey: undefined } }; const { error } = await supabase.from("system_settings").upsert({ id: true, value, updated_by: user.id }); if (error) throw error; resourceId = "system";
  }
  await supabase.from("audit_logs").insert({ actor_id: user.id, action: input.action, resource_type: permission.split(".")[0], resource_id: resourceId });
  return getAdminResources();
}
