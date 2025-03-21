import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["en", "de"],
    defaultLocale: "en",
  },
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
