import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const ghBase = repoName ? `/${repoName}/` : '/'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? ghBase : './',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'LIC Premium Calculator Pro',
        short_name: 'LIC Calc',
        theme_color: '#007AFF',
        background_color: '#FAFAFA',
        display: 'standalone',
        orientation: 'portrait',
        categories: ['finance', 'business'],
        icons: [
          {
            src: 'pwa-icon.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
          {
            src: 'pwa-icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
          },
          {
            src: 'pwa-icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,json}'],
        runtimeCaching: [
          {
            urlPattern: /\/data\/.*\.json$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'policy-data-cache',
            },
          },
        ],
      },
    }),
  ],
})
