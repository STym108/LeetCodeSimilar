import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'index.html'),
        content: resolve(__dirname, 'src/content.js')
      },
      output: {
        entryFileNames: assetInfo => {
          if (assetInfo.name === 'content') return 'content.js';
          return 'assets/[name].js';
        }
      }
    },
    minify: false,           // 🧪 Disable minification for debug
    emptyOutDir: true        // 💣 Clean old files from /dist
  },
  optimizeDeps: {
    exclude: ['src/content.js'] // 🛡️ Prevent pre-optimization
  }
});
