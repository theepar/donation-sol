// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  compatibilityDate: '2025-07-15',
  ssr: false,
  devtools: { enabled: true },
  vite: {
    define: {
      global: 'globalThis',
    },
    resolve: {
      alias: {
        buffer: 'buffer/',
      },
    },
    optimizeDeps: {
      include: ['buffer'],
    },
  },
  app: {
    head: {
      title: 'Fuel the Code | Solana Donation',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' }
      ],
      bodyAttrs: {
        class: 'bg-[#050505] m-0 p-0'
      }
    }
  }
})
