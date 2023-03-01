import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import { resolve, dirname } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [
    Vue({
      reactivityTransform: true,
    }),
    VueI18nPlugin({
      globalSFCScope: true,
      include: resolve(dirname(fileURLToPath(import.meta.url)), "src/lang/**"),
    }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ["vue", "vue/macros", "vue-router", "@vueuse/core"],
      dts: true,
      dirs: ["./src/composables"],
      vueTemplate: true,
    }),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Components({
      dts: true,
      resolvers: [VantResolver()],
    }),
  ],
});
