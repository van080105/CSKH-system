import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isProd = mode === 'production'
  const APP_VERSION = JSON.stringify(process.env.npm_package_version)
  const BUILD_DATE = JSON.stringify(new Date().toISOString())

  return {
    base: '/',
    plugins: [
      // ⚡ React dùng SWC: build nhanh gấp 10x Babel
      react(),

      // 🧩 Tailwind + PurgeCSS tự động (chỉ giữ class thực sự dùng)
      tailwindcss(),

      // 🖼 SVG dưới dạng React Component
      svgr(),

      // 💨 Nén Brotli + Gzip song song
      viteCompression({ algorithm: 'brotliCompress', threshold: 512, ext: '.br' }),
      viteCompression({ algorithm: 'gzip', threshold: 512, ext: '.gz' }),

      // 📊 Phân tích bundle
      visualizer({
        open: false,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),

      // 🌍 Progressive Web App (chuẩn App Store)
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'Mockstack - Hệ thống tư vấn và chăm sóc khách hàng',
          short_name: 'Mockstack',
          theme_color: '#0ea5e9',
          background_color: '#ffffff',
          display: 'standalone',
          start_url: '/',
          icons: [
            { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
            {
              src: '/pwa-512x512-maskable.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          maximumFileSizeToCacheInBytes: 6 * 1024 * 1024, // 6 MB
          runtimeCaching: [
            {
              urlPattern: ({ request }) =>
                request.destination === 'image' ||
                request.destination === 'script' ||
                request.destination === 'style',
              handler: 'CacheFirst',
              options: {
                cacheName: 'static-assets',
                expiration: {
                  maxEntries: 200,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 ngày
                },
              },
            },
          ],
        },
      }),

      // 🧩 Nén ảnh thông minh
      ViteImageOptimizer({
        jpg: { quality: 70, progressive: true },
        png: { quality: 70, speed: 3 },
        webp: { quality: 70 },
        avif: { quality: 65 },
      }),
    ],

    // ⚡ Dev Server
    server: {
      host: true,
      port: Number(env.VITE_PORT) || 6660,
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
    },

    // 📁 Alias
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

    // 🏗️ Build tối đa hiệu năng
    build: {
      outDir: 'dist',
      target: 'esnext',
      cssCodeSplit: true,
      sourcemap: !isProd,
      minify: isProd ? 'terser' : false,
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1500,

      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg|webp|avif)$/.test(name ?? ''))
              return 'assets/images/[name]-[hash][extname]'
            if (/\.css$/.test(name ?? ''))
              return 'assets/css/[name]-[hash][extname]'
            return 'assets/[name]-[hash][extname]'
          },
        },
      },

      terserOptions: {
        compress: {
          drop_console: isProd,
          drop_debugger: isProd,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
        },
        format: { comments: false },
      },
    },

    preview: {
      port: 8080,
      open: true,
    },

    // 🌍 Global constants
    define: {
      __APP_VERSION__: APP_VERSION,
      __BUILD_DATE__: BUILD_DATE,
      __API_URL__: JSON.stringify(env.VITE_API_URL),
      __DEV__: JSON.stringify(!isProd),
    },

    // ⚡ Cache thông minh
    cacheDir: '.vite_cache',
  }
})


