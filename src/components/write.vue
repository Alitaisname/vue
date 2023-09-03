<script lang="ts">
import router from "../router";
import axios from "axios";
import qs from "qs";

export default {
  name: "write",
  data:function (){
    return{
      textarea2:'',
      obj:{content:this.textarea2}
    }
  },
  methods:{
    submitUpload(){
      // uploadRef.value!.submit()
      let formData = new FormData();
      this.fileList.forEach(item => {
        formData.append("files", item.raw);
      });
      formData.append("content", this.textarea2);
      formData.append("id",this.$store.state.user.id)
      axios.post('/l/fatie',formData).then(res=>{
        if (res.data.status) {

          return this.$message({
            type: "error",
            message: res.data.message,
          });
        } else {
          console.log('ddd')
          this.$router.go(-1)
          return this.$message({
            type: "success",
            message: "发布成功！",
          });
        }
      })

    },
    handleFileUpload(fileObject) {

      // let fd = new FormData();
      //
      //
      // fd.append("content", this.textarea2);
      // fd.append("id",this.$store.state.user.id)
      //
      // fd.append("file", fileObject.file);
      //
      // axios.post('/l/fatie',fd).then(res=>{
      //   console.log('ddd')
      //   this.$router.go(-1)
      // })
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
      console.log(this.fileList.length)
    },
    // onlytext(){
    //   if (!this.fileList.length&&this.textarea2) {
    //     axios.defaults.headers.post['Authorization'] = this.$store.state.user.token
    //
    //     axios.post('http://127.0.0.1:80/tiezi/add', qs.stringify({
    //       user_id: this.$store.state.user.id,
    //       content: this.textarea2
    //
    //     })).then(res => {
    //
    //       if (res.data.status) {
    //         return this.$message({
    //           type: "error",
    //           message: this.info,
    //         });
    //       } else {
    //
    //         return this.$message({
    //           type: "success",
    //           message: "发布成功！",
    //         });
    //       }
    //     })
    //   }
    // }
  }
}
</script>

<template>

  <el-row style=" ">
    <el-col :span="12">
         <span id="back">      <router-link to="/main">
        <el-icon size="20px" color="#3f4762"><Back style=""/></el-icon>
      </router-link>
      </span>
      </el-col>
    <el-col :span="12">

        <el-icon size="20px" color="#3f4762" style="float: right"  @click="submitUpload();"><Promotion /></el-icon>

    </el-col>

  </el-row>
  <el-input
      v-model="textarea2"
      :autosize="{ minRows: 10, maxRows:32 }"
      type="textarea"
      placeholder="Please input"
      style="font-size: 20px;border: none"
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
      :data="textarea2+this.$store.state.user.id"
      :on-success="handleUploadSuccess"
  >

    <el-icon><Plus />

    </el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps, UploadUserFile,UploadInstance } from 'element-plus'
import { computed} from "vue";
import { useStore } from "vuex";

let store = useStore();

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
<style lang="scss">
.el-upload--picture-card{
 
}

</style>