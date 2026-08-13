/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@viaitalia/types', '@viaitalia/validation'],
};

module.exports = nextConfig;
