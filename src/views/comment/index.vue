<template>
  <div calss="comment-container">
    <el-card>
      <div slot="header">
        <bread-nav>评论管理</bread-nav>
      </div>
      <el-table :data="comments">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?"正常":"关闭"}}</template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.comment_status" type="success" size="samll" @click="toggleStatus(scope.row)">打开评论</el-button>
            <el-button v-else type="danger" size="samll" @click="toggleStatus(scope.row)">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:20px"
        v-if="total > reqParams.per_page"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comments: [],
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      total: 0
    }
  },
  methods: {
    async getComments () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    },
    async toggleStatus (row) {
      const {
        data: { data }
      } = await this.$http.put(`comments/status?article_id=${row.id}`,
        { allow_comment: !row.comment_status })
      // 提示
      this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
      row.comment_status = data.allow_comment
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style lang="less" scoped>
</style>
