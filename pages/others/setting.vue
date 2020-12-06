<template>
  <div class="others-setting">
    <button @click="requestClearCache" class="button is-danger is-light">キャッシュを破棄する</button>
  </div>
</template>

<script>
export default {
  methods: {
    requestClearCache() {
      if (this.$nuxt.$loading.get() > 0) return

      this.$nuxt.$loading.start()
      this.$fire.functions
        .httpsCallable('clearCache')()
        .finally(() => {
          this.$nuxt.$loading.finish()
        })
    }
  }
}
</script>

<style lang="scss"></style>
