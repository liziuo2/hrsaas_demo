import axios from 'axios'

const $axios = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})

// 设置请求拦截器
$axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)

// 设置响应拦截器
$axios.interceptors.response.use(
  function (res) {
    return res
  },
  function (err) {
    return Promise.reject(err)
  }
)

// 暴露出去
export default $axios
