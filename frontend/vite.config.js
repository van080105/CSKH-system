import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'
import legacy from '@vitejs/plugin-legacy'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig(({ mode }) => {
  // 🧠 Load biến môi trường tương ứng
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // Cấu hình chung
    base: '/',
    plugins: [
      react(),
      tailwindcss(),
      svgr(),
      viteCompression({
        algorithm: 'brotliCompress',
        threshold: 1024, // Chỉ nén file >1KB
        deleteOriginFile: false, // Giữ lại bản gốc (để server tùy chọn gửi .br/.gz)
      }),
      visualizer({ open: false, filename: 'dist/stats.html' }),

      // 🧩 PWA (Progressive Web App)
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'My React App',
          short_name: 'ReactApp',
          theme_color: '#0ea5e9',
          background_color: '#ffffff',
          display: 'standalone',
          start_url: '/',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),

      // 🧩 Plugin nén ảnh
      ViteImageOptimizer({
        jpg: { quality: 80 },
        png: { quality: 80 },
        webp: { quality: 80 },
        avif: { quality: 80 },
      }),

      // 🧩 Legacy build – hỗ trợ browser cũ (IE11, Safari 12,…)
      legacy({
        targets: ['defaults', 'not IE 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
    ],

    // ⚡ Dev Server
    server: {
      port: Number(env.VITE_PORT) || 6660,
      host: true,
      open: true,
      cors: true,
      allowedHosts: ['triangulately-percolable-rowen.ngrok-free.dev'],
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
      watch: {
        usePolling: true,
      },
    },

    // 🧱 Resolve Alias
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@store': path.resolve(__dirname, './src/store'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@services': path.resolve(__dirname, './src/services'),
      },
    },

    // ⚙️ Build cho production
    build: {
      outDir: 'dist',
      sourcemap: mode !== 'production',
      minify: 'terser',
      target: 'esnext',
      cssCodeSplit: true,
      reportCompressedSize: true,
      chunkSizeWarningLimit: 800, // tăng giới hạn cảnh báo bundle
      rollupOptions: {
        output: {
          // Tách vendor và logic riêng
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'vendor-react'
              if (id.includes('tailwindcss')) return 'vendor-tailwind'
              return 'vendor'
            }
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
              return 'assets/images/[name]-[hash][extname]'
            }
            if (/\.css$/.test(name ?? '')) {
              return 'assets/css/[name]-[hash][extname]'
            }
            return 'assets/[name]-[hash][extname]'
          },
        },
      },
    },

    // 🧩 Optimize Deps
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      exclude: ['@vitejs/plugin-react'],
      esbuildOptions: { target: 'esnext' },
    },

    // 🧩 Preview server
    preview: {
      port: 8080,
      open: true,
    },

    // 🌍 Định nghĩa biến toàn cục
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
      __API_URL__: JSON.stringify(env.VITE_API_URL),
      __DEV__: JSON.stringify(mode === 'development'),
    },
  }
})

