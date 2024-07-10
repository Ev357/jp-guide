// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-07-04",
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
    "@nuxtjs/seo",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@nuxt/content",
    "@nuxthq/studio",
    "nuxt-posthog",
    "nuxt-vercel-analytics",
  ],
  shadcn: {
    prefix: "U",
    componentDir: "./app/components/ui",
  },
  colorMode: {
    classSuffix: "",
  },
  i18n: {
    defaultLocale: "en",
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
  site: {
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL,
    name: process.env.NUXT_PUBLIC_SITE_NAME,
    description: process.env.NUXT_PUBLIC_SITE_DESCRIPTION,
    strictNuxtContentPaths: true,
  },
  content: {
    locales: ["en", "cs"],
    experimental: {
      search: {},
    },
  },
  posthog: {
    publicKey: process.env.NUXT_PUBLIC_POSTHOG_KEY,
    host: process.env.NUXT_PUBLIC_POSTHOG_HOST,
    clientOptions: {
      api_host: "/api/ingest",
      ui_host: process.env.NUXT_PUBLIC_POSTHOG_UI_HOST,
    },
    disabled: process.env.NODE_ENV === "development",
  },
  sitemap: {
    strictNuxtContentPaths: true,
    sources: [
      "/api/__sitemap__/urls?locale=en",
      "/api/__sitemap__/urls?locale=cs",
    ],
  },
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
