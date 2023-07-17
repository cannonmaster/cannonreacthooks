import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  base: "/cannonreacthooks",
  integrations: [
    starlight({
      title: "CannonReactHooks",
      social: {
        github: "https://github.com/cannonmaster/cannonreacthooks",
      },
      customCss: [
        // Relative path to your custom CSS file
        "/src/styles/custom.css",
      ],
      sidebar: [
        {
          label: "State Managment",
          translations: {
            "zh-CN": "管理状态",
          },
          autogenerate: {
            directory: "state_managment",
          },
        },
      ],
      defaultLocale: "en",
      locales: {
        en: {
          label: "English",
          lang: "en",
        },
        zh: {
          label: "简体中文",
          lang: "zh-CN",
        },
      },
    }),
    react(),
  ],
  // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
});
