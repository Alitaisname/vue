<template>
  <el-row style=" ">
    <el-col :span="12">
      <span id="back">
        <router-link to="/main">
          <el-icon size="20px" color="#3f4762"><Back style=""/></el-icon>
        </router-link>
      </span>
    </el-col>
    <el-col :span="12">
      <el-icon size="20px" color="#3f4762" style="float: right" @click="submitUpload"><Promotion /></el-icon>
    </el-col>
  </el-row>
  <el-input
      v-model="textarea2"
      :autosize="{ minRows: 10, maxRows: 32 }"
      type="textarea"
      placeholder="Please input"
      style="font-size: 20px; border: none"
      resize="none"
  />
  <el-upload
      action=""
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :http-request="handleFileUpload"
      v-model:file-list="fileList"
      name="photos"
      :auto-upload="false"
      multiple
      ref="uploadRef"
      :data="textarea2 + id"
      :on-success="handleUploadSuccess"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts" setup>

import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from 'vuex'
import { UploadProps, UploadUserFile, UploadInstance } from 'element-plus'
import { AxiosResponse } from 'axios'
import { ref, computed, onMounted } from 'vue'
import axios from "axios";
const store = useStore()
const router = useRouter()

const textarea2 = ref('')
const fileList = ref<UploadUserFile[]>([])
const uploadRef = ref<UploadInstance | null>(null)
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const id = computed(() => store.state.user.id)

const submitUpload = () => {
  if (!id.value) {
    // 用户未登录或者 Vuex store 尚未初始化
    return // 或者执行一些适当的错误处理
  }

  let formData = new FormData()
  fileList.value.forEach(item => {
    formData.append('files', item.raw)
  })
  formData.append('content', textarea2.value)
  formData.append('id', id.value)

  axios.post('/l/fatie', formData).then((res: AxiosResponse) => {
    if (res.data.status) {
      ElMessage({
        type: 'error',
        message: res.data.message
      })
    } else {
      console.log('发布成功')
      router.go(-1)
      ElMessage({
        type: 'success',
        message: '发布成功！'
      })
    }
  })
}

const handleFileUpload = (fileObject: UploadUserFile) => {
  // 处理文件上传逻辑
}

const handleChange = (file: UploadUserFile, fileList: UploadUserFile[]) => {
  fileList.value = fileList
  console.log(fileList.length)
}

const handlePictureCardPreview = (uploadFile: UploadUserFile) => {
  // 处理图片预览逻辑
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  // 处理文件移除逻辑
}

const handleUploadSuccess = (response: any, file: UploadUserFile, fileList: UploadUserFile[]) => {
  // 处理文件上传成功逻辑
}

</script>

<style lang="scss">
.el-upload--picture-card {
  // 样式定义
}
</style>
