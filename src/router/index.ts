import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add-point',
    name: '/add-point',
    component: () => import(/* webpackChunkName: "add-point" */ '../views/AddPoint.vue')
  },
  {
    path: '/shop',
    name: '/shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/Shop.vue')
  },
  {
    path: '/edit-presents',
    name: '/edit-presents',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "edit-presents" */ '../views/EditPresents.vue')
  },
  {
    path: '/edit-points',
    name: '/edit-points',
    component: () => import(/* webpackChunkName: "edit-points" */ '../views/EditPoints.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
