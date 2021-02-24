<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>
    <el-form label-width="120px">
      <ul class="chanpterList">
        <li v-for="chapter in items" :key="chapter.id">
          <p>
            {{ chapter.title }}
            <span class="acts">
              <el-button type="text">添加课时</el-button>
              <el-button style type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </span>
          </p>
          <!-- 视频 -->
          <ul class="chanpterList videoList">
            <li v-for="video in chapter.child" :key="video.id">
              <p>
                {{ video.title }}
                <span class="acts">
                  <el-button type="text">编辑</el-button>
                  <el-button type="text">删除</el-button>
                </span>
              </p>
            </li>
          </ul>
        </li>
      </ul>

      <el-form-item align="center">
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Chapter from '@/api/edu/chapter'
export default {
  data() {
    return {
      saveBtnDisabled: false, //控制
      course: '',
      items: [] //章节和小节数据
    }
  },
  created() {
    if (this.$route.query && this.$route.query.id) {
      console.log('this.$route.query :>> ', this.$route.query)
      this.course = this.$route.query.id
      this.getChapterVideos()
    }
  },
  methods: {
    previous() {
      this.$router.push({ path: '/course/add', query: { id: this.course } })
    },
    next() {
      this.$router.push({ path: '/course/publish', query: { id: this.course } })
    },
    //根据id获取章节和小节
    getChapterVideos() {
      Chapter.getChapterVideos(this.course).then(response => {
        this.items = response.data.items
      })
    }
  }
}
</script>

<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li {
  position: relative;
}
.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.chanpterList .acts {
  float: right;
  font-size: 14px;
}
.videoList {
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd;
}
</style>