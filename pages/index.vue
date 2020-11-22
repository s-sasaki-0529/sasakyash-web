<template>
  <div class="container">
    <balance-box
      :publicBalance="publicBalance"
      :privateBalance="privateBalance"
    />
    <daily-public-balance-chart
      :height="300"
      :baseData="publicDailyPaymentAmounts"
    />
    <daily-private-balance-chart
      :height="300"
      :baseData="privateDailyPaymentAmounts"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import balanceBox from '~/components/index/balanceBox.vue'
import DailyPrivateBalanceChart from '~/components/index/dailyPrivateBalanceChart.vue'

export default Vue.extend({
  components: { balanceBox, DailyPrivateBalanceChart },
  async asyncData({ app }) {
    const balance = await app.$fire.functions
      .httpsCallable('balance')()
      .then((res) => res.data)
    const dailyPaymentAmounts = await app.$fire.functions
      .httpsCallable('dailyPaymentAmounts')()
      .then((res) => res.data)
    return {
      privateBalance: balance.private,
      publicBalance: balance.public,
      privateDailyPaymentAmounts: dailyPaymentAmounts.private,
      publicDailyPaymentAmounts: dailyPaymentAmounts.public,
    }
  },
  data: () => ({
    privateBalance: 0,
    publicBalance: 0,
    privateDailyPaymentAmounts: {},
    publicDailyPaymentAmounts: {},
  }),
})
</script>

<style lang="scss"></style>
