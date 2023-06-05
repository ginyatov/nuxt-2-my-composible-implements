<template>
  <div class="ui-skeleton h-4 w-32"></div>
</template>

<style>
.ui-skeleton {
  animation: skeleton-loading 2s ease-in-out infinite;
}

@keyframes skeleton-loading {
  0% {
    background-color: #a0aec0;
  }

  50% {
    background-color: #cbd5e0;
  }

  100% {
    background-color: #a0aec0;
  }
}
</style>
