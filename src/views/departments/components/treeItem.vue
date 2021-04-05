<template>
  <div class="treeItem">
    <div class="name">{{ nodeData.name }}</div>
    <div class="manager">{{ nodeData.manager }}</div>
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
