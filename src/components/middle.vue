
<script>

import axios from "axios";
import qs from "qs";
import IconCommunity from './icons/IconCommunity.vue'

export default {
  name: "mainpage",
  props:['i'],
  data: function () {
    return {

       id:'',
        name:[],
      items:[],
      times:1
    }
  },components:{
    IconCommunity
  },
  methods:{
    async cxname(item) {
      axios.post('/l/userinfo', qs.stringify({id: item.user_id})).then(
          res => {

             item.nickname=res.data.data.nickname
            item.user_pic=res.data.data.user_pic

          }

      )

    },
    async deltz(id1) {
      axios.post('/tiezi/del', qs.stringify({ wz_id: id1 }))
          .then(response => {
            if (response.status === 200) {
              console.log(response);
              // 在这里可以执行一些操作，比如刷新帖子列表等
              // 在这里可以执行一些操作，比如刷新帖子列表等

              // 找到要删除的帖子在数组中的索引
              const index = this.items.findIndex(item => item.wz_id === id1);

              // 如果找到了，从数组中删除该帖子
              if (index !== -1) {
                this.items.splice(index, 1);
              }
              console.log('帖子删除成功');
            } else {
              console.log('帖子删除失败');
            }
          })
          .catch(error => {
            console.error('删除帖子时发生错误:', error);
            // 在这里处理错误
          });
    }
,

    list(imgList){
      let arr=[]
      for(let imga of imgList){
        arr.push('http://localhost:80/l/'+imga.img)
      }
      return  arr

    },
    // move(id){
    //   if(this.id)
    //  this.$router.push(`/${id}/comment`)
    //   else this.$router.push(`/login`)
    // },move1(id){
    //   if(this.id)
    //   this.$router.push(`/main/${id}/userpage`)
    //   else this.$router.push(`/login`)
    // },
    move(id){

        this.$router.push(`/${id}/comment`)

    },move1(id){

        this.$router.push(`/main/${id}/userpage`)

    },
    async handleAsyncData(data) {
      if(this.$store.state.user)
      this.id=this.$store.state.user.id;
      // 异步操作props的i
      console.log(data)
      this.items=Array.from(data)

      axios.post('/l/dz', qs.stringify({ id: this.id })).then(
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

            for (let i = 0; i < this.items.length; i++) {
              this.items[i].dzkg = false;

            }

            this.items = this.items.map(item => {
              if (dzkg_arr.includes(item.wz_id)) {
                item.dzkg = true;
              }
              return item;
            });
            // console.log(this.items[0]);
          }


      );






    },

    //  cztp(item) {
    //   axios.post('/l/czimg', qs.stringify({id: item.wz_id})).then(
    //       res=>{
    //         console.log(res)
    //         item.imgList=res
    //
    //       }
    //   )
    // }
    dz(i){
       i.dzkg=!i.dzkg;
        if(i.dzkg)i.liked++;
        else i.liked--;
       axios.post('/l/gxdz',qs.stringify({id:this.id,wz_id:i.wz_id})).then(
           res=>{
             console.log(res)
           }

       )

    },c(){

    }

  },
  watch: {
    i: {
      immediate: true, // 立即执行监听回调
      handler(newVal) {
        // 异步数据变化时的处理逻辑
        this.handleAsyncData(newVal);
      }
    },

  },

  // mounted() {
  //   console.log(this.i)
  //   this.items = Array.from(this.i);
  //   console.log(this.items)
  //   }
  // }//异步的是props i是拿不到的


}


</script>

<template>
<!--  <div>-->
<!--    <div v-if="this.items.length > 0">-->
<!--      {{ this.items[0].content }}-->
<!--    </div>-->
<!--    <div v-else>-->
<!--      No items available.-->
<!--    </div>-->
<!--  </div>-->
  <el-scrollbar >

    <div v-for="(item,k) in this.items" :key="item" class="scrollbar-demo-item">

    <div style="display: none"> {{cxname(item)}}</div>
      <div class="taitou"  >
        <div  >
          <div class="touxiang" @click="move1(item.user_id)">
            <el-avatar  :lazy="true" :size="50" :src="`http://localhost:80/l/${item.user_pic}`" fit="fill" />
          </div>
          <div class="xinxi">
            <span>{{ item.nickname}}</span>
            <p>{{item.date}}</p>
          </div>

          <el-button   plain @click="deltz(item.wz_id)" v-show="this.$store.state.user && this.$store.state.user.id === 12">
            X
          </el-button>
        </div>
      </div>

      <div style="padding:10px 0 0 0 ;margin:6px 0" @click="move(item.wz_id)">
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
      <div class="comment_dz" >
        <div class="icons-container">
          <span style="margin-right:25px">
            <el-icon style="font-size: 18px;"  @click="move(item.wz_id)"><ChatRound /></el-icon>
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



<style lang="scss" scoped>
.scrollbar-demo-item {

  align-items: center;
  justify-content: center;
  min-height: 110px;
  max-height: 600px;
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
  margin-left: 17px;
}

.comment_dz {
  text-align: right;
}

.icons-container {
  display: inline-block;
  margin-right: 20px;
}

.xinxi>p{
  margin-top:3px;
  font-size:13px;
}
</style>
<style scoped>


</style>