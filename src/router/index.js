import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: import('../page/Home.vue')},
  { path: '/test', component: import('../page/Test.vue')}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;