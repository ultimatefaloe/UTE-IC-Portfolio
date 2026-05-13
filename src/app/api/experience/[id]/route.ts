import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-auth";
import { parseStringArray } from "@/lib/api-utils";


interface RouteContextProps {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: NextRequest,
  context: RouteContextProps
) {
  const { id } = await context.params;
  const experience = await prisma.experience.findUnique({
    where: { id },
  });

  if (!experience) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(experience);
}

export async function PUT(
  request: NextRequest,
  context: RouteContextProps
) {
  const { id } = await context.params;
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const experience = await prisma.experience.update({
    where: { id },
    data: {
      company: data.company,
      role: data.role,
      description: data.description,
      achievements: parseStringArray(data.achievements),
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
    },
  });

  return NextResponse.json(experience);
}

export async function DELETE(
  request: NextRequest,
  context: RouteContextProps
) {
  const { id } = await context.params;
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.experience.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
