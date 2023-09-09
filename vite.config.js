import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
// import legacy from '@vitejs/plugin-legacy'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
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
  build:{
    rollupOptions:{
      plugins:[visualizer()],
      // external: ['vue'],
    },
  },

  plugins: [
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),

        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],


    }),

    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],


    }),

    Icons({
      autoInstall: true,
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
    vue(),viteCompression()
  ],

})
