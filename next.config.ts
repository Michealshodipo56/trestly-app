import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['trestly-sdk'],
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
