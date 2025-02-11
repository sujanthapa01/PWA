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
    },
  };
  
  module.exports = withPWA(nextConfig);
  