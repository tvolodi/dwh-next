import type { NextConfig } from "next";
import { redirect } from "next/dist/server/api-utils";

module.exports = {
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

  serverComponentsExternalPackages: [
  ]
};

export default nextConfig;
