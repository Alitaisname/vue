import { createRouter, createWebHistory } from 'vue-router'
import register from "../components/register.vue";
import login from "../components/login.vue";
import main from "../components/main.vue";
const blank =()=>import('../components/blank.vue')
import middle from "../components/middle.vue";
import upFooter from "../components/upFooter.vue";
import myPage from "../components/myPage.vue";
import unloginhome from "../components/unloginhome.vue";
const write=()=>import("../components/write.vue");
import shezhi from "../components/shezhi.vue";
import subscribe from "../components/subscribe.vue";
import subscribed from "../components/subscribed.vue";
import smiddle from "../components/smiddle.vue";
import comment from "../components/comment.vue";
import userpage from "../components/userPage.vue";

import cc from "../components/cc.vue";
import ccc from "../components/ccc.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      components: {login}
    },
    {
      path: '/main',
      name: 'main',
      components: {main},
      meta: { keepAlive: true },
      children: [
        {
          path: '',
          name: 'upFooter',
          components: {upFooter},
          children: [
            {path: ':id/subscribe',name:'smiddle', components: {smiddle}},
            {path: '',name:'middle', components: {middle}},
            {path: 'subscribe',name: 'blank',components: {blank}}
          ]
        },
          //
        {
          path:':id/user',
          name: 'myPage',
          components:{myPage}
        },

        {
          path:'user',
          components:{unloginhome}
        },
        {
          path: ':id/userpage',
          name: 'userpage',
          components: {userpage},
          beforeEnter: (to, from, next) => {
            const token = window.sessionStorage.getItem('token');
            if (token) {
              // 如果token存在，允许进入userpage
              next();
            } else {
              // 如果token不存在，跳转到登录页
              next('/login');
            }
          }

        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      components: {register}
    },
    {
      path: '/write',
      name: 'write',
      components:{write}
    },
    {
      path:'/shezhi',
      name:'shezhi',
      components:{shezhi},
      children:[
        { path:'',name:'cc', components: {cc,ccc} },
        // { path:'',name:'ccc', components: {ccc} },
        // 一个路径只能上面写，不能写2个

      ],


    },
    {
      path: '/subscribe',
      name: 'subscribe',
      components:{subscribe}
    },
    {
      path: '/subscribed',
      name: 'subscribed',
      components:{subscribed}
    },
    {

      name: 'comment',
      path:'/:id/comment',
      components:{comment},
      beforeEnter: (to, from, next) => {
        const token = window.sessionStorage.getItem('token');
        if (token) {
          // 如果token存在，允许进入userpage
          next();
        } else {
          // 如果token不存在，跳转到登录页
          next('/login');
        }
      }
    },

  ],
})
router.beforeEach(async (to,from)=>{
       const token=window.sessionStorage.getItem('token')
  const id=window.sessionStorage.getItem('id')
    if(to.path==='/main/subscribe'&&token){
            router.push(`/main/${id}/subscribe`)
    }
  if(to.path==='/main/user'&&token){
    router.push(`/main/${id}/user`)
  }
  if(to.path==='/'){
    router.push(`/main`)
  }
  if(to.path==='/write'&&!token){
    router.push(`/login`)
  }

})
export default router
