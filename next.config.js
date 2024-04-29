/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com", 'encrypted-tbn0.gstatic.com', 'png.pngtree.com/', 'assets-global.website-files.com', 'images.unsplash.com', 'static-00.iconduck.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
