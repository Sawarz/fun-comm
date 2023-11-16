/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: ['./src'],
        prependData: `@import "~@styles/main.scss";`,
    },
    images: {
        domains: ['firebasestorage.googleapis.com'],
    },
}

module.exports = nextConfig
