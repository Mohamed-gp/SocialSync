import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as dotenv from "dotenv";

// https://vitejs.dev/config/

dotenv.config({ path: ".env" });

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5002,
    host: true,
    hmr: {
      protocol: process.env.VITE_ENV == "production" ? "wss" : "ws", // wss not ws for sucurity(secure some browsers) gonna complain
      host:
        process.env.VITE_ENV == "development"
          ? "localhost"
          : "socialsync.production-server.tech",
    },
  },

  css: {
    devSourcemap: process.env.VITE_ENV != "development",
  },
  define: {
    global: {},
  },
});
