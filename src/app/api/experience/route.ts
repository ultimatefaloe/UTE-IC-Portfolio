import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-auth";
import { parseStringArray } from "@/lib/api-utils";

function formatPeriod(start: Date, end: Date | null): string {
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
  return `${fmt(start)} – ${end ? fmt(end) : "Present"}`;
}

export async function GET() {
  const experiences = await prisma.experience.findMany({
    orderBy: { startDate: "desc" },
  });

  return NextResponse.json(
    experiences.map((e) => ({
      id: e.id,
      company: e.company,
      role: e.role,
      description: e.description,
      achievements: e.achievements,
      techStack: e.techStack,
      location: e.location,
      period: e.period || formatPeriod(e.startDate, e.endDate),
      startDate: e.startDate,
      endDate: e.endDate,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    }))
  );
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
      techStack: parseStringArray(data.techStack),
      location: data.location ?? "",
      period: data.period ?? "",
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
    },
  });

  return NextResponse.json(experience, { status: 201 });
}
