import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'images.clek.dev',
      },
      {
        protocol: "https",
        hostname: "*.ucarecd.net",
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
