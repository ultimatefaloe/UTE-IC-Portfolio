import { NextRequest, NextResponse } from "next/server";

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
  const service = await prisma.service.findUnique({
    where: { id },
  });

  if (!service) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(service);
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
  const service = await prisma.service.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
    },
  });

  return NextResponse.json(service);
}

export async function DELETE(
  request: NextRequest,
 context: RouteContextProps
) {
  const { id } = await context.params;
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.service.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
