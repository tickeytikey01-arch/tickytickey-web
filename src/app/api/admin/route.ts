import { getAdminResources, mutateAdminResource } from "@/lib/data/admin";
import { adminMutationSchema } from "@/lib/validation/admin";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const fail = (error: unknown) => { const message = error instanceof Error ? error.message : "Unexpected error"; const status = message === "UNAUTHORIZED" ? 401 : message === "FORBIDDEN" ? 403 : message.includes("not configured") || message.includes("require SUPABASE") ? 503 : 500; return NextResponse.json({ success: false, message: status === 500 ? "Unable to process the request." : message }, { status }); };
export async function GET() { try { return NextResponse.json({ success: true, data: await getAdminResources() }, { headers: { "Cache-Control": "private, no-store" } }); } catch (error) { return fail(error); } }
export async function POST(request: Request) { try { if (!request.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ success: false, message: "Content-Type must be application/json." }, { status: 415 }); if (Number(request.headers.get("content-length") ?? 0) > 25_000) return NextResponse.json({ success: false, message: "Request is too large." }, { status: 413 }); const parsed = adminMutationSchema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ success: false, message: "Invalid request.", issues: parsed.error.flatten() }, { status: 400 }); return NextResponse.json({ success: true, data: await mutateAdminResource(parsed.data) }, { headers: { "Cache-Control": "private, no-store" } }); } catch (error) { return fail(error); } }
