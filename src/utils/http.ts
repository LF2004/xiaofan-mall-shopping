// @ts-ignore
import { userLoginStatusStore,userMannerInfoStore } from '@/stores';
const baseURL: string = 'http://localhost:9000'
// 配置拦截器参数
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 1.非http开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 2. 请求超时
    options.timeout = 10000
    // 3.添加小程序端请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp',

    }
    // 4.添加token
    const userStore = userLoginStatusStore()
    const token = userStore.token
    if (token) {
      options.header.Authorization = token
    }
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

// 添加类型支持泛型
interface Data<T> {
  code: string
  msg: string
  data: T
}

export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        if (res.data.code >= 200 && res.data.code < 300) {
          const resultData: Data<T> = res.data.result ? res.data.result : res.data
          if (!resultData.code) {
            resultData.code = res.data.code
          }
          if (!resultData.msg) {
            resultData.msg = res.data.msg
          }
          resolve(resultData)
        } else if (res.data.code === 401) {
          console.log(res)
          const userStore = userLoginStatusStore()
          userStore.clearStatus();
          uni.navigateTo({ url: '/pages/login/login' });
          reject(res)
        } else {
          uni.showToast({
            icon: 'none',
            title: res.data.msg,
          })
          const userStore = userLoginStatusStore()
          const userInfoStore = userMannerInfoStore();
          userStore.clearStatus();
          userInfoStore.clearUserInfoManner();
          uni.navigateTo({ url: '/pages/login/login' });
          reject(res)
        }
      },
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网卡了换个网试试鸭!',
        })
        reject(err)
      },
    })
  })
}

