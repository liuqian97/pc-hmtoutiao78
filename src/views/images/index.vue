<template>
  <div calss="container">
    <el-card>
      <div slot="header">
        <bread-nav>素材管理</bread-nav>
      </div>
      <div class="btn-box">
        <el-radio-group v-model="reqParams.collect" size="small" @change="changeCollect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="small" style="float:right" @click="openDialog">添加素材</el-button>
      </div>
      <div class="img-list">
        <div class="img-item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="footer" v-show="!reqParams.collect">
            <i class="el-icon-star-off" :class="{selected:item.is_collected}" @click="toggleCollect(item)"></i>
            <i class="el-icon-delete" @click="deleteImage(item.id)"></i>
          </div>
        </div>
      </div>
      <div>
        <el-pagination
          background
          layout="prev, pager, next,total"
          v-if="total>reqParams.per_page"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="changePaper"
        ></el-pagination>
      </div>
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        name="image"
        :show-file-list="false"
        :on-success="handleSuccess"
        style="text-align:center"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      // 请求参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      // 控制对话框显示和隐藏
      dialogVisible: false,
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      // 上传成功后的图片地址
      imageUrl: null
    }
  },
  methods: {
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 分页函数
    changePaper (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 打开对话框函数
    openDialog () {
      this.dialogVisible = true
    },
    // 上传图片函数
    handleSuccess (res) {
      // 预览
      this.imageUrl = res.data.url
      // 提示
      this.$message.success('上传成功')
      // 设置定时器,2s后关闭对话框
      window.setTimeout(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.imageUrl = null
        this.getImages()
      }, 2000)
    },
    // 切换收藏
    async toggleCollect (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, { collect: !item.is_collected })
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      // 更新当前照片的状态
      item.is_collected = data.collect
    },
    // 删除图片
    deleteImage (id) {
      this.$confirm('此操作会将图片永久删除,是否继续?', '温馨提示', {
        confirmBUttonText: '确定',
        cancelBUttonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`user/images/${id}`)
        this.$message.success('删除成功')
        this.getImages()
      }).catch(() => {})
    }
  },
  created () {
    // 获取素材列表
    this.getImages()
  }
}
</script>

<style lang="less" scoped>
.img-list {
  margin: 20px 20px 0 25px;
  .img-item {
    width: 180px;
    height: 180px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 40px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .footer {
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 0;
      bottom: 0;
      height: 30px;
      line-height: 30px;
      color: #fff;
      text-align: center;
      width: 100%;
      i {
        margin: 0 30px;
        &.selected {
          color: red;
        }
      }
    }
  }
}
</style>
