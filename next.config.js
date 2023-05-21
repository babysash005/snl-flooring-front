/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
module.exports = {
  images: {
    domains: ['www.shutterstock.com'],
  },
};
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
        port: '',
        pathname: 'image-photo',
      },
    ],
  },
}
module.exports = nextConfig



