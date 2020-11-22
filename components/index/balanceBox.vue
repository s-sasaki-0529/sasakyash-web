<template>
  <div class="balance-box box">
    <div class="today-label title is-4">{{ formattedDate }}</div>
    <div class="budget-info">
      <div class="public">
        <span>公費 残り</span>
        <span>{{ publicBalance }}</span>
        <span>円</span>
      </div>
      <div class="public">
        <span>私費 残り</span>
        <span>{{ privateBalance }}</span>
        <span>円</span>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  async fetch() {
    const api = this.$fire.functions.httpsCallable('balance')
    const apiResponse = await api().then(res => res.data)
    this.privateBalance = apiResponse.private
    this.publicBalance = apiResponse.public
  },
  data: () => ({
    privateBalance: 0,
    publicBalance: 0
  }),
  computed: {
    formattedDate() {
      return dayjs().format('YYYY年MM月DD日')
    },
    privateBudget() {
      return Number(process.env.privateBudget)
    },
    publicBudget() {
      return Number(process.env.publicBudget)
    }
  }
}
</script>

<style lang="scss">
.box {
  box-shadow: none;
  border: 1px solid #ddd;
}
</style>
