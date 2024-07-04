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
  ],
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    componentIslands: {
      selectiveClient: "deep",
    },
  },
});
