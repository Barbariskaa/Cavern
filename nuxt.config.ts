import { resolve } from "path";
import { serverConfig } from "./data/config/app/server";
import open from "open";

import pkg from "./package.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src/",
  serverDir: "src/server/",

  alias: {
    "@": resolve(__dirname, "./src"),
    "@data": resolve(__dirname, "./data"),
  },

  dir: {
    public: resolve(__dirname, "public"),
  },

  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  nitro: {
    publicAssets: [
      {
        dir: resolve(__dirname, "data/characters"),
        baseURL: "/characters",
      },
    ],
    routeRules: {
      "/**": { middleware: ["ipWhitelist"] },
    },
  },

  devServer: {
    host: serverConfig.listenOnAllInterfaces
      ? "0.0.0.0"
      : process.env.TAURI_DEV_HOST || "localhost",
    port: serverConfig.port,
  },

  //ssr: false,

  vite: {
    clearScreen: false,
    envPrefix: ["VITE_", "TAURI_"],
    server: {
      strictPort: true,
    },
  },

  telemetry: false,

  modules: ["@nuxtjs/i18n", "@pinia/nuxt"],

  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "ru",
  },
  runtimeConfig: {
    public: {
      appName: pkg.name,
      appVersion: pkg.version,
    },
    // Другие настройки, если необходимо
  },
});