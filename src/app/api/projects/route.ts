import { NextRequest, NextResponse } from "next/server";
import { ProjectCategory } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-auth";
import { parseStringArray } from "@/lib/api-utils";

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const category = String(data.category ?? "OTHER").toUpperCase() as ProjectCategory;

  const project = await prisma.project.create({
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

  return NextResponse.json(project, { status: 201 });
}
