import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages 프로젝트 페이지(https://<user>.github.io/FAVORITE/) 배포용 서브 경로.
// 커스텀 도메인 등으로 루트 배포 시 '/' 로 되돌리세요.
// ※ src/styles/_variables.scss 의 $base-url 도 같은 값으로 맞춰야 합니다.
const base = '/FAVORITE/'

export default defineConfig({
  base,
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
