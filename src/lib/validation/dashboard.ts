import { z } from "zod";

const id = z.string().uuid();
export const dashboardMutationSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("updateConsultationStatus"), payload: z.object({ id, status: z.enum(["Waiting", "Active", "Replied", "Resolved"]) }) }),
  z.object({ action: z.literal("sendConsultationMessage"), payload: z.object({ consultationId: id, text: z.string().trim().min(1).max(4000) }) }),
  z.object({ action: z.literal("assignBhw"), payload: z.object({ consultationId: id, staffName: z.string().trim().min(2).max(120) }) }),
  z.object({ action: z.literal("addAnnouncement"), payload: z.object({ title: z.string().trim().min(3).max(160), content: z.string().trim().min(3).max(5000).default("Health bulletin"), category: z.string().trim().min(2).max(80).default("Health Advisory") }) }),
  z.object({ action: z.literal("addMedicine"), payload: z.object({ name: z.string().trim().min(2).max(120), quantity: z.number().int().min(0).max(100000), dosage: z.string().trim().min(1).max(80).default("As directed") }) }),
]);

export type DashboardMutation = z.infer<typeof dashboardMutationSchema>;
