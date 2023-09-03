import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       // 修改输出文件的命名模式
  //       entryFileNames: '[name]-[hash].js', // 修改为你需要的模式
  //       chunkFileNames: '[name]-[hash].js', // 修改为你需要的模式
  //       assetFileNames: '[name]-[hash].[ext]' // 修改为你需要的模式
  //     }
  //   }
  // }//    "build": "vite build",
  // //    "preview": "vite preview --port 4173"
})
