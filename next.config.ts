import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photos are uploaded to Vercel Blob by the editor at tools.fredlich.com.
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
    // Big photographs: let next/image serve wide variants.
    deviceSizes: [640, 828, 1080, 1200, 1600, 1920, 2560],
  },
};

export default nextConfig;
