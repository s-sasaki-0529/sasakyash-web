<template>
  <div>
    <line-chart title="[私費] 今月の支出状況" :labels="formattedDays" :dataSets="dataSets" />
  </div>
</template>

<script>
import LineChart from '@/components/commons/LineChart'
import { PRIVATE_BUDGET } from '@/commons/constants'
import dayjs from 'dayjs'
import palette from 'google-palette'

export default {
  components: { LineChart },
  async fetch() {
    const api = this.$fire.functions.httpsCallable('dailyPaymentAmounts')
    const apiResponse = await api({ paymentType: 'private' }).then(res => res.data)
    this.days = apiResponse.days
    this.currentMonthAmounts = apiResponse.amounts
  },
  props: {
    compareMonthList: {
      type: Array, // ['2020-10', '2020-11' ...]
      required: false,
      default: () => []
    }
  },
  data: () => ({
    days: [],
    currentMonthAmounts: [],
    compareAmountList: []
  }),
  computed: {
    formattedDays() {
      return this.days.map(day => dayjs(day).format('DD'))
    },
    burndownValues() {
      const dailyBudget = PRIVATE_BUDGET / this.days.length
      let balance = PRIVATE_BUDGET
      return this.days.map(v => {
        balance -= dailyBudget
        return balance
      })
    },
    currentMonthValues() {
      const today = dayjs().startOf('day')
      let balance = PRIVATE_BUDGET

      return this.days.map((dayStr, idx) => {
        const day = dayjs(dayStr)
        if (day <= today) {
          balance -= this.currentMonthAmounts[idx]
          return balance
        } else {
          return null // 未来はグラフに描画しない
        }
      })
    },
    currentMonthDataSet() {
      return {
        label: '今月',
        data: this.currentMonthValues,
        fill: true,
        borderColor: 'rgba(130,201,169,1)',
        backgroundColor: 'rgba(130,201,169,0.3)',
        lineTension: false
      }
    },
    burndownDataSet() {
      return {
        label: 'バーンダウン',
        data: this.burndownValues,
        fill: false,
        lineTension: false
      }
    },
    compareDataSets() {
      const colors = palette('mpn65', this.compareAmountList.length)
      return this.compareAmountList.map((amounts, idx) => {
        return {
          label: this.compareMonthList[idx],
          data: this.calcBalanceValues(amounts),
          fill: false,
          borderColor: '#' + colors[idx],
          backgroundColor: '#' + colors[idx],
          lineTension: false
        }
      })
    },
    dataSets() {
      return [this.currentMonthDataSet, this.burndownDataSet, ...this.compareDataSets]
    }
  },
  methods: {
    calcBalanceValues(amounts) {
      let balance = PRIVATE_BUDGET
      return this.days.map((_, idx) => {
        balance -= amounts[idx]
        return balance
      })
    }
  },
  watch: {
    compareMonthList() {
      const promiseList = this.compareMonthList.map(yearMonth => {
        const [year, month] = yearMonth.split('-')
        const api = this.$fire.functions.httpsCallable('dailyPaymentAmounts')
        return api({ paymentType: 'private', year, month }).then(res => {
          return res.data.amounts
        })
      })
      Promise.all(promiseList).then(amountsList => {
        this.compareAmountList = amountsList
      })
    }
  }
}
</script>

<style></style>
