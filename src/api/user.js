import $axios from '@/utils/request.js'

// 登录接口
export function sysLogin (data) {
  return $axios({
    url: '/sys/login',
    method: 'POST',
    // hasCatch用于响应拦截器是否拦截.catch
    // hasCatch: true,
    data
  })
}
