import type { AdminResources } from "@/types/admin";

export async function fetchAdminResources() {
  const response = await fetch("/api/admin", { cache: "no-store" });
  const result = await response.json();
  if (!response.ok || !result.success) throw new Error(result.message || "Unable to load admin data.");
  return result.data as AdminResources;
}

export async function mutateAdminResources(action: string, payload: unknown) {
  const response = await fetch("/api/admin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action, payload }) });
  const result = await response.json();
  if (!response.ok || !result.success) throw new Error(result.message || "Unable to save changes.");
  return result.data as AdminResources;
}
