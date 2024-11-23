import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 3000,
  },
  base: '/Simuag.github.io/',
  build: {
    sourcemap: false, // Disable eval-related source maps
  }
});
