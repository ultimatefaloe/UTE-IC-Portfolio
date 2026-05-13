import { NextRequest, NextResponse } from "next/server";
import { SystemDesignType } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-auth";

export async function GET() {
  const items = await prisma.systemDesign.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const type = String(data.type ?? "ARCHITECTURE").toUpperCase() as SystemDesignType;

  const item = await prisma.systemDesign.create({
    data: {
      title: data.title,
      description: data.description,
      diagramUrl: data.diagramUrl || null,
      type,
      order: Number(data.order) || 0,
    },
  });

  return NextResponse.json(item, { status: 201 });
}
