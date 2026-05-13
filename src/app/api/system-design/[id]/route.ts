import { NextRequest, NextResponse } from "next/server";
import { SystemDesignType } from "@prisma/client";

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
  const item = await prisma.systemDesign.findUnique({
    where: { id },
  });

  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(item);
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
  const type = String(data.type ?? "ARCHITECTURE").toUpperCase() as SystemDesignType;

  const item = await prisma.systemDesign.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      diagramUrl: data.diagramUrl || null,
      type,
      order: Number(data.order) || 0,
    },
  });

  return NextResponse.json(item);
}

export async function DELETE(
  request: NextRequest,
  context: RouteContextProps
) {
  const { id } = await context.params;
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.systemDesign.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
