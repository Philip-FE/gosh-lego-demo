import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "gosh-lego-demo",
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        "no-tree-shaking-renderer": path.resolve(
          __dirname,
          "no-tree-shaking-renderer.html"
        ),
        "tree-shaking-renderer": path.resolve(
          __dirname,
          "tree-shaking-renderer.html"
        ),
      },
    },
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@materials": path.resolve(__dirname, "materials"),
      "@generator": path.resolve(__dirname, "generator"),
      "@renderer": path.resolve(__dirname, "renderer"),
    },
  },
});
