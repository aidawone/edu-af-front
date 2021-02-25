<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>

    <el-button type="button" @click="openCourseForm">添加章节</el-button>
    <!-- 章节 -->
    <ul class="chanpterList">
      <li v-for="chapter in items" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button style type="button" @click="saveVideoByCourse(chapter.id)">添加小节</el-button>
            <el-button style type="button" @click="editShowChapter(chapter.id)">编辑</el-button>
            <el-button type="button" @click="deleteChapter(chapter.id)">删除</el-button>
          </span>
        </p>

        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.child" :key="video.id">
            <p>
              {{ video.title }}
              <span class="acts">
                <el-button style type="button" @click="editSowVideo(video.id)">编辑</el-button>
                <el-button type="button" @click="deleteVideo(video.id)">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>

    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
      <el-form :model="chapterInfo" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapterInfo.title" />
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapterInfo.sort" :min="0" controls-position="right" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title" />
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right" />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.isFree">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <!-- TODO -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Chapter from '@/api/edu/chapter'
import Video from '@/api/edu/video'
export default {
  data() {
    return {
      saveBtnDisabled: false, //控制
      dialogChapterFormVisible: false, //章节弹窗

      dialogVideoFormVisible: false, //课时弹窗
      saveVideoBtnDisabled: false, //确认

      courseInfo: {}, //课程
      items: [], //章节和小节数据

      chapterInfo: {
        id: '',
        sort: 0,
        title: '',
        course_id: ''
      },
      video: {
        //小节
      }
    }
  },
  created() {
    if (this.$route.query && this.$route.query.id) {
      this.courseInfo.id = this.$route.query.id
      this.getChapterVideos()
    }
  },
  methods: {
    saveOrUpdate() {
      //存在id的话就是更新
      if (this.chapterInfo.id) {
        this.updateChapter()
      } else {
        this.saveChapter()
      }
      this.dialogChapterFormVisible = true
    },
    editShowChapter(id) {
      this.dialogChapterFormVisible = true
      Chapter.getChapterById(id).then(response => {
        this.chapterInfo = response.data.items
      })
    },
    openCourseForm(){
       this.dialogChapterFormVisible = true
        this.chapterInfo = {}
    },
    saveChapter() {
      this.chapterInfo.courseId = this.$route.query.id
      Chapter.addChapter(this.chapterInfo).then(response => {
        this.$message({
          type: 'success',
          message: '添加章节成功'
        })
        this.dialogChapterFormVisible = false
        this.getChapterVideos()
      })
    },
    updateChapter() {
      Chapter.updateChapter(this.chapterInfo).then(response => {
        this.$message({
          type: 'success',
          message: '修改章节成功'
        })
        this.dialogChapterFormVisible = false
        this.getChapterVideos()
      })
    },
    deleteChapter(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          Chapter.removeChapterById(id).then(response => {
            this.$message({
              type: 'success',
              message: '删除章节成功'
            })
            this.getChapterVideos()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    previous() {
      this.$router.push({
        path: '/course/add',
        query: { id: this.courseInfo.id }
      })
    },
    next() {
      this.$router.push({
        path: '/course/publish',
        query: { id: this.courseInfo.id }
      })
    },
    //根据id获取章节和小节
    getChapterVideos() {
      Chapter.getChapterVideos(this.courseInfo.id).then(response => {
        this.items = response.data.items
      })
    },
    // ==========================小节=====================================================
    //添加课时
    saveVideoByCourse(id) {

      this.video = {}

      this.dialogVideoFormVisible = true

      this.video.courseId = this.$route.query.id
      this.video.chapterId = id
    },
    //编辑和更新
    saveOrUpdateVideo() {
      if (this.video.id) {
        //更新
        this.updateVideo()
      } else {
        this.saveVideo()
      }
      this.saveVideoBtnDisabled = true
    },
    saveVideo() {
      //赋值
      Video.saveVideoById(this.video).then(response => {
        this.dialogVideoFormVisible = false
        this.$message({
          type: 'success',
          message: '新增课时成功'
        })
        this.getChapterVideos()
      })
    },
    updateVideo() {
      Video.updateVideoById(this.video).then(response => {
        this.dialogVideoFormVisible = false
        this.saveVideoBtnDisabled = true
        this.$message({
          type: 'success',
          message: '更新课时成功'
        })
        this.getChapterVideos()
      })
    },
    editSowVideo(id) {
      this.saveVideoBtnDisabled = false
      this.dialogVideoFormVisible = true
      Video.getVideoById(id).then(response => {
        this.video = response.data.items
      })
    },
    deleteVideo(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          Video.removeVideoById(id).then(response => {
            this.$message({
              type: 'success',
              message: '删除课时成功'
            })
            this.getChapterVideos()
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