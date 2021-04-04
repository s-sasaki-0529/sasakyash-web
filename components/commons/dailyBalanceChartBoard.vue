<template>
  <div class="columns daily-balance-chart-board">
    <div class="column left">
      <div class="title is-4">比較</div>
      <div class="box month-checkbox-list">
        <div v-for="month in allMonthDateList" :key="month.unix()">
          <label class="checkbox">
            <input v-model="selectedMonthDateList" type="checkbox" :value="month" />
            {{ month.format('YYYY-MM') }}
          </label>
        </div>
      </div>
    </div>
    <div class="column right">
      <daily-balance-chart
        :title="title"
        :payment-type="paymentType"
        :month-date-list="[today, ...selectedMonthDateList]"
        :height="500"
      />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import DailyBalanceChart from '~/components/commons/dailyBalanceChart.vue'
export default {
  components: { DailyBalanceChart },
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
    }
  },
  data: () => ({
    selectedMonthDateList: []
  }),
  computed: {
    today() {
      return dayjs()
    },
    allMonthDateList() {
      const monthList = []
      const fromDate = dayjs('2018-01-01')
      const toDate = dayjs().startOf('month')
      let iteratorDate = dayjs(fromDate)

      while (iteratorDate.unix() < toDate.unix()) {
        monthList.push(dayjs(iteratorDate))
        iteratorDate = iteratorDate.add(1, 'month')
      }
      return monthList.reverse()
    }
  },
  mounted() {
    this.selectedMonthDateList = [this.allMonthDateList[0], this.allMonthDateList[1]]
  }
}
</script>

<style scoped lang="scss">
.daily-balance-chart-board {
  align-items: center;

  .column.left {
    max-width: 200px;
    .month-checkbox-list {
      width: auto;
      max-height: 350px;
      overflow: scroll;
    }
  }
}
</style>
