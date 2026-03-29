import Aura from '@primeuix/themes/aura'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: false,

  typescript: {
    typeCheck: true,
  },

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@primevue/nuxt-module',
    '@nuxt/eslint',
  ],

  css: [
    'primeicons/primeicons.css',
    '~/assets/styles/variables.scss',
    '~/assets/styles/main.scss',
  ],

  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
})