import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 粒子特效
import Particles from "particles.vue3";
//axio
import '@/util/axio.config'

createApp(App)
    .use(Particles)
    .use(ElementPlus)
    .use(store)
    .use(router)
    .mount('#app')
