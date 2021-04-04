import firebase from 'firebase'

firebase.initializeApp({
  apiKey: process.env.FIREBASE_APP_KEY,
  authDomain: 'sasakyash.firebaseapp.com',
  databaseURL: 'https://sasakyash.firebaseio.com',
  projectId: 'sasakyash',
  storageBucket: 'sasakyash.appspot.com',
  messagingSenderId: '910066656684',
  appId: '1:910066656684:web:45c9b81da866fdf96b8609'
})

export const functions = firebase.functions()
