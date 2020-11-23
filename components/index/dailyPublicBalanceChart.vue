<template>
  <balance-chart title="[公費] 今月の支出状況" :labels="shortDayLabels" :dataSets="dataSets" />
</template>

<script>
import balanceChart from './balanceChart.vue'
import { PUBLIC_BUDGET } from '@/commons/constants'
import dayjs from 'dayjs'

export default {
  components: { balanceChart },
  async fetch() {
    const api = this.$fire.functions.httpsCallable('dailyPaymentAmounts')
    this.baseData = await api({ paymentType: 'public' }).then(res => res.data)
  },
  data: () => ({
    baseData: {} // { '2020-10-10': 1000, '2020-10-11: 2000 }
  }),
  computed: {
    dayLabels() {
      return Object.keys(this.baseData)
    },
    shortDayLabels() {
      return this.dayLabels.map(dayLabel => dayjs(dayLabel).date())
    },
    realBalanceValues() {
      const today = dayjs().startOf('day')
      let balance = PUBLIC_BUDGET

      return this.dayLabels.map(dayLabel => {
        const day = dayjs(dayLabel)
        if (day <= today) {
          balance -= this.baseData[dayLabel]
          return balance
        } else {
          return null // 未来はグラフに描画しない
        }
      })
    },
    burndownValues() {
      const dailyBudget = PUBLIC_BUDGET / this.dayLabels.length
      let balance = PUBLIC_BUDGET
      return this.dayLabels.map(v => {
        balance -= dailyBudget
        return balance
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
