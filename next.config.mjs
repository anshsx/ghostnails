/** @type {import('next').NextConfig} */
export default {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // ✅ Allows images from ANY domain
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Prevents ESLint errors from blocking production build
  },
};