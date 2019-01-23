// import Vue from 'vue'
// import Router from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/index'
import Editor from '@/components/editor'
import Tag from '@/components/tag'
import Type from '@/components/type'

// Vue.use(Router)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      meta: {
        requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
      }
    }, {
      path: '/editor',
      name: 'Editor',
      component: Editor,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/tag',
      name: 'Tag',
      component: Tag,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/type',
      name: 'Type',
      component: Type,
      meta: {
        requireAuth: true
      }
    }
  ]
})
