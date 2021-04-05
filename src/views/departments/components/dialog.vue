<template>
  <el-dialog
    title="新增部门"
    :visible.sync="showDialog"
    :close-on-click-modal="false"
    @close="close"
  >
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" class="ipt"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" class="ipt"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="form.manager"
          placeholder="请选择活动区域"
          @focus="focusEvent"
        >
          <el-option
            v-for="(item, index) in selectList"
            :key="index"
            :label="item.username"
            :value="item.username"
            class="ipt"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="form.introduce" class="ipt"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="showDialog = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { sysUserSimple, companyDepartmentAdd } from '@/api/departments'
export default {
  props: ['dialogData'],
  data () {
    return {
      // 控制对话框是否显示
      showDialog: false,
      // 表单数据
      form: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      // 校验规则
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              // 找到同级的部门
              let _tempArr = this.dialogData.filter(item => {
                return item.pid === this.nodeData.id
              })
              // 判断是否在同级部门中存在
              _tempArr.some(item => {
                return item.name === value
              })
                ? callback(new Error('该部门已存在'))
                : callback()
            },
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          { min: 2, max: 50, message: '请输入2-50个字符', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              this.dialogData.some(item => {
                return item.code === value
              })
                ? callback(new Error('不能有重复的code'))
                : callback()
            }
          }
        ],
        manager: [
          { required: true, message: '请选择部门负责人', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请输入部门简介', trigger: 'blur' },
          { min: 5, max: 300, message: '请输入5-300个字符', trigger: 'blur' }
        ]
      },
      // 当前节点数据
      nodeData: [],
      // 选择框数据
      selectList: []
    }
  },
  methods: {
    // 确定
    submit () {
      // 全局表单验证
      this.$refs.form.validate(async valid => {
        if (valid) {
          await companyDepartmentAdd({
            ...this.form,
            pid: this.nodeData.id
          })
          this.$message.success('新增成功')
          this.showDialog = false
          this.$emit('getData')
        }
      })
    },
    // 选择框聚焦事件
    async focusEvent () {
      if (this.selectList.length === 0) {
        this.selectList = await sysUserSimple()
      }
    },
    // 关闭对话框
    close () {
      this.$refs.form.resetFields()
    }
  },
  created () {
    this.$bus.$on('showDialog', data => {
      this.showDialog = true
      this.nodeData = data
    })
  },
  beforeDestroy () {
    this.$bus.$off('showDialog')
  }
}
</script>

<style lang="scss" scoped>
.ipt {
  width: 550px;
}
</style>
