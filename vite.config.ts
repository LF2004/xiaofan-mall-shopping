import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: process.env.NODE_ENV === 'development',
  },
  plugins: [uni()],
})
