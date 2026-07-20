import { defineConfig } from 'vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        carRental: resolve(__dirname, 'car-rental/index.html'),
        designSystem: resolve(__dirname, 'design-system-case-study/index.html'),
        amazonFollowup: resolve(__dirname, 'amazon-followup/index.html'),
        aircredit: resolve(__dirname, 'aircredit/index.html'),
        searchWidget: resolve(__dirname, 'search-widget/index.html'),
      },
    },
  },
})
