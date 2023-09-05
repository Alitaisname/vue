<template>
  <div class="register">
    <div class="myregister" align="center">
      <el-form
          :model="registerForm"
          :rules="registerRules"
          ref="formRef"
          label-width="100px"
          label-position="center"
          style="max-width: 400px"
      >
        <el-form-item label="昵称" prop="nickname" style="margin-top: 10px">
          <el-row>
            <el-col :span="24">
              <el-input
                  class="inps"
                  placeholder="name"
                  v-model="registerForm.nickname"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
<!--        //从这里开始替换，使注释中间的代码变成邮箱发送和验证的代码-->
        <el-form-item label="登录邮箱" prop="email" style="margin-top: 10px">
          <el-row>
            <el-col :span="24">
              <el-input
                  class="inps"
                  placeholder="email"
                  v-model="registerForm.email"
              ></el-input>
            </el-col>


          </el-row>
        </el-form-item>

        <el-form-item label="验证码" prop="code" style="margin-top: 10px">
          <el-row>
            <el-col :span="9">
              <el-input
                  class="inps"
                  placeholder="email code"
                  v-model="registerForm.code"
              ></el-input>
            </el-col>
            <el-col :span="6">
              <el-button
                  type="primary"
                  class="sendEmailBtn"
                  @click="sendEmail"
                  :disabled="emailSending || !emailValid" >
              {{ emailSending ? `${countdown}秒后重发` : '发送验证码' }} <!-- 显示倒计时 -->
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>


        <!--        //到这里替换完成-->
        <el-form-item label="设置密码" prop="password">
          <el-row>
            <el-col :span="24">
              <el-input
                  class="inps"
                  type="password"
                  placeholder="password"
                  v-model="registerForm.password"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-row>
            <el-col :span="24">
              <el-input
                  class="inps"
                  type="password"
                  placeholder=""
                  v-model="registerForm.checkPass"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="margin-top:55px">
          <el-button
              type="primary"
              round
              class="submitBtn"
              @click="submitForm();"
              style="flex:1;margin-right: 100px"
          >
            register
          </el-button>
        </el-form-item>
        <el-form-item>
          <router-link :to="{ path: '/login' }" style="flex:1 ;margin-right: 100px">
            <p style="color: black">Already registered？
              <a type="info" @click="" style="font-size: 20px;color:rgb(54,166,241)">
                log in
              </a>
            </p>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive ,watch} from 'vue';
import axios from 'axios';
import qs from 'qs';
import  { FormInstance } from 'element-plus';
import {useRouter} from "vue-router";
import { ElMessage } from 'element-plus'
const router = useRouter();
const formRef = ref<FormInstance | null>(null);
const count = ref(0);
const sb = ref(false);


const registerForm = reactive({
  nickname: '',
  account: '',
  password: '',
  checkPass: '',
  email: '', // 新增邮箱字段
  code: '', // 新增邮箱验证码字段
});

const emailSending = ref(false); // 控制发送邮箱验证码按钮是否可点击
const emailValid = ref(false); // 控制邮箱输入框的校验状态
const countdown = ref(0); // 邮箱验证码倒计时

const sendEmail = () => {
  if (registerForm.email) {
    // 校验邮箱格式
    if (!validateEmail(registerForm.email)) {
      // 邮箱格式不正确，显示错误信息或提示用户
      return;
    }

    emailSending.value = true;

    // 发送邮箱验证码的逻辑
    // 你可以在这里调用后端接口发送验证码，然后处理成功或失败的情况
    sendEmailVerification()
    startCountdown();

    // 模拟发送成功后的操作
    setTimeout(() => {
      emailSending.value = false;
      // 开始倒计时
    }, 25000);
  } else {
    // 邮箱为空，显示错误信息或提示用户填写邮箱
  }
};

// 校验邮箱格式的函数
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

// 开始倒计时
const startCountdown = () => {
  countdown.value = 25; // 设置倒计时初始值

  const timer = setInterval(() => {
    countdown.value--;

    if (countdown.value === 0) {
      clearInterval(timer); // 倒计时结束，清除计时器
      emailValid.value = true; // 倒计时结束后，允许重新发送验证码
    }
  }, 1000);
};

// 监听邮箱输入框的变化，当输入框内容变化时重新校验邮箱格式
watch(registerForm, () => {
  emailValid.value = validateEmail(registerForm.email);
});
const sendEmailVerification = () => {
  if (registerForm.email) {
    // 调用后端发送邮箱验证的接口
    axios.post('/l/sendEmail', qs.stringify({ email: registerForm.email }))
        .then((res) => {
          if (res.data.status) {
            ElMessage({
              type: 'error',
              message: res.data.message,
            });
          } else {
            ElMessage({
              type: 'success',
              message: '验证邮件已发送，请检查您的邮箱。',
            });
            window.sessionStorage.setItem("token_e",res.data.message.token)

          }
        })
        .catch((error) => {
          console.error('发送邮箱验证失败:', error);
          ElMessage({
            type: 'error',
            message: '发送邮箱验证失败，请稍后再试。',
          });
        });
  } else {
    ElMessage({
      type: 'error',
      message: '请输入邮箱地址。',
    });
  }
};


const validatePass = async (rule: any, value: any, callback: any) => {
  await axios.post('http://localhost:80/l/register/nick', qs.stringify({
    nickname: value,
  })).then((res) => {
    if (res.data.status) {
      callback(new Error(res.data.message));
    }
  });
  callback();
};

const validatePass1 = async (rule: any, value: any, callback: any) => {
  await axios.post('http://localhost:80/l/register/user', qs.stringify({
    name: value,
  })).then((res) => {
    if (res.data.status) {
      callback(new Error(res.data.message));
    } else {

    }
  });
  callback();
};

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (registerForm.checkPass !== registerForm.password) {
    console.log(`${registerForm.password}~${registerForm.checkPass}`);
    callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
};

const registerRules = reactive({
  nickname: [
    { max: 16, min: 1, message: '超出长度', trigger: 'blur' },
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' },
  ],
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { max: 15, min: 3, message: '账号长度需大于3小于16', trigger: 'blur' },
    { validator: validatePass1, trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { max: 16, message: '超出长度', trigger: 'blur' },
    { min: 6, message: '长度不足', trigger: 'blur' },
  ],
  checkPass: [
    { validator: validatePass2, trigger: 'blur' },
    { required: true, message: '请确认密码', trigger: 'blur' },
  ],
  code:[{ required: true, message: '请输入验证码', trigger: 'blur' }],
  email:[
      { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱地址无效', trigger: 'blur' }
  ]
});

const submitForm = () => {
  if (!formRef.value) return;
  formRef.value.validate((valid) => {
    if (valid) {
      sb.value = true;
      console.log('submit!' + sb.value);
      submit();
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

const submit = () => {
  let info=''
  let status;
  console.log(sb.value);
  if (sb.value) {
    console.log('dd');
    let token=window.sessionStorage.getItem('token_e')
    console.log(token)
    axios.post('http://localhost:80/l/register',
        qs.stringify({
          name: registerForm.account,
          ...registerForm,
          token:token
        })
    ).then((res) => {
      console.log(registerForm);
      info = res.data.message;
      status = res.data.status;

      if (status) {
        return ElMessage({
          type: 'error',
          message: info,
        });
      } else {
        console.log(res);
        router.push({
          path: "/login"
        });
        return ElMessage({
          type: 'success',
          message: '注册成功！',
        });
      }
    });
  }
};

</script>

<style lang="scss" scoped>
.register {
  width: 100%;
  height: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
}

.myregister {
  width: 100%;
  height: 63%;
  display: flex;
  margin: 0 auto;
  justify-content: center;
}

a {
  margin-top: 20px;
}

</style>