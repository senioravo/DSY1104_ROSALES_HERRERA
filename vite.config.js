import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Mismo puerto que Redirect URI en Azure; si 5173 está ocupado, falla en vez de usar 5174.
    strictPort: true,
  },
})
