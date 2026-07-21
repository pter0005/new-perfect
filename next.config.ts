import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Todas as imagens são locais (public/) desde 21/07 — sem hosts remotos.
};

export default nextConfig;
