import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            if (!req.headers.cookie) {
              return;
            }
            console.log("req.headers.cookie", req.headers.cookie);
            proxyReq.setHeader("cookie", req.headers.cookie);
          });
        },
        secure: false,
      },
    },
  },
});
