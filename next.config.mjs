/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Import file SVG sebagai komponen React.
    // Kecuali src/app/icon.svg: file itu dibaca Next.js sebagai favicon (query __next_metadata__).
    config.module.rules.push({
      test: /\.svg$/,
      resourceQuery: { not: [/__next_metadata__/] },
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
