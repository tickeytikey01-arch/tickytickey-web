import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig } from "./config";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const isAdminCookie = request.cookies.get("tickytickey_admin_session")?.value === "true";
  const path = request.nextUrl.pathname;

  let user = null;
  try {
    const { url, anonKey } = getSupabaseConfig();
    const supabase = createServerClient(url, anonKey, {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    });
    const authRes = await supabase.auth.getUser();
    user = authRes.data.user;
  } catch {
    // If Supabase config is missing or pending, fallback to admin cookie
  }

  if (!user && !isAdminCookie && (path.startsWith("/dashboard") || path.startsWith("/api/dashboard"))) {
    if (path.startsWith("/api/")) return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", path);
    return NextResponse.redirect(loginUrl);
  }
  if ((user || isAdminCookie) && path === "/login") {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/dashboard";
    dashboardUrl.search = "";
    return NextResponse.redirect(dashboardUrl);
  }
  return response;
}

