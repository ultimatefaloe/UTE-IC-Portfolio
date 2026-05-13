import { NextRequest, NextResponse } from "next/server";
import { SkillCategory } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-auth";

export async function GET() {
  const skills = await prisma.skill.findMany({
    orderBy: [{ category: "asc" }, { level: "desc" }],
  });
  return NextResponse.json(skills);
}

export async function POST(request: NextRequest) {
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const category = String(data.category ?? "BACKEND").toUpperCase() as SkillCategory;

  const skill = await prisma.skill.create({
    data: {
      name: data.name,
      category,
      level: Number(data.level) || 0,
    },
  });

  return NextResponse.json(skill, { status: 201 });
}
