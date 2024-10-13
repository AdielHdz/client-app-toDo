<script setup>
import IconInput from '@/components/icons/IconInput.vue'
import IconPencil from '@/components/icons/IconPencil.vue'
import { getUserIdSession } from '@/helpers/userSession'
import router from '@/router'
import { useTaskStore } from '@/stores/task'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const taskStore = useTaskStore()
const { getTask, updateTask } = taskStore
const route = useRoute()
const taskId = route.params.id

onMounted(() => {
  const fetchTask = async () => {
    await getTask(taskId)
    taskForm.value = {
      id: taskStore.task.id.toString(),
      title: taskStore.task.title,
      description: taskStore.task.description,
      status: taskStore.task.status,
      createdAt: taskStore.task.created_at,
      expirationDate: taskStore.task.expiration_date,
    }
  }
  fetchTask()
})

const taskForm = ref({
  id: '',
  title: '',
  description: '',
  status: '',
  createdAt: '',
  expirationDate: '',
})

const taskEditIsDisabled = ref({
  title: true,
  description: true,
  status: true,
  createdAt: true,
  expirationDate: true,
})

const handleActivateEdit = name => {
  taskEditIsDisabled.value[name] = !taskEditIsDisabled.value[name]
}

const handleUpdateTask = event => {
  const { name, value } = event.target
  taskForm.value[name] = value
  taskEditIsDisabled.value[name] = true

  updateTask(taskForm.value)
}
</script>

<template>
  <section class="place-self-center max-w-desktop w-full">
    <article class="w-full max-w-[450px] mx-auto rounded bg-white shadow p-5">
      <header>
        <div
          class="flex items-center gap-2 border-b border-indigo-950 pb-2 select-none"
        >
          <IconInput class="h-7 w-7" />
          <h2 class="font-semibold text-2xl">Edición de tarea</h2>
        </div>
        <p class="font-semibold mt-2">Titulo</p>
        <label
          :class="[
            'flex items-center justify-between border-b-2 shadow border-indigo-400 duration-150',
            {
              ' bg-slate-50': !taskEditIsDisabled.title,
            },
          ]"
        >
          <input
            type="text"
            class="font-semibold text-xl h-[46px] w-full outline-none py-1 bg-transparent px-2"
            :value="taskForm.title"
            :disabled="taskEditIsDisabled.title"
            name="title"
            @blur="handleUpdateTask"
          />
          <IconPencil
            :class="[
              'w-6 h-6 p-[2px] mr-2 cursor-pointer  rounded',
              {
                'border-2  border-rose-700': !taskEditIsDisabled.title,
              },
            ]"
            @click="handleActivateEdit('title')"
          />
        </label>
        <section class="mt-4 grid gap-2">
          <div>
            <p class="font-semibold">Descripción</p>
            <label
              :class="[
                'flex mt-1 flex-col relative border-b-2 border-indigo-400 shadow   duration-150',
                {
                  ' bg-slate-50': !taskEditIsDisabled.description,
                },
              ]"
            >
              <IconPencil
                :class="[
                  'w-6 h-6 p-[2px] absolute right-0 top-2 mr-2 cursor-pointer  rounded',
                  {
                    'border-2  border-rose-700':
                      !taskEditIsDisabled.description,
                  },
                ]"
                @click="handleActivateEdit('description')"
              />
              <textarea
                name="description"
                :value="taskForm.description"
                @blur="handleUpdateTask"
                :disabled="taskEditIsDisabled.description"
                class="w-full outline-none py-1 bg-transparent px-2"
              ></textarea>
            </label>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <div class="flex gap-1 justify-between">
                <label for="status" class="select-none font-semibold"
                  >Estatus</label
                >
                <IconPencil
                  :class="[
                    'w-6 h-6 p-[2px]  mr-2 cursor-pointer  rounded',
                    {
                      'border-2  border-rose-700': !taskEditIsDisabled.status,
                    },
                  ]"
                  @click="handleActivateEdit('status')"
                />
              </div>

              <select
                id="status"
                name="status"
                :class="[
                  '  border-b-2 border-indigo-400 shadow w-full h-[46px] outline-none mt-1 px-2  duration-150',
                  {
                    ' bg-slate-50': !taskEditIsDisabled.status,
                  },
                ]"
                @change="handleUpdateTask"
                :disabled="taskEditIsDisabled.status"
                :value="taskForm.status"
              >
                <option value="pending">pending</option>
                <option value="in progress">in progress</option>
                <option value="completed">completed</option>
              </select>
            </div>
            <label>
              <div class="flex gap-1 justify-between">
                <p class="font-semibold">Fecha limite</p>
                <IconPencil
                  :class="[
                    'w-6 h-6 p-[2px]  mr-2 cursor-pointer  rounded',
                    {
                      'border-2  border-rose-700':
                        !taskEditIsDisabled.expirationDate,
                    },
                  ]"
                  @click="handleActivateEdit('expirationDate')"
                />
              </div>

              <input
                name="expirationDate"
                type="date"
                :disabled="taskEditIsDisabled.expirationDate"
                :value="taskForm.expirationDate"
                :class="[
                  '  border-b-2 border-indigo-400 shadow w-full h-[46px] bg-transparent outline-none mt-1 px-2  duration-150',
                  {
                    ' bg-slate-50': !taskEditIsDisabled.expirationDate,
                  },
                ]"
                @change="handleUpdateTask"
                @blur="taskEditIsDisabled.expirationDate = true"
              />
            </label>
          </div>
        </section>
      </header>
    </article>
  </section>
</template>
