<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>
      <!-- 讲师头像：TODO -->
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Teacher from '@/api/edu/teacher'
export default {
  data() {
    return {
      teacher: {
        id: '',
        name: '',
        sort: 0,
        level: '',
        career: '',
        intro: '',
        avatar: ''
      }, //讲师
      saveBtnDisabled: false //提交按钮
    }
  },
  created() {
    if (this.$route.query && this.$route.query.id) {
      const id = this.$route.query.id
      this.showData(id)
    }
  },
  methods: {
    saveOrUpdate() {
      const flag = this.emptyJudge()
      if (flag) return
      this.saveBtnDisabled = true
      //判断新增还是修改

      if (!!!this.teacher.id) {
        this.saveEntity()
      } else {
        this.updataData()
      }
    },
    //参数的非空判断
    emptyJudge() {
      if (!!!this.teacher.name) {
        this.$message.error('名字不能为空！')
        return true
      }

      if (!!!this.teacher.level) {
        this.$message.error('讲师头衔不能为空！')
        return true
      }

      if (!!!this.teacher.career) {
        this.$message.error('资历不能为空！')
        return true
      }

      if (!!!this.teacher.intro) {
        this.$message.error('简介不能为空！')
        return true
      }
      return false
    },
    //新增
    saveEntity() {
      Teacher.addTeacher(this.teacher)
        .then(response => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.$router.push({ path: '/teacher/index' })
        })
        .catch(response => {
          this.$message({
            type: 'error',
            message: '保存失败'
          })
        })
    },
    //更新数据
    updataData() {
      Teacher.updateById(this.teacher).then(response => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        //跳转到之前进来的页面
        this.$router.push({ path: '/teacher/index' })
      })
    },
    //显示数据
    showData(id) {
      Teacher.getTeacherById(id).then(response => {
        this.teacher = response.data.item
      })
    }
  }
}
</script>