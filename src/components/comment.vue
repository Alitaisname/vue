<template>
  <el-container>
    <el-header style="padding: 0" >  <span id="back">      <router-link to="" @click="this.$router.go(-1)">
        <el-icon size="20px" color="#000" ><Back  style=""/></el-icon>
      </router-link>
      </span>
    </el-header>
    <el-main style="padding: 0">
      <div v-for="(item,k) in this.items" :key="item" class="scrollbar-demo-item" @click="wz_focus()">
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

        <div style="padding:10px 0 0 0;margin:6px 0 " >
          {{item.content }}

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

      <div>全部评论</div>
      <div style="margin-bottom: 50px">
        <div v-for="(item,k) in this.r_items" :key="item" class="scrollbar-demo-item1" style="padding-bottom: 7px">

          <div class="taitou" @click="this.focusInput(item.nickname,item.from_id,k)" >
            <div  >
              <div class="touxiang" @click="move1(item.from_id)">
                <el-avatar  :lazy="true" :size="50" :src="`http://localhost:80/l/${item.user_pic}`" fit="fill" />
              </div>
              <div class="xinxi" style="font-size: small">
                <span>{{ item.nickname}}</span>
                <p>{{item.created}}</p>
              </div>

            </div>
          </div>
          <div class="comment"  style="font-size: small;">


            <span v-if="item.r_type=='response'" @click="move1(item.to_id)" >
              <span style="color:black">回复</span>
              @{{item.to_name}}
            </span>
            <span style="color:black;padding:4px"> {{item.content }}</span>

          </div>

        </div>
      </div>
    </el-main>

    <el-footer style="padding: 0">
      <footer>

        <div class="footer">

          <div class="comment-input" >
            <el-input
                ref="inputRef"
                v-model="comment"
                :autosize="{ minRows: 1, maxRows: 4 }"
                type="textarea"
                :placeholder="placeholder"
                resize="none"
                @focus="this.isButtonVisible=true;"
                @blur="onInputBlur"
            />
          </div>
          <el-button class="comment-button" type="primary" v-if="isButtonVisible" @mousedown="pb">
            评论
          </el-button>
        </div>

      </footer>
    </el-footer>
  </el-container>
  <header>

  </header>




</template>

<script>
import axios from "axios";
import qs from "qs";
import { reactive,ref,toRef,watch,watchEffect } from 'vue';

// 创建一个响应式对象来存储数据
const pl = reactive({});
export default {
  name: "comment",
  data: function () {
    return {
      comment:'',
      id:this.$store.state.user.id ,
      items:{},
      r_items:{},
      wz_id: this.$route.params.id,
      isButtonVisible: false,
      placeholder: 'Please input comment',
      plid:0,
      pl: reactive({}),
      activeId: null
    }
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
    async cxname1(item) {
      axios.post('/l/userinfo', qs.stringify({id: item.from_id})).then(
          res => {
            console.log(res)
            item.nickname=res.data.data.nickname
            item.user_pic=res.data.data.user_pic
          }
      )
      if (item.r_type == 'response') {
        axios.post('/l/userinfo', qs.stringify({id: item.to_id})).then(
            res => {
              console.log(res)
              item.to_name = res.data.data.nickname
            }
        )
      }

    },
    async cxdz(){
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

            this.items= this.items.map(item => {
              if (dzkg_arr.includes(item.wz_id)) {
                item.dzkg = true;
              }
              return item;
            });
            // console.log(this.items[0]);
          })

    },
    list(imgList){
      let arr=[]
      for(let imga of imgList){
        arr.push('http://localhost:80/l/'+imga.img)
      }
      return  arr

    },move1(id){
      this.$router.push(`/main/${id}/userpage`)
    }
    ,
    dz(i){
      i.dzkg=!i.dzkg;
      if(i.dzkg)i.liked++;
      else i.liked--;
      axios.post('/l/gxdz',qs.stringify({id:this.id,wz_id:i.wz_id})).then(
          res=>{
            console.log(res)
          }

      )
    },
    async remark_cx(){
      axios.post('/remark/cxpl',qs.stringify({wz_id:this.items[0].wz_id})).then(
          res=>{
            console.log(res)

            this.r_items=res.data

            for(let i of this.r_items){
             this.cxname1(i)
              i.created=this.formatDateTime(i.created)
            }
          }

      )
    },

    wz_focus(){
      this.pl.remark=this.comment
      this.$refs.inputRef.focus();
    },
    onFocus(){
      if( this.pl.remark){
        this.comment=this.pl.remark
      }
    },
    focusInput(name, id) {
      this.$refs.inputRef.focus();
      this.placeholder = '回复@' + name;

      if (this.pl.hasOwnProperty(id)) {
        this.comment = this.pl[id];
        this.activeId = id;
      } else {
        this.comment = '';
        this.pl[id] = '';
        this.activeId = id; // 设置当前活动的键为 id
      }

      // 创建新的 watch 函数
      this.$watch('comment', (newVal) => {
        if (this.activeId !== null) {
          this.pl[this.activeId] = newVal;
        }
      });
    },

    onInputBlur() {

        this.isButtonVisible = false;


        this.placeholder = '评论..';
        this.plid=0;

      if (this.activeId !== null) {
        this.pl[this.activeId] = this.comment;
        this.activeId = null; // 清空当前活动的键
        this.comment='';
      }
    },



    formatDateTime(dateTimeString) {
      const date = new Date(dateTimeString);
      const currentDate = new Date();
      const diffTime = currentDate.getTime() - date.getTime();
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

      if (diffTime < 24 * 60 * 60 * 1000) {
        if (diffHours === 0) {
          const diffMinutes = Math.floor(diffTime / (1000 * 60));
          return `${diffMinutes}分钟前`;
        } else {
          return `${diffHours}小时前`;
        }
      } else if (diffTime < 2 * 24 * 60 * 60 * 1000) {
        return '昨天';
      } else {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      }
      },

    pb(){
      console.log(this.activeId)
      if (this.activeId) {
        axios.post("/remark/hfpl", qs.stringify({

              to_id: this.activeId,
              content: this.comment,
              from_id: this.id,
              wz_id: this.items[0].wz_id,
              r_type: 'response'
            })
        ).then(res => {
              location.reload();
              return this.$message({
                type: "success",
                message: "评论成功！"
              })

        },err=>{
          console.log(err)
            }
        )
      } else {
        console.log(this.comment)
        axios.post("/remark/fbpl", qs.stringify({


              content: this.comment,
              from_id: this.id,
              wz_id: this.items[0].wz_id,
              r_type: 'remark'
            })
        ).then(res => {
          location.reload();
        })
      }

    }
},
  // watch: {
  //   comment(newVal) {
  //     if (this.activeId !== null) {
  //       this.pl[this.activeId] = newVal;
  //     }
  //   },
  // },
 created() {
   axios.defaults.headers.post['Authorization'] = this.$store.state.user.token
    {

      axios.post("/tiezi/rcx",qs.stringify({wz_id:this.wz_id}))
          .then(res=> {
            this.items= res.data
            this.cxname(this.items[0])
            this.cxdz()
            this.remark_cx()
            // console.log(this.items[0].wz_id)
            axios.post('/l/czimg', qs.stringify({id: this.items[0].wz_id})).then(
                ress=>{
                  console.log(ress)
                  this.items[0].imageList=ress.data
                }
            )
            return this.items
          },err=>{
            console.log(err)
          })
          .then(res=>{
            // console.log(this.items)
          })
    }
  },

}
</script>

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
.scrollbar-demo-item1 {

  align-items: center;
  justify-content: center;
  min-height: 50px;
  max-height: 200px;
  margin-bottom: 10px;
  background: var(--el-color-error-light-9);
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
  font-size: medium;
}
.xinxi>p{
  margin-top:3px;
  font-size:13px;
}
.comment_dz {
  text-align: right;
}

.icons-container {
  display: inline-block;
  margin-right: 20px;
}
footer{

  bottom: 0;
  width: 100%;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.comment-input {
  flex: 1;

}

.comment-button {
  align-self: flex-end;
}
.comment{
  margin-left: 50px;
}
.el-header{
  height: 25px;
}
</style>