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
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 0 条结果：</div>
      <!-- 表格组件 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="cover" label="封面"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="time" label="发布时间"></el-table-column>
        <el-table-column prop="operate" label="操作"></el-table-column>
      </el-table>
      <!-- 分页按钮 -->
      <div style="text-align:center;margin-top:30px">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
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
        end_pubdate: null
      },
      channelOptions: [{ label: 'java', value: '1000' }],
      dateArr: [],
      tableData: []
    }
  }
}
</script>

<style scoped lang="less">
</style>
