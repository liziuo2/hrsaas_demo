<template>
  <div class="login">
    <el-form class="form" ref="form" :model="form" :rules="rules">
      <img src="@/assets/common/login-logo.png" alt="" />
      <el-form-item prop="mobile">
        <el-input
          placeholder="请输入账号"
          prefix-icon="el-icon-user-solid"
          v-model="form.mobile"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          show-password
          v-model="form.password"
          @keyup.enter.native="login"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { checkPhone } from '@/utils/validate.js'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {
        mobile: '13600000002',
        password: '123456'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              checkPhone(value)
                ? callback()
                : callback(new Error('请输入正确的手机号'))
            }
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '请输入6-12位密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions('user', ['getUserToken']),
    login () {
      // 表单验证
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 发送请求登录账号
          await this.getUserToken(this.form)
          const _redirect = this.$route.query.redirect
          // 判断是去到登录页还是其他页面
          if (_redirect) {
            //  跳转到对应页面
            this.$router.push(_redirect)
          } else {
            //  跳转到首页
            this.$router.push('/')
          }
        } else {
          this.$message.error('验证失败')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('~@/assets/common/login.jpg');
  .form {
    width: 500px;
    text-align: center;
    img {
      margin-bottom: 30px;
    }
    .btn {
      width: 100%;
      border: none;
      color: #fff;
      margin-top: 10px;
      background: linear-gradient(to right, #69a4ff, #246bfb);
    }
  }
}
</style>
