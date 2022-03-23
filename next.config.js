const withPlugins = require('next-compose-plugins')
const withPreact = require('next-plugin-preact')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = withPlugins(
  [withPreact, withBundleAnalyzer],
  {
    webpack: (config, { isServer }) => {
      config.externals = config.externals || []
      if (!isServer) {
        config.externals = [...config.externals, 'fs']
      }
      return config
    },
  }
  // {
  //   async redirects() {
  //     return [
  //       {
  //         source: '/route',
  //         has: [
  //           {
  //             type: 'query',
  //             key: 'route',
  //             value: '(?<route>.*)'
  //           },
  //         ],
  //         permanent: true,
  //         destination: '/route/:route',
  //       },
  //     ]
  //   },
  // }
)

module.exports = nextConfig
