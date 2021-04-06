<template>
  <div class="setting">
    <el-tabs @tab-click="tabClick" v-model="activeName">
      <el-tab-pane label="角色管理" name="role">
        <el-button type="primary" @click="add">+ 新增角色</el-button>
        <el-table :data="tableData">
          <el-table-column label="序号" type="index">
            <template v-slot="scope">
              {{ (page.currentPage - 1) * page.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="角色名" prop="name"></el-table-column>
          <el-table-column label="描述" prop="description"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <div>
                <el-button type="text">分配权限</el-button>
                <el-button type="text" @click="edit(scope.row)">修改</el-button>
                <el-button type="text" @click="del(scope.row)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="[1, 3, 5, 7, 10]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="公司信息" name="company">
        <el-form label-width="120px" class="form">
          <el-form-item label="企业名称">
            <el-input disabled v-model="companyInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="公司地址">
            <el-input disabled v-model="companyInfo.companyAddress"></el-input>
          </el-form-item>
          <el-form-item label="公司电话">
            <el-input disabled v-model="companyInfo.companyPhone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input disabled v-model="companyInfo.mailbox"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input disabled v-model="companyInfo.remarks"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!-- 对话框 -->
    <dialogItem
      v-model="isShow"
      @getData="getData"
      ref="dialogItem"
    ></dialogItem>
  </div>
</template>

<script>
import { sysRole, companyInfo, sysRoleDel } from '@/api/setting'
export default {
  components: {
    dialogItem: () => import('./components/dialog')
  },
  data () {
    return {
      tableData: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 3
      },
      // 公司基本信息
      companyInfo: '',
      activeName: 'role',
      // 是否显示对话框
      isShow: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 获取数据
    async getData () {
      const res = await sysRole({
        page: this.page.currentPage,
        pagesize: this.page.pageSize
      })
      this.tableData = res.rows
      this.page.total = res.total
    },
    // 页容量改变
    handleSizeChange (size) {
      this.page.pageSize = size
      this.page.currentPage = 1
      this.getData()
    },
    // 当前页改变
    handleCurrentChange (page) {
      this.page.currentPage = page
      this.getData()
    },
    // 获取公司信息
    async getCompanyInfo () {
      if (this.companyInfo) {
        return
      }
      const res = await companyInfo(this.$store.getters.userInfo.companyId)
      this.companyInfo = res
    },
    // tab栏点击事件
    tabClick (obj, e) {
      if (obj.name === 'company') {
        this.getCompanyInfo()
      }
    },
    // 新增角色
    add () {
      this.isShow = true
      this.$refs.dialogItem.model = 'add'
    },
    // 删除角色
    del (row) {
      this.$confirm('确定要删除该角色信息吗？', '温馨提示')
        .then(async () => {
          await sysRoleDel(row.id)
          this.$message.success('删除成功')
          this.page.currentPage = 1
          this.getData()
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    // 修改角色信息
    edit (row) {
      this.isShow = true
      this.$refs.dialogItem.form = { ...row }
      this.$refs.dialogItem.model = 'edit'
    }
  }
}
</script>

<style lang="scss" scoped>
.setting {
  padding: 20px 40px;
  .page {
    margin-top: 20px;
    text-align: center;
  }
  .form {
    width: 700px;
  }
}
</style>
