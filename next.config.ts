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
      {
        protocol: 'https',
        hostname: 'qanmwxigdrattiyugnyp.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'supabase.hit.dev.br',
      },
      {
        protocol: 'https',
        hostname: 'storage.hit.dev.br',
      },
    ],
    qualities: [50, 75, 100],
  },
}

PWA({
  dest: 'public',
})

export default nextConfig
