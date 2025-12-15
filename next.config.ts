import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure we're using the src directory
  experimental: {
    // This is not needed in Next.js 13+ but can help with clarity
  },
  // Add any other config options here
};

export default nextConfig;
