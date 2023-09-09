<template>
  <el-header id="mp" style="height: 0;">

  </el-header>

  <el-main id="mp1">
      <span id="back">      <router-link to="" @click="this.$router.go(-1)">
        <el-icon size="20px" color="#FFFFFF" ><i-ep-Back  style=""/></el-icon>
      </router-link>
      </span>
    <div id="tt">

      <el-image style="width: 100%; height: 100%" :src="b_pic" fit="fill" />
      <div class="yuan">
        <el-avatar :size="70" :src="user_pic" />
      </div>
    </div>


   <div>

     <el-button style="margin-top:25px;float: right" v-show="kg" @click="gz" >
       关注
     </el-button>
     <el-button style="margin-top:25px;float: right" v-show="!kg" @click="scgz">
       取消关注
     </el-button>
     <span style="margin-top:31px;float: left;">
        <i style="font-size: 6px;margin-right:5px">id:</i>{{nickname}}
     </span>
   </div>


    <div style="margin: 80px 20px">
      <KeepAlive>
      <middle  v-if="this.dataLoaded" :i="items"></middle> </KeepAlive>
    </div>

  </el-main>

</template>

<script>
import middle from "./middle.vue";
import axios from "axios";
import qs from "qs";

export default {
  data(){
    return {

      items:[],
      kg:true,
      b_pic:'',
      user_pic:'',
      nickname:'',
      dataLoaded:false,
      server_url:axios.defaults.baseURL
    }
  }, computed: {



    use_pic() {
      return this.server_url+'/l/' + this.$store.state.user.user_pic
    },
    getQueryString() {
      let str = window.location.pathname
      let s=''
      for(let i=0;i<str.length;i++){
        if(str.charCodeAt(i)>47&& str.charCodeAt(i)<58){
          s+=str[i];
        }
      }
      return s;
    }

  },
  methods: {
    gz() {
      axios.defaults.headers.post['Authorization'] = this.$store.state.user.token
      axios.post("/my/gz", qs.stringify({be_id: this.getQueryString, id: this.$store.state.user.id}))
          .then(res => {
            this.kg = false;
            console.log(res)
            return this.$message({
              type: "success",
              message: "关注成功！"
            })

          }, err => {
            console.log(err)
          });
    },
    scgz(){
      axios.defaults.headers.post['Authorization'] = this.$store.state.user.token
      axios.post("/my/scgz", qs.stringify({be_id: this.getQueryString, id: this.$store.state.user.id}))
          .then(res => {
            this.kg = true;
            console.log(res)
            return this.$message({
              type: "success",
              message: "取关成功！"
            })
          }, err => {
            console.log(err)
          });
    },
    loadData() {
      axios.post("/tiezi/cx", qs.stringify({ id: this.getQueryString }))
          .then(res => {
            this.items = res.data;
            console.log(this.items);
            return this.items;
          }, err => {
            console.log(err);
          }).then(
          res => {
            const promises = [];
            for (let i in res) {
              promises.push(
                  axios.post('/l/czimg', qs.stringify({ id: res[i].wz_id })).then(
                      ress => {
                        res[i].imageList = ress.data;
                      }
                  )
              );
            }
            Promise.all(promises).then(() => {
              this.items.reverse();
              this.dataLoaded = true;
            });
          }
      )
    },
  },
  beforeMount() {

    axios.defaults.headers.post['Authorization'] = this.$store.state.user.token

    this.loadData();

    axios.post('/l/userinfo',qs.stringify({id:this.getQueryString})).then(
        res=>{

          console.log(  res.data.data.nickname)

            this.nickname=res.data.data.nickname
          this.b_pic =this.server_url+'/l/'+  res.data.data.b_pic
          this.user_pic=this.server_url+'/l/'+  res.data.data.user_pic
        },err=>{
          console.log(err)
        }
    )
    axios.post('/my/cxgz',qs.stringify({be_id:this.getQueryString,id:this.$store.state.user.id}))
        .then(res=>{
          if(res.data.status===0){
            this.kg=false
          }
        })

  },
  components:{middle},
  name: "myPage"
}
</script>

<style scoped>
#tt{
  background-color: #4cae4c;
  height: 26.5%;
  width: 100%;
  padding: 0;
  position: relative;
}
.el-main{
  padding: 0;
}
#mp1{

  z-index: 1;
}
.yuan{
  background-color: lightgoldenrodyellow;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  position: absolute;
  bottom: -35px;
  left: 50%;
  margin-left: -35px;
}
.nav{
  margin-top: 20px;
  display: flex;
  justify-content: space-around;

}
a{
  text-decoration: none;
  color: black;
}
a:link{
  color: black;
}
.mk{
  width: 40px;
  height: 40px;
  background-color: red;
}

#back{
  position: absolute;
  width: 100px;
  height: 100px;
  left: 0;
  top: 0;
  z-index:4;
}
</style>