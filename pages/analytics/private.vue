<template>
  <div class="columns analytics-private">
    <div class="column left">
      <div class="title is-4">比較</div>
      <div class="box month-checkbox-list">
        <div :key="month" v-for="month in allMonthList">
          <label class="checkbox">
            <input type="checkbox" :value="month" v-model="selectedMonthList" />
            {{ month }}
          </label>
        </div>
      </div>
    </div>
    <div class="column right">
      <daily-private-balance-chart :compareMonthList="selectedMonthList" :height="500" />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import dailyPrivateBalanceChart from '~/components/commons/dailyPrivateBalanceChart.vue'
export default {
  components: { dailyPrivateBalanceChart },
  data: () => ({
    selectedMonthList: []
  }),
  computed: {
    allMonthList() {
      const monthList = []
      const fromDate = dayjs('2018-01-01')
      const toDate = dayjs().startOf('month')
      let iteratorDate = dayjs(fromDate)

      while (iteratorDate.unix() < toDate.unix()) {
        monthList.push(iteratorDate.format('YYYY-MM'))
        iteratorDate = iteratorDate.add(1, 'month')
      }
      return monthList.reverse()
    }
  },
  mounted() {
    this.selectedMonthList = [this.allMonthList[0], this.allMonthList[1]]
  }
}
</script>

<style scoped lang="scss">
.analytics-private {
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
