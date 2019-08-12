<template>
  <div class="setting-container">
    <el-card>
      <div slot="header">
        <bread-nav>个人设置</bread-nav>
      </div>
      <!-- 栅格系统 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form label-width="120px">
            <el-form-item label="编号:">{{userForm.id}}</el-form-item>
            <el-form-item label="手机:">{{userForm.mobile}}</el-form-item>
            <el-form-item label="媒体名称:">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍:">
              <el-input v-model="userForm.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveUserInfo()">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传组件 -->
          <el-upload
            style="text-align:center"
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="myUpload"
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center;font-size:14px">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
import eventBus from '@/components/eventBus'
export default {
  data () {
    return {
      userForm: {
        name: null,
        intor: null,
        email: null,
        id: null,
        photo: null,
        mobile: null
      }
    }
  },
  methods: {
    // 获取用户资料
    async getUserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      this.userForm = data
    },
    // 修改用户资料
    async saveUserInfo () {
      await this.$http.patch('user/profile',
        {
          name: this.userForm.name,
          intro: this.userForm.intro,
          email: this.userForm.email
        })
      // 成功
      this.$message.success('保存设置成功')
      // 更新本地存储
      store.setUser({ name: this.userForm.name })
      // 更新home组件的用户名
      eventBus.$emit('updateName', this.userForm.name)
    },
    // 自定义上传头像
    myUpload (result) {
      const formdata = new FormData()
      formdata.append('photo', result.file)
      this.$http.patch('user/photo', formdata).then(res => {
        this.$message.success('头像上传成功')
        // 预览
        this.userForm.photo = res.data.data.photo
        // 更新本地存储
        store.setUser({ photo: this.userForm.photo })
        // 更新home组件的头像
        eventBus.$emit('updatePhoto', this.userForm.photo)
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style scoped lang="less">
</style>
