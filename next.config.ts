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
    ],
  },
};

export default nextConfig;
