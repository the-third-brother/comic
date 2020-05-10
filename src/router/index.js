import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/title/:cid/:name',
    name: 'Title',
    component: () => import('../views/Title.vue')
  },
  {
    path: '/page/:cid/:title',
    name: 'Page',
    component: () => import('../views/Page.vue')
  },
  {
    path: '/pageBackup/:v/:t',
    name: 'PageBackup',
    component: () => import('../views/PageBackup.vue')
  },
  {
    path: '/dispaly',
    name: 'Display',
    component: () => import('../views/Display.vue')
  },
  {
    path: '/',
    name: 'SimpleDisplay',
    component: () => import('../views/SimpleDisplay.vue')
  },
  {
    path: '/episode',
    name: 'Episode',
    component: () => import('../views/Episode.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
