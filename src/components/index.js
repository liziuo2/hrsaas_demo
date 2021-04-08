// 全局注册公共组件

import pageTools from './pageTools/index.vue'

export default {
  install: function (Vue) {
    Vue.component(pageTools.name, pageTools)
  }
}
