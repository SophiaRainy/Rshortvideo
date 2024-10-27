/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        dns: false,
        tls: false,
        fs: false,
      };
    }
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['mysql2'],
  },
};

module.exports = nextConfig;
