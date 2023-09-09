<template>
  <el-header>
    <el-tabs stretch modelValue="second" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="关注" name="first" >
      </el-tab-pane>
      <el-tab-pane label="最新" name="second"></el-tab-pane>
    </el-tabs>
  </el-header>
  <el-main>

    <!--        <div v-if="!logining"  class="tipLogin">-->
    <!--          <router-link to="/login" @click="openLogin">-->
    <!--            <h1>Login in to more..</h1>-->
    <!--          </router-link>-->
    <!--        </div>-->
    <router-view name="smiddle"></router-view>
    <router-view name="blank"></router-view>

    <router-view  name="middle"  v-if="this.dataLoaded"  :i="items"></router-view>
  </el-main>
</template>

<script>
import router from "../router";
import middle from "./middle.vue";
import blank from './blank.vue'
import axios from "axios";
import qs from "qs";
import smiddle from "./smiddle.vue";

export default {
  name: "upFooter",
 data(){
    return {
      items:[],
      items2:[{}],
      item1:[{content: "月下门童喟叹，昨夜太平长安。",date: " 2022-10-26 02:52",dzkg: false,imageList:[], liked: 1,nickname: "心情愉悦的巧克力", remark:3,user_id: 14, user_pic: "35bbbd1575bd891d9518366a280f0976.jpg",wz_id:48}],
      dataLoaded:false,
    }
 },
  methods:{
    loadData() {
      axios.get("/l/gettiezi")
          .then(res => {
            this.items = res.data;
            // console.log()
            // console.log(this.items)
            this.dataLoaded = true
            console.log(this.items)
            return this.items.reverse();

          }, err => {
            console.log(err);
          })
      // .then(
      // res => {
      //   const promises = [];
      //   for (let i in res) {
      //     promises.push(
      //         axios.post('/l/czimg', qs.stringify({ id: res[i].wz_id })).then(
      //             ress => {
      //               res[i].imageList = ress.data;
      //               console.log(i);
      //             }
      //         )
      //     );
      //   }
      //   Promise.all(promises).then(() => {
      //     // 当所有请求都完成后，反转items并设置dataLoaded为true
      //     this.items.reverse();
      //     this.dataLoaded = true;
      //   });
      // }),
    },
    handleClick(tab, event){
      if(event.target.innerHTML==="关注<!---->"){
        router.push({ path: '/main/subscribe' })
      }else{
        router.push({ path: '/main' })
        {

          // axios.get("/l/gettiezi")
          //     .then(res=> {
          //       this.items= res.data
          //       // console.log()
          //       console.log(this.items)
          //       return this.items
          //     },err=>{
          //       console.log(err)
          //     }).then(
          //     res=>{
          //
          //       for(let i in res){
          //         axios.post('/l/czimg', qs.stringify({id: res[i].wz_id})).then(
          //             ress=>{
          //
          //               res[i].imageList=ress.data
          //             }
          //         )
          //       }
          //       console.log(this.items)
          //
          //     }
          // )

        }
      }
    },
  },components:{
    middle,blank,smiddle
  },
  beforeMount() {
    this.loadData();
    // axios.get("/l/gettiezi")
    //     .then(res=> {
    //       this.items= res.data
    //       // console.log()
    //       // console.log(this.items)
    //       return this.items
    //     },err=>{
    //       console.log(err)
    //     }).then(
    //     res=>{
    //
    //       for(let i in res){
    //         axios.post('/l/czimg', qs.stringify({id: res[i].wz_id})).then(
    //             ress=>{
    //
    //               res[i].imageList=ress.data
    //
    //               console.log(i)
    //               if(i===(res.length-1))   this.dataLoaded=true;
    //             }
    //         )
    //       }
    //       console.log(this.items)
    //     }
    // )

  },

}
</script>

<style scoped>

</style>