import { getDashboardData, mutateDashboard } from "@/lib/data/dashboard";
import { dashboardMutationSchema } from "@/lib/validation/dashboard";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function errorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  const status = message === "UNAUTHORIZED" ? 401 : message === "FORBIDDEN" ? 403 : message.includes("Supabase is not configured") ? 503 : 500;
  return NextResponse.json({ success: false, message: status === 500 ? "Unable to process the request." : message }, { status });
}

export async function GET() {
  try {
    const data = await getDashboardData();
    return NextResponse.json({ success: true, data }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json({ success: false, message: "Content-Type must be application/json." }, { status: 415 });
    }
    if (Number(request.headers.get("content-length") ?? 0) > 20_000) {
      return NextResponse.json({ success: false, message: "Request is too large." }, { status: 413 });
    }
    const parsed = dashboardMutationSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: "Invalid request.", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
    }
    const data = await mutateDashboard(parsed.data);
    return NextResponse.json({ success: true, data }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    return errorResponse(error);
  }
}

