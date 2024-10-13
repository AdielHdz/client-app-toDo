import axios from 'axios'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      profile: {},
    }
  },
  actions: {
    getProfile(id) {
      const access_token = sessionStorage.getItem('authToken')
      axios
        .get(`/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .then(response => {
          const userData = response.data

          this.profile = {
            name: userData.name,
            email: userData.email,
            id: userData.id,
          }
        })
        .catch(error => console.log(error.message))
    },
  },
})
