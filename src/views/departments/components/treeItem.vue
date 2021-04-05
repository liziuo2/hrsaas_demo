<template>
  <div class="treeItem">
    <div class="name">{{ nodeData.label }}</div>
    <div class="manager">负责人</div>
    <div class="option">操作</div>
  </div>
</template>

<script>
export default {
  props: {
    nodeData: {
      type: Object
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
