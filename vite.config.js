import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [ElementPlusResolver()],
      dts: 'src/auto-imports.d.ts'
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/components.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      src: resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`
      }
    }
  },
  server: {
    port: 10090,
    open: false,
    proxy: {
      '/auth/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      },
      '/dcs/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      },
      '/das/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      },
      '/orgs/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      },
      '/gds/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      },
      '/rrs/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      },
      '/aggs/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      },
      '/ets/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      },
      '/vfs/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      },
      '/fssfiles': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          'element-plus': ['element-plus'],
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'echarts': ['echarts']
        }
      }
    }
  }
})
