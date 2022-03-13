module.exports = {
  images: {
    domains: ['a.storyblok.com'],
    imageSizes: [24, 64, 300]
  },
  reactStrictMode: true,
  experimental: {
    reactRoot: true,
    runtime: 'nodejs' // but it also seems to crash when 'edge' is chosen
  }
};
