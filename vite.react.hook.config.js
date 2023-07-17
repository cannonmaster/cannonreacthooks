import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
export default defineConfig((config) => ({
  publicDir: false,
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      sourcemap: true,
      brotliSize: true,
      entry: resolve(__dirname, "src/hook_store/main.ts"),
      name: "CannonHookReact",
      // the proper extensions will be added
      fileName: "cannon-hook-react",
      formats: ["esm", "umd", "iife"],
      cssCodeSplit: true,
      chunkSizeWarningLimit: 500,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react-dom"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
          "react-dom": "ReactDom",
        },
      },
    },
    outDir: "cannonHookReact",
  },
  esbuild: {
    drop: config.mode !== "development" ? ["console", "debugger"] : [],
  },
  resolve: {
    alias: [
      {
        find: "@hook",
        replacement: path.resolve(__dirname, "src/hook_store"),
      },
    ],
  },
  css: {
    // preprocessorOptions: {
    //   scss: {
    //     additionalData: `@import "@/styles/variables.scss";`,
    //   },
    // },
  },
  plugins: [
    dts(),
    react(),
    visualizer({
      open: true,
    }),
  ],
}));
