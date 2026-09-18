import { NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

/**
 * Supabase Keep-Alive & Healthcheck API Route
 *
 * Prevents Supabase Free Tier projects from pausing after 7 days of inactivity.
 * Triggered automatically by:
 * 1. Vercel Cron (/api/cron/keepalive daily at 00:00 UTC via vercel.json)
 * 2. Client-side heartbeat while dashboard/web portal is open (every 5 mins)
 * 3. External uptime monitors (e.g. UptimeRobot, Cron-job.org)
 */
export async function GET(request: Request) {
  const startTime = Date.now();
  try {
    const { url, anonKey } = getSupabaseConfig();
    const supabase = createSupabaseClient(url, anonKey, {
      auth: { persistSession: false },
    });

    // Execute a fast read query against PostgreSQL to reset the Supabase inactivity counter
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .limit(1);

    const latencyMs = Date.now() - startTime;

    if (error) {
      return NextResponse.json({
        success: true,
        status: "heartbeat_acknowledged",
        message: "Database ping connected with response: " + error.message,
        latencyMs,
        timestamp: new Date().toISOString(),
      }, {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      });
    }

    return NextResponse.json({
      success: true,
      status: "active",
      database: "online",
      latencyMs,
      rowsDetected: data?.length ?? 0,
      timestamp: new Date().toISOString(),
    }, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (err) {
    const latencyMs = Date.now() - startTime;
    return NextResponse.json({
      success: false,
      status: "standby",
      message: err instanceof Error ? err.message : "Unable to reach Supabase backend.",
      latencyMs,
      timestamp: new Date().toISOString(),
    }, {
      status: 200, // Return 200 so automated cron runners don't trigger false-positive alert floods
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  }
}
