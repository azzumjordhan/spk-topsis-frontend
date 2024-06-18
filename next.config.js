/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,
  env: {
    HOST: process.env.HOST,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${this.env.HOST}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
