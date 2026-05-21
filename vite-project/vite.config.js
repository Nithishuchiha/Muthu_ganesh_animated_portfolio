import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.mp4'],
  // Uncomment for GitHub Pages deploy to a subpath:
  // base: "/your-repo-name/",
});