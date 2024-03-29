<template>
  <div>
    <LineChart :title="title" :labels="days" :data-sets="dataSets" />
  </div>
</template>

<script>
import LineChart from '@/components/atoms/LineChart'
import dayjs from 'dayjs'
import palette from 'google-palette'
import { fetchDailyPaymentAmount } from '@/commons/http'
import { PRIVATE_BUDGET, PUBLIC_BUDGET } from '~/commons/constants'

export default {
  components: { LineChart },
  props: {
    title: {
      type: String,
      required: true
    },
    paymentType: {
      type: String,
      required: true,
      validator(v) {
        return ['private', 'public'].includes(v)
      }
    },
    monthDateList: {
      type: Array, // dayjs[]
      required: false,
      default: () => []
    }
  },
  data: () => ({
    isLoading: true,
    days: [...new Array(31)].map((_, i) => i + 1),
    compareAmountList: []
  }),
  computed: {
    budget() {
      return this.paymentType === 'private' ? PRIVATE_BUDGET : PUBLIC_BUDGET
    },
    burndownValues() {
      const dailyBudget = this.budget / this.days.length
      let balance = this.budget
      return this.days.map(_ => {
        balance -= dailyBudget
        return balance
      })
    },
    dataSets() {
      if (this.isLoading || this.monthDateList.length !== this.compareAmountList.length) return []
      return [...this.createDataSets()]
    },
    colors() {
      return [...palette('cb-Dark2', 8), ...palette('mpn65', this.compareAmountList.length)]
    }
  },
  watch: {
    monthDateList: {
      handler() {
        this.isLoading = true
        const promiseList = this.monthDateList.map(monthDate => {
          const year = monthDate.year()
          const month = monthDate.month() + 1
          return fetchDailyPaymentAmount(this.paymentType, year, month)
        })
        Promise.all(promiseList)
          .then(amountsList => {
            this.compareAmountList = amountsList.map(al => al.amounts)
          })
          .finally(() => {
            this.isLoading = false
          })
      },
      immediate: true
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
        borderColor: this.paymentType === 'private' ? 'rgba(70,157,90,0.5)' : 'rgba(239,39,91,0.5)',
        backgroundColor: this.paymentType === 'private' ? 'rgba(70,157,90,0.1)' : 'rgba(239,39,91,0.1)',
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
      let balance = this.budget
      return this.days.map((_, idx) => {
        balance -= amounts[idx]
        return balance
      })
    }
  }
}
</script>

<style></style>
