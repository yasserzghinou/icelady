const createMDX = require('@next/mdx');

const withMDX = createMDX({
  extension: /\.(md|mdx)$/
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    unoptimized: false
  },
  async redirects() {
    const redirects = require('./src/lib/routing/redirects.json');
    return redirects;
  }
};

module.exports = withMDX(nextConfig);
