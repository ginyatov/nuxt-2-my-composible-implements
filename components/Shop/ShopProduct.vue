<script setup lang="ts">
import { Product } from '~/graphql/generated/graphql'

const props = defineProps<{
  product: Product
}>()

function addToCart() {
  console.log('addToCart', props.product)
}
</script>

<template>
  <div>
    <img
      class="h-auto max-w-full rounded-lg object-cover"
      height="288"
      width="512"
      :src="product.image"
      :alt="product.title"
    />
    <h2>{{ product.title }}</h2>
    <p>{{ product.price }} руб.</p>

    <ui-button @click="addToCart" class="btn">Добавить в корзину</ui-button>
  </div>
</template>
