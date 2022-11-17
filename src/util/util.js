import Cookies from 'js-cookie'
import config from '@/config'
const { title,  } = config
// cookie保存的天数

const cookieExpires = 365

export const TOKEN_KEY = 'token'

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

export const setCookies = (key,value) =>{
  Cookies.set(key, value, { expires: cookieExpires || 1 })
}

export const delCookies = (key) =>{
  Cookies.remove(key);
}

export const getCookies = (key) => {
  const _cookies = Cookies.get(key)
  if (_cookies) return _cookies
  else return false
}


export const setSessionStorage = (key,val) =>{
  sessionStorage.setItem(key,JSON.stringify(val));
}

export const getSessionStorage = (key) =>{
  let _data =  sessionStorage.getItem(key)
  return JSON.parse(_data)
}

export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}


/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

export const getRouteTitleHandled = (route) => {
  let router = { ...route }
  let meta = { ...route.meta }
  let title = ''
  if (meta.title) {
    if (typeof meta.title === 'function') {
      meta.__titleIsFunction__ = true
      title = meta.title(router)
    } else title = meta.title
  }
  meta.title = title
  router.meta = meta
  return router
}


/**
 * @description 根据当前跳转的路由设置显示在浏览器标签的title
 * @param {Object} routeItem 路由对象
 * @param {Object} vm Vue实例
 */
 export const setTitle = (routeItem, vm) => {
  const handledRoute = getRouteTitleHandled(routeItem)
  const pageTitle = showTitle(handledRoute, vm)
  const resTitle = pageTitle ? `${title} - ${pageTitle}` : title
  window.document.title = resTitle
}


export const showTitle = (item, vm) => {
  let { title, __titleIsFunction__ } = item.meta
  if (!title) return
  title = (item.meta && item.meta.title) || item.name
  return title
}


// scrollTop animation
export const scrollTop = (el, from = 0, to, duration = 500, endCallback) => {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
    )
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil(difference / duration * 50)

  const scroll = (start, end, step) => {
    if (start === end) {
      endCallback && endCallback()
      return
    }

    let d = (start + step > end) ? end : start + step
    if (start > end) {
      d = (start - step < end) ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }
  scroll(from, to, step)
}




//blob下载
export const download = (res) => {
  if(!res.data){
      return
  }
  // 这里res.data是返回的blob对象
  var blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
  var contentDisposition = res.headers['content-disposition'];  //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
  var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
  var result = patt.exec(contentDisposition);
  var filename = decodeURI(result[1]);
  var downloadElement = document.createElement('a');
  var href = window.URL.createObjectURL(blob); //创建下载的链接
  downloadElement.style.display = 'none';
  downloadElement.href = href;
  downloadElement.download =filename ; //下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); //点击下载
  document.body.removeChild(downloadElement); //下载完成移除元素
  window.URL.revokeObjectURL(href); //释放掉blob对象
}

//普通url下载
export const downloadTemplate = (url) => {
  var downloadElement = document.createElement('a');
  downloadElement.style.display = 'none';
  downloadElement.href = url;
  downloadElement.target = '_blank';
  document.body.appendChild(downloadElement);
  downloadElement.click(); //点击下载
  document.body.removeChild(downloadElement); //下载完成移除元素
}


// 函数防抖
export const debounce = (func,time=500,options={
  leading:false,
  context:null,
}) =>{
  let timer;
  const _debounce = function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    if(options.leading && !timer) {
      timer = setTimeout(null,time)
      func.apply(options.context,args)
    }else{
      timer = setTimeout(() => {
        func.apply(options.context,args)
        timer = null
      }, time);
    }
  };
  _debounce.cancel = function () {  
    clearTimeout(timer)
    timer = null
  }
  return _debounce
}


