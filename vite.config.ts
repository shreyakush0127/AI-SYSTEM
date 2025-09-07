import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import animate from 'tailwindcss-animate'

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
