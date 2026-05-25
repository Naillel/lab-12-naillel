import { defineConfig } from 'vite';

export default defineConfig({
  
  root: 'src',

  base: '/lab-12/', 

  build: {
   outDir: '../dist',
    emptyOutDir: true,
  },

  server: {
    port: 1234,
    open: true
  },

  test: {
    environment: "happy-dom",
    globals: true
  }
});