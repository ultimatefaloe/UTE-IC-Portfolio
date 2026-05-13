import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-auth";
import { parseStringArray } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  const includeDrafts = request.nextUrl.searchParams.get("all") === "true";
  const posts = await prisma.blog.findMany({
    where: includeDrafts ? {} : { published: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const post = await prisma.blog.create({
    data: {
      title: data.title,
      slug: data.slug,
      content: data.content,
      tags: parseStringArray(data.tags),
      published: Boolean(data.published),
    },
  });

  return NextResponse.json(post, { status: 201 });
}
