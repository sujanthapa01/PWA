/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    disable: false,
    workboxOptions: {
      disableDevLogs: true,
    },
  });
  
  const nextConfig = {
    reactStrictMode: true, // Ensures best practices
    images: {
      domains: ["hypfvstzrrnfacnogvwo.supabase.co"], // Ensure correct Supabase storage domain
      remotePatterns: [
        {
          protocol: "https",
          hostname: "hypfvstzrrnfacnogvwo.supabase.co",
          pathname: "/storage/v1/object/public/avatars/**",
        },
      ],
    },
  };
  
  module.exports = withPWA(nextConfig);
  