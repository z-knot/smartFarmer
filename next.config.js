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

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
  swcMinify: true,
};

module.exports = nextConfig;