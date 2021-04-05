<template>
  <div class="departments">
    <treeItem class="title" :nodeData="titleData"></treeItem>
    <hr />
    <!-- 树形结构 -->
    <el-tree :data="treeData">
      <template v-slot="scope">
        <treeItem :nodeData="scope.data" :isShow="true"></treeItem>
      </template>
    </el-tree>
    <!-- 对话框 -->
    <dialogItem></dialogItem>
  </div>
</template>

<script>
import treeItem from './components/treeItem'
import dialogItem from './components/dialog'
import { companyDepartment } from '@/api/departments.js'
import { getTree } from '@/utils'
export default {
  components: {
    treeItem,
    dialogItem
  },
  data () {
    return {
      titleData: {
        name: '江苏传智',
        children: [],
        manager: '负责人'
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
      ]
    }
  },
  async created () {
    const res = await companyDepartment()
    this.titleData.name = res.companyName
    // console.log(res)
    // 返回数据的当前数据的id是与自己子集的pid是相等的
    this.treeData = getTree(res.depts, '')
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.departments {
  padding: 15px 130px;
  .title {
    font-size: 24px;
  }
}
</style>
