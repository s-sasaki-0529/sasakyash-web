<template>
  <line-chart title="[私費] 今月の支出状況" :labels="days" :dataSets="dataSets" />
</template>

<script>
import LineChart from '@/components/commons/LineChart'
import { PRIVATE_BUDGET } from '@/commons/constants'
import dayjs from 'dayjs'

export default {
  components: { LineChart },
  async fetch() {
    const api = this.$fire.functions.httpsCallable('dailyPaymentAmounts')
    const apiResponse = await api({ paymentType: 'private' }).then(res => res.data)
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
      let balance = PRIVATE_BUDGET

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
    burndownValues() {
      const dailyBudget = PRIVATE_BUDGET / this.days.length
      let balance = PRIVATE_BUDGET
      return this.days.map(v => {
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
          borderColor: 'rgba(130,201,169,0.3)',
          backgroundColor: 'rgba(130,201,169,0.3)',
          lineTension: false
        },
        {
          label: '理想',
          data: this.burndownValues,
          fill: false,
          lineTension: false
        }
      ]
    }
  }
}
</script>

<style></style>
