<template>
  <section class="section">
    <div class="default-layout">
      <div class="columns">
        <aside class="aside column is-narrow" style="width: 220px">
          <side-menu />
        </aside>
        <main class="main column">
          <Nuxt />
        </main>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
body {
  height: 100vh;
  background-color: #f8f9fa;
  .column {
    margin: 5px;
    border: 1px solid #d9d9d9;

    &.aside {
      height: auto;
      padding: 15px;
      background-color: white;
    }
    &.main {
      background-color: white;
    }
  }
}
</style>
