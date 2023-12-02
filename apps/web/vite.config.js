import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "../../", "");
  return {
    plugins: [react()],
    envDir: "../../",
    server: {
      port: env.WEB_PORT,
    },
    define: {
      API_PORT: env.API_PORT || 6969,
    },
  };
});
