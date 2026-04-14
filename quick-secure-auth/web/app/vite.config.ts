import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "app",
  plugins: [react()],
  server: { port: 5173 },
  resolve: {
    alias: {
      "@ds":       new URL("../src/ds",       import.meta.url).pathname,
      "@patterns": new URL("../src/patterns", import.meta.url).pathname,
      "@shell":    new URL("../src/shell",    import.meta.url).pathname,
      "@mock":     new URL("src/mock",        import.meta.url).pathname,
    },
  },
});
