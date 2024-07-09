// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-07-04",
  modules: [
    "@nuxtjs/tailwindcss",
    [
      "shadcn-nuxt",
      {
        prefix: "U",
        componentDir: "./app/components/ui",
      },
    ],
    [
      "@nuxtjs/color-mode",
      {
        classSuffix: "",
      },
    ],
    [
      "@nuxtjs/i18n",
      {
        defaultLocale: "en",
        fallbackLocale: "en",
        locales: [
          {
            code: "en",
            name: "English",
            file: "en.json",
          },
          {
            code: "cs",
            name: "Čeština",
            file: "cs.json",
          },
        ],
        lazy: true,
        langDir: "lang",
      },
    ],
    [
      "@nuxtjs/seo",
      {
        baseUrl: process.env.NUXT_PUBLIC_SITE_URL,
        name: process.env.NUXT_PUBLIC_SITE_NAME,
        description: process.env.NUXT_PUBLIC_SITE_DESCRIPTION,
      },
    ],
    "@nuxt/image",
    "@vueuse/nuxt",
    [
      "@nuxt/content",
      {
        locales: ["en", "cs"],
        experimental: {
          search: true,
        },
      },
    ],
    "@nuxthq/studio",
    [
      "nuxt-posthog",
      {
        publicKey: process.env.NUXT_PUBLIC_POSTHOG_KEY,
        host: process.env.NUXT_PUBLIC_POSTHOG_HOST,
        clientOptions: {
          api_host: "/api/ingest",
          ui_host: process.env.NUXT_PUBLIC_POSTHOG_UI_HOST,
        },
        disabled: process.env.NODE_ENV === "development",
      },
    ],
    "nuxt-vercel-analytics",
  ],
  runtimeConfig: {
    public: {
      site: {
        url: process.env.NUXT_PUBLIC_SITE_URL,
        name: process.env.NUXT_PUBLIC_SITE_NAME,
        description: process.env.NUXT_PUBLIC_SITE_DESCRIPTION,
      },
      posthog: {
        key: process.env.NUXT_PUBLIC_POSTHOG_KEY,
        host: process.env.NUXT_PUBLIC_POSTHOG_HOST,
      },
    },
  },
  routeRules: {
    "/api/ingest/static/**": {
      proxy: `${process.env.NUXT_PUBLIC_POSTHOG_ASSET_HOST}/static/**`,
    },
    "/api/ingest/**": {
      proxy: `${process.env.NUXT_PUBLIC_POSTHOG_HOST}/**`,
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    componentIslands: {
      selectiveClient: "deep",
    },
  },
  app: {
    head: {
      titleTemplate: "%siteName",
    },
  },
});
