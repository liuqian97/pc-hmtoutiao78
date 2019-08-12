<template>
  <div class="article-container">
    <el-card>
      <div slot="header">
        <bread-nav>{{articleID?"修改":"发布"}}文章</bread-nav>
      </div>
      <el-form label-width="100px">
        <el-form-item label="标题:">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面:">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 封面组件使用 -->
          <div v-if="articleForm.cover.type ===1 ">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type===3" class="type3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道:">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleID">
          <el-button type="primary" @click="submit(false)">发表</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="success" @click="update(false)">修改</el-button>
          <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  created () {
    // 把地址栏的文章id给aticelID
    this.articleID = this.$route.query.id
    // 如果id是存在于地址栏中的,才有必要去获取文章数据
    if (this.articleID) {
      this.getArticle()
    }
  },
  methods: {
    // 切换封面类型时,重置图片数据
    changeType () {
      this.articleForm.cover.images = []
    },
    // 发表或者存入草稿
    async submit (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      // 提示
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      // 并且跳转到内容管理页面
      this.$router.push('/article')
    },
    // 获取指定文章数据
    async getArticle () {
      const {
        data: { data }
      } = await this.$http.get(`articles/${this.articleID}`)
      this.articleForm = data
    },
    // 修改或者存入草稿
    async update (draft) {
      await this.$http.put(
        `articles/${this.articleID}?draft=${draft}`,
        this.articleForm
      )
      //   提示
      this.$message.success(draft ? '修改后存入草稿成功' : '修改成功')
      // 跳转到内容管理页
      this.$router.push('/article')
    }
  },
  components: {
    quillEditor
  },
  data () {
    return {
      articleForm: {
        title: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null,
        content: ''
      },
      // 富文本配置
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      },
      // 地址栏的文章id
      articleID: null
    }
  },
  watch: {
    $route () {
      if (!this.$route.query.id) {
        this.articleID = null
        this.articleForm = {
          title: '',
          cover: {
            type: 1,
            images: []
          },
          channel_id: null,
          content: ''
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-image {
  display: inline-block;
  margin-right: 20px;
}
</style>
