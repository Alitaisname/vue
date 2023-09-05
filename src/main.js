import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import  axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import logining from './App.vue'
import { createStore } from 'vuex'
// import Vconsole from 'vconsole'
// //开发环境增加调试面板
// if (import.meta.env.DEV) {
//     new Vconsole()
// }

axios.defaults.baseURL='http://localhost:80';


// 创建一个新的 store 实例

const app = createApp(App)




app.use(VueAxios, axios)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router)

const token_key='token_user'
const nickname='nickname'
const store = createStore({
    state () {

        return {
           user:JSON.parse(window.sessionStorage.getItem(token_key)),
           nickname:window.sessionStorage.getItem(nickname),

        }
    },
    mutations: {
        setUser(state,data){
            state.user=data
            window.sessionStorage.setItem(token_key,JSON.stringify(data))

        },setNick(state,data){
            state.nickname=data
            window.sessionStorage.setItem(nickname,data)
        },clearuser(state,data){
            state.user=null
        }

    }
})
app.use(store)

app.mount('#app')

export default {store}