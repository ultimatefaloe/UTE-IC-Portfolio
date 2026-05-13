import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-auth";

export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(services);
}

export async function POST(request: NextRequest) {
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const service = await prisma.service.create({
    data: {
      title: data.title,
      description: data.description,
    },
  });

  return NextResponse.json(service, { status: 201 });
}
