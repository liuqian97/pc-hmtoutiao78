<template>
  <div class="my-image">
    <!-- 图片按钮 -->
    <div class="img-btn" @click="openDialog()">
      <img :src="value||defaultImage" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="images">
          <!-- 单选框 -->
          <el-radio-group v-model="reqParams.collect" @change="changeCollect" size="mini">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 列表 -->
          <div class="img-list">
            <div
              class="img-item"
              v-for="item in images"
              :key="item.id"
              @click="selectedImageUrl=item.url"
              :class="{selected:selectedImageUrl===item.url}"
            >
              <img :src="item.url" />
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            v-if="total>reqParams.per_page"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePaper"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload" style="text-align:center">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleSuccess"
            :headers="headers"
            name='image'
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import defaultImage from '../assets/images/default.png'
import store from '@/store'
export default {
  name: 'my-image',
  data () {
    return {
      // 控制对话框的显示和隐藏
      dialogVisible: false,
      // 控制tab栏的激活选项
      activeName: 'images',
      // 获取素材列表请求参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 素材列表数据
      images: [],
      // 总条数
      total: 0,
      // 记录你选中图片的地址
      selectedImageUrl: null,
      // 记录上传成功的图片地址
      uploadImageUrl: null,
      // 设置上传图片的请求头
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      // 默认的封面地址
      defaultImage
    }
  },
  // 默认图片地址
  props: ['value'],
  methods: {
    openDialog () {
      this.dialogVisible = true
      // 在打开对话框时,就获取列表数据
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 切换全部与收藏
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 分页函数
    changePaper (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 上传成功函数
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
    },
    // 确认图片
    confirmImage () {
      if (this.activeName === 'images') {
        if (!this.selectedImageUrl) return this.$message.warning('请选择素材')
        this.$emit('input', this.selectedImageUrl)
      } else {
        if (!this.uploadImageUrl) return this.$message.warning('请上传图片')
        this.$emit('input', this.uploadImageUrl)
        this.uploadImageUrl = null
      }
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.img-btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}
.img-list {
  margin-top: 10px;
  .img-item {
    width: 160px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 15px;
    margin-bottom: 10px;
    position: relative;
    &.selected {
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
          no-repeat center / 50px 50px;
      }
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: contain;
    }
  }
}
</style>
