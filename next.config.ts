import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Cache Components can be enabled incrementally once components are wrapped in Suspense
  // cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.datocms-assets.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Handle external packages that have dynamic requires
  serverExternalPackages: ["@datocms/cma-client-node", "got", "keyv"],
}

export default nextConfig
