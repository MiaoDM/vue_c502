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
        <el-table-column prop="create_time" label="注册时间" />
        <el-table-column prop="delete_time" label="删除时间" />
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="deleteUser(scope.row.id)">删除</el-button>
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
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    deleteUser(userId) {
      this.$confirm('此操作将删除该货物信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        usermanage.deleteUser(userId).then(response => {
          if (response.code === 20000) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          } else {
            this.$message({
              type: 'info',
              message: '删除失败!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
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
