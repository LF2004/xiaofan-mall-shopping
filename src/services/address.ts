import {http} from "@/utils/http";

// 获取用户地址列表
export const getAddressListApi = () => {
  return http({
    method: 'GET',
    url: '/users/address',
  })
}

// 获取单个用户地址
export const getUserAddressApi = (addressId:string) => {
  return http({
    method: 'GET',
    url: `/users/address?addressId=${addressId}`,
  })
}

interface AddressParams {
  receiver: string
  contact: string
  province:string
  city:string
  county:string
  address:string
  isDefault:string
}

// 添加收货地址
export const AddAddressApi = (data: AddressParams) => {
  return http({
    method: 'POST',
    url: '/users/add/address',
    data,
  })
}


// 修改收货地址
export const UpdateAddressApi = (data:AddressParams) => {
  return http({
    method: 'PUT',
    url: '/users/address',
    data,
  })
}


// 删除收货地址
export const DeleteAddressApi = (addressId:String) => {
  return http({
    method: 'DELETE',
    url: '/users/address',
    data:{addressId}
  })
}
