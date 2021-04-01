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

// 获取用户信息接口
export function sysProfile () {
  return $axios({
    url: '/sys/profile',
    method: 'POST'
  })
}

// 获取员工基本信息接口
export function sysUserById (id) {
  return $axios({
    url: `/sys/user/${id}`
  })
}
