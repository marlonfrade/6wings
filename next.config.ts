import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl: (config?: NextConfig | undefined) => NextConfig =
  createNextIntlPlugin()

const nextConfig: NextConfig = {
  images: {
    domains: ['placehold.co']
  }
}

export default withNextIntl(nextConfig)
