import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-auth";

interface RouteContextProps {
   params: Promise<{
    key: string;
  }>;
}

export async function GET(
  _request: NextRequest,
  context: RouteContextProps
) {
  const { key } = await context.params
  const block = await prisma.contentBlock.findUnique({
    where: { key },
  });

  if (!block) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(block);
}

export async function PUT(
  request: NextRequest,
  context: RouteContextProps
) {
  const { key } = await context.params
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const block = await prisma.contentBlock.update({
    where: { key },
    data: {
      title: data.title,
      subtitle: data.subtitle ?? null,
      description: data.description ?? null,
      body: data.body ?? null,
    },
  });

  return NextResponse.json(block);
}

export async function DELETE(
  request: NextRequest,
  context: RouteContextProps
) {
  const { key } = await context.params
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.contentBlock.delete({ where: { key } });
  return NextResponse.json({ ok: true });
}
