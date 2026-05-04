import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import netlifyPlugin from "@netlify/vite-plugin-react-router";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), netlifyPlugin()],
  server: {
    proxy: {
      "/api": {
        target: "https://fakerestaurantapi.runasp.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.js",
  },
});
