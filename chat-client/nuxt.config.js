const colors = require('vuetify/es5/util/colors').default

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
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
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: 'true'
  },

  proxy: {
    '/api/': {
      target: 'http://localhost:5000/',
      pathRewrite: { '^/api/': '' },
    },
    "/user/": {
      target: "https://api-ptpmpt-18.herokuapp.com",
      pathRewrite: { "^/user/": "" }
    },
    "/userinfo/": {
      target: "https://dsd05-dot-my-test-project-252009.appspot.com/",
      pathRewrite: { "^/userinfo/": "" }
    },
    "/project/": {
      target: 'http://3.1.20.54/v1/',
      pathRewrite: { '^/project/': '' }
    },
    "/procedural/": {
      target: 'http://morning-oasis-29841.herokuapp.com/',
      pathRewrite: { '^/procedural/': '' }
    },
    "/recurrent/": {
      target: 'https://falling-frog-38743.pktriot.net/',
      pathRewrite: { '^/recurrent/': '' }
    }
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
