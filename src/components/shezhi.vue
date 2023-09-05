<template>
  <el-row id="tt">
    <span id="back">
      <router-link
          to=""
          @click="goToUserProfile"
      >
        <el-icon size="20px" color="#000000"><Back style=""/></el-icon>
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
          :rules="registerRules"
          ref="formRef"
          label-position="center"
      >
        <el-form-item label="修改昵称" prop="nickname">
          <el-input
              class="inps"
              v-model="registerForm.nickname"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="4">
      <el-button class="ml-3" type="success" @click="submitForm(formRef); submitnick()">
        保存昵称
      </el-button>
    </el-col>
  </el-row>

  <el-button type="danger" round id="tc" @click="tuichu" style="margin: 0;">
    退出登录
  </el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'
import qs from 'qs'
import cc from './cc.vue'
import ccc from './ccc.vue'
import { ElMessage } from 'element-plus'
const store = useStore()
const router = useRouter()

const nickname = ref(store.state.nickname) // 声明 nickname 变量并初始化
const fileList = ref([])
const registerForm = ref({
  nickname: nickname.value, // 使用 nickname 变量初始化 registerForm.nickname
})
const registerRules = {
  nickname: [
    { max: 16, min: 1, message: '超出长度', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' },
  ],
}
const goToUserProfile=()=>{
  router.go(-1)
}
function validatePass(rule, value, callback) {
  axios.post(
      'http://localhost:80/l/register/nick',
      qs.stringify({
        nickname: value,
      })
  ).then(res => {
    if (res.data.status) {
      callback(new Error(res.data.message))
    }
  })
  callback()
}

const submitForm = (formEl) => {
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

const submitUpload = () => {
  let formData = new FormData()
  fileList.value.forEach(item => {
    formData.append('files', item.raw)
  })
  formData.append('id', store.state.user.id)
  axios.post('/l/updateback', formData).then(res => {
    if (res.data.status) {
      ElMessage({
        type: 'error',
        message: res.data.message,
      })
    } else {
      console.log('ddd')
      ElMessage({
        type: 'success',
        message: '背景修改成功！',
      })
    }
  })
}

const handleChange = (file, fileList) => {
  fileList.value = fileList
  console.log(fileList.value.length)
}

const tuichu = () => {
  window.sessionStorage.clear()
  store.commit('clearuser', nickname)
  router.push('/main')
}

const submitnick = () => {
  const info = '' // 初始化 info 变量为一个空字符串
  axios.defaults.headers.post['Authorization'] = store.state.user.token
  axios.post('/my/updatenick', qs.stringify({ nickname: registerForm.value.nickname })).then(res => {
    console.log(res)
    if (res.data.status) {
      ElMessage({
        type: 'error',
        message: res.data.message // 使用 info 变量
      })
    } else {
      console.log(res.data.message)
      nickname.value = registerForm.value.nickname
      store.commit('setNick', nickname.value)
      ElMessage({
        type: 'success',
        message: '修改成功！',
      })
    }
  })
}


</script>

<style lang="scss" scoped>
#tc {
  position: absolute;
  bottom: 0;
  width: 100%;
}

#tt {
  border-bottom: 1px black solid;
  height: 35px;
  width: 100%;
  padding: 0;
  position: relative;

  div {
    position: absolute;
    font-weight: 500;
    bottom: 0;
    font-size: 40px;
    color: #49506b;
  }
}

.el-row {
  height: 15%;
  padding: 20px;
}

#back {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 4;
}
</style>
