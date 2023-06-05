<script setup lang="ts">
import { useState } from 'vuex-composition-helpers'
import { computed, watch } from 'vue'
import { useStore } from '../composition/store'

const store = useStore()

const { 'user/profile/currentUser': currentUser } = useState([
  'user/profile/currentUser',
])
const profile = computed(() => store.state.user.profile.currentUser)
console.log(currentUser)
</script>

<template>
  <div>
    <h1>User</h1>
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
