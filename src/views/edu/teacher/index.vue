<template>
  <div class="app-container">
    <!-- 表单 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="query.name" placeholder="讲师名称" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="query.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="query.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="query.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <el-table :data="items" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template v-slot="scope">{{ (query.page - 1) * query.size + scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="80" align="center"></el-table-column>
      <el-table-column prop="level" label="头衔" width="180" align="center">
        <template v-slot="scope">{{ scope.row.level===1?"高级讲师":"首席讲师"}}</template>
      </el-table-column>
      <el-table-column prop="career" label="资历" align="center"></el-table-column>
      <!-- <el-table-column prop="name" label="头像" width="180"></el-table-column> -->
      <el-table-column prop="sort" label="排序" width="60" align="center"></el-table-column>
      <!-- <el-table-column prop="name" label="是否删除" width="180"></el-table-column> -->
      <el-table-column prop="gmtCreate" label="创建时间" width="200" align="center"></el-table-column>
      <el-table-column prop="gmtModified" label="操作时间" width="200" align="center"></el-table-column>

      <el-table-column label="操作" width="200" fixed="right" align="center">
        <template v-slot="scope">
          <!-- <router-link :to="'/teacher/edit?id='+scope.row.id"> -->
          <router-link :to="{ path: 'edit', query: { id: scope.row.id }}">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >删除</el-button>
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
      @current-change="getTeacherQueryPage"
    />
  </div>
</template>
<script>
//引入teacher
import Teacher from '@/api/edu/teacher'

export default {
  data() {
    return {
      total: 0, //总记录数
      query: {
        page: 1, //当前页
        size: 20 //每页记录数
      }, //查询条件
      items: [] //返回的集合
    }
  },
  created() {
    //从localstrh获取条件
    // let query = localStorage.getItem('query') || ''
    // if (!!query) this.query = JSON.parse(query)
    this.getTeacherQueryPage()
  },
  methods: {
    //查询条件讲师列表
    getTeacherQueryPage(page) {
      if (!!page) this.query.page = page
      Teacher.getTeacherQueryPage(this.query).then(response => {
        this.items = response.data.items
        //设置
        this.query.page = response.data.page
        this.query.size = response.data.size
        this.total = response.data.total
      })
      // if (this.query.page > 1) this.saveConditions()
    },
    //查询条件
    fetchData() {
      // this.saveConditions()
      this.getTeacherQueryPage(1)
    },
    resetData() {
      this.query = {}
      this.getTeacherQueryPage( )

      this.clearConditions()
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          Teacher.removeById(id).then(response => {
            this.getTeacherQueryPage(this.query.page)
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
    },
    // //保存条件到本地
    // saveConditions() {
    //   localStorage.setItem('query', JSON.stringify(this.query))
    // },
    // //清除
    // clearConditions() {
    //   localStorage.removeItem('query')
    // }
  }
}
</script>