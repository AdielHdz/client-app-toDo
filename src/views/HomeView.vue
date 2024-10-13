<script setup>
import Button from '@/components/Button.vue'
import IconClose from '@/components/icons/IconClose.vue'
import IconPlusTask from '@/components/icons/IconPlusTask.vue'
import Input from '@/components/Input.vue'
import Task from '@/components/Task.vue'
import { useAuthStore } from '@/stores/auth'
import { useTaskStore } from '@/stores/task'
import { onMounted, ref } from 'vue'

const taskStore = useTaskStore()
const { registerTask, getUserTasks } = taskStore
const authStore = useAuthStore()
const { userId, isAuthenticated } = authStore
const taskFormIsOpen = ref(false)
const newTask = ref({
  title: '',
  description: '',
  status: 'pending',
  createdAt: '',
  expirationDate: '',
})

onMounted(() => {
  if (isAuthenticated()) getUserTasks(userId())
})

const handlerNewTaskForm = event => {
  const { name, value } = event.target

  console.log(name, value)
  newTask.value[name] = value
  console.log(newTask.value)
}

const handlerRegisterTask = async () => {
  const date = new Date()
  const today = date.getDate()
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  const currentDate = `${year}-${month}-${today}`
  newTask.value.createdAt = currentDate
  newTask.value.user_id = userId()
  await registerTask(newTask.value)
  await getUserTasks(userId())

  console.log(taskStore.taskIsCreated)
  if (taskStore.taskIsCreated) {
    newTask.value.title = ''
    newTask.value.description = ''
    newTask.value.status = 'pending'
    newTask.value.createdAt = ''
    newTask.value.expirationDate = ''
    taskFormIsOpen.value = false
  }
}
</script>

<template>
  <main class="text-indigo-950 max-w-desktop w-full mx-auto px-5">
    <p
      v-if="!isAuthenticated()"
      class="text-xl mt-20 font-semibold text-center"
    >
      Inicia sesión o registrate para organizar tus tareas
    </p>
    <div v-else class="flex w-full mt-2 relative">
      <div class="w-full flex justify-between">
        <h1 class="text-2xl font-medium text-center">Tareas</h1>
        <button
          @click="taskFormIsOpen = !taskFormIsOpen"
          class="w-10 h-10 border rounded shadow bg-gray-700 flex items-center justify-center hover:scale-105 duration-200"
        >
          <IconPlusTask class="w-9 h-9" />
        </button>
      </div>

      <section
        v-if="taskFormIsOpen"
        class="shadow w-[400px] top-14 right-0 absolute animate-opening p-5 z-10 bg-white"
      >
        <div
          class="border-b border-indigo-950 pb-1 flex items-center justify-between"
        >
          <h5 class="text-lg font-semibold">Nueva tarea</h5>
          <IconClose
            @click="taskFormIsOpen = false"
            class="w-5 h-5 cursor-pointer"
          />
        </div>

        <form class="grid gap-2 mt-2" @submit.prevent="handlerRegisterTask">
          <Input
            name="title"
            type="text"
            :existError="false"
            label="Title"
            error=""
            :value="newTask.title"
            @handleChange="handlerNewTaskForm"
          />
          <div>
            <label for="description" class="select-none font-semibold"
              >Descripcion</label
            >
            <textarea
              id="description"
              name="description"
              class="w-full h-[46px] px-2 outline-rose-700 border rounded"
              @input="handlerNewTaskForm"
              :value="newTask.description"
            />
          </div>
          <div>
            <label for="status" class="select-none font-semibold"
              >Estatus</label
            >
            <select
              id="status"
              name="status"
              class="w-full h-[46px] px-2 outline-rose-700 border rounded"
              @change="handlerNewTaskForm"
              :value="newTask.status"
            >
              <option value="pending">pending</option>
              <option value="in progress">in progress</option>
              <option value="completed">completed</option>
            </select>
          </div>
          <div>
            <label for="expirationDate" class="select-none font-semibold"
              >Fecha limite</label
            >
            <input
              id="expirationDate"
              :value="newTask.expirationDate"
              name="expirationDate"
              type="date"
              class="w-full h-[46px] outline-rose-700 border rounded px-2"
              @change="handlerNewTaskForm"
            />
          </div>
          <div class="flex items-center justify-between">
            <Button
              text="Agregar"
              :isRose="true"
              :isCompact="false"
              :isLoading="taskStore.isFetching"
            />
          </div>
        </form>
      </section>
    </div>
    <section class="mt-2 grid gap-3">
      <Task
        v-for="(task, index) in taskStore.tasks"
        :key="index"
        :id="task.id"
        :title="task.title"
        :description="task.description"
        :status="task.status"
        :createdAt="task.created_at"
        :expirationDate="task.expiration_date"
      />
    </section>
  </main>
</template>
