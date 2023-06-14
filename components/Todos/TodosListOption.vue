<script>
import {
  GetTodosDocument,
  GetTodosQuery,
  GetTodosQueryVariables,
} from '~/graphql/generated/graphql'

export default {
  apollo: {
    todos: {
      query: GetTodosDocument,
      skip: true,
      variables() {
        return {
          limit: 5,
        }
      },
    },
  },
  methods: {
    loadTodos() {
      this.$apollo.queries.todos.start()
    },
  },
  computed: {
    reversedTodos() {
      if (!this.todos) return []

      return [...this.todos].reverse()
    },
  },

  created() {
    const b = this.$apollo.addSmartQuery('test', {
      query: GetTodosDocument,
      update(data) {
        return data.todos
      },
    })

    console.log(b.loading, this.$apollo)
  },

  mounted() {
    console.log(this.test)
  },
}
</script>

<template>
  <div class="container mx-auto py-8">
    <h2 class="text-3xl font-bold mb-4">Todo List Options</h2>

    <ui-button @click="loadTodos" class="bg-amber-200"> load todos </ui-button>

    {{ $apollo.queries.todos.loading ? 'loading...' : 'No loading' }}

    <ul class="grid gap-5">
      <li v-if="$apollo.queries.todos.loading">
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
