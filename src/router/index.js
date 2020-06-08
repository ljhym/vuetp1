import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入第一个页面Login.vue
import Login from '../components/Login.vue'
// 导入第二个页面Home.vue
import Home from '../components/Home.vue'
// 导入第三个页面Home.vue
import Welcome from '../components/Welcome.vue'
import User from '../components/user/User.vue'
import Role from '../components/rights/Role.vue'

Vue.use(VueRouter)

const routes = [
  // 访问'/'的时候，路由重定向到'/login'
  { path: '/', redirect: '/login' },
  // 访问路径为'/login'，的时候加载组件 Login
  { path: '/login', component: Login },
  // 访问路径为'/home'，的时候加载组件 Home
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    // 去Home.vue的el-main区域放置路由占位符
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: User },
      { path: '/roles', component: Role }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 暴露出router之前，启动路由导航守卫
router.beforeEach((to, from, next) => {
  // to从哪里来 from要去哪里 next()放行 next('/login')强制跳转到/login
  if (to.path === '/login') {
    // 如果要求登录页面，放行
    return next()
  }
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    // 如果获取的token为空，强行跳到/login
    return next('/login')
  }
  // 有token，且不为空，放行
  next()
})

export default router
