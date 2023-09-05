<template>
  <div class="common-layout" >
    <el-container>
       <router-view name="upFooter"></router-view>
      <KeepAlive> <router-view name="myPage"></router-view></KeepAlive>

      <router-view name="unloginhome"></router-view>
      <router-view name="userpage"></router-view>
      <el-footer>
        <el-row :gutter="0">
            <el-col :span="10">
              <a href="/main">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-easel2" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 0a.5.5 0 0 1 .447.276L8.81 1h4.69A1.5 1.5 0 0 1 15 2.5V11h.5a.5.5 0 0 1 0 1h-2.86l.845 3.379a.5.5 0 0 1-.97.242L12.11 14H3.89l-.405 1.621a.5.5 0 0 1-.97-.242L3.36 12H.5a.5.5 0 0 1 0-1H1V2.5A1.5 1.5 0 0 1 2.5 1h4.691l.362-.724A.5.5 0 0 1 8 0ZM2 11h12V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5V11Zm9.61 1H4.39l-.25 1h7.72l-.25-1Z"/>
                </svg>
              </a>

            </el-col>
          <el-col :span="4" style="display:flex;
            justify-items: center;
            align-items: center ;
             padding: 0;"
                  @click="publish"
            >
            <el-button round style="flex:1">
              <el-icon>
                <Plus/>
              </el-icon>
            </el-button>
          </el-col>
          <el-col :span="10" >
            <a href="/main/user" >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
              </svg>
            </a>


          </el-col>
        </el-row>

      </el-footer>
    </el-container>
  </div>
</template>

<script>
import router from "../router";

export default {

  name: "square",


  methods:
      {
        publish() {
          if (this.$store.state.user==null)
            this.$router.push('/login')
          else
            this.$router.push('/write')
        }
      }
}
</script>

<style lang="scss" scoped>
.el-col{
 line-height: 1;
  padding: 0 20px;

}
.el-footer{
  padding: 0;
  width:100% ;
}
.el-row{
   width: 100%;
  height: 100%;

}
a{
  color: black;

  height: 100%;
  width: 100%;
  display: flex;
  justify-items: center;
  align-items: center ;
  svg{
    flex:1
  }
}

</style>