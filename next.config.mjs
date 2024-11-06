// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tcggkqkumgamaeqkyxvg.supabase.co",
        port: "",
        pathname: "/storage/v1/object/sign/los_images/**"
      },
      {
        protocol: "https",
        hostname: "static.thenounproject.com",
        port: "",
        pathname: "/**"
      }
    ]
  }
}

export default nextConfig
