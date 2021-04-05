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
export default {
  components: {
    treeItem
  },
  data () {
    return {
      titleData: {
        label: '江苏传智',
        children: []
      },
      treeData: [
        {
          label: '财务部',
          children: [
            {
              label: '薪资管理部',
              children: []
            }
          ]
        }
      ]
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
