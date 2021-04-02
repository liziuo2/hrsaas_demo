import { sysLogin, sysProfile, sysUserById } from '@/api/user.js'
import { Message } from 'element-ui'
import { setToken, getToken, removeToken } from '@/utils/auth.js'

const state = {
  token: getToken(),
  // 用户信息
  userInfo: ''
}
const mutations = {
  // 设置token
  setToken (state, value) {
    state.token = value
    setToken(value)
  },
  // 删除token
  removeToken (state) {
    state.token = null
    removeToken()
  },
  // 更改用户信息
  setUserInfo (state, value) {
    state.userInfo = value
  },
  // 删除用户信息
  removeUserInfo (state) {
    state.userInfo = ''
  },
  // 退出登录处理
  logout () {
    this.commit('user/removeToken')
    this.commit('user/removeUserInfo')
  }
}
const actions = {
  // 获取token
  async getUserToken ({ commit }, form) {
    const res = await sysLogin(form)
    // 设置token
    Message.success('登录成功')
    commit('setToken', res)
  },
  // 获取用户信息
  async getUserInfo (store) {
    const res = await sysProfile()
    // 获取用户其他信息
    const res1 = await sysUserById(res.userId)
    // 保存到userInfo中
    store.commit('setUserInfo', { ...res, ...res1 })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
