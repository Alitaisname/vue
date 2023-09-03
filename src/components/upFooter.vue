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
    <router-view name="smiddle" :i="items2.reverse()"></router-view>
    <router-view name="blank"></router-view>
    <router-view name="middle" :i="items.reverse()"></router-view>
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
 data:function (){
    return {
      items:[],
      items2:[{}]
    }
 },
  methods:{
    handleClick(tab, event){
      if(event.target.innerHTML==="关注<!---->"){
        router.push({ path: '/main/subscribe' })
      }else{
        router.push({ path: '/main' })
        {

          axios.get("/l/gettiezi")
              .then(res=> {
                this.items= res.data
                // console.log()
                // console.log(this.items)
                return this.items
              },err=>{
                console.log(err)
              }).then(
              res=>{

                for(let i in res){
                  axios.post('/l/czimg', qs.stringify({id: res[i].wz_id})).then(
                      ress=>{

                        res[i].imageList=ress.data
                      }
                  )
                }
                console.log(this.items)
              }
          )
          // axios.post()
        }
      }
    },
  },components:{
    middle,blank,smiddle
  },
  beforeMount() {

    axios.get("/l/gettiezi")
        .then(res=> {
          this.items= res.data
          // console.log()
          // console.log(this.items)
          return this.items
        },err=>{
          console.log(err)
        }).then(
        res=>{

          for(let i in res){
            axios.post('/l/czimg', qs.stringify({id: res[i].wz_id})).then(
                ress=>{

                  res[i].imageList=ress.data
                }
            )
          }
          console.log(this.items)
        }
    )
    // axios.post()
  },

}
</script>

<style scoped>

</style>