import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import path from "path";

const manifest: chrome.runtime.ManifestV3 = {
  name: "AIOE",
  version: "0.0.0",
  manifest_version: 3,
  description: "The all-in-one Chrome extension for web developers. ",
  action: {
    default_popup: "src/popup/popup.html",
    default_title: "TODO: Title",
  },
};

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
