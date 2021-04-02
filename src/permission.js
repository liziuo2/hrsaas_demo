// 导航守卫
import router from '@/router/index.js'
import store from '@/store'
import { Message } from 'element-ui'
// 导入进度条和进入条样式
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 网页白名单
const whitePage = ['/login', '/404']

// 前置守卫
router.beforeEach(async (to, from, next) => {
  // 调用取消所有请求的方法
  window.cancelEventAll()
  // 开启进度条
  NProgress.start()
  const token = store.getters.token
  // 判断是否有token
  if (!token) {
    // 没有token,判断是否在白名单内
    if (whitePage.includes(to.path)) {
      // 在白名单内,正常跳转到对应页面
      next()
    } else {
      // 不在白名单内,跳转到登陆页面
      Message.info('还未登录账号,即将跳转到登录页')
      next('/login?redirect=' + to.fullPath)
    }
  } else {
    // 有token,判断是否在登录页
    if (to.path === '/login') {
      // 在登录页则跳转到首页
      next('/')
    } else {
      // 不在登录页则正常跳转到对应页面,判断是否已登录(判断是否有用户信息)
      if (store.getters.isLogin) {
        next()
      } else {
        // 发送请求获取用户信息
        await store.dispatch('user/getUserInfo')
        next()
      }
    }
  }
  // 这里结束进入条是为了防止在A页面跳转A页面造成进度条卡顿问题
  NProgress.done()
})

// 后置守卫
router.afterEach((to, from) => {
  NProgress.done()
})
