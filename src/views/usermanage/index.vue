<template>
  <div>
    <!-- 搜索用户信息区域 -->
    <el-card>
      <div class="flex-my">
        <div class="form-search" style="margin-left: 14px">
          <el-form ref="searchRef" :inline="true" :model="searchForm">
            <el-form-item>
              <el-input v-model="searchForm.username" clearable placeholder="用户名称" @clear="clearSearch"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch('searchRef')">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-switch
                v-model="adminInfo.status"
                active-text="启用管理员审核注册"
                inactive-text="禁用管理员审核注册"
                @change="switchChange"/>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
    <!-- 用户信息表格卡片显示区域 -->
    <el-card class="table-box">
      <el-table
        :data="list"
        border
        style="width: 100%"
      >
        <el-table-column type="index" />
        <el-table-column prop="username" label="用户名称" />
        <el-table-column prop="avatar" label="用户头像" >
          <template slot-scope="scope">
            <img :src="scope.row.avatar" alt="" height="70" width="70">
          </template>
        </el-table-column>
        <el-table-column prop="status" label="用户状态" >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 1" type="success">正常</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="danger">已禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="注册时间" />
        <el-table-column prop="delete_time" label="禁用时间" />
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button :disabled="scope.row.status === 1 || scope.row.status === 2 ? true : false" type="primary" size="small" @click="passUser(scope.row.id)">通过审核</el-button>
            <el-button :disabled="scope.row.status === 1 ? false : true" type="danger" size="small" @click="disableUser(scope.row.id)">禁用</el-button>
            <el-button :disabled="scope.row.status === 2 ? false : true" type="success" size="small" @click="enableUser(scope.row.id)">启用</el-button>
          </template>
        </el-table-column>
        <div class="page">
          <el-pagination
            :current-page="page"
            :page-sizes="[ 10,15, 20]"
            :page-size="pageSize"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            background=""
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
    </el-table></el-card>
  </div>
</template>

<script>
import usermanage from '@/api/usermanage'
export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      list: null,
      searchForm: {
        username: ''
      },
      adminInfo: {
        status: null
      }
    }
  },
  created() {
    this.getList()
    this.getAdminInfo()
  },
  methods: {
    getAdminInfo() {
      usermanage.getAdminInfo().then(response => {
        if (response.data.status === 1) {
          this.adminInfo.status = true
        } else {
          this.adminInfo.status = false
        }
      })
    },
    switchChange() {
      if (this.adminInfo.status === true) {
        this.adminInfo.status = 1
      } else {
        this.adminInfo.status = 0
      }
      usermanage.editAdminInfo(this.adminInfo).then(response => {
        if (response.code === 20000) {
          if (this.adminInfo.status === 1) {
            this.$message({
              type: 'success',
              message: '已启用管理员审核注册！'
            })
          } else {
            this.$message({
              type: 'warning',
              message: '已禁用管理员审核注册！'
            })
          }
          this.getAdminInfo()
        } else {
          this.$message({
            type: 'warn',
            message: '管理员审核注册修改失败！'
          })
        }
      })
    },
    passUser(userId) {
      usermanage.passUser(userId).then(response => {
        if (response.code === 20000) {
          this.$message({
            type: 'success',
            message: '已通过该用户'
          })
          this.getList()
        } else {
          this.$message({
            type: 'info',
            message: response.message
          })
          this.getList()
        }
      })
    },
    enableUser(userId) {
      usermanage.enableUser(userId).then(response => {
        if (response.code === 20000) {
          this.$message({
            type: 'success',
            message: '已启用该用户'
          })
          this.getList()
        } else {
          this.$message({
            type: 'info',
            message: response.message
          })
          this.getList()
        }
      })
    },
    disableUser(userId) {
      this.$confirm('此操作将禁用该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        usermanage.disableUser(userId).then(response => {
          if (response.code === 20000) {
            this.$message({
              type: 'success',
              message: '已禁用该用户!'
            })
            this.getList()
          } else {
            this.$message({
              type: 'info',
              message: '禁用失败!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消禁用！'
        })
      })
    },
    clearSearch() {
      this.getList()
    },
    onSearch(refName) {
      this.getList()
    },
    getList() {
      usermanage.getUserList(this.page, this.pageSize, this.searchForm).then(response => {
        this.total = response.data.total
        this.list = response.data.list
      })
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.getList()
    },
    handleCurrentChange(page) {
      this.page = page
      this.getList()
    }
  }
}

</script>

<style lang="scss" scoped>
.table-box {
  width: 95%;
  margin-left: 2.5%;
  margin-top: 10px;
}
.flex-my {
  display: flex;
  justify-content: space-between;
}
.form-search {
  padding-top: 15px;
}
.page {
  margin-top: 10px;
}
</style>
