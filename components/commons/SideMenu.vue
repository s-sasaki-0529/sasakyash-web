<template>
  <div class="side-menu menu">
    <h1 class="title">sasakyash</h1>

    <ul class="menu-list">
      <li><nuxt-link to="/">ダッシュボード</nuxt-link></li>
    </ul>

    <p class="menu-label">分析</p>
    <ul class="menu-list">
      <li><nuxt-link to="/analytics/public">公費詳細</nuxt-link></li>
      <li><nuxt-link to="/analytics/private">私費詳細</nuxt-link></li>
    </ul>

    <p class="menu-label">一覧</p>
    <ul class="menu-list">
      <li><nuxt-link to="/list/utilitiesExpense">水道・光熱費</nuxt-link></li>
      <li><nuxt-link to="/list/haircut">散髪</nuxt-link></li>
    </ul>

    <p class="menu-label">入力補助</p>
    <ul class="menu-list">
      <li><nuxt-link to="/forms/payment">クイック入力</nuxt-link></li>
      <li><nuxt-link to="/forms/subscription">サブスクリプション</nuxt-link></li>
    </ul>

    <p class="menu-label">その他</p>
    <ul class="menu-list">
      <li><nuxt-link to="/others/setting">設定</nuxt-link></li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
