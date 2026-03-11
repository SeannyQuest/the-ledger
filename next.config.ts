import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/**": ["./src/generated/prisma/libquery_engine-*"],
  },
};

export default nextConfig;
