import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows all HTTPS domains
      },
      {
        protocol: 'http',
        hostname: '**', // Allows all HTTP domains (not recommended for production)
      },
    ],
  },
};

export default nextConfig;
