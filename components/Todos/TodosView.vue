<script setup lang="ts">
import { ref } from 'vue'

const isOptions = ref(false)
</script>

<template>
  <div class="container mx-auto my-2 max-w-2xl">
    <ui-button @click="isOptions = !isOptions">Toggle Options</ui-button> <br />
    <TodosCreate />
    <todos-list v-if="!isOptions" />
    <todos-list-option v-else />
  </div>
</template>
