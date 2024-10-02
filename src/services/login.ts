import { http } from '@/utils/http'

interface LoginParams {
  uName: string
  uPwd: string
}

interface EnrollParams {
  user: string
  code: string
  pwd:string
}

interface EmailParams {
  uEmail:string,
  code:string
}
// 登录接口
export const Login = (data: LoginParams) => {
  return http({
    method: 'POST',
    url: '/api/login',
    data,
  })
}
// 注册接口
export const Enroll = (data: EnrollParams) => {
  return http({
    method: 'POST',
    url: '/api/enroll',
    data,
  })
}

// qq注册接口 1-获取验证码
export const GetEmailYamApi = (code: string) => {
  return http({
    method: 'POST',
    url: '/api/code',
    data:{code}
  })
}

// qq注册接口 2-校验验证码是否正确
export const VerifyEmailYzmApi = (data:EnrollParams) => {
  return http({
    method: 'POST',
    url: '/api/verifyYxCode',
    data,
  })
}
// qq邮箱登录
export const EmailLoginApi = (data:EmailParams) => {
  return http({
    method: 'POST',
    url: '/api/email/login',
    data,
  })
}

// 微信公众号预注册获取verifyCode码进行轮询
export const WxUserEnroll = () => {
  return http({
    method: 'GET',
    url: '/api/Gzh/start',
  })
}

// 微信公众号预注册第一次调用传 WxUserEnroll接口返回的verifyCode码
export const WxUserLogin = (verifyCode:string) => {
  return http({
    method: 'POST',
    url: '/api/getGzh/enroll',
    data:{
      verifyCode:verifyCode
    }
  })
}

// 轮询获取用户是否通过微信公众号注册
export const WxIsUserEnroll = (verifyCode:string) => {
  return http({
    method: 'GET',
    url: `/api/getGzh/isEnroll?verifyCode=${verifyCode}`,
  })
}

// 获取用户FromUserName进行轮询
export const WxFromUserName= () => {
  return http({
    method: 'GET',
    url: '/api/Gzg/login/FromUserName',
  })
}

// 轮询获取用户是否通过微信公众号登录
export const WxIsUserLogin= (FromUserName:string) => {
  return http({
    method: 'GET',
    url: `/api/Gzh/login?FromUserName=${FromUserName}`,
  })
}
