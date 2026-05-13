import { NextRequest, NextResponse } from "next/server";
import { ProjectCategory } from "@prisma/client";

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
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(project);
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
  const category = String(data.category ?? "OTHER").toUpperCase() as ProjectCategory;

  const project = await prisma.project.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      longDescription: data.longDescription ?? data.description ?? "",
      techStack: parseStringArray(data.techStack),
      category,
      liveUrl: data.liveUrl,
      githubUrl: data.githubUrl || null,
      architectureDiagramUrl: data.architectureDiagramUrl || null,
      featured: Boolean(data.featured),
    },
  });

  return NextResponse.json(project);
}

export async function DELETE(
  request: NextRequest,
 context: RouteContextProps
) {
  const { id } = await context.params;
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
