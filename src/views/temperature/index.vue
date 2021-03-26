<template>
  <div>
    <!-- 体温用户信息区域 -->
    <el-card>
      <el-form :inline="true" :model="userInfo">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.stuNum" :readonly="true" placeholder="用户名"/>
        </el-form-item>
        <el-form-item>
          <el-switch
            v-model="userInfo.status"
            active-text="启动自动填报"
            inactive-text="停止自动填报"
            @change="switchChange"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editTempUserInfo">修改用户信息</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 体温表单区域 -->
    <el-card>
      <el-table
        :data="list"
        border
        style="width: 100%"
      >
        <el-table-column type="index" />
        <el-table-column prop="temp_morning" label="早上体温" />
        <el-table-column prop="temp_noon" label="中午体温" />
        <el-table-column prop="insert_time" label="填报日期" />
      </el-table>
      <div class="page">
        <el-pagination
          :current-page="page"
          :page-sizes="[ 10,15,20]"
          :page-size="pageSize"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          background=""
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <!-- 编辑体温用户信息区域 -->
    <el-dialog
      :visible.sync="editUserInfoDialogVisible"
      title="修改用户信息"
      width="30%">
      <el-form ref="editUserInfoRef" :model="editUserInfoForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="editUserInfoForm.stuNum"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="editUserInfoForm.pwd"/>
        </el-form-item>
        <el-form-item label="邮箱地址">
          <el-input v-model="editUserInfoForm.mail"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doEditUserInfo('editUserInfoRef')">立即提交</el-button>
          <el-button @click="cancelEditUserInfo('editUserInfoRef')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 添加体温用户信息区域 -->
    <el-dialog
      :visible.sync="showUserInfoDialogVisible"
      title="添加用户信息"
      width="30%">
      <el-form ref="addUserInfoRef" :model="addUserInfoForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="addUserInfoForm.stuNum"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addUserInfoForm.pwd"/>
        </el-form-item>
        <el-form-item label="邮箱地址">
          <el-input v-model="addUserInfoForm.mail"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doAddUserInfo('addUserInfoRef')">立即提交</el-button>
          <el-button @click="cancelAddUserInfo('addUserInfoRef')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import temp from '@/api/temperature'
import multiavatar from '@multiavatar/multiavatar'
export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      list: null,
      userInfo: {
        id: null,
        stuNum: '',
        pwd: '',
        status: null
      },
      addUserInfoForm: {
        stuNum: '',
        pwd: '',
        mail: ''
      },
      editUserInfoForm: {
        id: null,
        stuNum: '',
        pwd: '',
        mail: '',
        status: null
      },
      editUserInfoDialogVisible: false,
      showUserInfoDialogVisible: false
    }
  },
  created() {
    this.getUserInfo()
    this.getList()
    this.getAvatar()
  },
  methods: {
    getAvatar() {
      // const multiavatar = require('@multiavatar/multiavatar')
      // const svgCode = multiavatar('Binx Bond', true)
      // console.log(svgCode)
      const svgCode = multiavatar('Binx Bond')
      console.log(svgCode)
    },
    switchChange() {
      if (this.userInfo.status === true) {
        this.userInfo.status = 1
      } else {
        this.userInfo.status = 0
      }
      temp.editUserInfo(this.userInfo).then(response => {
        if (response.code === 20000) {
          if (this.userInfo.status === 1) {
            this.$message({
              type: 'success',
              message: '已启动自动填报！'
            })
          } else {
            this.$message({
              type: 'warning',
              message: '已停止自动填报！'
            })
          }
          this.getUserInfo()
        } else {
          this.$message({
            type: 'warn',
            message: '自动填报修改失败！'
          })
        }
      })
    },
    getList() {
      temp.getList(this.page, this.pageSize).then(response => {
        this.list = response.data.list
        this.total = response.data.count
      })
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.getList()
    },
    handleCurrentChange(page) {
      this.page = page
      this.getList()
    },
    getUserInfo() {
      temp.getUserInfo().then(response => {
        if (response.code !== 20000) {
          this.showUserInfoDialogVisible = true
        } else {
          this.userInfo = response.data
          if (this.userInfo.status === 1) {
            this.userInfo.status = true
          } else {
            this.userInfo.status = false
          }
        }
      })
    },
    editTempUserInfo() {
      this.editUserInfoForm = this.userInfo
      this.editUserInfoDialogVisible = true
    },
    doEditUserInfo(formName) {
      temp.editUserInfo(this.editUserInfoForm).then(response => {
        if (response.code === 20000) {
          this.$message({
            type: 'success',
            message: '用户修改成功！'
          })
          this.getUserInfo()
        } else {
          this.$message({
            type: 'warn',
            message: '用户修改失败！'
          })
        }
      })
      this.$refs[formName].resetFields()
      this.editUserInfoDialogVisible = false
    },
    cancelEditUserInfo(formName) {
      this.$refs[formName].resetFields()
      this.editUserInfoDialogVisible = false
    },
    doAddUserInfo(formName) {
      temp.addUserInfo(this.addUserInfoForm).then(response => {
        if (response.code === 20000) {
          this.$message({
            type: 'success',
            message: '用户添加成功！'
          })
          this.getUserInfo()
        } else {
          this.$message({
            type: 'warn',
            message: '用户添加失败！'
          })
        }
      })
      this.$refs[formName].resetFields()
      this.showUserInfoDialogVisible = false
    },
    cancelAddUserInfo(formName) {
      this.$refs[formName].resetFields()
      this.showUserInfoDialogVisible = false
    }
  }
}
</script>

<style>

</style>
