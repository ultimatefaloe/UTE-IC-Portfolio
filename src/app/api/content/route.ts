import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-auth";

export async function GET() {
  const blocks = await prisma.contentBlock.findMany({
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(blocks);
}

export async function POST(request: NextRequest) {
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const block = await prisma.contentBlock.create({
    data: {
      key: data.key,
      title: data.title,
      subtitle: data.subtitle ?? null,
      description: data.description ?? null,
      body: data.body ?? null,
    },
  });

  return NextResponse.json(block, { status: 201 });
}
