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
            }
        ]
    }
}

export default nextConfig
