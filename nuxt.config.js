const path = require('path')
export default {
  ssr: false,
  head: {
    title: 'sasakyash',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  css: ['bulma/css/bulma.min.css'],
  plugins: [],
  components: true,
  buildModules: ['@nuxt/typescript-build'],
  modules: [],
  build: {},
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
      '~': path.resolve(__dirname)
    }
  },
  router: {
    linkExactActiveClass: 'is-active' // for Bulma sidebar
  },
  env: {
    privateBudget: process.env.PRIVATE_BUDGET,
    publicBudget: process.env.PUBLIC_BUDGET
  }
}
