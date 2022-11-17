import axios from 'axios'
import { getToken , setToken ,delCookies } from './util.js'
import { Toast } from 'vant';


class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      config.headers['token'] = getToken()?getToken():'';
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      console.log(res,'res')
      const { data, status ,headers } = res
      
      if(data.code == 301){
        Toast.fail(data.msg);
        setToken('')
        delCookies('name')
        delCookies('id')
        delCookies('mobile')
        sessionStorage.clear()
        setTimeout(()=>{
          location.reload();
        },500)
        
      }
      // return { data, status }
      if (!res.data) {
        return res;
      }
      if(res.data.code == 0){
        return res.data.data
      }else{
        Toast.fail(res.data&&res.data.msg);
        
        return Promise.reject(res.data)
      }
    }, error => {
      this.destroy(url)
      Toast.fail('请求失败，请与管理员联系');
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
