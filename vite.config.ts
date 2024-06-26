import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  base: '',
  plugins: [react(), viteTsconfigPaths(), eslint()],
  server: {
    open: true,
    port: 3000,
  },
})
