import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
    ],
    localPatterns: [
      {
        pathname: "/**",
        search: "",
      },
    ],
  },
  experimental: {
    allowedDevOrigins: ['localhost:3000', '192.168.1.14:3000'],
  },
};

export default nextConfig;
