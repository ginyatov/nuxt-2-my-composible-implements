<script setup lang="ts">
import gql from 'graphql-tag'
import { useApollo } from '~/composition'

const apollo = useApollo()

const { result, loading } = apollo.useQuery(
  gql`
    query GetBooks {
      books {
        id
        title
      }
    }
  `
)

const { result: result1, loading: loading1 } = apollo.useQuery(
  gql`
    query GetProducts {
      products {
        id
        price
        title
      }
    }
  `
)

const {
  result: result2,
  loading: loading2,
  load,
  refetch,
} = apollo.useLazyQuery(
  gql`
    query GetBooksAuthor {
      books {
        id
        author
      }
    }
  `
)

function loadLazy() {
  load()
}
</script>

<template>
  <div>
    Test Apollo

    <button @click="loadLazy">Load lazy query</button>

    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="book in result.books" :key="book.id">
        <p>{{ book.title }}</p>
      </div>
    </div>
    <hr />
    <div v-if="loading2">Loading...</div>
    <div v-else-if="result2">
      <div v-for="book in result2.books" :key="book.id">
        <p>{{ book.author }}</p>
      </div>
    </div>
    <hr />
    <div v-if="loading1">Loading...</div>
    <div v-else>
      <div v-for="product in result1.products" :key="product.id">
        <p>{{ product.title }}</p>
        <p>{{ product.price }}</p>
      </div>
    </div>
  </div>
</template>
