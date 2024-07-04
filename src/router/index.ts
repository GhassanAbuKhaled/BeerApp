import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Review from '../views/ReviewView.vue'
import Home from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/review',
    name: 'review',
    component: Review
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
