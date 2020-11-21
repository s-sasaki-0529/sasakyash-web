<template>
  <div class="container">{{ message }}</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ app }) {
    const helloWorld = app.$fire.functions.httpsCallable('helloWorld')
    const message = await helloWorld().then((res) => {
      return res.data.message
    })
    return { message }
  },
  data: () => ({
    message: '',
  }),
})
</script>

<style></style>
