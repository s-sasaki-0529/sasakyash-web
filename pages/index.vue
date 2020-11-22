<template>
  <div class="index">
    <balance-box :publicBalance="publicBalance" :privateBalance="privateBalance" />
    <div class="columns">
      <div class="column">
        <daily-public-balance-chart :height="500" :baseData="publicDailyPaymentAmounts" />
      </div>
      <div class="column">
        <daily-private-balance-chart :height="500" :baseData="privateDailyPaymentAmounts" />
      </div>
    </div>
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
      .then(res => res.data)
    const privateDailyPaymentAmounts = await app.$fire.functions
      .httpsCallable('dailyPaymentAmounts')({ paymentType: 'private' })
      .then(res => res.data)
    const publicDailyPaymentAmounts = await app.$fire.functions
      .httpsCallable('dailyPaymentAmounts')({ paymentType: 'public' })
      .then(res => res.data)
    return {
      privateBalance: balance.private,
      publicBalance: balance.public,
      privateDailyPaymentAmounts,
      publicDailyPaymentAmounts
    }
  },
  data: () => ({
    privateBalance: 0,
    publicBalance: 0,
    privateDailyPaymentAmounts: {},
    publicDailyPaymentAmounts: {}
  })
})
</script>

<style lang="scss"></style>
