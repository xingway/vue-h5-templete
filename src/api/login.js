import axios from '@/util/api.request'

//登录
export const login = (value) => {
  return axios.request({
    url: '/login',
    data:value,
    method: 'post'
  })
}