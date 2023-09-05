<template>
  <el-header id="mp" style="height: 0;">

  </el-header>

  <el-main id="mp1">
    <div id="tt">
      <a id="shezhi" href="/shezhi">
        <el-icon :size="25" color="#FFFF"><Tools /></el-icon>
      </a>
      <el-image style="width: 100%; height: 100%" :src="this.b_pic" fit="fill" />
      <div class="yuan">
        <el-avatar :size="70" :src="this.user_pic" />
      </div>
    </div>


      <el-row >
        <el-col :span="12" style="display: flex; justify-content: center ;align-items: center;padding-top:10px ">
          <a href="/subscribe" style="width: 50px;height: 50px; text-align: center">
            关注
            <p style="text-align: center">{{subscribe}}</p>
          </a>
        </el-col>
        <el-col :span="12" style="display: flex; justify-content: center ;align-items: center;padding-top:10px">
          <a href="/subscribed" style="width: 50px;height: 50px;">
            被关注
            <p style="text-align: center" >{{fans}} </p>
          </a>
        </el-col>
      </el-row>

    <div class="center-row">
      {{nickname}}
        {{}}
    </div>

<div></div>
    <div style="margin: 10px 20px">
      <KeepAlive>
       <middle v-if="this.dataLoaded" :i="items"></middle>
        </KeepAlive>

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
        id:this.$store.state.user.id,
        items:[],
        subscribe:0,
         fans:0,
      nickname:'',
      b_pic:'',
      user_pic:'',
      dataLoaded:false,
      server_url:axios.defaults.baseURL
    }
  }, computed: {
    b_pic() {
      return this.server_url+'/l/' + this.$store.state.user.b_pic
    },
    user_pic() {
      return this.server_url+'/l/'  + this.$store.state.user.user_pic
    },

  },
  methods:{
    loadData() {
      axios.post("/tiezi/cx", qs.stringify({ id: this.id }))
          .then(res => {
            this.items = res.data.reverse();
            console.log(this.items);
          }, err => {
            console.log(err);
          }).then(
          () => {
            const promises = [];
            for (let i in this.items) {
              promises.push(
                  axios.post('/l/czimg', qs.stringify({ id: this.items[i].wz_id })).then(
                      ress => {
                        this.items[i].imageList = ress.data;
                      }
                  )
              );
            }
            Promise.all(promises).then(() => {
              this.dataLoaded = true;
            });
          }
      )
    },
  },
  beforeMount() {
    this.$router.removeRoute('login')
    axios.defaults.headers.post['Authorization'] = this.$store.state.user.token
    this.nickname=sessionStorage.nickname
    this.loadData();





    axios.post("/my/cxgzs",qs.stringify({id:this.id}))
          .then(res=> {
              this.subscribe=res.data.message
          },err=>{
            console.log(err)
          });

      axios.post("/my/cxfs",qs.stringify({id:this.id}))
          .then(res=> {
            this.fans=res.data.message
          },err=>{
            console.log(err)
          });
    axios.post('/l/userinfo',qs.stringify({id:this.id})).then(
        res=>{

          console.log(  res.data.data.b_pic)
          this.b_pic =this.server_url+'/l/'+  res.data.data.b_pic
          this.user_pic=this.server_url+'/l/'+  res.data.data.user_pic

        },err=>{
          console.log(err)
        }
    )

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
#shezhi{

  height: 35px;
  width: 35px;
  position: absolute;
  z-index: 3;
  right: 0;
  text-align: right;
}
.center-row {
  display: flex;
  justify-content: center; /* 在主轴上居中 */


}
</style>