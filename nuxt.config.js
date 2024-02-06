// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "node:path"

export default defineNuxtConfig({
  runtimeConfig: {
    auth: {
      secret: process.env.NUXT_PUBLIC_AUTH_SECRET
    },
    public: {
      baseUrl: process.env.NUXT_PUBLIC_AUTH_ORIGIN, // The URL of your deployed app (used for origin Check in production)
      verifyClientOnEveryRequest: true, // whether to hit the /auth/session endpoint on every client request

      authEndpoint: process.env.NUXT_PUBLIC_AUTH_ENDPOINT,
      userEndpoint: process.env.NUXT_PUBLIC_USER_ENDPOINT,
      authOrigin: process.env.NUXT_PUBLIC_AUTH_ORIGIN,
      graphQlAuthEndpoint: process.env.NUXT_PUBLIC_GRAPHQL_AUTH_ENDPOINT
    }
  },

  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/main.css'
  ],

  components: {
    "dirs": [
      {
        "path": "~/components/module-form-fields",
        "global": true
      },
      "~/components"
    ]
  },

  modules: [
    '@sidebase/nuxt-auth',
    '@sidebase/nuxt-session',
    '@nuxtjs/apollo',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'nuxt-icons'
  ],

  auth: {
    origin: process.env.NUXT_PUBLIC_AUTH_ORIGIN,
    provider: {
      type: 'authjs'
    },
    globalAppMiddleware: {
      isEnabled: true
    }
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.NUXT_PUBLIC_GRAPHQL_ENDPOINT
      }
    }
  },

  i18n: {
    locales: [
      {
        code: 'de',
        file: 'de-DE.json'
      }
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'de'
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  },

  devtools: {
    enabled: true
  },
})
