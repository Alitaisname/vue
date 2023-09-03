<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'


const formRef = ref<FormInstance>()
const count = ref(0)


</script>
<script lang="ts" >
import axios from "axios";
import qs from "qs";
import {FormInstance} from "element-plus";
import {ref} from "vue";
let sb=ref(false)
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      sb.value=true
      console.log('submit!'+sb.value)


    } else {
      console.log('error submit!')
      return false
    }
  })
}

// const a=document.getElementById('r2')
// const b=addEventListener()
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
const validatePass1 = async (rule: any, value: any, callback: any) => {
  await   axios.post(
      'http://localhost:80/l/register/user',qs.stringify({
        name: value
      }) ).then(res=> {
    if(res.data.status){
      callback(new Error(res.data.message))
    }else{

    }
  })
  callback()
}




export default {
  name: "register",
  data(){


    let validatePass2= (rule: any, value: any, callback: any) => {
    if (this.registerForm.checkPass !== this.registerForm.password) {
        console.log(this.registerForm.password+'~'+this.registerForm.checkPass)
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    } //校验器写内部就可以直接用数据进行

    return{


      registerForm:{
        nickname:"",
        account:"",
        password:"",
        checkPass:"",
      },

      registerRules: {
        nickname: [
          {max:16 ,min:1,message: "超出长度",trigger: "blur"},
          {required: true, message: "请输入昵称", trigger: "blur" },
          {validator:validatePass ,trigger: "blur"},
        ],
        account: [
          {required: true, message: "请输入账号", trigger: "blur" },
          {max:15 ,min:3,message: "账号长度需大于3小于16",trigger: "blur" },
          {validator:validatePass1 ,trigger: "blur"}
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur"},
          {max:16 ,message: "超出长度",trigger: "blur" },
          {min:6 ,message: "长度不足",trigger: "blur" },
        ],
        checkPass: [
            { validator: validatePass2, trigger: 'blur' },
          { required: true, message: "请确认密码", trigger: "blur"}
            ],
      }
    }
  },
  methods:{
  //   submitForm(formEl: FormInstance | undefined)  {
  //     if (!formEl) return
  //     formEl.validate((valid) => {
  //       if (valid) {
  //         console.log('submit!')
  //       } else {
  //         console.log('error submit!')
  //         return false
  //       }
  //     })
  //   }
    submit(){

      console.log(sb.value)
      if(sb.value) {
        console.log('dd')
        axios.post('http://localhost:80/l/register', qs.stringify(
            {
              name: this.registerForm.account,
              ...this.registerForm
            }
        )).then(res => {
          console.log(this.registerForm)
          this.info = res.data.message
          this.status = res.data.status
          if (this.status) {
            return this.$message({
              type: "error",
              message: this.info,
            });

          } else {
            console.log(res)
            this.$router.push('/login')

            return this.$message({
              type: "success",
              message: "注册成功！"
            })
          }
        })
      }
    }
  } ,
  mounted() {

  }
  // watch:{
  //   check(newC){
  //     this.validatePass2= (rule: any, value: any, callback: any) => {
  //       if (value === '') {
  //         callback(new Error('Please input the password again'))
  //       } else if (value !== this.registerForm.password) {
  //         console.log(this.registerForm.password)
  //         callback(new Error("Two inputs don't match!"))
  //       } else {
  //         callback()
  //       }
  //     }
  //   }
  // }

}
</script>


<template>
  <div class="register" >
    <div class="myregister" align="center">
<!--      <button  @click="$emit('close')">x</button>-->
<!--      <button @click="count++">{{ count }}</button>-->
      <el-form
          :model="registerForm"
          :rules="registerRules"
          ref="formRef"
          label-width="100px"
          label-position="center"
          style="max-width: 400px"

      >

        <el-form-item label="昵称" prop="nickname" style="margin-top: 10px" >
          <el-row>
            <el-col :span="24">
              <el-input
                  class="inps"
                  placeholder="name"
                  v-model="registerForm.nickname"
              >
              </el-input>
            </el-col>

          </el-row>

        </el-form-item>
        <el-form-item label="登录账号" prop="account" style="margin-top: 10px">
          <el-row>
            <el-col :span="24">
              <el-input
                  class="inps"
                  placeholder="account"
                  v-model="registerForm.account"
              >
              </el-input>
            </el-col>

          </el-row>

        </el-form-item>
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
                  v-model="this.registerForm.checkPass"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item style="margin-top:55px">

          <el-button type="primary" round class="submitBtn"
                     @click="submitForm(formRef);submit();" style="flex:1;margin-right: 100px" >
            register

          </el-button>


        </el-form-item>

        <el-form-item >
          <router-link :to="{ path: '/login' }"  style="flex:1 ;margin-right: 100px">
            <p style="color: black">Already registered？
              <a type="info"    @click="" style="font-size: 20px;color:rgb(54,166,241) ">
                log in{{status}}
              </a>
            </p>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.register{
  width: 100%;
  height: 100%;
  display: flex;
  justify-items: center;
  align-items: center;


}
.myregister{
   width: 100%;
  height: 63%;
  display: flex;
  margin: 0 auto;
  justify-content: center;

}


a{
  margin-top: 20px;
}

</style>