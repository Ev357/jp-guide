// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-07-04",
  modules: [
    "@nuxtjs/tailwindcss",
    [
      "shadcn-nuxt",
      {
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
        locales: [
          {
            code: "en",
            name: "English",
          },
          {
            code: "cs",
            name: "Čeština",
          },
        ],
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
  ],
  runtimeConfig: {
    public: {
      site: {
        url: process.env.NUXT_PUBLIC_SITE_URL,
        name: process.env.NUXT_PUBLIC_SITE_NAME,
        description: process.env.NUXT_PUBLIC_SITE_DESCRIPTION,
      },
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
});
