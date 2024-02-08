/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

const nextConfig = {
    i18n,
    reactStrictMode: true,
    swcMinify: true,
    env: {
        REVALIDATE_SECRET_TOKEN: 'abc',
    },
    images: {
        domains: ['media-neo.dfsglobal.cn'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.dfsglobal.cn',
                port: '80',
                pathname: '**',
            },
        ],
    },
    assetPrefix: '/eshop',
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: '/eshop/_next/:path*',
                    destination: '/_next/:path*',
                },
                {
                    source: `/eshop/_next/data/:path*`,
                    destination: '/_next/data/:path*',
                },
                {
                    source: `/eshop/_next/image/:path*`,
                    destination: '/_next/image/:path*',
                },
            ],
        };
    },
};

module.exports = nextConfig;
