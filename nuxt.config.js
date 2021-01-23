import { BASE_URL } from './config'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Red Bayoub | Software developer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Montserrat&family=Tajawal&display=swap',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/css/main.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '@/plugins/swipeevents.min.js', mode: 'client' },
    { src: '@/plugins/vue-easy-lightbox.js', mode: 'client' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ['@nuxtjs/google-analytics'],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/recaptcha',
    '@nuxtjs/style-resources',
    'nuxt-i18n',
    '@nuxtjs/sitemap',
  ],

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
    fullTextSearchFields: ['title.slug'],
    nestedProperties: [
      'custom_title.slug',
      'custom_title.description.slug',
      'summery.slug',
      'role.slug',
      'links.slug',
    ],
  },

  styleResources: {
    scss: ['@/assets/css/_variables.scss'],
  },

  i18n: {
    baseUrl: BASE_URL,
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
        iso: 'en',
      },
      {
        code: 'ar',
        name: 'Arabic',
        file: 'ar.json',
        iso: 'ar',
      },
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'en',
    strategy: 'prefix',
    seo: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      onlyOnRoot: true,
    },
    vueI18n: {
      fallbackLocale: 'en',
    },
  },

  googleAnalytics: {
    id: 'UA-149020396-1',
  },

  sitemap: {
    hostname: BASE_URL,
    gzip: true,
    i18n: true,
    routes: async () => {
      const { $content } = require('@nuxt/content')
      const projects = await $content('projects').only(['path', 'slug']).fetch()
      console.log(projects)
      return projects.map((project) => ({
        url: project.path,
        links: [
          { lang: 'en', url: `en/${project.path}` },
          { lang: 'ar', url: `ar/${project.path}` },
          { lang: 'x-default', url: project.path },
        ],
        priority: 0.5,
      }))
    },
    defaults: {
      changefreq: 'monthly',
      priority: 1,
      lastmod: new Date(),
    },
  },

  recaptcha: {
    hideBadge: false, // Hide badge element (v3 & v2 via size=invisible)
    language: 'en', // Recaptcha language (v2)
    siteKey: '6Leh6dkUAAAAAL2KFiSuCtfHHCB4ksMSd5nwms6P', // Site key for requests
    version: 2, // Version
    size: 'normal', // Size: 'compact', 'normal', 'invisible' (v2)
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
