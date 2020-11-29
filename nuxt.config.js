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
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.FIREBASE_APP_KEY,
          authDomain: 'sasakyash.firebaseapp.com',
          databaseURL: 'https://sasakyash.firebaseio.com',
          projectId: 'sasakyash',
          storageBucket: 'sasakyash.appspot.com',
          messagingSenderId: '910066656684',
          appId: '1:910066656684:web:45c9b81da866fdf96b8609'
        },
        services: {
          functions: {
            location: 'us-central1',
            emulatorPort: process.env.NODE_ENV === 'development' ? 5001 : false,
            emulatorHost: process.env.NODE_ENV === 'development' ? 'http://localhost' : false
          }
        },
        onFirebaseHosting: true
      }
    ]
  ],
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
