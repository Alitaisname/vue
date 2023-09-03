
<script lang="ts">

import axios from "axios";
import qs from "qs";
let items:[{}]
export default {
  name: "smiddle",
  props:['i'],
  data: function () {
    return {

      id:this.$store.state.user.id ,
      name:[],
      items:[],
      items2:[]
    }
  },methods:{
    list(imgList){
      let arr=[]
      for(let imga of imgList){
        arr.push('http://localhost:80/l/'+imga.img)
      }
      return  arr
    }, async cxdz(){

      axios.post('/l/dz', qs.stringify({id: this.id})).then(
          res => {
            console.log(res)

          }

      )
    },dz(i){
      i.dzkg=!i.dzkg;
      if(i.dzkg)i.liked++;
      else i.liked--;
      axios.post('/l/gxdz',qs.stringify({id:this.id,wz_id:i.wz_id})).then(
          res=>{
            console.log(res)
          }

      )

    },

    move(id){
      this.$router.push(`/${id}/comment`)
    },move1(id){
      this.$router.push(`/main/${id}/userpage`)
    },
    // async cxname(item) {
    //   axios.post('/l/userinfo', qs.stringify({id: item.id})).then(
    //       res => {
    //         item.nickname=res.data.data.nickname
    //         item.user_pic=res.data.data.user_pic
    //       }
    //   )
    //   // axios.post("/tiezi/cx",qs.stringify({ id:item.id}))
    //   //     .then(res=> {
    //   //       console.log(res)
    //   //       item.content= res.data
    //   //     },err=>{
    //   //       console.log(err)
    //   //     });
    // },
    // async cxtiezi(item){
    //   axios.post("/tiezi/cx",qs.stringify({ id:item.id}))
    //       .then(res=> {
    //         item.content= res.data.message
    //       },err=>{
    //         console.log(err)
    //       });
    // }

  },computed:{

  },
  created() {
    axios.defaults.headers.post['Authorization'] = this.$store.state.user.token
    axios.post("/my/cxsb", qs.stringify({id: this.$store.state.user.id}))
        .then(res => {
          console.log(typeof this.items)

          for (let i=0;i<res.data.message.length;i++) {
            console.log( res.data.message[i].user_id)
            this.items[i]= res.data.message[i].user_id
          }
          console.log(this.items)
          return this.items
        }, err => {
          console.log(err)
        })//第一个then拿关注用户的id列表

    //     .then(res=>{
    //       for (let item in res)
    //       axios.post('/l/userinfo', qs.stringify({id: item})).then(
    //           res => {
    //             res[item.nickname=res.data.data.nickname
    //             item.user_pic=res.data.data.user_pic
    //           }
    //       )
    //
    // })
        .then(res => {
          console.log(res)

           for (let it =0; it<res.length; it++ ) {                             //循环查询每个id的帖子
             console.log(res[it])
             axios.post("/tiezi/cx", qs.stringify({id: res[it]}))
                 .then(ress => {
                   this.items2.push(...ress.data)
                   this.items2.sort((a,b)=>{return b.wz_id-a.wz_id})
                   console.log(this.items2)
                   for (let i1 in this.items2){
                     // console.log(i1)
                     axios.post('/l/userinfo', qs.stringify({id: this.items2[i1].user_id})).then(
                         res => {
                           this.items2[i1].nickname=res.data.data.nickname
                           this.items2[i1].user_pic=res.data.data.user_pic
                         }
                     )
                   } //每个帖子拿用户信息刷出来

                   for(let i in this.items2){

                     axios.post('/l/czimg', qs.stringify({id: this.items2[i].wz_id})).then(
                         resss=>{
                           this.items2[i].imageList=resss.data
                         }
                     )

                   }//每个帖子拿图片刷出来


                   for(let i in this.items2){
                     axios.post('/l/dz', qs.stringify({ id:  this.$store.state.user.id })).then(
                         res => {
                           const data = res.data;
                           const dzkg_arr = [];

                           const wz_ids = new Set(); // 使用 Set 对象来存储去重后的 wz_id

                           for (let i = 0; i < data.length; i++) {
                             wz_ids.add(data[i].wz_id); // 将 wz_id 添加到 Set 中
                           }

                           // 将 Set 转换为数组，并存入 dzkg_arr
                           wz_ids.forEach(wz_id => {
                             dzkg_arr.push(wz_id);
                           });

                           // console.log(dzkg_arr); // 输出去重后的数组

                           for (let i = 0; i < this.items2.length; i++) {
                             this.items2[i].dzkg = false;
                           }
                           console.log(dzkg_arr)

                           this.items2 = this.items2.map(item => {
                             if (dzkg_arr.includes(item.wz_id)) {
                               item.dzkg = true;
                             }
                             return item;
                           });
                           // console.log(this.items[0]);
                         }
                     );
                   }


                 }, err => {
                   console.log(err)
                 })//每个帖子都要执行的操作

           }
         }
        )
  },
  mounted() {



  }
}
</script>

<template>

  <el-scrollbar >


    <div v-for="(item,k) in items2" :key="item" class="scrollbar-demo-item">

<!--      <div style="display: none"> {{cxname(item)}}</div>-->
      <div class="taitou"  @click="move1(item.user_id)">
        <div  >
          <div class="touxiang">
            <el-avatar  :lazy="true" :size="50" :src="`http://localhost:80/l/${item.user_pic}`" fit="fill" />
          </div>
          <div class="xinxi">
            <span>{{ item.nickname}}</span>
            <p>{{item.date}}</p>
          </div>

        </div>
      </div>

      <div style="padding:10px 0 0 0 " @click="move(item.wz_id)">
        {{ item.content }}

      </div>
      <div  >
        <el-image
            v-for="imga in item.imageList"
            style="width: 100px; height: 100px ;margin-right:5px; "
            :src="`http://localhost:80/l/${imga.img}`"
            :preview-src-list="list(item.imageList)"
            :initial-index="0"
            fit="cover"
            :lazy="true"
        />

      </div>
      <div class="comment_dz">
        <div class="icons-container">
          <span style="margin-right:25px">
            <el-icon style="font-size: 18px;"><ChatRound /></el-icon>
           <span style="position: relative;top: -3px;left:5px;font-size: 14px">{{item.remark}}</span>
          </span>

          <span  v-if="item.dzkg" @click="dz(item)" >
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(220,53,69)" class="bi bi-heart-fill" viewBox="0 0 16 16" >
  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
</svg>
            </span>
          <span v-else @click="dz(item)" >
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16" @click="love">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
          </svg>
            </span>
          <span style="position: relative;top: -3px;left:5px;font-size: 14px">{{item.liked}}</span>


        </div>
      </div>


    </div>
  </el-scrollbar>

</template>



<style scoped>
.scrollbar-demo-item {

  align-items: center;
  justify-content: center;
  min-height: 110px;
  max-height: 200px;
  margin-bottom: 10px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  text-align: left;
}
.taitou{
  text-decoration: none;
  color: black;
  width: 100%;
  height: 50px;
  padding-top: 5px;
  display: block;

}

.touxiang{
  background-color: lightgoldenrodyellow;
  width: 40px;
  height:40px;
  border-radius: 120px;
  float: left;
  z-index: 2;
}
.xinxi{
  text-align: left;
  float: left;
  margin-left: 10px;
}

.comment_dz {
  text-align: right;
}

.icons-container {
  display: inline-block;
  margin-right: 20px;
}

</style>
<style scoped>


</style>