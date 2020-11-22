export default {
  head: {
    title: 'sasakyash',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
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
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.FIREBASE_DATABASE_URL,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
        },
        services: {
          firestore: true,
          functions: {
            location: 'us-central1',
            emulatorPort: 5001,
            emulatorHost: 'http://localhost',
          },
        },
      },
    ],
  ],
  build: {},
  env: {
    privateBudget: process.env.PRIVATE_BUDGET,
    publicBudget: process.env.PUBLIC_BUDGET,
  },
}
