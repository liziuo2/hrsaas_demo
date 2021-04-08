// 全局过滤器

import employeesData from '@/api/constant/employees'
export default {
  hireType: function (value) {
    let _index = employeesData.hireType.findIndex(item => {
      return item.id === value
    })
    if (_index !== -1) {
      return employeesData.hireType[_index].value
    } else {
      return '未知'
    }
  }
}
