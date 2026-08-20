import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      }, 
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.techsoftwebsolutions.com",
        pathname: "/techsoft/demo/fruitlok-admin/public/uploads/**",
      },
    ],
  },
};

export default nextConfig;
