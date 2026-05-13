import { NextRequest, NextResponse } from "next/server";

import {
  adminSessionCookie,
  createSessionToken,
  validateAdminCredentials,
} from "@/lib";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!validateAdminCredentials(email, password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await createSessionToken({ email });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminSessionCookie(token));
  return response;
}
