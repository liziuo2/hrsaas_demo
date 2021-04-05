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

// 新增部门
export function companyDepartmentAdd (data) {
  return $axios({
    url: '/company/department',
    method: 'POST',
    data
  })
}
