import { createRouter, createWebHistory } from 'vue-router'
const register = () => import("../components/register.vue");
const login = () => import("../components/login.vue");
const square = () => import("../components/square.vue");
const blank = () => import("../components/blank.vue");
const middle = () => import("../components/middle.vue");
const upFooter = () => import("../components/upFooter.vue");
const myPage = () => import("../components/myPage.vue");
const unloginhome = () => import("../components/unloginhome.vue");
const write = () => import("../components/write.vue");
const shezhi = () => import("../components/shezhi.vue");
const subscribe = () => import("../components/subscribe.vue");
const subscribed = () => import("../components/subscribed.vue");
const smiddle = () => import("../components/smiddle.vue");
const comment = () => import("../components/comment.vue");
const userpage = () => import("../components/userPage.vue");
const cc = () => import("../components/cc.vue");
const ccc = () => import("../components/ccc.vue");

import { createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      components: {login}
    },
    {
      path: '/main',
      name: 'square',
      components: {square},
      // meta: { keepAlive: true },
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
