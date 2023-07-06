/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Can remove unnecessary components
    vuetify({
      autoImport: true
    })
  ],
  test: {
    globals: true,
    setupFiles: 'src/setupTests.js'
  }
})
