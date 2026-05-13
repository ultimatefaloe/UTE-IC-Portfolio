import { NextRequest, NextResponse } from "next/server";
import { SkillCategory } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-auth";


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
  const skill = await prisma.skill.findUnique({
    where: { id },
  });

  if (!skill) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(skill);
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
  const category = String(data.category ?? "BACKEND").toUpperCase() as SkillCategory;

  const skill = await prisma.skill.update({
    where: { id },
    data: {
      name: data.name,
      category,
      level: Number(data.level) || 0,
    },
  });

  return NextResponse.json(skill);
}

export async function DELETE(
  request: NextRequest,
 context: RouteContextProps
) {
    const { id } = await context.params;
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.skill.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
