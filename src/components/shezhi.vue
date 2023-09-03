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
// const handleAvatarSuccess: UploadProps['onSuccess'] = (
//     response,
//     uploadFile
// ) => {
//   imageUrl.value = URL.createObjectURL(uploadFile.raw!)
// }

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')

    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>
<template>

  <el-row id="tt">

       <span id="back">      <router-link to="" @click="this.$router.push(`/main/${this.$store.state.user.id}/user`)">
        <el-icon size="20px" color="#000000" ><Back  style=""/></el-icon>
      </router-link>
      </span>

  </el-row>


  修改背景
  <el-row>


      <router-view name="cc"></router-view>



  </el-row>
  修改头像
  <el-row>
    <router-view name="ccc"></router-view>

  </el-row>
  <el-row>
    <el-col :span="20">

      <el-form
          :model="registerForm"
          :rules="this.registerRules"
          ref="formRef"

          label-position="center"

      >
        <el-form-item label="修改昵称" prop="nickname">
          <el-input
              class="inps"
              :value='registerForm.nickname'
              v-model="registerForm.nickname"

          ></el-input>
        </el-form-item>
      </el-form>

    </el-col>
<el-col :span="4">   <el-button class="ml-3" type="success" @click="submitForm(formRef);submitnick()">
  保存昵称
</el-button>
</el-col>

  </el-row>



      <el-button type="danger" round id="tc"
                 @click="tuichu" style="margin:0 ;">
        退出登录
      </el-button>


</template>

<script lang="ts">
import axios from "axios";
import qs from "qs";
import cc from "./cc.vue";
import ccc from "./ccc.vue";



const validatePass = async (rule: any, value: any, callback: any) => {
  await   axios.post(
      'http://localhost:80/l/register/nick',qs.stringify({
        nickname: value
      }) ).then(res=> {
    if(res.data.status){
      callback(new Error(res.data.message))
    }
  })
  callback()
}
export default {
name: "shezhi",
  methods:{

    submitUpload(){
      // uploadRef.value!.submit()
      let formData = new FormData();
      this.fileList.forEach(item => {
        formData.append("files", item.raw);
      });
      formData.append("id",this.$store.state.user.id)
      axios.post('/l/updateback',formData).then(res=>{
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
    },  handleChange(file, fileList) {
      this.fileList = fileList;
      console.log(this.fileList.length)
    },

    tuichu(){
     window.sessionStorage.clear()
      this.$store.commit('clearuser',this.nickname)
      this.$router.push('/main')

    },
    submitnick(){
      axios.defaults.headers.post['Authorization'] = this.$store.state.user.token
      axios.post('/my/updatenick',qs.stringify({nickname:this.registerForm.nickname}))
          .then(res=> {
            console.log(res)
            if(res.data.status){
              return this.$message({
                type: "error",
                message: this.info ,
              });
            }else {
              console.log(res.data.message)
              this.nickname=this.registerForm.nickname
              this.$store.commit('setNick',this.nickname)
              return this.$message({
                type: "success",
                message: "修改成功！"
              })
            }
          })
    },

    live(){

    }
  },
  data () {
    return {
      id:this.$store.state.user.id,
      nickname:this.$store.state.nickname,
      registerForm:{
        nickname:this.$store.state.nickname,
      },
      registerRules: {
        nickname: [
          {max:16 ,min:1,message: "超出长度",trigger: "blur"},
          {validator:validatePass ,trigger: "blur"},
        ]
      }
    }
  },
components:{
         cc,ccc
  }
}
</script>

<style lang="scss" scoped>

#tc{
  position: absolute;
  bottom: 0;
   width: 100%;

}
#tt{
 border-bottom:1px black solid;
  height: 35px;
  width: 100%;
  padding: 0;
  position: relative;
  div{
    position: absolute;
    font-weight:  500;
    bottom: 0;
    font-size: 40px ;
    color: #49506b;
  }
}

.el-row{
  height: 15%;
  padding: 20px;
}
#back{
  position: absolute;
  left: 0;
  top: 0;
  z-index:4;
}
</style>