/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts'],
  redirects: async () => [
    {
      source: "/",
      destination: "/signin",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
