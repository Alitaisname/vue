
<script lang="ts">

import axios from "axios";
import qs from 'qs'


export default {

  name: "Login",
  data: function () {
    return {
      loginForm: {
        account: "",
        password: "",
      },
      loginRules: {
        account: [
            { required: true, message: "请输入邮箱", trigger: "blur" },

        ],
        password: [
            { required: true, message: "请输入密码", trigger: "blur"}
        ],
      },

    };
  },
  props: ['loginkg'],
  created() {
    console.log(this.$attrs)
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
   /* ...mapMutations(["changeLogin"]),*/
     qingqiu(){

     },  increment() {
      this.$store.commit('increment')
      console.log(this.$store.state.count)

    },
    submitForm() {
      const userAccount = this.loginForm.account;
      const userPassword = this.loginForm.password;
      if (!userAccount) {
        return this.$message({
          type: "error",
          message: "账号不能为空！",
        });
      }
      if (!userPassword) {
        return this.$message({
          type: "error",
          message: "密码不能为空！",
        });
      }
      console.log("用户输入的账号为：", userAccount);
      console.log("用户输入的密码为：", userPassword);

      axios.post('l/login',qs.stringify({
        name: userAccount,
        password: userPassword
      }) ).then(res=> {
        this.info = res.data.message
        this.status=res.data.status

         this.token= res.data.message.token
        this.id= res.data.message.id
        if(this.status){
          return this.$message({
            type: "error",
            message: this.info ,
          });
        }else {
          console.log(res.data.message)
          window.sessionStorage.setItem("token",this.token)
          window.sessionStorage.setItem("id",this.id)
          this.$store.commit('setNick',res.data.message.nickname)
          this.$store.commit('setUser',res.data.message)
          axios.defaults.headers.post['Authorization'] = this.$store.state.user.token
          this.$router.removeRoute('login')
          this.$router.push('/main')

          return this.$message({
            type: "success",
            message: "登录成功！"
          })
        }
      })
    },


  },
};
</script>
<template>
    <div class="login" style="" id="login3">
      <span id="back">      <router-link to="/main">
        <el-icon size="20px" color="#595fd1" ><Back  style=""/></el-icon>
      </router-link>
      </span>


      <div class="mylogin" align="center">


        <el-form
            :model="loginForm"
            :rules="loginRules"
            ref="loginForm"

            class="loginForm"

            label-position="right"
            style="max-width: 600px"
        >

          <el-form-item label="" prop="account" style="margin-top: 10px">

            <el-row>

              <el-col :span="2">
                <el-icon :size="20" style="vertical-align: middle;"><UserFilled  /></el-icon>
              </el-col>

              <el-col :span="22">
                <el-input
                    class="inps"
                    placeholder=""
                    v-model="loginForm.account"
                >
                </el-input>
              </el-col>

            </el-row>

          </el-form-item>

          <el-form-item label="" prop="password">
            <el-row>
              <el-col :span="2">
              <el-icon :size="20" style="vertical-align: middle"><Lock /></el-icon>
              </el-col>
              <el-col :span="22">
                <el-input
                    class="inps"
                    type="password"
                    placeholder=""
                    v-model="loginForm.password"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item style="margin-top: 40px">
            <el-row style="  flex:1">
              <el-col>
                <el-button type="primary" round class="submitBtn"
                           @click="submitForm" style="margin:0 ;">
                  sign in

                </el-button>
              </el-col>

            </el-row>

          </el-form-item>
          <el-form-item>
            <el-row style="  flex:1">
              <el-col >
                 <h2>or</h2>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item id="r1">
            <el-row style="  flex:1">
              <el-col :span="24" >
              <router-link :to="{ path: '/register' }" >
                <el-button type="info" id=""
                           round  @click="" style="margin:0 auto; width: 100px;">
                  register
                </el-button>
                </router-link>
            </el-col>


            </el-row>

          </el-form-item>


        </el-form>
      </div>
<!--      <div class="mm"></div>-->
    </div>


</template>



<style lang="scss" scoped>
.login{
  width: 100%;
  height: 100%;


    padding: 0;
    margin: 0;

    font-size: 16px;


    font-family: "Source Sans Pro";
   display: flex;
  align-items: center;
  justify-content: center;
}
.mylogin {
  margin: 0 auto;
  padding: 50px 40px 40px 40px;

  width: 100%;
  height: 55%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
#back{
  position: absolute;
  width: 100px;
  height: 100px;
  left: 0;
  top: 0;
}


.inps input {
  border: none;
  background-color: transparent;
  font-size: 4vw /* 16/100 */;
  margin-left: -8px;
  border-radius: 0;
}

.submitBtn,#r1{
  background-color: transparent;
  color: #39f;
  width: 200px;
}

#r1{
  margin-top: 20px;

}




</style>