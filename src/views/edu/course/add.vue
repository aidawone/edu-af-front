<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写" />
      </el-form-item>

      <el-form-item label="课程类别">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="请选择"
          @change="changeParentSubject"
        >
          <el-option
            v-for="subject in parentSubjects"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="请选择">
          <el-option
            v-for="subject in childrenSubject"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option v-for="item in teachers" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>
      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description" />
      </el-form-item>

      <!-- 课程封面 TODO -->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="API+'/oss/file/upload'"
          class="avatar-uploader"
        >
          <img :src="courseInfo.cover" />
        </el-upload>
      </el-form-item>
      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />元
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Course from '@/api/edu/course'
import Teacher from '@/api/edu/teacher'
import Subject from '@/api/edu/subject'
import Tinymce from '@/components/Tinymce' //引入组件
export default {
  //声明组件
  components: { Tinymce },
  data() {
    return {
      saveBtnDisabled: false, //控制

      courseInfo: {
        id: '',
        title: '',
        subjectId: '',
        subjectParentId: '',
        teacherId: '',
        lessonNum: 0,
        description: '',
        cover: require('../../../../public/images/home.jpg'),
        price: 0
      },
      teachers: [],
      parentSubjects: [], //一次分类
      childrenSubject: [],
      API: process.env.VUE_APP_BASE_API
    }
  },
  created() {
    this.getTeachers()
    this.getParentSubject()
  },
  methods: {
    next() {
      Course.saveCourse(this.courseInfo).then(response => {
        this.courseInfo.id = response.data.id
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.$router.push({
          path: '/course/chapter',
          query: { id: response.data.id }
        })
      })
    },
    //获取全部
    getTeachers() {
      Teacher.getTeachers().then(response => {
        this.teachers = response.data.items
      })
    },
    //获得一次分类
    getParentSubject() {
      Subject.getSubjectTree().then(response => {
        this.parentSubjects = response.data.items
      })
    },
    changeParentSubject(value) {
      for (let i = 0; i < this.parentSubjects.length; i++) {
        if (this.parentSubjects[i].id === value) {
          this.childrenSubject = this.parentSubjects[i].child
          this.courseInfo.subjectId = ''
        }
      }
    },
    handleAvatarSuccess(res, file) {
      this.courseInfo.cover = res.data.url
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>