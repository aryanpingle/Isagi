import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      // add any HTML pages here
      input: {
        popup: "src/popup/index.html",
        serviceWorker: "src/serviceWorker/index.ts",
        sidePanel: "src/sidePanel/cookieEditor/index.html",
      },
      output: {
        dir: "dist",
      },
    },
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [viteReact()],
});
