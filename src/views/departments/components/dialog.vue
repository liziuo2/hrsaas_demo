<template>
  <el-dialog
    title="新增部门"
    :visible.sync="showDialog"
    :close-on-click-modal="false"
  >
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" class="ipt"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" class="ipt"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="form.manager" placeholder="请选择活动区域">
          <el-option label="" value="" class="ipt"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="form.introduce" class="ipt"></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      // 控制对话框是否显示
      showDialog: true,
      //   表单数据
      form: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      //   校验规则
      rules: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.ipt {
  width: 550px;
}
</style>
