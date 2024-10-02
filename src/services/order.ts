import { http } from '@/utils/http';

// 获取预支付订单
export const getOrderPreApi = () => {
  return http({
    method: 'GET',
    url: '/users/order/pre'
  })
}

// 下单
export const CreateOrderApi = (cartId:string)=>{
  return http({
    method: 'POST',
    url: '/users/order/create',
    data:{cartId}
  })
}

// 立即支付
export const InstantlyOrderApi = (skuId:string,count:number)=>{
  return http({
    method: 'POST',
    url: '/users/instantly/pay',
    data:{skuId,count}
  })
}
//  获取订单
export const getOrderApi = (orderId:string) => {
  return http({
    method: 'GET',
    url: `/users/order?orderId=${orderId}`
  })
}

// 订单支付
export const PayOrderApi = (orderId:string) => {
  return http({
    method: 'POST',
    url: '/users/order/pay',
    data:{orderId}
  })
}

// 查询支付结果
export const PaySuccesspaymentOrderApi = (out_trade_no:string) => {
  return http({
    method: 'POST',
    url: '/users/order/successpayment',
    data:{out_trade_no}
  })
}


// 取消订单
export const CancelOrderApi = (remark:string,orderId:string) => {
  return http({
    method: 'PUT',
    url: '/users/order',
    data:{remark,orderId}
  })
}

// 再次购买
export const againPayOrderApi = (orderId:string) => {
  return http({
    method: 'POST',
    url: '/users/order/againPay',
    data:{orderId}
  })
}

// 确认收货
export const ConfirmOrderApi = (orderId:string) => {
  return http({
    method: 'PUT',
    url: '/users/confirm/receiving',
    data:{orderId}
  })
}

// 用户评论
export const CommentOrderApi = (orderId:string,content:string,star:number) => {
  return http({
    method: 'PUT',
    url: '/users/confirm/comments',
    data:{orderId}
  })
}

// 订单列表
export const GetOrderListApi = (type:string) => {
  return http({
    method: 'GET',
    url: `/users/order/list?type=${type}`
  })
}
