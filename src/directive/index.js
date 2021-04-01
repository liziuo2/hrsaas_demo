// 自定义指令
export default {
  // 图片报错指令
  imgError: {
    inserted (el, binding) {
      // 图片报错触发事件
      el.onerror = () => {
        // 更改图片路径
        el.src = binding.value
      }
    }
  }
}
