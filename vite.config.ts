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
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-query": ["@tanstack/react-query"],
          "vendor-ui": ["react-bootstrap", "styled-components"],
          "vendor-utils": ["axios", "react-datepicker"],
          features: [
            "./src/components/features/slots/SlotList/SlotList.tsx",
            "./src/components/features/slots/Form/Form.tsx",
          ],
          common: [
            "./src/components/common/Modal/Modal.tsx",
            "./src/components/common/Header/Header.tsx",
            "./src/components/common/ErrorMessage/ErrorMessage.tsx",
          ],
          hooks: [
            "./src/hooks/slots/useSlotQuery.ts",
            "./src/hooks/slots/useSlotManagement.tsx",
            "./src/hooks/slots/useModalManagement.ts",
          ],
        },
      },
    },
    chunkSizeWarningLimit: 800,
    target: "esnext",
  },
});
