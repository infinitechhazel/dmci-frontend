/** @type {import('next').NextConfig} */

// Import the PWA wrapper
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public", // generated sw files go to /public
  register: true, // auto-register the service worker
  skipWaiting: true, // immediately activate new SW
  disable: process.env.NODE_ENV === "development", // disable in dev
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    navigateFallback: "/offline.html", // fallback page when offline
    // you can add runtimeCaching rules here if needed
  },
});

const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dmcicorporation.com",
        port: "",
        pathname: "/assets/**",
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

// Wrap config with PWA
module.exports = withPWA(nextConfig);
