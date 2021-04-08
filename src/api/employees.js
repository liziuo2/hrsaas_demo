import $axios from '@/utils/request'

// 获取员工列表接口
export function sysUser (params) {
  return $axios({
    url: '/sys/user',
    params
  })
}

// 删除员工信息接口
export function sysUserDel (id) {
  return $axios({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}
