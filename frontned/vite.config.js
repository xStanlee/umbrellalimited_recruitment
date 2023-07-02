/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    // Add cfg for tests
  },
  plugins: [
    vue(),
    //Can remove unnecessary components
    vuetify({
      autoImport: true,
    })
  ]
})
