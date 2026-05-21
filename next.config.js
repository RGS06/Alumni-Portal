/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Strict Mode to prevent Supabase auth lock warnings
  // caused by React's double-mount behavior in development
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sode-edu.in',
        pathname: '/**',
      },
      {
        // Supabase Storage — for alumni media uploads
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;

