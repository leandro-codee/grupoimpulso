import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {},
  images: {
    domains: ["localhost", "res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

export default nextConfig





