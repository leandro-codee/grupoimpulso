import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  serverExternalPackages: ["mongodb"],
  images: {
    domains: ["localhost", "res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Enable edge runtime for better performance
  runtime: "edge",
}

export default nextConfig
