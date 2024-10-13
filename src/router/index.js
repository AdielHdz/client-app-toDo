import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditTaskView from '@/views/EditTaskView.vue'
import ProfileView from '@/views/ProfileView.vue'
import { getUserIdSession } from '@/helpers/userSession'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/edit/:id',
      name: 'task-edit',
      component: EditTaskView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
  ],
})
router.beforeEach(to => {
  document.title = to.meta.title || 'Default Title' // Establece el título
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!getUserIdSession()
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
