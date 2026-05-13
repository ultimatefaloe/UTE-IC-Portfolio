import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-auth";
import { parseStringArray } from "@/lib/api-utils";

export async function GET() {
  const experiences = await prisma.experience.findMany({
    orderBy: { startDate: "desc" },
  });
  return NextResponse.json(experiences);
}

export async function POST(request: NextRequest) {
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const experience = await prisma.experience.create({
    data: {
      company: data.company,
      role: data.role,
      description: data.description,
      achievements: parseStringArray(data.achievements),
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
    },
  });

  return NextResponse.json(experience, { status: 201 });
}
