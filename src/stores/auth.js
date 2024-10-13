import axios from 'axios'
import { defineStore } from 'pinia'
import { getCsrfCookie } from '@/helpers/csrf'
import { getAccessTokenSession } from '@/helpers/tokenSession'
import { getUserIdSession } from '@/helpers/userSession'
export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      isFetching: false,
      userIsLogged: false,
      tokenSession: '',
      user_id: '',
      errorMessage: '',
    }
  },
  actions: {
    cleanErrorMessage() {
      this.errorMessage = ''
    },
    async registerUser(user) {
      this.isFetching = true
      axios
        .post(
          '/api/auth/register',
          {
            name: user.name,
            email: user.email,
            password: user.password,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        )
        .then(response => {
          // console.log(response.data)
          this.tokenSession = response.data.access_token
          this.user_id = response.data.user_id
          sessionStorage.setItem('authToken', this.tokenSession)
          sessionStorage.setItem('user_id', this.user_id)
          window.location.href = '/'
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.isFetching = false
        })
    },
    async login(user) {
      this.isFetching = true
      this.errorMessage = ''

      //await getCsrfCookie()
      await axios
        .post(
          '/api/auth/login',
          {
            email: user.email,
            password: user.password,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        )
        .then(response => {
          this.tokenSession = response.data.access_token
          this.user_id = response.data.user_id
          sessionStorage.setItem('authToken', this.tokenSession)
          sessionStorage.setItem('user_id', this.user_id)
          window.location.href = '/'
        })
        .catch(error => {
          if (error.response.data.message === 'Invalid credentials')
            this.errorMessage = 'Credenciales invalidas'
          console.log(error.response.data.message)
        })
        .finally(() => {
          this.isFetching = false
        })
    },
    async logout(user) {
      this.isFetching = true

      //await getCsrfCookie()
      const access_token = getAccessTokenSession()
      await axios
        .post(
          '/api/auth/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        )
        .then(response => {
          sessionStorage.removeItem('authToken')
          sessionStorage.removeItem('user_id')

          window.location.href = '/'
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.isFetching = false
        })
    },
    isAuthenticated() {
      return !!getAccessTokenSession()
    },
    userId() {
      return getUserIdSession()
    },
  },
})
