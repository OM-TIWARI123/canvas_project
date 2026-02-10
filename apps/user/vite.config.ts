import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import viteReact from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';

export default defineConfig({
  server: { port: 3001 },
  plugins: [
    tailwindcss(),
    tsConfigPaths(),
    tanstackStart(),
    nitroV2Plugin({ preset: 'aws-lambda' }),
    viteReact(),
  ],
  build: { chunkSizeWarningLimit: 1000 },
  css: { devSourcemap: true },
});
