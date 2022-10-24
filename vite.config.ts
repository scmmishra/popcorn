import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";

import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
    },
  },
});
