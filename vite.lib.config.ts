import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : path.dirname(fileURLToPath(import.meta.url));

// Vite config for building the library bundle (ESM + UMD + CSS)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      name: 'ImpulseUI',
      fileName: (format) => `impulse-ui.${format === 'es' ? 'js' : 'umd.cjs'}`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      // Externalize peer deps so they are not bundled
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'ReactJSXRuntime',
        },
      },
    },
    // Output type declarations alongside the bundle
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
});
