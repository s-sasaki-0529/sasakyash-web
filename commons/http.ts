import { functions } from '@/commons/firebase'

// FIXME: サーバサイドと型を一元管理する
type PaymentType = 'public' | 'private'
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
