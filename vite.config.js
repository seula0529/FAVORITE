import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // GitHub Pages 등 서브 경로 배포 시 여기를 바꾸면
  // _fonts.scss 의 /fonts/... 경로도 함께 맞춰야 합니다.
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 모든 .scss / <style lang="scss"> 에 디자인 토큰 자동 주입
        loadPaths: [fileURLToPath(new URL('./src/styles', import.meta.url))],
        additionalData: '@use "variables" as *;\n',
      },
    },
  },
})
