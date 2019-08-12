import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'
import Welcome from '@/views/welcome/index.vue'
import Article from '@/views/article/index.vue'
import Image from '@/views/images/index.vue'
import notFound from '@/views/404/index.vue'
import Publish from '@/views/publish/index.vue'
import Comment from '@/views/comment/index.vue'
import Setting from '@/views/setting/index.vue'
import Fans from '@/views/fans/index.vue'

import store from '@/store'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/login', name: 'login', component: Login
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'welcome',
          component: Welcome
        },
        {
          path: '/article',
          name: 'article',
          component: Article
        },
        {
          path: '/image',
          name: 'image',
          component: Image
        },
        {
          path: '/publish',
          name: 'publish',
          component: Publish
        },
        {
          path: '/comment',
          name: 'comment',
          component: Comment
        },
        {
          path: '/setting',
          name: 'setting',
          component: Setting
        },
        {
          path: '/fans',
          name: 'fans',
          component: Fans
        }
      ]
    },
    {
      path: '*',
      name: '404',
      component: notFound
    }
  ]
})

// 加上全局前置导航守卫
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})

export default router
