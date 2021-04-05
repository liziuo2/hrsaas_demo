<template>
  <div class="treeItem">
    <div class="name">{{ nodeData.name }}</div>
    <div class="manager">{{ nodeData.manager }}</div>
    <div class="option">
      <!-- 下拉菜单 -->
      <el-dropdown @command="commandEvent">
        <div>
          <span>操作</span>
          <i class="el-icon-arrow-down"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="add">新增</el-dropdown-item>
            <el-dropdown-item v-if="isShow" command="edit"
              >修改</el-dropdown-item
            >
            <el-dropdown-item v-if="isShow" command="del"
              >删除</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nodeData: {
      type: Object
    },
    // 控制下拉框修改、删除是否显示
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 下拉框菜单点击事件
    commandEvent (command) {
      switch (command) {
        case 'add':
          console.log('add')
          // 弹出对话框
          break
        case 'edit':
          console.log('edit')
          break
        case 'del':
          console.log('del')
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.treeItem {
  display: flex;
  width: 100%;
  align-items: center;
  .name {
    flex: 1;
  }
  .manager {
    width: 120px;
  }
}
</style>
