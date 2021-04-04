<template>
  <div class="balance-box box">
    <div class="today-label title is-3">{{ formattedDate }}</div>
    <div class="budget-info">
      <div class="tag is-danger is-medium">公費残額</div>
      <div class="yen">{{ publicBalance }}円</div>

      <div class="tag is-success is-medium">私費残額</div>
      <div class="yen">{{ privateBalance }}円</div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { fetchMonthTotalPaymentAmount } from '@/commons/http'
import { PRIVATE_BUDGET, PUBLIC_BUDGET } from '@/commons/constants'

export default {
  async fetch() {
    const monthTotalPaymentAmount = await fetchMonthTotalPaymentAmount(this.$fire.functions)
    this.privateBalance = PRIVATE_BUDGET - monthTotalPaymentAmount.private
    this.publicBalance = PUBLIC_BUDGET - monthTotalPaymentAmount.public
  },
  data: () => ({
    privateBalance: 0,
    publicBalance: 0
  }),
  computed: {
    formattedDate() {
      return dayjs().format('YYYY年MM月DD日')
    }
  }
}
</script>

<style lang="scss">
.box {
  box-shadow: none;
  border: 1px solid #ddd;
  .budget-info {
    display: flex;
    align-items: center;
    div {
      padding-left: 5px;
      padding-right: 5px;
      &.yen {
        font-size: 1.5em;
      }
    }
  }
}
</style>
