<template>
  <div class="index">
    <BalanceBox />
    <div class="columns">
      <div class="column">
        <DailyBalanceChart
          title="[公費] 今月の支出状況"
          payment-type="public"
          :month-date-list="[today]"
          :height="500"
        />
      </div>
      <div class="column">
        <DailyBalanceChart
          title="[私費] 今月の支出状況"
          payment-type="private"
          :month-date-list="[today]"
          :height="500"
        />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import BalanceBox from '~/components/organisms/BalanceBox'
import DailyBalanceChart from '~/components/organisms/DailyBalanceChart'
export default {
  components: { BalanceBox, DailyBalanceChart },
  computed: {
    today() {
      return dayjs()
    }
  }
}
</script>

<style lang="scss"></style>
