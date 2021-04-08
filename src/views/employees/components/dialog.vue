<template>
  <div class="dialog">
    <el-dialog :visible="value" @close="closeEvent" title="新增员工">
      <el-form label-width="120px" :model="form" ref="form" :rules="rules">
        <el-form-item prop="username" label="姓名">
          <el-input placeholder="请输入姓名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机">
          <el-input placeholder="请输入手机号" v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="timeOfEntry" label="入职时间">
          <el-date-picker
            placeholder="请选择入职时间"
            v-model="form.timeOfEntry"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="formOfEmployment" label="聘用形式">
          <el-select
            placeholder="请选择聘用形式"
            v-model="form.formOfEmployment"
          >
            <el-option
              v-for="(item, index) in hireType.hireType"
              :key="index"
              :label="item.value"
              :value="+item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="workNumber" label="工号">
          <el-input
            placeholder="请输入工号"
            v-model="form.workNumber"
          ></el-input>
        </el-form-item>
        <el-form-item prop="departmentName" label="部门">
          <el-input
            placeholder="请输入部门名称"
            v-model="form.departmentName"
            @focus="getDepartmentsInfo"
            readonly
          ></el-input>
          <el-tree
            v-if="showTree"
            :data="departmentsInfo"
            :props="{ label: 'name', children: 'children' }"
            @node-click="handleNodeClick"
          ></el-tree>
        </el-form-item>
        <el-form-item prop="correctionTime" label="转正时间">
          <el-date-picker
            placeholder="请选择转正时间"
            v-model="form.correctionTime"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="text-align:center">
          <el-button @click="closeEvent">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { sysUserAdd } from '@/api/employees'
import { checkPhone } from '@/utils/validate'
import { companyDepartment } from '@/api/departments'
import { getTree } from '@/utils/index'
import hireType from '@/api/constant/employees.js'
export default {
  props: ['value'],
  data () {
    return {
      // 部门列表
      departmentsInfo: [],
      // 是否显示树形结构
      showTree: false,
      // 聘用形式
      hireType: hireType,
      // 表单数据
      form: {
        // 姓名
        username: '',
        // 手机号
        mobile: '',
        // 聘用形式
        formOfEmployment: '',
        // 工号
        workNumber: '',
        // 部门名称
        departmentName: '',
        // 入职时间
        timeOfEntry: '',
        // 转正时间
        correctionTime: ''
      },
      //  清空表单时用的数据
      _form: '',
      // 校验规则
      rules: {
        username: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              checkPhone(value)
                ? callback()
                : callback(new Error('请输入正确的手机号'))
            }
          }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: 'change' }
        ],
        formOfEmployment: [
          { required: true, message: '请选择聘用形式', trigger: 'change' }
        ],
        workNumber: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '请输入部门名称', trigger: 'change' }
        ],
        correctionTime: [
          { required: true, message: '请选择转正时间', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this._form = JSON.parse(JSON.stringify(this.form))
  },
  methods: {
    // 关闭对话框
    closeEvent () {
      this.$emit('input', false)
      // 重置表单
      this.$refs.form.resetFields()
      this.form = JSON.parse(JSON.stringify(this._form))
      this.showTree = false
    },
    // 确定
    submit () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          await sysUserAdd(this.form)
          this.$message.success('新增成功')
          this.closeEvent()
          this.$emit('getUserList')
        }
      })
    },
    // 获取部门信息
    async getDepartmentsInfo () {
      if (this.departmentsInfo.length > 0) {
        return
      }
      const res = await companyDepartment()
      this.departmentsInfo = getTree(res.depts, '')
      this.showTree = true
    },
    // 树形结构点击事件
    handleNodeClick (val) {
      this.form.departmentName = val.name
      this.showTree = false
    }
  }
}
</script>

<style lang="scss" scpoed></style>
