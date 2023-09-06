import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import legacy from '@vitejs/plugin-legacy'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig({

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
  // },

  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // legacy({
    //   targets: ['defaults', 'not IE 11'],
    //   additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    //   renderLegacyChunks: true,
    //   polyfills: [
    //     'es.symbol',
    //     'es.promise',
    //     'es.promise.finally',
    //     'es/map',
    //     'es/set',
    //     'es.array.filter',
    //     'es.array.for-each',
    //     'es.array.flat-map',
    //     'es.object.define-properties',
    //     'es.object.define-property',
    //     'es.object.get-own-property-descriptor',
    //     'es.object.get-own-property-descriptors',
    //     'es.object.keys',
    //     'es.object.to-string',
    //     'web.dom-collections.for-each',
    //     'esnext.global-this',
    //     'esnext.string.match-all'
    //   ]
    // }),
    vue()
  ],

})
