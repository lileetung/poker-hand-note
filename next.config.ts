import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  domains: ['www.poker-notebook.com', 'poker-notebook.com'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;