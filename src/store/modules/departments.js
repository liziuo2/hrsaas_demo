import { companyDepartment } from '@/api/departments.js'
import { getTree } from '@/utils'
const state = {
  titleData: {
    id: '',
    name: '江苏传智',
    manager: '负责人',
    children: []
  },
  treeData: [
    {
      name: '财务部',
      children: [
        {
          name: '薪资管理部',
          children: []
        }
      ]
    }
  ],
  // 传入dialog的原始树形数据
  dialogData: []
}
const mutations = {
  // 设置树形数据
  setTreeData (state, value) {
    state.treeData = value
  },
  // 设置原始树形数据
  setDialogData (state, value) {
    state.dialogData = value
  },
  // 设置标题数据
  setTitleData (state, value) {
    state.titleData = value
  }
}
const actions = {
  // 获取树形数据
  async getTreeData (store) {
    const res = await companyDepartment()
    store.commit('setTreeData', {
      id: '',
      name: res.companyName,
      manager: '负责人',
      children: []
    })
    store.commit('setTreeData', getTree(res.depts, ''))
    store.commit('setDialogData', res.depts)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
