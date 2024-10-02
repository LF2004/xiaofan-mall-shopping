import { http } from '@/utils/http';
import type { cartListData } from '@/types/cart'
interface CartParams {
  skuId: string
  count: string
}
// 添加购物车接口
export const AddCartApi = (data: CartParams) => {
  return http({
    method: 'POST',
    url: '/users/cart',
    data,
  })
}

// 获取购物车列表
export const getCartListApi = () => {
  return http({
    method: 'GET',
    url: '/users/cartList',
  })
}

// 修改购物车商品数量
export const chageCartNumApi = (cartId:string,count:number) => {
  return http({
    method: 'PUT',
    url: '/users/cart/num',
    data:{cartId, count}
  })
}

// 修改购物车商品选中状态
export const chageCartSelectStatusApi = (cartId:string,select:number) => {
  return http({
    method: 'PUT',
    url: '/users/cart/select',
    data:{cartId, select}
  })
}

// 购物车全选
export const chageCartAllSelectStatusApi = (select:number) => {
  return http({
    method: 'PUT',
    url: '/users/cart/allSelect',
    data:{select}
  })
}


// 删除购物车商品
export const deleteCartApi = (cartId:string) => {
  return http({
    method: 'DELETE',
    url: '/users/cart/delete',
    data: {cartId}
  })
}
