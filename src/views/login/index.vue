<template>
  <div class="container">
    <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt />
      <el-form ref="loginForm" status-icon :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入您的手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:237px;margin-right:10px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    var checkMobile = (rule, value, callback) => {
      // value表示字段的值,callback回调函数,如果验证失败callback(new Error(错误信息)),如果验证正确,callback()
      // 手机号格式 1开头 第二位3-9 最后为9位数字
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机格式不对'))
      }
      callback()
    }
    // 自定义验证码校验规则
    var checkCode = (rule, value, callback) => {
      if (!/^\d{6}$/.test(value)) {
        return callback(new Error('请输入6位数字'))
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '',
        code: ''
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' } // 自定义手机号校验规则
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          //   { len: 6, message: '请输入6位数字', trigger: 'blur' }
          { validator: checkCode, trigger: 'blur' }

        ]
      }
    }
  },
  methods: {
    login () {
      // validate是对象整个表单进行验证
      // 获取其他组件里的函数,要通过dom对象调用
      // this.$message.error是element-ui提供的方法,可以button传入不同type值时,调用
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // try{ 可能会执行报错代码 }catch(e){ 处理错误 }
          try {
            const { data: { data } } = await this.$http.post('authorizations', this.loginForm)
            store.setUser(data)
            store.setName(data.name)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或者密码错误')
          }
        }
      })
    }
  },
  created () {
    this.loginForm.mobile = store.getName()
  }
}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
}
.my-card {
  width: 400px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);
  img {
    display: block;
    width: 200px;
    margin: 0 auto 20px;
  }
}
</style>
