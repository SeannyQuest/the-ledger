import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/foreign-influence
 *
 * FARA registration data — foreign lobbying by country and firm.
 * Params: country, active, limit, offset
 */
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const country = sp.get("country");
  const active = sp.get("active");
  const limit = Math.min(parseInt(sp.get("limit") ?? "50"), 200);
  const offset = parseInt(sp.get("offset") ?? "0");

  const where: Record<string, unknown> = {};
  if (country) where.country = country;
  if (active === "true") where.active = true;
  if (active === "false") where.active = false;

  const [registrations, total] = await Promise.all([
    prisma.faraRegistration.findMany({
      where: where as any,
      orderBy: { registrationDate: "desc" },
      take: limit,
      skip: offset,
      include: {
        activities: {
          orderBy: { periodStart: "desc" },
          take: 5,
        },
      },
    }),
    prisma.faraRegistration.count({ where: where as any }),
  ]);

  // Country spending breakdown
  const countryAgg = await prisma.faraRegistration.groupBy({
    by: ["country"],
    _count: { country: true },
    orderBy: { _count: { country: "desc" } },
    take: 20,
  });

  // Get total spending per country from activities
  const allActivities = await prisma.faraActivity.findMany({
    where: { amount: { not: null } },
    select: {
      amount: true,
      registration: { select: { country: true } },
    },
  });

  const countrySpending = new Map<string, number>();
  for (const act of allActivities) {
    const c = act.registration.country;
    countrySpending.set(c, (countrySpending.get(c) ?? 0) + Number(act.amount));
  }

  const countryBreakdown = countryAgg.map((c) => ({
    country: c.country,
    registrationCount: c._count.country,
    totalSpending: countrySpending.get(c.country) ?? 0,
  }));

  // Stats
  const activeCount = await prisma.faraRegistration.count({
    where: { active: true },
  });
  const uniqueCountries = new Set(countryAgg.map((c) => c.country)).size;

  return NextResponse.json({
    registrations: registrations.map((r) => ({
      id: r.id,
      registrationNum: r.registrationNum,
      foreignPrincipal: r.foreignPrincipal,
      country: r.country,
      registrantName: r.registrantName,
      registrantEntityId: r.registrantEntityId,
      registrationDate: r.registrationDate.toISOString().split("T")[0],
      terminationDate: r.terminationDate?.toISOString().split("T")[0] ?? null,
      active: r.active,
      recentActivities: r.activities.map((a) => ({
        activityType: a.activityType,
        amount: a.amount ? Number(a.amount) : null,
        periodStart: a.periodStart.toISOString().split("T")[0],
        periodEnd: a.periodEnd.toISOString().split("T")[0],
        description: a.description,
      })),
    })),
    meta: { total, limit, offset },
    countryBreakdown,
    stats: {
      totalRegistrations: total,
      activeRegistrations: activeCount,
      uniqueCountries,
    },
  });
}
