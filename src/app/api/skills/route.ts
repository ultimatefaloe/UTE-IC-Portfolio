import { NextRequest, NextResponse } from "next/server";
import { SkillCategory } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-auth";

const categoryLabel: Record<SkillCategory, string> = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  DEVOPS: "DevOps",
  DATABASE: "Database",
  MOBILE: "Mobile",
  OTHER: "Other",
};

export async function GET() {
  const skills = await prisma.skill.findMany({
    orderBy: [{ category: "asc" }, { level: "desc" }],
  });

  return NextResponse.json(
    skills.map((s) => ({
      id: s.id,
      name: s.name,
      proficiency: s.level,
      category: categoryLabel[s.category] ?? s.category,
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
    }))
  );
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
      level: Number(data.proficiency ?? data.level) || 0,
    },
  });

  return NextResponse.json(
    {
      id: skill.id,
      name: skill.name,
      proficiency: skill.level,
      category: categoryLabel[skill.category] ?? skill.category,
      createdAt: skill.createdAt,
      updatedAt: skill.updatedAt,
    },
    { status: 201 }
  );
}
