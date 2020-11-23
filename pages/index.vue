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

<script>
export default {}
</script>

<style lang="scss"></style>
