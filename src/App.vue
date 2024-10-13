<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="min-h-dvh grid grid-rows-[auto_1fr]">
    <header>
      <NavBar />
    </header>
    <RouterView />
  </div>
</template>

<style scoped></style>
