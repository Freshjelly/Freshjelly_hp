import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    // チャンク分割の最適化
    rollupOptions: {
      output: {
        manualChunks: {
          // Reactライブラリを別チャンクに分離
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    // 圧縮設定
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 本番環境でconsole.logを削除
        drop_debugger: true,
      },
    },
    // チャンクサイズ警告の閾値を調整
    chunkSizeWarningLimit: 1000,
  },
})

