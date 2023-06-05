<script setup lang="ts">
import { computed, watch } from 'vue'
import { useGetters, useRoute, useRouter } from '~/composition'

const getters = useGetters()

console.log(getters['user/profile/currentUser'])

const route = useRoute()
const router = useRouter()

watch(
  () => route.path,
  (newVal, oldVal) => {
    console.log('route changed', newVal, oldVal)
  }
)
const isBalance = computed(() => route.path === '/profile/balance')
const currentPath = computed(() => route.path)
function checkRoute() {
  console.log('checkRoute', route.path, isBalance.value)
}

function test() {
  router.push('/profile/balance')
  console.log(2)
}

function goToBalance() {
  console.log(1)
  test()
  console.log(3)
}
</script>

<template>
  <div>
    <TheNavigation />

    {{ route.path }}

    <hr />
    <button @click="checkRoute">check route</button> <br />
    <button @click="goToBalance">Go to balance to manual</button> <br />

    <hr />
    <div>
      Profile page

      <hr />
    </div>

    <NuxtChild />
  </div>
</template>
