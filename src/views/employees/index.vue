<template>
  <div class="employees">
    <el-card>
      <pageTools :showLeft="false" class="top">
        <template #right>
          <el-button type="primary">导入</el-button>
          <el-button type="primary" @click="add">+ 新增员工</el-button>
        </template>
      </pageTools>
    </el-card>
    <el-card class="table">
      <el-table :data="tableData">
        <el-table-column label="序号">
          <template v-slot="scope">
            <div>
              {{ (page.currentPage - 1) * page.pageSize + scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="手机号" prop="mobile"></el-table-column>
        <el-table-column label="工号" prop="workNumber"></el-table-column>
        <el-table-column label="聘用形式" prop="formOfEmployment">
          <template v-slot="scope">
            <div>{{ scope.row.formOfEmployment | hireType }}</div>
          </template>
        </el-table-column>
        <el-table-column label="部门" prop="departmentName"></el-table-column>
        <el-table-column label="入职时间" prop="timeOfEntry">
          <template v-slot="scope">
            <div>{{ scope.row.timeOfEntry | formatTime }}</div>
          </template>
        </el-table-column>
        <el-table-column label="是否在职" prop="correctionTime">
          <template v-slot="scope">
            <div>{{ scope.row.correctionTime | formatTime }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template v-slot="scope">
            <div>
              <el-button type="text">查看</el-button>
              <el-button type="text">转正</el-button>
              <el-button type="text">转岗</el-button>
              <el-button type="text">离职</el-button>
              <el-button type="text">角色</el-button>
              <el-button type="text" @click="del(scope.row.id, scope.$index)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
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
    </el-card>
    <dialogItem v-model="showDialog" @getUserList="getUserList"></dialogItem>
  </div>
</template>

<script>
import { sysUser, sysUserDel } from '@/api/employees'
export default {
  components: {
    dialogItem: () => import('./components/dialog')
  },
  data () {
    return {
      tableData: [],
      page: {
        currentPage: 1,
        pageSize: 5,
        total: 10
      },
      showDialog: false
    }
  },
  methods: {
    handleSizeChange (size) {
      this.page.pageSize = size
      this.page.currentPage = 1
      this.getUserList()
    },
    handleCurrentChange (page) {
      this.page.currentPage = page
      this.getUserList()
    },
    // 获取员工列表
    async getUserList () {
      const res = await sysUser({
        page: this.page.currentPage,
        size: this.page.pageSize
      })
      this.tableData = res.rows
      this.page.total = res.total
    },
    // 删除员工信息
    del (id, $index) {
      this.$confirm('确定要删除该员工信息吗？', '温馨提示')
        .then(async () => {
          await sysUserDel(id)
          // 判断删除的信息是否为最后一条信息
          if ($index === 0) {
            this.page.currentPage = this.page.currentPage - 1
          }
          this.$message.success('删除成功')
          this.getUserList()
        })
        .catch(() => {
          this.$message.info('取消删除成功')
        })
    },
    // 新增员工
    add () {
      this.showDialog = true
    }
  },
  created () {
    this.getUserList()
  }
}
</script>

<style lang="scss" scoped>
.employees {
  margin: 20px;
  .top {
    padding: 0px;
  }
  .table {
    margin-top: 20px;
  }
  .el-pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
