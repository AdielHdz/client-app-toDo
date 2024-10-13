import { getAccessTokenSession } from '@/helpers/tokenSession'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', {
  state: () => {
    return {
      task: {},
      tasks: [],
      isFetching: false,
      taskIsCreated: false,
    }
  },
  actions: {
    async getTask(taskId) {
      this.isFetching = true
      const access_token = getAccessTokenSession()
      await axios
        .get(`/api/task/${taskId}`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then(response => {
          this.task = response.data
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.isFetching = false
        })
    },
    async registerTask(task) {
      this.isFetching = true
      const access_token = getAccessTokenSession()
      await axios
        .post(
          '/api/task/',
          {
            user_id: task.user_id,
            title: task.title,
            description: task.description,
            status: task.status,
            expiration_date: task.expirationDate,
            created_at: task.createdAt,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${access_token}`,
            },
          },
        )
        .then(response => {
          console.log(response)
          this.taskIsCreated = true
        })
        .catch(error => {
          console.log(error)
          this.taskIsCreated = false
        })
        .finally(() => {
          this.isFetching = false
        })
    },
    async getUserTasks(userId) {
      this.isFetching = true
      const access_token = getAccessTokenSession()
      await axios
        .get(`/api/task/user/${userId}`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then(response => {
          this.tasks = response.data
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.isFetching = false
        })
    },
    async updateTask(task) {
      this.isFetching = true
      const access_token = getAccessTokenSession()
      await axios
        .put(
          '/api/task/',
          {
            id: task.id.toString(),
            title: task.title,
            description: task.description,
            status: task.status,
            expiration_date: task.expirationDate,
            created_at: task.createdAt,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${access_token}`,
            },
          },
        )
        .then(response => {
          /*  console.log(response.data) */
          this.task = response.data
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.isFetching = false
        })
    },
    async deleteTask(taskId) {
      this.isFetching = true
      const access_token = getAccessTokenSession()
      await axios
        .delete(`/api/task/${taskId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.isFetching = false
        })
    },
  },
})
