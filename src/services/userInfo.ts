import { http } from '@/utils/http'

import type { userInfo } from '@/types/userInfo'


export const GetUserInfoApi = () => {
  return http<userInfo[]>({
    method: 'GET',
    url: '/users/info'
  })
}

interface UserInfoParams {
  NickName: string
  birthday: string
  county: string
  gender: string
  profession: string
}

// 修改用户信息

export const PutUserInfoApi = (data:UserInfoParams) =>{
  return http({
    method:'PUT',
    url:'/users/info',
    data
  })
}

// 修改用户头像
export const PutUserAvatarApi = (avatar:string) =>{
  return http({
    method:'PUT',
    url:'/users/avatar',
    data:{avatar}
  })
}

// 获取用户订单总数及历史记录
export const GetUserAllOrderAndBrowseNumApi = () =>{
  return http({
    method:'GET',
    url:'/users/allOrderAndBrowseNum'
  })
}
