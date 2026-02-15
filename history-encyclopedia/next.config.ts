import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/john-research-history-club',
  assetPrefix: '/john-research-history-club/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
