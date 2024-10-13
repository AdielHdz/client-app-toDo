<script setup>
import { onMounted, ref } from 'vue'
import Button from './Button.vue'
import IconUser from './icons/IconUser.vue'
import Input from './Input.vue'
import IconClose from './icons/IconClose.vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import IconUserProfile from './icons/IconUserProfile.vue'
import IconLogout from './icons/IconLogout.vue'
import { getUserIdSession } from '@/helpers/userSession'

const authStore = useAuthStore()
const { registerUser, login, logout, isAuthenticated, userId } = authStore
const userStore = useUserStore()
const { getProfile } = userStore

onMounted(() => {
  if (authStore.isAuthenticated()) getProfile(userId())
})

const isLoginFormOpen = ref(false)
const userOptionsIsOpen = ref(false)
const authOption = ref('login')
const loginForm = ref({
  email: '',
  password: '',
})

const registerForm = ref({
  name: '',
  email: '',
  password: '',
})

const handlerLoginForm = event => {
  const { name, value } = event.target
  loginForm.value[name] = value
}

const handlerRegisterForm = event => {
  const { name, value } = event.target

  registerForm.value[name] = value
}

const handlerUserRegister = async event => {
  event.preventDefault()
  await registerUser(registerForm.value)
  if (authStore.isAuthenticated()) {
    window.location.href = '/'
  }
}

const handlerLogin = async event => {
  event.preventDefault()
  await login(loginForm.value)
}
</script>

<template>
  <Button
    v-if="!isAuthenticated()"
    @click="isLoginFormOpen = !isLoginFormOpen"
    text="Iniciar sesión"
    :isRose="true"
    :isCompact="true"
  />

  <div v-else class="flex items-center gap-4 relative">
    <IconUserProfile
      @click="userOptionsIsOpen = !userOptionsIsOpen"
      class="w-12 h-12 p-2 border border-white cursor-pointer hover:bg-white duration-200 rounded-full"
    />
    <h2 class="select-none">{{ userStore.profile.name }}</h2>
    <ul
      v-if="userOptionsIsOpen"
      @click="userOptionsIsOpen = !userOptionsIsOpen"
      class="bg-white absolute z-10 animate-opening text-indigo-950 top-16 rounded shadow"
    >
      <li
        class="cursor-pointer select-none hover:bg-indigo-50 flex items-center gap-3"
      >
        <RouterLink to="/profile" class="py-2 px-2 block w-full"
          >Administrar perfil</RouterLink
        >
      </li>
      <li
        @click="logout"
        class="py-2 px-2 cursor-pointer select-none hover:bg-indigo-50 flex items-center gap-3"
      >
        Cerrar sesión <IconLogout class="w-6 h-6" />
      </li>
    </ul>
  </div>

  <div
    v-if="isLoginFormOpen"
    class="fixed top-0 left-0 z-10 animate-opening flex items-center justify-center bg-slate-950 bg-opacity-30 w-full h-dvh"
  >
    <section
      :class="[
        'w-[350px] bg-white text-indigo-950 p-5  rounded',
        {
          'animate-jump': isLoginFormOpen,
        },
      ]"
    >
      <header
        class="flex items-center justify-between gap-3 border-b border-indigo-950 pb-2"
      >
        <div class="flex gap-3 font-semibold">
          <IconUser class="w-8 h-8" />
          <h2 v-if="authOption === 'login'" class="select-none">
            Inicio de sesión
          </h2>
          <h2 v-else class="select-none">Creación de cuenta</h2>
        </div>

        <IconClose
          @click="isLoginFormOpen = false"
          class="w-5 h-5 cursor-pointer"
        />
      </header>
      <form
        v-if="authOption === 'login'"
        @submit="handlerLogin"
        class="mt-5 grid gap-1"
      >
        <Input
          name="email"
          label="Correo electronico"
          type="email"
          :value="loginForm.email"
          @handleChange="handlerLoginForm"
          :existError="false"
          error="Texto informativo para agregar errores"
        />
        <Input
          name="password"
          label="Contraseña"
          type="password"
          :value="loginForm.password"
          @handleChange="handlerLoginForm"
          :existError="false"
          error="Texto informativo para agregar errores"
        />

        <p class="text-sm text-red-400">{{ authStore.errorMessage }}</p>

        <Button
          :isRose="true"
          text="Iniciar sesión"
          :isCompact="false"
          :isLoading="authStore.isFetching"
        />
      </form>
      <form
        v-else="authOption === 'login'"
        @submit="
          event => {
            event.preventDefault()
          }
        "
        class="mt-5 grid gap-1"
      >
        <Input
          name="name"
          label="Nombre completo"
          type="text"
          :value="registerForm.name"
          @handleChange="handlerRegisterForm"
          :existError="false"
          error="Texto informativo para agregar errores"
        />
        <Input
          name="email"
          label="Correo electronico"
          type="email"
          :value="registerForm.email"
          @handleChange="handlerRegisterForm"
          :existError="false"
          error="Texto informativo para agregar errores"
        />
        <Input
          name="password"
          label="Contraseña"
          type="password"
          :value="registerForm.password"
          @handleChange="handlerRegisterForm"
          :existError="false"
          error="Texto informativo para agregar errores"
        />

        <Button
          @click="handlerUserRegister"
          :isRose="true"
          text="Crear cuenta"
          :isCompact="false"
          :isLoading="authStore.isFetching"
        />
      </form>
      <div class="flex justify-center pt-3">
        <a
          v-if="authOption === 'login'"
          href="#"
          class="underline text-sm text-indigo-400 select-none cursor-pointer"
          @click="authOption = 'register'"
          >Registrarse</a
        >
        <a
          v-else
          href="#"
          @click="authOption = 'login'"
          class="underline text-sm text-indigo-400 select-none cursor-pointer"
          >Iniciar sesión</a
        >
      </div>
    </section>
  </div>
</template>
