import type { NextConfig } from 'next'
import PWA from 'next-pwa'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    qualities: [50, 75, 100],
  },
}

PWA({
  dest: 'public',
})

export default nextConfig
