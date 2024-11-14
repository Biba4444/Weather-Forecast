import { defineConfig } from "vite";

export default defineConfig({
  base: "/Weather-Forecast/",

  build: {
    outDir: "dist",
  },
  server: {
    open: true,
    cors: true,
  },
});
