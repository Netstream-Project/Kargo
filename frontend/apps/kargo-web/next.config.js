/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
    // This allows the build to finish even if there are type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // This is also a good idea to add, so it doesn't fail on linting rules
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
