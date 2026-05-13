import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-auth";
import { parseStringArray } from "@/lib/api-utils";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const { slug } = await context.params;

  const includeDrafts =
    request.nextUrl.searchParams.get("all") === "true";

  const post = await prisma.blog.findFirst({
    where: {
      slug,
      ...(includeDrafts ? {} : { published: true }),
    },
  });

  if (!post) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(post);
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  const session = await getAdminSession(request);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { slug } = await context.params;

  const data = await request.json();

  const post = await prisma.blog.update({
    where: { slug },
    data: {
      title: data.title,
      slug: data.slug,
      content: data.content,
      tags: parseStringArray(data.tags),
      published: Boolean(data.published),
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  const session = await getAdminSession(request);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { slug } = await context.params;

  await prisma.blog.delete({
    where: { slug },
  });

  return NextResponse.json({ ok: true });
}