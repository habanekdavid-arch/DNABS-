import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.dnabs.online" }],
        destination: "https://dnabs.online/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
