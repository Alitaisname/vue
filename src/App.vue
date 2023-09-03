
<script>
import login from "./components/login.vue";
import register from "./components/register.vue";
import router from "./router";
import { mapMutations } from "vuex";
export default {
  components:{
    login,register
  },
  data(){
    return{
      logining: false,
      loginkg:false,
      status:'',
      info:'',
      activeName:'second',
    }
  },
  methods:{
    openLogining(){
       if(!this.logining){
         this.loginkg=true;
       }
    },
    closeLogin(){
      this.loginkg=false
    },
    handleClick(tab, event){
      if(event.target.innerHTML==="关注<!---->"){
        router.push({ path: '/subscribe' })
      }else{
        router.push({ path: '' })
      }
    },

    subscribePage(){
    }
  },

}

</script>
<template>
<!--  <div class="common-layout" v-if="!loginkg">-->
<!--    <el-container>-->
<!--      <el-header>-->
<!--        <el-tabs stretch v-model="activeName" class="demo-tabs" @tab-click="handleClick">-->
<!--          <el-tab-pane label="关注" name="first" >-->
<!--          </el-tab-pane>-->
<!--          <el-tab-pane label="最新" name="second"></el-tab-pane>-->
<!--        </el-tabs>-->
<!--      </el-header>-->
<!--      <el-main>-->
<!--        <div v-if="!logining"  class="tipLogin">-->
<!--          <router-link to="/login" @click="openLogin">-->
<!--            <h1>Login in to more..</h1>-->
<!--          </router-link>-->
<!--        </div>-->



<!--      </el-main>-->
<!--      <el-footer>Footer</el-footer>-->
<!--    </el-container>-->
<!--  </div>-->
  <router-view name="main"></router-view>
  <router-view name="comment"></router-view>
  <router-view  name="login" ></router-view>
  <router-view name="register"></router-view>
  <router-view name="write"></router-view>
  <router-view name="shezhi"></router-view>
  <router-view name="subscribe"></router-view>
  <router-view name="subscribed"></router-view>

<!--  <login v-if="loginkg" :loginkg="loginkg" @closeL="closeLogin" id="login3"></login>-->
<!-- <register></register>-->
</template>

<style lang="scss">
//.el-row {
//  margin-bottom: 20px;
//}

.el-row:last-child {
  margin-bottom: 0;
}


.common-layout ,.el-container{
  height: 100%;
}

#login3 .el-form-item__error{
  position: absolute;
  margin-left: 20px;
  font-size: 1vw;
}

.grid-content {
  border-radius: 4px;
  min-height: 35px;
}
.el-tabs__nav-scroll{
  width:50%;
  margin:0 auto
}
.el-tabs__nav-wrap::after {
     height: 0;
   }
.tipLogin{

}
</style>
