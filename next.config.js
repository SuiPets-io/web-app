/** @type {import('next').NextConfig} */

module.exports = {
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    swcPlugins: [['@swc-jotai/react-refresh', {}]],
    optimizeCss: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
    ],
  },
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  async redirects() {
		return [
			// Basic redirect
			{
				source: '/',
				destination: '/my-pets',
				permanent: true,
			},
      {
				source: '/marketplace',
				destination: '/marketplace/my-eggs',
				permanent: true,
			},
		]
	},
}
