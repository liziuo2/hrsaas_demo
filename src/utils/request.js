import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth.js'
const $axios = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})

// 设置请求拦截器
$axios.interceptors.request.use(
  function (config) {
    // 添加请求头
    if (getToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
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
