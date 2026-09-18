import { GET as keepAliveHandler } from "@/app/api/cron/keepalive/route";

export const dynamic = "force-dynamic";

/**
 * Public healthcheck endpoint for uptime monitors.
 * Aliased directly to the Supabase keep-alive handler.
 */
export async function GET(request: Request) {
  return keepAliveHandler(request);
}
