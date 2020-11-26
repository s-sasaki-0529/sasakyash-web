<template>
  <div class="index">
    <balance-box />
    <div class="columns">
      <div class="column">
        <daily-public-balance-chart :height="500" />
      </div>
      <div class="column">
        <daily-private-balance-chart :height="500" :monthDateList="[today]" />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  computed: {
    today() {
      return dayjs()
    }
  }
}
</script>

<style lang="scss"></style>
