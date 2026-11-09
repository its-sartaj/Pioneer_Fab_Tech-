import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  const base = process.env.VITE_BASE_PATH || (isProd ? '/Pioneer_Fab_Tech-/' : '/');

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'asset-base-rewriter',
        transformIndexHtml(html) {
          return html.replace(/(href|src)=["']\/assets\//g, `$1="${base}assets/`);
        },
        transform(code, id) {
          if (isProd && (id.endsWith('.tsx') || id.endsWith('.ts'))) {
            return code.replace(/(['"])\/assets\//g, `$1${base}assets/`);
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
