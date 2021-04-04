<template>
  <section class="section">
    <div class="default-layout">
      <div class="columns">
        <aside class="aside column is-narrow" style="width: 220px">
          <div class="side-menu menu">
            <h1 class="title">sasakyash</h1>

            <ul class="menu-list">
              <li><nuxt-link to="/">ダッシュボード</nuxt-link></li>
              <li><nuxt-link to="/analytics/public">公費詳細</nuxt-link></li>
              <li><nuxt-link to="/analytics/private">私費詳細</nuxt-link></li>
              <li><nuxt-link to="/list/utilitiesBills">水道・光熱費</nuxt-link></li>
              <li><nuxt-link to="/list/haircut">散髪</nuxt-link></li>
              <li><nuxt-link to="/forms/payment">クイック入力</nuxt-link></li>
              <li><nuxt-link to="/forms/subscription">サブスクリプション</nuxt-link></li>
              <li><nuxt-link to="/others/setting">設定</nuxt-link></li>
            </ul>
          </div>
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
