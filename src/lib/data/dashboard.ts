import "server-only";

import { requirePermission } from "@/lib/auth/permissions";
import type { DashboardMutation } from "@/lib/validation/dashboard";
import type { ConsultationItem, DashboardData } from "@/types/dashboard";

type ProfileRow = { id: string; full_name: string; role: string; mobile: string | null; purok: string | null; gender: string | null; birth_date: string | null };
type MessageRow = { id: string; consultation_id: string; sender_id: string; body: string; created_at: string; sender: Pick<ProfileRow, "full_name" | "role"> | null };
type ConsultationRow = { id: string; case_number: string; concern: string; symptoms: string[]; notes: string | null; status: string; priority: string; created_at: string; resident: ProfileRow | null; staff: ProfileRow | null };
type AppointmentRow = { id: string; title: string; category: string; starts_at: string; resident: Pick<ProfileRow, "full_name"> | null };
type ActivityRow = { id: number; action: string; resource_type: string; created_at: string; actor: Pick<ProfileRow, "full_name"> | null };

const titleCase = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
const initials = (name: string) => name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
const ageFromBirthDate = (birthDate: string | null) => birthDate ? Math.max(0, Math.floor((Date.now() - new Date(birthDate).getTime()) / 31_557_600_000)) : undefined;
const relativeTime = (date: string) => {
  const minutes = Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 60_000));
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
};

async function requireStaff() {
  const { supabase, user, profile } = await requirePermission("dashboard.read");
  return { supabase, user, profile: { id: profile.id, full_name: profile.fullName, role: profile.role } };
}

export async function getDashboardData(): Promise<DashboardData> {
  const { supabase, profile } = await requireStaff();
  const today = new Date();
  const dayStart = new Date(today); dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(dayStart); dayEnd.setDate(dayEnd.getDate() + 1);
  const weekStart = new Date(dayStart); weekStart.setDate(weekStart.getDate() - 6);
  const [profilesResult, consultationsResult, messagesResult, appointmentsResult, activityResult] = await Promise.all([
    supabase.from("profiles").select("id, role, status, created_at"),
    supabase.from("consultations").select("id, case_number, concern, symptoms, notes, status, priority, created_at, resident:profiles!consultations_resident_id_fkey(id, full_name, role, mobile, purok, gender, birth_date), staff:profiles!consultations_assigned_staff_id_fkey(id, full_name, role, mobile, purok, gender, birth_date)").order("created_at", { ascending: false }).limit(100),
    supabase.from("consultation_messages").select("id, consultation_id, sender_id, body, created_at, sender:profiles!consultation_messages_sender_id_fkey(full_name, role)").order("created_at", { ascending: true }).limit(500),
    supabase.from("appointments").select("id, title, category, starts_at, status, resident:profiles!appointments_resident_id_fkey(full_name)").gte("starts_at", dayStart.toISOString()).order("starts_at").limit(100),
    supabase.from("audit_logs").select("id, action, resource_type, created_at, actor:profiles!audit_logs_actor_id_fkey(full_name)").order("created_at", { ascending: false }).limit(20),
  ]);
  const firstError = [profilesResult.error, consultationsResult.error, messagesResult.error, appointmentsResult.error, activityResult.error].find(Boolean);
  if (firstError) throw firstError;
  const profiles = profilesResult.data ?? [];
  const consultations = (consultationsResult.data ?? []) as unknown as ConsultationRow[];
  const messages = (messagesResult.data ?? []) as unknown as MessageRow[];
  const appointments = (appointmentsResult.data ?? []) as unknown as AppointmentRow[];
  const activity = (activityResult.data ?? []) as unknown as ActivityRow[];
  const messagesByConsultation = new Map<string, MessageRow[]>();
  for (const message of messages) messagesByConsultation.set(message.consultation_id, [...(messagesByConsultation.get(message.consultation_id) ?? []), message]);
  const consultationItems: ConsultationItem[] = consultations.map((item) => {
    const residentName = item.resident?.full_name ?? "Resident";
    const staffName = item.staff?.full_name ?? "Unassigned";
    return {
      id: item.id, caseNumber: `#${item.case_number}`, initials: initials(residentName), residentName,
      gender: item.resident?.gender ?? undefined, age: ageFromBirthDate(item.resident?.birth_date ?? null), phone: item.resident?.mobile ?? undefined, purok: item.resident?.purok ?? undefined,
      concern: item.concern, chiefComplaint: item.concern, symptoms: item.symptoms, additionalNotes: item.notes ?? undefined,
      status: titleCase(item.status) as ConsultationItem["status"], priority: titleCase(item.priority) as ConsultationItem["priority"], assignedBHW: staffName,
      timeAgo: relativeTime(item.created_at), createdDate: new Date(item.created_at).toLocaleString("en-PH"),
      bhwDetails: item.staff ? { name: staffName, role: titleCase(item.staff.role), phone: item.staff.mobile ?? "", avatar: "/assets/doctor.webp" } : undefined,
      conversation: (messagesByConsultation.get(item.id) ?? []).map((message) => ({ id: message.id, sender: message.sender?.role === "resident" ? "resident" : "bhw", senderName: message.sender?.full_name ?? "Health Partner", text: message.body, timestamp: new Date(message.created_at).toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" }) })),
    };
  });
  const daily = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart); date.setDate(weekStart.getDate() + index);
    const next = new Date(date); next.setDate(next.getDate() + 1);
    return { day: date.toLocaleDateString("en-PH", { weekday: "short" }), date: date.toLocaleDateString("en-PH", { month: "short", day: "numeric" }), count: consultations.filter((c) => new Date(c.created_at) >= date && new Date(c.created_at) < next).length };
  });
  const symptomCounts = new Map<string, number>();
  consultations.flatMap((c) => c.symptoms).forEach((symptom) => symptomCounts.set(symptom, (symptomCounts.get(symptom) ?? 0) + 1));
  const totalSymptoms = [...symptomCounts.values()].reduce((sum, count) => sum + count, 0);
  const colors = ["#2e7d32", "#4caf50", "#81c784", "#a5d6a7", "#c8e6c9", "#e8f5e9"];
  const breakdown = [...symptomCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name, count], index) => ({ name, percentage: totalSymptoms ? Math.round((count / totalSymptoms) * 100) : 0, color: colors[index] }));
  return {
    adminName: profile.full_name, role: titleCase(profile.role), dateString: today.toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" }),
    metrics: {
      totalResidents: { count: profiles.filter((p) => p.role === "resident").length, trendText: "Registered residents" },
      consultationsToday: { count: consultations.filter((c) => new Date(c.created_at) >= dayStart && new Date(c.created_at) < dayEnd).length, trendText: "Today" },
      pendingAppointments: { count: appointments.filter((a) => new Date(a.starts_at) < dayEnd).length, trendText: "Upcoming" },
      activeBHWs: { count: profiles.filter((p) => ["bhw", "nurse", "doctor"].includes(p.role) && p.status === "active").length, statusText: "Active staff" },
    },
    consultationTrend: daily, commonSymptoms: { totalCases: totalSymptoms, breakdown }, pendingConsultations: consultationItems,
    upcomingAppointments: appointments.slice(0, 8).map((appointment) => ({ id: appointment.id, month: new Date(appointment.starts_at).toLocaleDateString("en-PH", { month: "short" }).toUpperCase(), day: new Date(appointment.starts_at).getDate().toString(), residentName: appointment.resident?.full_name ?? "Resident", category: appointment.category, timeSlot: new Date(appointment.starts_at).toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" }) })),
    recentActivity: activity.map((entry) => ({ id: String(entry.id), actor: entry.actor?.full_name ?? "System", action: entry.action, timeAgo: relativeTime(entry.created_at), type: (["consultation", "medicine", "appointment", "announcement", "user"].includes(entry.resource_type) ? entry.resource_type : "consultation") as "consultation" })),
  };
}

export async function mutateDashboard(input: DashboardMutation) {
  const { supabase, user } = await requireStaff();
  let resourceType = "consultation";
  let resourceId: string | undefined;
  if (input.action === "updateConsultationStatus") {
    resourceId = input.payload.id;
    const { error } = await supabase.from("consultations").update({ status: input.payload.status.toLowerCase(), resolved_at: input.payload.status === "Resolved" ? new Date().toISOString() : null }).eq("id", resourceId);
    if (error) throw error;
  } else if (input.action === "sendConsultationMessage") {
    resourceId = input.payload.consultationId;
    const { error } = await supabase.from("consultation_messages").insert({ consultation_id: resourceId, sender_id: user.id, body: input.payload.text });
    if (error) throw error;
    await supabase.from("consultations").update({ status: "replied" }).eq("id", resourceId);
  } else if (input.action === "assignBhw") {
    resourceId = input.payload.consultationId;
    const { data: staff, error: staffError } = await supabase.from("profiles").select("id").eq("full_name", input.payload.staffName).in("role", ["bhw", "nurse", "doctor"]).limit(1).maybeSingle();
    if (staffError || !staff) throw staffError ?? new Error("Selected health worker was not found.");
    const { error } = await supabase.from("consultations").update({ assigned_staff_id: staff.id, status: "active" }).eq("id", resourceId);
    if (error) throw error;
  } else if (input.action === "addAnnouncement") {
    resourceType = "announcement";
    const { data, error } = await supabase.from("announcements").insert({ ...input.payload, priority: "Normal", status: "Published", target_audience: "All Barangays", author_id: user.id, published_at: new Date().toISOString() }).select("id").single();
    if (error) throw error; resourceId = data.id;
  } else {
    resourceType = "medicine";
    const { data, error } = await supabase.from("medicines").insert({ name: input.payload.name, dosage: input.payload.dosage, category: "Supplements", stock_quantity: input.payload.quantity, updated_by: user.id }).select("id").single();
    if (error) throw error; resourceId = data.id;
  }
  await supabase.from("audit_logs").insert({ actor_id: user.id, action: input.action, resource_type: resourceType, resource_id: resourceId });
  return getDashboardData();
}
