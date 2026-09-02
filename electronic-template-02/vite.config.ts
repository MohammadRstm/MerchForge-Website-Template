import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Explicit IPv4 host: this Node/OS combination resolves "localhost" to ::1 first,
  // and without this Vite's default dev server binds only that -- browser tooling
  // that connects via 127.0.0.1 (not ::1) then can't reach it at all.
  server: {
    host: '127.0.0.1',
  },
  // @merchforge/storefront-sdk is a symlinked local package (file: dependency), so
  // without this it resolves react/react-dom from its own node_modules instead of
  // this app's -- two React copies in one page, which breaks hooks entirely.
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})
