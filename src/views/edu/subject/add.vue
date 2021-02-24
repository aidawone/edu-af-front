<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download" />
          <a :href="API+'/oss/file/media?name=课程导入.xls'">点击下载模版</a>
        </el-tag>
      </el-form-item>
      <el-form-item label="选择Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="API+'/back/subject/import'"
          name="file"
          accept="application/vnd.ms-excel"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload"
          >上传到服务器</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false, //加载中
      importBtnDisabled: false,

      API: process.env.VUE_APP_BASE_API
    }
  },
  created() {},
  methods: {
    //文件上传
    submitUpload() {
      this.loading = true
      this.importBtnDisabled = true

      this.$refs.upload.submit()
    },
    //文件上传成功
    fileUploadSuccess(response) {
      this.fileUploadBtnText = '导入成功'
      this.loading = false
      this.$message({
        type: 'success',
        message: '添加课程成功'
      })
      this.$router.push({ path: '/subject/index' })
    },
    fileUploadError() {
      this.fileUploadBtnText = '导入失败'
      this.loading = false
      this.$message({
        type: 'error',
        message: '添加课程失败'
      })
    }
  }
}
</script>