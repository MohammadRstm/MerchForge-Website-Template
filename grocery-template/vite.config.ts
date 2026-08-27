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
  // Fixed port: fashion-template and electronic-template already occupy 5173/5174
  // in a typical local run, and this business's WebsiteUrl points at this exact
  // address, so it needs to be stable rather than auto-picked.
  server: {
    port: 5175,
    strictPort: true,
  },
})
