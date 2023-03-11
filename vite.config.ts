import replace from "@rollup/plugin-replace";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { join } from "path";
import { defineConfig } from "vite";

dotenv.config({ path: join(__dirname, ".env") });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    replace({
      "process.env.API_URL": JSON.stringify(process.env.API_URL),
      "process.env.WS_URL": JSON.stringify(process.env.WS_URL),
    }),
  ],
});
