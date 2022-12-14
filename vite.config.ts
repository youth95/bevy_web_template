import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    exclude: ['@internal/game']
  },
  server: {
    watch: {
      ignored: [
        '**/rust_src/target/**',
        '**/rust_src/src/**',
      ]
    }
  }
})