import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import svgLoader from 'vite-svg-loader';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    svgLoader()
  ],
  server: {
    host: '0.0.0.0'
  }
})
