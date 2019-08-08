<template>
  <div class="container">
    <!-- 筛选区域 -->
    <el-card>
      <div slot="header" class="clearfix">
        <bread-nav>内容管理</bread-nav>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态:">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
         <!-- 使用自己的组件 -->
         <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format='yyyy-MM-dd'
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <!-- 表格组件 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 80px"
              :src="scope.row.cover.images[0]"
              fit="cover"
            >
              <div slot="error">
                <img src="../../assets/images/error.gif" alt style="width: 100px; height: 80px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="edit(scope.row.id)" circle plain></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="del(scope.row.id)" circle plain></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页按钮 -->
      <div style="text-align:center;margin-top:30px">
        <el-pagination
          background
          layout="prev, pager, next, total"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="changePager"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        // 每页显示的条数
        per_page: 20,
        page: 1
      },
      // 频道下拉选项数据
      channelOptions: [],
      // 日期数据
      dateArr: [],
      // 文章列表数据
      tableData: [],
      // 文章总条数
      total: 0
    }
  },
  methods: {
    // async getChannelOptions () {
    //   const {
    //     data: { data }
    //   } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    // },
    // 获取文章列表数据
    async getArticle () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      // 文章列表
      this.tableData = data.results
      // 文章总条数
      this.total = data.total_count
    },
    // 改变页面的函数
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getArticle()
    },
    // 日期选择函数
    changeDate (dateArr) {
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选
    search () {
      this.reqParams.page = 1
      this.getArticle()
    },
    // 删除文章
    del (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`articles/${id}`)
        this.$message.success('删除文章成功')
        this.getArticle()
      }).catch(() => {})
    },
    // 编辑文章
    edit (id) {
      this.$router.push(`/publish?id=${id}`)
    }
  },
  created () {
    // this.getChannelOptions()
    this.getArticle()
  }
  // watch: {
  //   'reqParams.channel_id': function (newValue, oldValue) {
  //     if (newValue === '') {
  //       this.reqParams.channel_id = null
  //     }
  //   }
  // }
}
</script>

<style scoped lang="less">
</style>
