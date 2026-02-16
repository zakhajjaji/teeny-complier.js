import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use webpack instead of Turbopack for better stability
  // Turbopack can have issues with monorepo setups
};

export default nextConfig;
