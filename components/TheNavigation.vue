<script setup lang="ts">
import { useRoute } from '~/composition'

const route = useRoute()

console.log('TheNavigation', route.path)
</script>

<template>
  <div>
    Navigation

    <br />

    current route - <b>{{ route.path }}</b> <br />
    current hash - <b>{{ route.hash }}</b> <br />
    current query - <b>{{ route.query }}</b>

    <hr />

    <nuxt-link to="/profile/setting">Setting</nuxt-link> <br />
    <nuxt-link to="/profile/balance?testQuery=true">Balance</nuxt-link> <br />
  </div>
</template>
