import firebase from 'firebase'

type Functions = firebase.functions.Functions
type PaymentType = 'public' | 'private'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APP_KEY,
  authDomain: 'sasakyash.firebaseapp.com',
  databaseURL: 'https://sasakyash.firebaseio.com',
  projectId: 'sasakyash',
  storageBucket: 'sasakyash.appspot.com',
  messagingSenderId: '910066656684',
  appId: '1:910066656684:web:45c9b81da866fdf96b8609'
}
firebase.initializeApp(firebaseConfig)

const functions = firebase.functions()

// FIXME: サーバサイドと型を一元管理する
type UtilityBills = {
  [date: string]: {
    electric?: number
    gas?: number
    water?: number
  }
}

export async function fetchMonthTotalPaymentAmount() {
  const api = functions.httpsCallable('monthTotalPaymentAmount')
  const data = await api().then(res => res.data)
  return {
    private: data.private as number,
    public: data.public as number
  }
}

export async function fetchDailyPaymentAmount(paymentType: PaymentType, year: number, month: number) {
  const api = functions.httpsCallable('dailyPaymentAmounts')
  const data = await api({ paymentType, year, month }).then(res => res.data)
  return {
    days: data.days as string[],
    amounts: data.amounts as number[]
  }
}

export async function fetchUtilityBills() {
  const api = functions.httpsCallable('utilityBills')
  const data = await api().then(res => res.data)
  return data as UtilityBills
}

export async function fetchClearCache() {
  const api = functions.httpsCallable('clearCache')
  await api().then(res => res.data)
  return Promise.resolve()
}
