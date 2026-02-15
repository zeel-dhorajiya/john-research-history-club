import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/john-research-history-club',
  assetPrefix: '/john-research-history-club/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
