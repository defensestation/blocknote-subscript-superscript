import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  root: fileURLToPath(new URL(".", import.meta.url)),
  // The plugin is installed via `file:../..` during local development. Ensure
  // its peer dependencies resolve to this app's single React/BlockNote/Yjs copy.
  resolve: {
    dedupe: [
      "react",
      "react-dom",
      "@blocknote/core",
      "@blocknote/react",
      "yjs",
    ],
  },
});
