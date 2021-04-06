import $axios from '@/utils/request'

// 获取角色基本信息
export function sysRole (params) {
  return $axios({
    url: '/sys/role',
    params
  })
}

// 获取企业信息
export function companyInfo (id) {
  return $axios({
    url: `/company/${id}`
  })
}

// 新增角色信息
export function sysRoleAdd (data) {
  return $axios({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

// 删除角色信息
export function sysRoleDel (id) {
  return $axios({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}

// 修改角色信息
export function sysRoleEdit (data) {
  return $axios({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data
  })
}
