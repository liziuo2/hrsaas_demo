<template>
  <div class="departments">
    <treeItem class="title" :nodeData="titleData"></treeItem>
    <hr />
    <!-- 树形结构 -->
    <el-tree :data="treeData" v-loading="loading">
      <template v-slot="scope">
        <!-- <treeItem
          :nodeData="scope.data"
          :isShow="true"
          @getData="getData"
        ></treeItem> -->
        <treeItem :nodeData="scope.data" :isShow="true"></treeItem>
      </template>
    </el-tree>
    <!-- 对话框 -->
    <!-- <dialogItem :dialogData="dialogData" @getData="getData"></dialogItem> -->
    <dialogItem :dialogData="dialogData"></dialogItem>
  </div>
</template>

<script>
import treeItem from './components/treeItem'
import dialogItem from './components/dialog'
// import { companyDepartment } from '@/api/departments.js'
// import { getTree } from '@/utils'
import { mapState } from 'vuex'
export default {
  components: {
    treeItem,
    dialogItem
  },
  data () {
    return {
      /* 
      // 标题数据
      titleData: {
        // 添加id属性
        id: '',
        name: '江苏传智',
        manager: '负责人',
        children: []
      },
      // 树形数据
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
      dialogData: [], 
      */
      // 加载效果
      loading: false
    }
  },
  created () {
    this.getData()
  },
  computed: {
    ...mapState('departments', ['titleData', 'treeData', 'dialogData'])
  },
  methods: {
    async getData () {
      this.loading = true
      /* const res = await companyDepartment()
      this.loading = false
      this.titleData.name = res.companyName
      // console.log(res)
      // 返回数据的当前数据的id是与自己子级的pid是相等的
      this.treeData = getTree(res.depts, '')
      this.dialogData = res.depts */
      await this.$store.dispatch('departments/getTreeData')
      this.loading = false
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
