<template>
  <div class="text-center">
    <div class="headline grey--text text--lighten-1">ERROR</div>
    <div v-if="error.statusCode === 404">
      <div class="display-4 font-weight-bold">404</div>
      <div class="subtitle-1">Halaman tidak ditemukan</div>
    </div>
    <div v-else-if="error.statusCode === 408">
      <div class="display-4 font-weight-bold">408</div>
      <div class="subtitle-1">Request Timeout</div>
    </div>
    <div v-else>
      <div class="display-4 font-weight-bold">500</div>
      <div class="subtitle-1">Terjadi error pada server</div>
    </div>
    <nuxt-link to="/">Kembali</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'err'
}
</script>