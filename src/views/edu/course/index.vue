<template>
  <div class="app-container">
    <!-- 表单 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="query.name" placeholder="课程名称" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="query.status" clearable placeholder="课程状态">
          <el-option value="Normal" label="已发布" />
          <el-option value="Draft" label="未发布" />
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table :data="items" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">{{ (query.page - 1) * query.size + scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column prop="title" label="课程名称" width="160" />

      <el-table-column label="课程状态" width="140">
        <template slot-scope="scope">{{ scope.row.status==='Normal'?'已发布':'未发布' }}</template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="课时数" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160" />

      <el-table-column prop="viewCount" label="浏览数量" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="{ path: '/course/add', query: { id: scope.row.id }}">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程基本信息</el-button>
          </router-link>
          <router-link :to="{ path: '/course/chapter', query: { id: scope.row.id }}">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程大纲息</el-button>
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >删除课程信息</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="query.page"
      :page-size="query.size"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getCourseQueryPage"
    />
  </div>
</template>
<script>
//引入teacher
import Course from '@/api/edu/course'
export default {
  data() {
    return {
      total: 0, //总记录数
      query: {
        page: 1, //当前页
        size: 20, //每页记录数
        status: ''
      }, //查询条件
      items: [] //返回的集合
    }
  },
  created() {
    this.getCourseQueryPage()
  },
  methods: {
    //查询条件讲师列表
    getCourseQueryPage(page) {
      if (!!page) this.query.page = page
      Course.listCourseByPage(this.query).then(response => {
        this.items = response.data.items
        //设置
        this.query.page = response.data.page
        this.query.size = response.data.size
        this.total = response.data.total
      })
    },
    //查询条件
    fetchData() {
      this.getCourseQueryPage(1)
    },
    resetData() {
      this.query = {
        page: 1, //当前页
        size: 20, //每页记录数
        status: ''
      }
      this.getCourseQueryPage()

      this.clearConditions()
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          Course.removeCourseById(id).then(response => {
            this.getCourseQueryPage(this.query.page)
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>