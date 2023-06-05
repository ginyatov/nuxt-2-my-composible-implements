<template>
  <div class="container mx-auto">
    <h1 class="text-4xl font-bold mb-4 text-center">Shop</h1>

    <div class="flex items-center justify-center space-x-4">
      <nuxt-link to="/shop/">All Products</nuxt-link> <br />
      <nuxt-link to="/shop/cart">Cart</nuxt-link> <br />
    </div>

    <NuxtChild />
  </div>
</template>
