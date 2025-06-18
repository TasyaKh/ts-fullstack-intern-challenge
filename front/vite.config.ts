import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(),  svgr()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/styles/variables" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
})
