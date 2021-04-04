<template>
  <div class="list-utilities-bills">
    <div class="table-container">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>年月</th>
            <th>電気</th>
            <th>ガス</th>
            <th>水道</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="date in Object.keys(bills)" :key="date">
            <td>{{ date }}</td>
            <td>{{ bills[date].electric || '-' }}</td>
            <td>{{ bills[date].gas || '-' }}</td>
            <td>{{ bills[date].water || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    bills: {}
  }),
  mounted() {
    const api = this.$fire.functions.httpsCallable('utilityBills')
    return api().then(res => {
      this.bills = res.data
    })
  }
}
</script>

<style lang="scss"></style>
