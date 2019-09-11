import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'

// 创建axios实例对象
const service = axios.create({
  //设置base-api
  baseURL: process.env.VUE_APP_BASE_API,
  //请求超时
  timeout: 5000
})

// http请求拦截器
service.interceptors.request.use(
  config => {

    if (store.getters.token) {

      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error);// for debug
    return Promise.reject(error)
  }
)

// 服务器回复拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    //做异常状态匹配
    if (res.code !== 200 || (res.code === 200 && !res.flag)) {
      if (res.code === 403) {
        MessageBox.confirm('请重新登录', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //TODO
        })
      } else if (res.code === 200) {
        Message({
          message: res.message || '未知原因',
          type: "warning",
          duration: 5 * 1000
        });
      } else {
        Message({
          message: "服务器响应异常,状态码:" + response.status,
          type: "warning",
          duration: 5 * 1000
        });
      }
      return Promise.reject("error");
    }
    return res.data;
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
