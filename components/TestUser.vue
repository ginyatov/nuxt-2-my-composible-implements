<script setup lang="ts">
import { useState } from 'vuex-composition-helpers'
import { computed, watch } from 'vue'
import { useStore } from '~/composition'

const store = useStore()

function commitCar() {
  store.commit('car/setCar', 'xxxx')
}

function dispatchCar() {
  store.dispatch('car/setCar', 'x')

  setTimeout(() => {
    commitCar()
  }, 1000)
}

const currentCar = computed(() => store.getters['car/getCar'])

const { currentRole, profile22, cart } = store.useMapState({
  currentRole: (state) => state.user.setting.role,
  profile22: (state) => state.user.profile,
  cart: (state) => state.cart.name,
})

const { test } = store.useMapGetters({
  test: 'car/getCar',
})

console.log(22222, cart.value, currentCar.value, test.value)

const ss = currentRole.value

const { 'user/profile/currentUser': currentUser } = useState([
  'user/profile/currentUser',
])
const profile = computed(() => store.state.user.profile.currentUser)
const profile1 = computed(() => store.state.user)
</script>

<template>
  <div>
    <h1>User</h1>

    <h2 class="text-2xl">{{ currentCar }}</h2>
    <h2 class="text-2xl">{{ test }}</h2>
    <ui-button @click="commitCar"> commitCar </ui-button>
    <ui-button @click="dispatchCar"> dispatchCar </ui-button>
    <hr />

    {{ JSON.stringify(currentRole) }}

    |||||||
    {{ JSON.stringify(profile22) }}

    <hr />

    <div v-if="profile1 && profile1.profile.currentUser">
      <p><strong>Id:</strong> {{ profile1.profile.currentUser.id }}</p>
      <p><strong>Name:</strong> {{ profile1.profile.currentUser.name }}</p>
      <p><strong>Email:</strong> {{ profile1.profile.currentUser.email }}</p>
    </div>
    <hr />
    <hr />

    <div v-if="profile">
      <p><strong>Id:</strong> {{ profile.id }}</p>
      <p><strong>Name:</strong> {{ profile.name }}</p>
      <p><strong>Email:</strong> {{ profile.email }}</p>
    </div>
    <hr />

    <div v-if="currentUser">
      <p><strong>Id:</strong> {{ currentUser.id }}</p>
      <p><strong>Name:</strong> {{ currentUser.name }}</p>
      <p><strong>Email:</strong> {{ currentUser.email }}</p>
    </div>
  </div>
</template>
