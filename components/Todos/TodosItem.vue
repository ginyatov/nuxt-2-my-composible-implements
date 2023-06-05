<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { useApollo } from '~/composition'
import {
  Todo,
  DeleteTodoMutation,
  DeleteTodoMutationVariables,
  DeleteTodoDocument,
  GetTodosDocument,
  GetTodosQuery,
  GetTodosQueryVariables,
  UpdateTodoDocument,
  UpdateTodoMutationVariables,
  UpdateTodoMutation,
} from '~/graphql/generated/graphql'

const apollo = useApollo()
const props = defineProps<{
  todo: Todo
}>()

const localTodo = ref<Todo>({
  ...props.todo,
})

const { mutate: onDelete, loading: isLoadingDelete } = apollo.useMutation<
  DeleteTodoMutation,
  DeleteTodoMutationVariables
>(DeleteTodoDocument, {
  update(cache, { data }) {
    if (!data?.deleteTodo) return

    const { todos } = cache.readQuery<GetTodosQuery, GetTodosQueryVariables>({
      query: GetTodosDocument,
    })!

    cache.writeQuery<GetTodosQuery, GetTodosQueryVariables>({
      query: GetTodosDocument,
      data: {
        todos: todos.filter((todo) => todo.id !== data.deleteTodo?.id),
      },
    })
  },
})

const isEdit = ref<boolean>()
const inputTitle = ref<HTMLInputElement>()
watch(isEdit, (isEdit) => {
  if (isEdit) {
    nextTick(() => {
      inputTitle.value?.focus()
    })
  }
})

const { mutate: onUpdate, loading: isLoadingUpdate } = apollo.useMutation<
  UpdateTodoMutation,
  UpdateTodoMutationVariables
>(UpdateTodoDocument)
async function handleEdit() {
  if (localTodo.value.title === props.todo.title) {
    isEdit.value = false
    return
  }

  await onUpdate({
    input: {
      id: props.todo.id,
      title: localTodo.value.title,
    },
  })

  isEdit.value = false
}

function handleCheckbox() {
  onUpdate({
    input: {
      id: props.todo.id,
      completed: !localTodo.value.completed,
    },
  })
}
</script>

<template>
  <li class="flex bg-white items-center py-4 px-6 border-b shadow">
    <label class="flex cursor-pointer items-center w-full">
      <input
        v-model="localTodo.completed"
        type="checkbox"
        class="mr-2"
        @click="handleCheckbox"
      />
      <span>
        <span v-if="isEdit" class="flex-1">
          <input ref="inputTitle" v-model="localTodo.title" class="w-full" />
        </span>
        <span v-else class="flex-1">{{ localTodo.title }}</span> <br />
        <span class="text-gray-500">{{ localTodo.author }}</span>
      </span>
    </label>
    <button
      v-if="isEdit"
      :disabled="isLoadingUpdate"
      class="text-blue-400"
      @click="handleEdit"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-4 h-4"
      >
        <path
          d="M5 13.5l4 4L19.5 8"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <!-- <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-4 h-4"
      >
        <path
          d="M19.354 5.354a2 2 0 0 0-2.828 0L12 9.172 7.475 4.646a2 2 0 1 0-2.828 2.828L9.172 12l-4.647 4.475a2 2 0 1 0 2.828 2.828L12 14.828l4.475 4.646a2 2 0 0 0 2.828-2.828L14.828 12l4.646-4.475a2 2 0 0 0 0-2.828z"
        />
      </svg> -->
    </button>

    <button v-else class="ml-2 text-blue-600" @click="isEdit = true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-4 h-4"
      >
        <path
          fill-rule="evenodd"
          d="M4.879 15.536l-1.415-1.415a1 1 0 010-1.414L12.457 2.929a2 2 0 012.828 0l1.415 1.415a2 2 0 010 2.828L7.707 15.536a1 1 0 01-1.414 0zM15.535 4.879l-1.415-1.415L13.172 4.95l1.415 1.415 1.414-1.415zM5.364 14.122L14.12 5.364l.707.707L6.07 14.828l-.707-.707z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <button
      :disabled="isLoadingDelete"
      class="ml-2 text-red-600"
      @click="
        onDelete({
          id: todo.id,
        })
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-4 h-4"
      >
        <path
          fill-rule="evenodd"
          d="M2.293 17.707a1 1 0 010-1.414l8-8a1 1 0 011.414 1.414l-8 8a1 1 0 01-1.414 0zM11 18a1 1 0 100-2 1 1 0 000 2zM17 5a1 1 0 110-2h-3.586l-1-1H7.586l-1 1H3a1 1 0 110-2h1.414l1-1H6a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V6a1 1 0 11-2 0v10a1 1 0 01-1 1H6a1 1 0 01-1-1V5h12z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </li>
</template>
