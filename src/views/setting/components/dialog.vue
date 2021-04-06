<template>
  <el-dialog
    :title="model === 'add' ? '新增角色信息' : '编辑角色信息'"
    :visible="value"
    @close="closeEvent"
    :close-on-click-modal="false"
    width="750px"
  >
    <el-form label-width="120px" ref="form" :model="form" :rules="rules">
      <el-form-item label="角色名称" prop="name">
        <el-input class="ipt" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input class="ipt" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item class="btn" label-width="0px">
        <el-button @click="closeEvent">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { sysRoleAdd, sysRoleEdit } from '@/api/setting'
export default {
  props: ['value'],
  data () {
    return {
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '请输入角色名称', tirrger: 'blur' }],
        description: [
          { required: true, message: '请输入角色描述', tirrger: 'blur' }
        ]
      },
      model: 'add'
    }
  },
  methods: {
    // 对话框关闭事件
    closeEvent () {
      this.isShow = false
      this.$refs.form.resetFields()
      this.form = {
        name: '',
        description: ''
      }
      // 利用v-model控制对话框的显示与隐藏
      this.$emit('input', false)
    },
    // 确定
    submit () {
      this.$refs.form.validate(async vaild => {
        if (vaild) {
          if (this.model === 'add') {
            await sysRoleAdd(this.form)
          } else {
            await sysRoleEdit(this.form)
          }
          this.$message.success(
            this.model === 'add' ? '角色信息添加成功' : '角色信息修改成功'
          )
          this.closeEvent()
          this.$emit('getData')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner {
  width: 500px;
}
.btn {
  text-align: center;
}
</style>
