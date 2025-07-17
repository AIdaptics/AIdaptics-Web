import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
    {
      protocol: 'https',
        hostname: 'cdn.discordapp.com',
      // pathname: '/path/**', // Optional: restrict to certain paths
    },
      // Add more remotePatterns here if needed
    ],
  },
};

export default nextConfig;
