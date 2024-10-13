<template>
  <button
    :class="[
      'text-lg font-semibold px-4 py-1 flex items-center justify-center border-2 rounded shadow  duration-150',
      {
        'bg-pink-600 hover:bg-pink-700 text-white border-pink-700': isRose,
        'bg-yellow-600 hover:bg-yellow-700 text-white border-yellow-700':
          !isRose,
        'w-max': isCompact,
        'w-full': !isCompact,
      },
    ]"
  >
    <div
      v-if="isLoading"
      class="w-7 h-7 rounded-full animate-spin border-4 border-r-transparent border-white"
    ></div>
    <span v-else>{{ text }}</span>
  </button>
</template>

<script setup>
defineProps({
  text: String,
  isRose: Boolean,
  isCompact: Boolean,
  isLoading: {
    default: false,
  },
})
</script>
