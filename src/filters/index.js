// 全局过滤器
import employeesData from '@/api/constant/employees'
import moment from 'moment'
export default {
  // 聘用形式过滤器
  hireType (value) {
    // value为过滤的值
    let _index = employeesData.hireType.findIndex(item => {
      return item.id === value
    })
    if (_index !== -1) {
      return employeesData.hireType[_index].value
    } else {
      return '未知'
    }
  },
  // 时间过滤器
  formatTime (value) {
    return moment(value).format('YYYY-MM-DD')
  }
}
