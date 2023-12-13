/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_DATABASE_HOST: process.env.NEXT_PUBLIC_DATABASE_HOST,
    NEXT_PUBLIC_DATABASE_USERNAME: process.env.NEXT_PUBLIC_DATABASE_USERNAME,
    NEXT_PUBLIC_DATABASE_NAME: process.env.NEXT_PUBLIC_DATABASE_NAME,
    NEXT_PUBLIC_DATABASE_PASSWORD: process.env.NEXT_PUBLIC_DATABASE_PASSWORD,
    YOUTUBE_KEY: process.env.YOUTUBE_KEY,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['i.ytimg.com', 'yt3.ggpht.com', 'img.youtube.com'],
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true', // 환경변수 ANALYZE가 true일 때 실행
  openAnalyzer: false, // 브라우저에 자동으로 분석결과를 새 탭으로 Open하는 것을 방지
});

module.exports = withBundleAnalyzer(nextConfig);
