<template>
  <div class="container">
    <balance-box
      :publicBalance="currentMonthPublicBalance"
      :privateBalance="currentMonthPrivateBalance"
    />
    <div class="columns">
      <div class="column">
        <line-chart :height="500" />
      </div>
      <div class="column">
        <line-chart :height="500" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import balanceBox from '~/components/index/balanceBox.vue'
import LineChart from '~/components/index/lineChart.vue'

export default Vue.extend({
  components: { balanceBox, LineChart },
  async asyncData({ app }) {
    const balance = await app.$fire.functions
      .httpsCallable('balance')()
      .then((res) => res.data)
    return {
      currentMonthPrivateBalance: balance.private,
      currentMonthPublicBalance: balance.public,
    }
  },
  data: () => ({
    currentMonthPrivateBalance: 0,
    currentMonthPublicBalance: 0,
  }),
})
</script>

<style lang="scss"></style>
