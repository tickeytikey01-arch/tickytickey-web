import { getSupabaseConfig } from "@/lib/supabase/config";
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  officialRole: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(30),
  locality: z.string().trim().min(3).max(200),
  message: z.string().trim().min(10).max(3000),
});

const attempts = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: Request) {
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ message: "Invalid content type." }, { status: 415 });
    const clientId = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now();
    const current = attempts.get(clientId);
    if (current && current.resetAt > now && current.count >= 5) return NextResponse.json({ message: "Too many requests. Please try again later." }, { status: 429 });
    attempts.set(clientId, !current || current.resetAt <= now ? { count: 1, resetAt: now + 60 * 60 * 1000 } : { ...current, count: current.count + 1 });
    const parsed = contactSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ message: "Please check the form fields." }, { status: 400 });
    const { url, anonKey } = getSupabaseConfig();
    const supabase = createServerClient(url, anonKey, { cookies: { getAll: () => [], setAll: () => undefined } });
    const { error } = await supabase.from("contact_requests").insert({ full_name: parsed.data.fullName, official_role: parsed.data.officialRole, email: parsed.data.email.toLowerCase(), phone: parsed.data.phone, locality: parsed.data.locality, message: parsed.data.message });
    if (error) throw error;
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Unable to submit the request right now." }, { status: 500 });
  }
}

