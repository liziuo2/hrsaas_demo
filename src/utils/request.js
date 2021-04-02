import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth.js'
import store from '@/store'
import router from '@/router'
const $axios = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})

// 定义变量存储所有的取消方法
let cancelArr = []
// 封装取消所有请求的方法
window.cancelEventAll = () => {
  cancelArr = cancelArr.filter(item => {
    item.fn()
    return false
  })
}
// 设置请求拦截器
$axios.interceptors.request.use(
  function (config) {
    // 添加请求头
    if (getToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    // 同一接口请求的取消处理
    cancelArr = cancelArr.filter(item => {
      if (item.url === config.url && item.method === config.method) {
        item.fn()
        return false
      }
      return true
    })
    config.cancelToken = new axios.CancelToken(cancelEvent => {
      cancelArr.push({
        fn: cancelEvent,
        url: config.url,
        method: config.method
      })
    })
    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)

// 设置响应拦截器
$axios.interceptors.response.use(
  function (res) {
    if (res.data.success) {
      return res.data.data
    } else {
      Message.error(res.data.message)
      return Promise.reject(new Error(res.data.message))
    }
  },
  function (err) {
    // token过期处理
    if (err.response && err.response.data && err.response.data.code === 10002) {
      store.commit('user/logout')
      Message.error(err.response.data.message)
      router.push('/login?redirect=' + window.location.href.split('#')[1])
    }
    return Promise.reject(err)
  }
)

// 让响应拦截器统一拦截.catch,不在控制台出现红色错误信息,argument是发送请求传过来的参数
function _ajax (argument) {
  return new Promise((resolve, reject) => {
    $axios(argument)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        if (argument.hasCatch) {
          reject(err)
        }
      })
  })
}

// 暴露出去
export default _ajax
