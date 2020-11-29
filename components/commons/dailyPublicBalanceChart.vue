<template>
  <div>
    <line-chart title="[公費] 今月の支出状況" :labels="days" :dataSets="dataSets" />
  </div>
</template>

<script>
import LineChart from '@/components/commons/LineChart'
import { PUBLIC_BUDGET } from '@/commons/constants'
import dayjs from 'dayjs'
import palette from 'google-palette'

export default {
  components: { LineChart },
  props: {
    monthDateList: {
      type: Array, // dayjs[]
      required: false,
      default: () => []
    }
  },
  data: () => ({
    isLoading: true,
    days: [...new Array(30)].map((_, i) => i + 1),
    compareAmountList: []
  }),
  computed: {
    burndownValues() {
      const dailyBudget = PUBLIC_BUDGET / this.days.length
      let balance = PUBLIC_BUDGET
      return this.days.map(v => {
        balance -= dailyBudget
        return balance
      })
    },
    dataSets() {
      if (this.isLoading || this.monthDateList.length != this.compareAmountList.length) return []
      return [...this.createDataSets()]
    },
    colors() {
      return [...palette('cb-Dark2', 8), ...palette('mpn65', this.compareAmountList.length)]
    }
  },
  methods: {
    createDataSets() {
      return this.compareAmountList.map((amounts, idx) => {
        if (idx === 0) {
          return this.createMainDataSet(amounts)
        } else {
          return this.createCommonDataSet(
            this.monthDateList[idx].format('YYYY-MM'),
            this.calcBalanceValues(amounts),
            '#' + this.colors[idx]
          )
        }
      })
    },
    createMainDataSet(amounts) {
      const date = dayjs().date()
      const mainAmounts = this.calcBalanceValues(amounts).filter((_, idx) => idx < date)
      return this.createCommonDataSet('今月', mainAmounts, '', {
        borderColor: 'rgba(239,39,91,0.5)',
        backgroundColor: 'rgba(239,39,91,0.1)',
        fill: true
      })
    },
    createCommonDataSet(label, values, color, option = {}) {
      return {
        label,
        data: values,
        fill: false,
        borderColor: color,
        backgroundColor: color,
        lineTension: false,
        ...option
      }
    },
    calcBalanceValues(amounts) {
      let balance = PUBLIC_BUDGET
      return this.days.map((_, idx) => {
        balance -= amounts[idx]
        return balance
      })
    }
  },
  watch: {
    monthDateList: {
      handler() {
        this.isLoading = true
        const promiseList = this.monthDateList.map(monthDate => {
          const year = monthDate.year()
          const month = monthDate.month() + 1
          const api = this.$fire.functions.httpsCallable('dailyPaymentAmounts')
          return api({ paymentType: 'public', year, month }).then(res => {
            return res.data.amounts
          })
        })
        Promise.all(promiseList)
          .then(amountsList => {
            this.compareAmountList = amountsList
          })
          .finally(() => {
            this.isLoading = false
          })
      },
      immediate: true
    }
  }
}
</script>

<style></style>
