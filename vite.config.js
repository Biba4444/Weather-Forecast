import { defineConfig } from "vite";

export default defineConfig({
  base: "./",

  server: {
    open: true,
    cors: true,
  },
});
