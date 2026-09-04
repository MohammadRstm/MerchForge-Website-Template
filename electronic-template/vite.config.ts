import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Where this template will be served from. Local dev and a plain `npm run build`
  // use the domain root, exactly as before; the deployment workflow sets BASE_PATH
  // to the template's own subdirectory on GitHub Pages. Nothing about the Pages URL
  // is hardcoded here - see README, "Base-path handling".
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  // @merchforge/storefront-sdk is a symlinked local package (file: dependency), so
  // without this it resolves react/react-dom from its own node_modules instead of
  // this app's -- two React copies in one page, which breaks hooks entirely.
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})
