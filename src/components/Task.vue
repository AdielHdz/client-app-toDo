<script setup>
import { getUserIdSession } from '@/helpers/userSession'
import { useTaskStore } from '@/stores/task'
import { ref } from 'vue'
import IconTrash from './icons/IconTrash.vue'
import IconDots from './icons/IconDots.vue'
import { RouterLink } from 'vue-router'

const taskStore = useTaskStore()
const { updateTask, getUserTasks, isFetching, deleteTask } = taskStore
const optionsIsOpen = ref(false)
const props = defineProps({
  id: Number,
  title: String,
  description: String,
  status: String,
  createdAt: String,
  expirationDate: String,
})

const taskEdit = ref({
  title: props.title,
  description: props.description,
  status: props.status,
  createdAt: props.createdAt,
  expirationDate: props.expirationDate,
})

const taskEditIsActive = ref({
  status: false,
})

const handlerEditTask = event => {
  const { name, value } = event.target

  taskEdit.value[name] = value
}

const handlerUpdateTask = async () => {
  taskEdit.value.id = props.id.toString()
  await updateTask(taskEdit.value)
  await getUserTasks(getUserIdSession())
}

const handlerDeleteTask = async () => {
  await deleteTask(props.id)
  await getUserTasks(getUserIdSession())
  optionsIsOpen.value = false
}
</script>
<template>
  <div>
    <div class="flex justify-end relative">
      <IconDots
        class="w-5 h-5 bg-white cursor-pointer"
        @click="optionsIsOpen = !optionsIsOpen"
      />
      <ul
        v-if="optionsIsOpen"
        class="absolute bg-white top-8 rounded z-10 shadow right-0 animate-opening"
      >
        <li>
          <RouterLink
            :to="{
              name: 'task-edit',
              params: {
                id,
              },
            }"
            class="py-1 px-2 cursor-pointer flex items-center gap-1 hover:bg-indigo-50"
            >Editar</RouterLink
          >
        </li>
        <li
          @click="handlerDeleteTask"
          class="text-red-500 py-1 px-2 cursor-pointer flex items-center gap-1 hover:bg-indigo-50"
        >
          Eliminar <IconTrash class="w-5 h-5" />
        </li>
      </ul>
    </div>

    <article
      :class="[
        'shadow rounded p-3 relative  border-2 select-none duration-200  hover:scale-[101%]',
        {
          'border-yellow-500': status === 'pending',
          'border-cyan-500': status === 'in progress',
          'border-green-500': status === 'completed',
        },
      ]"
    >
      <header>
        <h5
          :class="[
            'font-semibold uppercase outline-none cursor-default w-full',
          ]"
        >
          {{ title }}
        </h5>
      </header>
      <section class="relative">
        <div class="flex items-center justify-between w-full">
          <p class="h-auto w-[40%] outline-none cursor-default">
            {{ description }}
          </p>

          <select
            name="status"
            :class="[
              'h-[40px] px-2 outline-rose-700  rounded',
              {
                borde: taskEditIsActive.status,
              },
            ]"
            @change="handlerEditTask"
            :value="taskEdit.status"
            @blur="handlerUpdateTask"
          >
            <option value="pending">pending</option>
            <option value="in progress">in progress</option>
            <option value="completed">completed</option>
          </select>
        </div>

        <p>Fecha limite {{ expirationDate }}</p>
      </section>
    </article>
  </div>
</template>
