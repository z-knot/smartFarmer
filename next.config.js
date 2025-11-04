/** @type {import('next').NextConfig} */
// next.config.js
const nextConfig = {
  swcMinify: false,
  experimental: {
    swcLoader: true,
    forceSwcTransforms: false,
  },
};

module.exports = nextConfig;