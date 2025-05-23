import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [mkcert(), vue()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: '[name].[ext]', // Mantener los nombres de archivo originales para los activos
      },
    },
    // include all images in the assets folder, even if they are not referenced in the code
    assetsInclude: 'assets/**',
  },
  server: {
    allowedHosts: true,
  },
})
