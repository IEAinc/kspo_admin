import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import svgLoader from 'vite-svg-loader';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd());
const API_BASE_URL = env.VITE_API_BASE_URL +":8080"



// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    svgLoader()
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/admin': {
        target: API_BASE_URL,
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('Cookie', req.headers.cookie);
          });
        },
        rewrite: (path) => {
        
          return path;
        }
      },
      '^/sports/([^/]+)/(?!window).+': {
        target: API_BASE_URL,
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('Cookie', req.headers.cookie);
          });
        },
        secure: false,
        rewrite: (path) => {return path;}
      }
    }
     
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
