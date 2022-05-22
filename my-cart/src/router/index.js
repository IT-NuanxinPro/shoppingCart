import { createRouter, createWebHistory } from 'vue-router'
import goodView from '../views/goodView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/goods',
    component: goodView,
  },
  {
    path: '/goods',
    name: 'goods',
    component: () => import('../views/goodView.vue'),
    meta:{index:1}
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/cartView.vue'),
    meta:{index:2}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
