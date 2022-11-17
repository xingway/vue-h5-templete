 import Vue from 'vue'
import Router from 'vue-router'
import allRouter from './router'
import store from '@/store'
import { getToken,setTitle } from '@/util/util'

Vue.use(Router)


const router = new Router({
  mode: 'history',
  routes: allRouter
})

const LOGIN_PAGE_NAME = 'login'
const whitelist = ['login','register',]
function isWhite(name){
  let _true =  whitelist.some(item=>{
    return name.indexOf(item) > -1
  })
  return _true
}

router.beforeEach((to, from, next) => {
  const token = getToken()
  console.log("token", token)
  console.log("to.path", to.path)
  console.log("to.name", to.name)
  console.log("isWhite", isWhite(to.name))
  if (!token && (to.name !== LOGIN_PAGE_NAME&&!isWhite(to.name))) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && isWhite(to.name)) {
    // 未登陆且要跳转的页面是白名单
    console.log("to.path", to.path)
    next() // 跳转
    
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: 'me_index' // 跳转到homeName页
    })
  } else {
    if (store.state.hasUserInfo) { 
      if(to.name.indexOf('center') > -1 ){
        store.commit('setActive','center')   
      }else{
        store.commit('setActive','index') 
      }
      next()
    }else{
      store.dispatch('getUserInfo').then(res=>{
        if(to.name.indexOf('center') > -1){
          store.commit('setActive','center')   
        }else{
          store.commit('setActive','index') 
        }
        next()
      })
    }

    
  }
})
router.afterEach(to => {
  setTitle(to, router.app)
  window.scrollTo(0, 0)
})
export default router