import $axios from '@/utils/request.js'

// 获取部门基本信息接口
export function companyDepartment () {
  return $axios({
    url: '/company/department'
  })
}

// 获取员工数据
export function sysUserSimple () {
  return $axios({
    url: '/sys/user/simple'
  })
}

// 新增部门信息
export function companyDepartmentAdd (data) {
  return $axios({
    url: '/company/department',
    method: 'POST',
    data
  })
}

// 删除部门信息
export function companyDepartmentDel (id) {
  return $axios({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}
