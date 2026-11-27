/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // firebase-admin must stay a runtime (not bundled) dependency
  serverExternalPackages: ["firebase-admin"],
};
export default nextConfig;
