<template>
  <div class="index">
    <balance-box />
    <div class="columns">
      <div class="column">
        <daily-balance-chart
          title="[公費] 今月の支出状況"
          payment-type="public"
          :month-date-list="[today]"
          :height="500"
        />
      </div>
      <div class="column">
        <daily-balance-chart
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
import balanceBox from '~/components/organisms/balanceBox'
import dailyBalanceChart from '~/components/organisms/dailyBalanceChart'
export default {
  components: { balanceBox, dailyBalanceChart },
  computed: {
    today() {
      return dayjs()
    }
  }
}
</script>

<style lang="scss"></style>
