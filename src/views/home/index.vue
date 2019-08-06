<template>
  <el-container class="warp">
    <el-aside :width="isCollapse?'64px':'200px'">
      <!-- logo部分 -->
      <div class="logo" :class="{miniLogo:isCollapse}"></div>
      <!-- 导航菜单
      el-menu 属性router表示是否使用vue-router模式 启用该模式会在激活导航时以 index 作为 path 进行路由跳转 默认值为false
      $route.path 获取地址栏路径
      -->
      <el-menu
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="$route.path"
        background-color="#999d9c"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article" @click='art()'>
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold" @click="toggleMenu()"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 下拉菜单 -->
        <el-dropdown class="myDropdown">
          <span class="el-dropdown-link">
            <img :src='photo' alt />
            {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
          <!-- 二级路由的出口,组件显示的位置 -->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      // element-ui提供的iscollapse属性控制菜单栏是否折叠,false表示展开,true表示折叠
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  methods: {
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    },
    art () {
      this.$http.get('http://ttapi.research.itcast.cn/mp/v1_0/user/profile').then(res => {
        console.log(res.data)
      })
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      // 清除用户信息
      store.removeUser()
      // 跳转到登录页面
      this.$router.push('/login')
    }
  },
  created () {
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  }
}
</script>

<style lang="less" scoped>
//在element-ui中,组件的名称其实就是解析后组件容器的类名
.warp {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .el-aside {
    background-color: #999d9c;
    .logo {
      width: 100%;
      height: 60px;
      background: #74787c url(../../assets/images/logo_admin.png) no-repeat
        center / 140px auto;
    }
    .miniLogo {
      background-image: url(../../assets/images/logo_admin_01.png);
      background-size: 36px auto;
    }
    i {
        color: #fff;
    }
    .el-menu {
        border-right: none;
    }
  }
  .el-header {
    line-height: 60px;
    border-bottom: 1px solid #74787c;
    .el-icon-s-fold {
      font-size: 24px;
      vertical-align: middle;
      color: #74787c;
    }
    .text {
      vertical-align: middle;
      margin-left: 10px;
      color: #74787c;
    }
    .myDropdown {
      float: right;
      .el-dropdown-link {
        font-weight: 700;
        color: #74787c;
        img {
          width: 30px;
          height: 30px;
          margin-right: 8px;
          vertical-align: middle;
        }
        .el-icon-arrow-down {
          color: #74787c;
        }
      }
    }
  }
}
</style>
