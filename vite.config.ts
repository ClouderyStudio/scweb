import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

/**
 * 站点构建配置。
 *
 * 组件库以**源码**形式放在 vendor/m3-ui（由 scripts/sync-m3-ui.mjs 同步）：
 * 手机环境下重新 build 组件库很慢，而 Vite 本来就能编译 .vue 源码；
 * 放进 vendor/ 还能避开一个坑 —— 目录若在项目外，Vite 会就近读到组件库自己的
 * tsconfig.json（它继承了没装的 @vue/tsconfig），构建直接报错。
 * 换发布版时：package.json 加 @clderystd/m3-ui，然后删掉下面这条 alias。
 *
 * base 用相对路径：产物可以直接丢到对象存储的任何子目录，不用重新构建。
 */
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@clderystd/m3-ui': fileURLToPath(new URL('./vendor/m3-ui/src/index.ts', import.meta.url)),
    },
    // 组件库源码在自己目录下解析 vue 会失败，统一用本项目的 vue
    dedupe: ['vue'],
  },
  server: {
    host: '127.0.0.1',
    port: 5190,
    fs: { allow: [fileURLToPath(new URL('..', import.meta.url))] },
  },
  preview: { host: '127.0.0.1', port: 4173 },
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    chunkSizeWarningLimit: 800,
    // 默认 4KB 以内会内联成 base64：头像全部落在这个区间，会把 20KB+ 灌进首屏 JS。
    // 这里改成 1KB，头像仍走独立文件（带哈希、长缓存、loading=lazy），不再拖慢首屏。
    assetsInlineLimit: 1024,
  },
})
