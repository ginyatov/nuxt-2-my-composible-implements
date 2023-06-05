<script setup>
import { useRoute, useRouter } from '~/composition'

const route = useRoute()
const router = useRouter()

console.log(111, route.path)
</script>

<template>
  <div>
    <nuxt-link to="/">Glavnya </nuxt-link>
    <nuxt-link to="/todos">Todos </nuxt-link>
    <nuxt-link to="/about">About </nuxt-link>
    <nuxt-link to="/profile">Profile </nuxt-link>
    <nuxt-link to="/shop">Shop </nuxt-link>

    <br />

    <button @click="router.push('/about')">Manual link</button>
    <br />
    {{ route.path }}
    <nuxt />
  </div>
</template>
