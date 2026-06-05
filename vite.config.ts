import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const cmsApiUrl = env.VITE_CMS_API_URL || 'http://localhost:3000'

  return {
    plugins: [react()],
    server: {
      proxy: {
        // Proxy /api/public/* to the CMS backend during local development
        '/api/public': {
          target: cmsApiUrl,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
