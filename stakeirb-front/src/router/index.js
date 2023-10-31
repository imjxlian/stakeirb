import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../pages/RegisterView.vue')
    },
    {
      path: '/profile/:user_uuid',
      name: 'profile',
      component: () => import('../pages/ProfileView.vue')
    },
    {
      path: '/games/dice',
      name: 'dice',
      component: () => import('../pages/Games/DiceView.vue')
    },
    {
      path: '/games/mines',
      name: 'mines',
      component: () => import('../pages/Games/MinesView.vue')
    }
  ]
})

export default router
