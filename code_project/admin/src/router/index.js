import { createRouter, createWebHashHistory } from 'vue-router'
import MainBox from '../views/MainBox.vue'
import Login from '../views/Login.vue'
import RoutesConfig from './config'
import store from '../store/index'
const routes = [
  {
    path: '/login',
    name: 'login',
    // component: () => import('@/views/Login'),
    component: Login
  },
  {
    path:"/mainbox",
    name:"mainbox",
    // component: () => import('@/views/MainBox') ,
    component: MainBox
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next)=>{
  if (to.name==="login"){
    next()
  }else {
    if(!localStorage.getItem("token")){
      next({

        path:"/login"
      })
    }else{
      // 如果授权登录 next()
      // 未授权，重定向到login
      if(!store.state.isGetterRouter){
        router.removeRoute("mainbox")
        ConfigRouter()
        next({
          path:to.fullPath
        })
      }else {
        next()
      }

    }
  }
})

const ConfigRouter=()=>{
  if(!router.hasRoute("mainbox")){
    router.addRoute(
        {
          path:"/mainbox",
          name:"mainbox",
          // component: () => import('@/views/MainBox') ,
          component: MainBox
        }
    )
  }
  RoutesConfig.forEach(item=>{
    checkPermission(item) && router.addRoute("mainbox", item)
  })
  // 改变isGetterRouter =ture
  store.commit("changeGetterRouter",true)

}

const checkPermission = (item) => {
  if (item.requireAdmin){
    return store.state.userInfo.role === '1' || store.state.userInfo.role === '4';

  }
  return true
}
// RoutesConfig.forEach(item=>{
//   router.addRoute( "mainbox", item)
// })
export default router
