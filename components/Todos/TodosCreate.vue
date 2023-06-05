<script setup lang="ts">
import { ref } from 'vue'
import { useApollo } from '../../composition/apollo'
import {
  GetTodosQuery,
  AddTodoDocument,
  GetTodosDocument,
  AddTodoMutation,
  AddTodoMutationVariables,
  GetTodosQueryVariables,
} from '../../graphql/generated/graphql'

const apollo = useApollo()

const { refetch } = apollo.useLazyQuery<GetTodosQuery, GetTodosQueryVariables>(
  GetTodosDocument
)
const { mutate: addTodo, loading } = apollo.useMutation<
  AddTodoMutation,
  AddTodoMutationVariables
>(AddTodoDocument, {
  /*  refetchQueries: [
    {
      query: GetTodosDocument,
    },
  ], */
  update(cache, { data }) {
    // refetch()

    const todos = cache.readQuery<GetTodosQuery>({
      query: GetTodosDocument,
    })

    if (todos?.todos && data?.addTodo) {
      cache.writeQuery({
        query: GetTodosDocument,
        data: {
          todos: [...todos.todos, data.addTodo],
        },
      })
    }
  },
})

const title = ref('')

function onAddTodo(event: Event) {
  event.preventDefault()
  if (!title.value) return

  addTodo({
    input: {
      title: title.value,
      author: 'xxx',
    },
  }).then(() => {
    title.value = ''
  })
}
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold mb-4">Create Todo</h2>
    <form @submit="onAddTodo">
      <div class="flex mb-4">
        <select
          class="border max-w-[150px] border-gray-300 rounded-lg max-w- p-2 mr-2"
        >
          <option value="">Select Author</option>
          <option value="option1">dasdsads aasd sad as</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        <input
          v-model="title"
          type="text"
          class="rounded-l-lg p-4 flex-1 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
          placeholder="Add a task"
        />
        <button
          :disabled="loading"
          class="px-8 rounded-r-lg bg-green-500 text-white font-bold p-4 uppercase border-green-600 border-t border-b border-r"
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  </div>
</template>
