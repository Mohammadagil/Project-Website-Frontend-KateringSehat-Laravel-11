/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Import file SVG sebagai komponen React
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "kateringsehatbackend.test",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
