<template>
  <div>
    <daily-public-balance-chart />
    <div class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">aaaa</section>
        <footer class="modal-card-foot">
          <button class="button is-success">Save changes</button>
          <button class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import dailyPublicBalanceChart from '~/components/commons/dailyPublicBalanceChart.vue'
export default {
  components: { dailyPublicBalanceChart }
}
</script>

<style lang="scss"></style>
