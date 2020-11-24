<template>
  <line-chart title="[公費] 今月の支出状況" :labels="days" :dataSets="dataSets" />
</template>

<script>
import LineChart from '@/components/commons/LineChart'
import { PUBLIC_BUDGET } from '@/commons/constants'
import dayjs from 'dayjs'

export default {
  components: { LineChart },
  async fetch() {
    const api = this.$fire.functions.httpsCallable('dailyPaymentAmounts')
    const apiResponse = await api({ paymentType: 'public' }).then(res => res.data)
    this.days = apiResponse.days
    this.amounts = apiResponse.amounts
  },
  data: () => ({
    days: [],
    amounts: []
  }),
  computed: {
    realBalanceValues() {
      const today = dayjs().startOf('day')
      let balance = PUBLIC_BUDGET

      return this.days.map((dayStr, idx) => {
        const day = dayjs(dayStr)
        if (day <= today) {
          balance -= this.amounts[idx]
          return balance
        } else {
          return null // 未来はグラフに描画しない
        }
      })
    },
    dataSets() {
      return [
        {
          label: '現実',
          data: this.realBalanceValues,
          fill: true,
          borderColor: 'rgba(239,39,91,0.3)',
          backgroundColor: 'rgba(239,39,91,0.3)',
          lineTension: false
        }
      ]
    }
  }
}
</script>

<style></style>
