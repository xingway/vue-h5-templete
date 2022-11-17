import HttpRequest from './axios'
import config from '@/config'
const baseUrl = process.env.NODE_ENV == 'development' ? config.baseUrl.dev : process.env.NODE_ENV == 'production' ? config.baseUrl.pro : config.baseUrl.test
console.log(process.env.NODE_ENV)
const axios = new HttpRequest(baseUrl)
export default axios
