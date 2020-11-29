<template>
  <daily-balance-chart-board title="[公費] 今月の残額遷移" paymentType="public" />
</template>

<script>
import dailyBalanceChartBoard from '~/components/commons/dailyBalanceChartBoard'
export default {
  components: { dailyBalanceChartBoard }
}
</script>
