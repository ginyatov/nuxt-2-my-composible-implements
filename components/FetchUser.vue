<script setup lang="ts">
import { useStore } from '../composition/store'
const store = useStore()

const onFetch = function () {
  store.dispatch('user/profile/fetchUser')
}
</script>

<template>
  <div>
    <button @click="onFetch">Fetch User</button>
  </div>
</template>
