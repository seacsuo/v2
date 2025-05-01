import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "portal.hellorubric.com",
        pathname: "/assets/uploadedimgs/**",
      },
      {
        protocol: "https",
        hostname: "cachedresources.hellorubric.com",
        pathname: "/uploaded_assets/**",
      },
    ],
  },
};

export default nextConfig;
