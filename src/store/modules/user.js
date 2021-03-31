import { sysLogin } from '@/api/user.js'
import { Message } from 'element-ui'
import { setToken, getToken, removeToken } from '@/utils/auth.js'

const state = {
  token: getToken()
}
const mutations = {
  // 设置token
  setToken (state, value) {
    state.token = value
    // 存储到cookie中
    setToken(value)
  },
  // 删除token
  removeToken (state) {
    state.token = null
    // 移出本地token
    removeToken()
  }
}
const actions = {
  // 发送请求获取token
  async getUserToken ({ commit }, form) {
    const res = await sysLogin(form)
    // 设置token
    Message.success('登录成功')
    commit('setToken', res)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
