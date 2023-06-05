<script setup lang="ts">
import { useApollo } from '~/composition'
import {
  GetProductsDocument,
  GetProductsQuery,
  GetProductsQueryVariables,
} from '~/graphql/generated/graphql'

const apollo = useApollo()

const { loading, result } = apollo.useQuery<
  GetProductsQuery,
  GetProductsQueryVariables
>(GetProductsDocument)
</script>

<template>
  <div class="mt-6">
    <div v-if="loading">Loading...</div>
    <div v-else-if="result && result.products" class="grid grid-cols-3 gap-4">
      <shop-product
        v-for="product in result.products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
