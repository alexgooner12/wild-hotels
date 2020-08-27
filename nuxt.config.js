const webpack = require('webpack');
const _ = require('lodash');

const dynamicRoutes = require("./routes.json");

const routesRepository = require("./server/repository/routes.repository")();
routesRepository.fetchRoutes().then(data => console.log(data, 'nuxtconfig'));
const siteConfig = require("./config/siteConfig.json");

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: siteConfig.title || process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: ["@/assets/css/main.scss"],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/contentful',
    '~/plugins/globalComponents',
    '~/plugins/eventBus.js',
    "~/plugins/i18n.js",
    { src: '~/plugins/vue-swiper.js', ssr: false },
    { src: '~/plugins/aos.js', ssr: false }
  ],

  icon: {
    iconSrc: './static/icon.jpg'
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
  ],

  router: {
    extendRoutes(routes, resolve) {
      _.each(dynamicRoutes, route => {
        if (route.component) {
          routes.push({
            path: route.url,
            name: route.url,
            component: resolve(
              __dirname,
              "pages/" + route.component + ".vue"
            )
          });
        }
      });
    }
    // middleware: "i18n"

  },
  generate: {
    fallback: true
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['@nuxtjs/pwa', {
      meta: {
        name: false,
        ogType: false,
        ogTitle: false,
        ogDescription: false,
        description: false,
        title: false,
      },
    }],
    'nuxt-svg-loader',
    '@nuxtjs/dotenv',
    [
      'nuxt-fontawesome', {
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas']
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab']
          }
        ]
      }
    ]
  ],

  build: {

    vendor: ['vee-validate', 'vue-i18n', 'babel-polyfill'],

    /*
    ** You can extend webpack config here
    */
    babel: {
      sourceType: 'unambiguous',
      plugins: process.env.NODE_ENV === "production" ? ["transform-remove-console"] : []
    },
    

    extend(config, ctx) {
    },

    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash'
      })
    ]
  }
}
