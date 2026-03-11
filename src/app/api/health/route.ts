import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const count = await prisma.entity.count();
    return NextResponse.json({
      status: "ok",
      db: "connected",
      entityCount: count,
      env: {
        hasDbUrl: !!process.env.DATABASE_URL,
        dbUrlPrefix: process.env.DATABASE_URL?.substring(0, 25) + "...",
        nodeEnv: process.env.NODE_ENV,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        error: error.message,
        errorName: error.name,
        code: error.code,
        env: {
          hasDbUrl: !!process.env.DATABASE_URL,
          dbUrlPrefix: process.env.DATABASE_URL?.substring(0, 25) + "...",
          nodeEnv: process.env.NODE_ENV,
        },
      },
      { status: 500 },
    );
  }
}
