<template>

  <el-upload
      class="upload-demo"
      action=""
      :show-file-list="true"
      :limit="1"

      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :http-request="handleFileUpload"
      v-model:file-list="fileList"
      name="background"
      :auto-upload="false"
      ref="uploadRef"
      :on-success="handleUploadSuccess"
  >
    <template #trigger>
      <el-button type="primary" style="margin-left: 20px">select file</el-button>

    </template>

    <el-button class="ml-3" type="success" @click="submitUpload" style="margin-left: 20px">
      upload to server
    </el-button>
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />

  </el-upload>
</template>

<script lang="ts" setup>
import {ElMessage, FormInstance, UploadInstance} from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import type { UploadProps } from 'element-plus'
import {UploadUserFile} from "element-plus";

const imageUrl = ref('')
const fileList = ref<UploadUserFile[]>([])
const uploadRef = ref<UploadInstance>()
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}


const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadRef)
  console.log(uploadFile)
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
</script>


<script lang="ts">

import axios from "axios";

export default {
  name: "cc"  ,
  methods: {
    submitUpload() {
      // uploadRef.value!.submit()
      let formData = new FormData();
      this.fileList.forEach(item => {
        formData.append("files", item.raw);
      });
      formData.append("id", this.$store.state.user.id)
      axios.post('/l/updateback', formData).then(res => {
        if (res.data.status) {
          return this.$message({
            type: "error",
            message: res.data.message,
          });
        } else {
          console.log('ddd')
          return this.$message({
            type: "success",
            message: "背景修改成功！",
          });
        }

      })
    }, handleChange(file, fileList) {
      this.fileList = fileList;
      console.log(this.fileList.length)
    },
  }
}
</script>

<style scoped>

</style>