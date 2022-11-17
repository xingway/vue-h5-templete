import axios from '@/util/api.request'

//获取登录用户信息
export const getLoginUserInfo = (value) => {
  return axios.request({
    url: '/auth/getLoginUserInfo',
    params:value,
    method: 'get'
  })
}