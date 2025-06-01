import { createRouter, createWebHistory } from 'vue-router'
import Home from '../App.vue'
//import Result from '../pages/Result.vue'

const routes = [
  { path: '/', component: Home },
//  { path: '/result', component: Result }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
