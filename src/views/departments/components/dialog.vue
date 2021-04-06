<template>
  <el-dialog
    :title="model === 'add' ? '新增部门信息' : '编辑部门信息'"
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
import {
  sysUserSimple,
  companyDepartmentAdd,
  companyDepartmentEdit
} from '@/api/departments'
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
      // 当前模式
      model: 'add',
      // 校验规则
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (this.model === 'add') {
                // 找到当前点击项的子级同级部门
                this.dialogData
                  .filter(item => {
                    return item.pid === this.nodeData.id
                  })
                  // 判断是否在同级部门中存在
                  .some(item => {
                    // 这里的value是输入框中要校验的值
                    return item.name === value
                  })
                  ? callback(new Error('该部门已存在'))
                  : callback()
              } else {
                // 找到当前点击项的同级部门
                this.dialogData
                  .filter(item => {
                    return item.pid === this.nodeData.pid
                  })
                  .some(item => {
                    // 名称不能和同级部门相同,且不能是它自己(排除自身的名称)
                    return item.name === value && item.id !== this.nodeData.id
                  })
                  ? callback(new Error('该部门已存在'))
                  : callback()
              }
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
                // code不能和其他部门的code相等,且不能是它自己(修改时code是可以等于当前项的code的)
                return item.code === value && item.id !== this.nodeData.id
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
          { min: 1, max: 300, message: '请输入1-300个字符', trigger: 'blur' }
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
          // 判断是新增还是修改
          if (this.model === 'add') {
            await companyDepartmentAdd({
              ...this.form,
              pid: this.nodeData.id
            })
          } else {
            await companyDepartmentEdit(this.form)
          }
          this.$message.success(this.model === 'add' ? '新增成功' : '编辑成功')
          this.showDialog = false
          this.$store.dispatch('departments/getTreeData')
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
      // 重置表单且移出表单验证(重置为el-form渲染的时候的值)
      this.$refs.form.resetFields()
      // 手动清空form
      this.form = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
    }
  },
  created () {
    this.$bus.$on('showDialog', (data, model) => {
      this.showDialog = true
      this.nodeData = data
      this.model = model
      // 如果是编辑,则将传过来的值深拷贝并赋值给form
      if (this.model === 'edit') {
        this.form = JSON.parse(JSON.stringify(data))
      }
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
