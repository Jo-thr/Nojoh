import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Désactiver les vérifications TypeScript et ESLint pour le build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  allowedDevOrigins: ["localhost:3000"],
};

export default nextConfig;
