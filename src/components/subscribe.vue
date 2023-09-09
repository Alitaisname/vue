<template>

       <span id="back">      <router-link to @click="this.$router.back(-1)">
        <el-icon size="20px" color="#10437e" ><i-ep-Back  style=""/></el-icon>
      </router-link>
      </span>

  <div v-for="item in items" :key="item" class="scrollbar-demo-item">
    <el-row>
      <el-col :span="3">
        <div class="touxiang" style="vertical-align: center">
          <el-avatar :size="50" :src="`http://localhost:80/l/${item.user_pic}`" fit="fill" />
        </div>
      </el-col>
      <el-col :span="9" style="display: flex;align-items: center">
        {{item.nickname}}
      </el-col>
      <el-col :span="12" style="float: right">
        <el-button style="margin-top:15px;float: right" v-show="item.kg" @click="gz(item)" >
          关注
        </el-button>
        <el-button style="margin-top:15px;float: right" v-show="!item.kg" @click="scgz(item)">
          取消关注
        </el-button>
      </el-col>
    </el-row>



  </div>
</template>

<script lang="ts">
import axios from "axios";
import qs from "qs";

export default {
name: "subscribe",
  data() {
    return {
      id: this.$store.state.user.id,
      ids:[],
      items:[],
    }
  },
  beforeMount() {
    axios.defaults.headers.post['Authorization'] = this.$store.state.user.token
    axios.post("/my/cxsb", qs.stringify({ id: this.$store.state.user.id}))
        .then(res => {

          for (let  i in   res.data.message){
            this.ids[i]=res.data.message[i].user_id
          }
          console.log(this.ids)
          return this.ids
        }, err => {
          console.log(err)
        })
        .then(res=>{
          axios.defaults.headers.post['Authorization'] = this.$store.state.user.token
          for (let  i1 in   res){
            console.log(i1)
          axios.post("/l/userinfo", qs.stringify({ id:res[i1]}))
              .then(ress => {
                let a={id:ress.data.data.id,nickname:ress.data.data.nickname,
                  user_pic:ress.data.data.user_pic,}
                this.items.push(a)
                console.log(this.items)
              }, err => {
                console.log(err)
              });
          }
        })
  },
  mounted() {
  },
  methods:{

    gz(item) {
      axios.defaults.headers.post['Authorization'] = this.$store.state.user.token
      axios.post("/my/gz", qs.stringify({be_id: item.id, id: this.$store.state.user.id}))
          .then(res => {
            item.kg = false;
            console.log(res)
            return this.$message({
              type: "success",
              message: "关注成功！"
            })
          }, err => {
            console.log(err)
          });
    },
    scgz(item){
      axios.defaults.headers.post['Authorization'] = this.$store.state.user.token
      axios.post("/my/scgz", qs.stringify({be_id: item.id, id: this.$store.state.user.id}))
          .then(res => {
            item.kg = true;
            console.log(res)
            return this.$message({
              type: "success",
              message: "取关成功！"
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