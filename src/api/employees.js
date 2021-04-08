import $axios from '@/utils/request'

// 获取员工列表接口
export function sysUser (params) {
  return $axios({
    url: '/sys/user',
    params
  })
}
