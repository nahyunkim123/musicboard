/** @type {import('next').NextConfig} */
const nextConfig = {

    env:{
        NEXT_PUBLIC_DATABASE_HOST  :process.env.NEXT_PUBLIC_DATABASE_HOST,
        NEXT_PUBLIC_DATABASE_USERNAME  :process.env.NEXT_PUBLIC_DATABASE_USERNAME,
        NEXT_PUBLIC_DATABASE_NAME  :process.env.NEXT_PUBLIC_DATABASE_NAME ,
        NEXT_PUBLIC_DATABASE_PASSWORD  :process.env.NEXT_PUBLIC_DATABASE_PASSWORD,
        YOUTUBE_KEY: process.env.YOUTUBE_KEY,
    },
    images: {
        domains: ['i.ytimg.com', 'yt3.ggpht.com'],
    }

}

module.exports = nextConfig

