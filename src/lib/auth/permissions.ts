import "server-only";

import { createClient } from "@/lib/supabase/server";

export type AppRole = "admin" | "doctor" | "nurse" | "bhw" | "resident";
export type Permission = "dashboard.read" | "consultations.manage" | "appointments.manage" | "records.read" | "records.manage" | "medicines.manage" | "announcements.manage" | "users.manage" | "settings.manage";

const grants: Record<AppRole, ReadonlySet<Permission>> = {
  admin: new Set(["dashboard.read", "consultations.manage", "appointments.manage", "records.read", "records.manage", "medicines.manage", "announcements.manage", "users.manage", "settings.manage"]),
  doctor: new Set(["dashboard.read", "consultations.manage", "appointments.manage", "records.read", "records.manage", "medicines.manage"]),
  nurse: new Set(["dashboard.read", "consultations.manage", "appointments.manage", "records.read", "records.manage", "medicines.manage", "announcements.manage"]),
  bhw: new Set(["dashboard.read", "consultations.manage", "appointments.manage", "records.read", "announcements.manage"]),
  resident: new Set(),
};

export async function requirePermission(permission: Permission) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("UNAUTHORIZED");
  const { data: profile, error } = await supabase.from("profiles").select("id, full_name, role").eq("id", user.id).single();
  if (error || !profile) throw new Error("FORBIDDEN");
  const role = profile.role as AppRole;
  if (!grants[role]?.has(permission)) throw new Error("FORBIDDEN");
  return { supabase, user, profile: { id: profile.id, fullName: profile.full_name, role } };
}

export function permissionsFor(role: AppRole) {
  return [...(grants[role] ?? [])];
}
