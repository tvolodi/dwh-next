import type { NextConfig } from "next";
import { redirect } from "next/dist/server/api-utils";

module.exports = {
  reactStrictMode: true,
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/workspace",
  //       permanent: true,
  //     },
  //   ];
  // }
}

const nextConfig: NextConfig = {
  /* config options here */
  // basePath: "/workspace",
  typescript: {
    ignoreBuildErrors: true,
  },

  serverComponentsExternalPackages: [
  ]
};

export default nextConfig;
