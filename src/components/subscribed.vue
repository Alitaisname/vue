<template>

       <span id="back">      <router-link to @click="this.$router.back(-1)">
        <el-icon size="20px" color="#10437e" ><i-ep-Back  style=""/></el-icon>
      </router-link>
      </span>

     <div v-for="item in items" :key="item" class="scrollbar-demo-item">
      <el-row >
        <el-col :span="3">
          <div class="touxiang" style="vertical-align: center">
            <el-avatar :size="50" :src="`http://localhost:80/l/${item.user_pic}`" fit="fill" />
          </div>
        </el-col>
        <el-col :span="9" style="display: flex;align-items: center">
          {{item.nickname}}
        </el-col>
        <el-col :span="12" style="float: right">

          <el-button style="margin-top:15px;float: right" v-show="!item.kg" @click="scgz(item)">
            移除粉丝
          </el-button>
        </el-col>
      </el-row>



     </div>


</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "subscribed",
  data() {
    return {
      id: this.$store.state.user.id,
      ids:[],
      items:[],

    }
  },
  beforeMount() {
    axios.defaults.headers.post['Authorization'] = this.$store.state.user.token
    axios.post("/my/cxsbd", qs.stringify({ id: this.$store.state.user.id}))
        .then(res => {

          for (let  i in   res.data.message){
            this.ids[i]=res.data.message[i].fans_id
          }
          console.log(this.ids)
          return this.ids
        }, err => {
          console.log(err)
        })
        .then(res=>{
          axios.defaults.headers.post['Authorization'] = this.$store.state.user.token
          for (let i1 in res) {
            axios.post('/l/userinfo', qs.stringify({id:res[i1]}))
                .then(ress => {
                     let a={id:ress.data.data.id,nickname:ress.data.data.nickname,
                      user_pic:ress.data.data.user_pic,}
                    this.items.push(a)
                  console.log(this.items)
                }
            )
          }
        })

  },
  mounted() {
    console.log(this.items)
  },
  methods:{
    // async cxname(item) {
    //   axios.post('/l/userinfo', qs.stringify({id: item.id})).then(
    //       res => {
    //         console.log(res.data.data.user_pic)
    //         item.nickname=res.data.data.nickname
    //         item.user_pic=res.data.data.user_pic
    //         item.kg=false
    //       }
    //   )
    // },
    scgz(item){
      axios.defaults.headers.post['Authorization'] = this.$store.state.user.token
      axios.post("/my/scgz", qs.stringify({id: item.id, be_id: this.$store.state.user.id}))
          .then(res => {
            item.kg = true;
            console.log(res)
            return this.$message({
              type: "success",
              message: "移除成功！"
            })
          }, err => {
            console.log(err)
          });
    }

  }
}
</script>

<style scoped>
.scrollbar-demo-item {

  align-items: center;
  justify-content: center;
  min-height: 60px;
  max-height: 200px;
  margin-bottom: 10px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  text-align: left;
}
</style>