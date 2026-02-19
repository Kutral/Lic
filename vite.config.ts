import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

const getPagesBase = () => {
  if (process.env.VITE_PUBLIC_BASE) {
    return process.env.VITE_PUBLIC_BASE
  }

  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? path.basename(process.cwd())
  return `/${repoName}/`
}

export default defineConfig(({ command }) => {
  const base = command === 'build' ? getPagesBase() : '/'

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg'],
        manifest: {
          id: base,
          scope: base,
          start_url: base,
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
          cleanupOutdatedCaches: true,
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
  }
})
