<script setup lang="ts">
import { computed } from 'vue'
import { useApollo } from '~/composition'
import {
  GetTodosDocument,
  GetTodosQuery,
  GetTodosQueryVariables,
} from '~/graphql/generated/graphql'

const apollo = useApollo()
const {
  result: todos,
  loading,
  load,
} = apollo.useLazyQuery<GetTodosQuery, GetTodosQueryVariables>(
  GetTodosDocument,
  {
    limit: 5,
  }
)

const reversedTodos = computed(() => {
  if (!todos.value?.todos) return []

  return [...todos.value?.todos].reverse()
})

function loadTodos() {
  load({
    limit: 1,
  })
}
</script>

<template>
  <div class="container mx-auto py-8">
    <h2 class="text-3xl font-bold mb-4">Todo List</h2>

    <ui-button @click="loadTodos" class="bg-amber-200"> load todos </ui-button>

    {{ loading ? 'loading...' : 'No loading' }}

    <ul class="grid gap-5">
      <li v-if="loading">
        <ui-skeleton class="w-full py-4 px-6 border-b shadow" />
      </li>
      <template v-else-if="reversedTodos.length">
        <todos-item v-for="todo in reversedTodos" :key="todo.id" :todo="todo" />
      </template>
      <li v-else class="flex bg-white items-center py-4 px-6 border-b shadow">
        <span class="flex-1 text-center">No todos found</span>
      </li>
    </ul>
  </div>
</template>
