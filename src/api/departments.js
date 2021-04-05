import $axios from '@/utils/request.js'

// 获取部门基本信息接口
export function companyDepartment () {
  return $axios({
    url: '/company/department'
  })
}
