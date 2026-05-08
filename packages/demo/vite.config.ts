import {defineConfig} from 'vite';
import tailwindcss from '@tailwindcss/vite';
import symfonyPlugin from 'vite-plugin-symfony';
import {resolve} from 'path';

// Vite server configuration in DDEV environment.
const serverConfig = process.env.DDEV_PRIMARY_URL
  ? {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['.ddev.site', 'localhost'],
    strictPort: true,
    origin: `${process.env.DDEV_PRIMARY_URL.replace(/:\d+$/, "")}:5173`,
    cors: {
      origin: /https?:\/\/([A-Za-z0-9\-\.]+)?(\.ddev\.site)(?::\d+)?$/,
    },
  }
  : undefined;

export default defineConfig({
  plugins: [
    symfonyPlugin({
      stimulus: true,
      refresh: true,
      viteDevServerHostname: "localhost",
    }),
    tailwindcss(),
  ],
  publicDir: false,
  build: {
    manifest: true,
    outDir: 'public/build',
    rollupOptions: {
      input: {
        app: resolve(__dirname, 'assets/app.ts'),
      },
    },
  },
  server: serverConfig,
});
