import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 导入自定义指令
import directivesObj from './directives'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

// Object.keys()方法用于获取到对象中的key值数组:['key1值','key2值'...]
Object.keys(directivesObj).forEach(item => {
  // 设置全局自定义指令
  Vue.directive(item, directivesObj[item])
})

Vue.prototype.$bus = new Vue()
// 全局注册公共组件
import componentsJs from '@/components/index'
Vue.use(componentsJs)

// 全局注册过滤器
import filtersObj from '@/filters'
Object.keys(filtersObj).forEach(item => {
  Vue.filter(item, filtersObj[item])
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
