import Vue from 'vue'
import Vuex from 'vuex'
import { getLoginUserInfo } from '@api/auth'
import {   setCookies,  } from '@/util/util'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    info:{},
    name:'',
    hasUserInfo:false,
    active:'index'
  },
  mutations: {
    setInfo(state,info){
      state.info = Object.assign({},info)
    },
    setName(state,name){
      state.name = name
    },
    setHasGetInfo(state,status){
      state.hasUserInfo = status
    },
    setActive(state,active){
      state.active = active
    }
  },
  actions: {
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getLoginUserInfo().then(res => {
            setCookies('info',JSON.stringify(res))
            setCookies('name',res.name)
            commit('setInfo',res)
            commit('setName',res.name)
            commit('setHasGetInfo', true)
            resolve(res)
          },res=>{
            reject(res)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
  },
  modules: {
  }
})
