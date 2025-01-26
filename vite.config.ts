import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  server: {
    port: 3001,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          utils: ["axios", "react-toastify"],
          ui: ["styled-components", "react-bootstrap"],
        },
      },
    },
    chunkSizeWarningLimit: 800,
    target: "esnext",
  },
});
