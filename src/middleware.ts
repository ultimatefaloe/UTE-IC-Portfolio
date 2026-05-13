import { NextRequest, NextResponse } from "next/server";

import { getAdminSession } from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminLogin = pathname.startsWith("/admin/login");
  const isApiRoute = pathname.startsWith("/api");

  const session = await getAdminSession(request);

  if (isAdminRoute && !isAdminLogin && !session) {
    const loginUrl = request.nextUrl.clone();

    loginUrl.pathname = "/admin/login";

    return NextResponse.redirect(loginUrl);
  }

  if (
    isApiRoute &&
    request.method !== "GET" &&
    !pathname.startsWith("/api/admin/login") &&
    !pathname.startsWith("/api/admin/logout") &&
    !session
  ) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};