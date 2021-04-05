<template>
  <div class="departments">
    <treeItem class="title" :nodeData="titleData"></treeItem>
    <hr />
    <!-- 树形结构 -->
    <el-tree :data="treeData">
      <template v-slot="scope">
        <treeItem :nodeData="scope.data"></treeItem>
      </template>
    </el-tree>
  </div>
</template>

<script>
import treeItem from './components/treeItem'
import { companyDepartment } from '@/api/departments.js'
export default {
  components: {
    treeItem
  },
  data () {
    return {
      titleData: {
        name: '江苏传智',
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
      ]
    }
  },
  async created () {
    const res = await companyDepartment()
    this.titleData.name = res.companyName
    // console.log(res)
    // 返回数据的当前数据的id是与自己子集的pid是相等的
    this.treeData = this.getTree(res.depts, '')
  },
  methods: {
    getTree (arr, str) {
      return arr.filter(item => {
        if (item.pid === str) {
          item.children = this.getTree(arr, item.id)
          return true
        }
        // 没有进入if判断语句的话默认返回的是undefined即return false,结束循环
        // else {
        //   return undefined
        // }
      })
    }
  }
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
