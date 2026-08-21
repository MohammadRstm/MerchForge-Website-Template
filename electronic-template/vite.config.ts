import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // @merchforge/storefront-sdk is a symlinked local package (file: dependency), so
  // without this it resolves react/react-dom from its own node_modules instead of
  // this app's -- two React copies in one page, which breaks hooks entirely.
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})
