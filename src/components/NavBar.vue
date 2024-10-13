<script setup>
import { RouterLink } from 'vue-router'
import AuthForm from './AuthForm.vue'
import Logo from './icons/Logo.vue'
</script>

<template>
  <nav
    class="bg-indigo-950 text-white text-lg flex items-center py-2 justify-center px-10"
  >
    <div class="max-w-desktop flex items-center justify-between w-full">
      <RouterLink to="/" class="flex items-center gap-3">
        <Logo class="w-14 h-14" />
        <h1 class="font-bold select-none text-2xl">ToDo</h1></RouterLink
      >

      <AuthForm />
    </div>
  </nav>
</template>
