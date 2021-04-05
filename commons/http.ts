import { functions } from '@/commons/firebase'
import { APIResponseType, PaymentType } from 'sasakyash-functions/src/types'

export async function fetchMonthTotalPaymentAmount() {
  const api = functions.httpsCallable('monthTotalPaymentAmount')
  const data = await api().then(res => res.data)
  return data as APIResponseType<'fetchMonthTotalPaymentAmount'>
}

export async function fetchDailyPaymentAmount(paymentType: PaymentType, year: number, month: number) {
  const api = functions.httpsCallable('dailyPaymentAmounts')
  const data = await api({ paymentType, year, month }).then(res => res.data)
  return data as APIResponseType<'fetchDailyPaymentAmount'>
}

export async function fetchUtilityBills() {
  const api = functions.httpsCallable('utilityBills')
  const data = await api().then(res => res.data)
  return data as APIResponseType<'fetchUtilityBills'>
}

export async function fetchClearCache() {
  const api = functions.httpsCallable('clearCache')
  await api().then(res => res.data)
  return Promise.resolve()
}
