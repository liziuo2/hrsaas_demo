<template>
  <div>
    首页
  </div>
</template>

<script>
import $axios from '@/utils/request.js'
export default {
  created () {
    $axios({
      url: process.env.VUE_APP_BASE_API + '/sys/login',
      method: 'post',
      data: {
        mobile: '13511111111',
        password: '123456'
      }
    }).then(res => {
      window.console.log(res)
    })
  }
}
</script>

<style></style>
