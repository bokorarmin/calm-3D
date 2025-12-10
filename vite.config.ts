import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "@mui/material",
      "@emotion/react",
      "@emotion/styled",
    ],
    esbuildOptions: {
      target: "es2020",
    },
  },
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  build: {
    target: "es2020",
    rollupOptions: {
      external: [],
    },
  },
});
