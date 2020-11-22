<template>
  <div class="index">
    <balance-box />
    <div class="columns">
      <div class="column">
        <daily-public-balance-chart :height="500" />
      </div>
      <div class="column">
        <daily-private-balance-chart :height="500" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import balanceBox from '~/components/index/balanceBox.vue'
import DailyPrivateBalanceChart from '~/components/index/dailyPrivateBalanceChart.vue'

export default Vue.extend({
  components: { balanceBox, DailyPrivateBalanceChart }
})
</script>

<style lang="scss"></style>
