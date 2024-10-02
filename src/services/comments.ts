import { http } from '@/utils/http';

// 获取商品用户评论列表
export const getUserGoodsCommentsApi = (goodsId:string) => {
  return http({
    method: 'GET',
    url: `/api/comments?goodsId=${goodsId}`,
  })
}

interface CommentsParams {
  goodsId: string
  type: string
  connents:string
}

interface ReplyParams {
  reply_commentId: string
  goodsId: string
  reply_uid:string
  reply_type:string
  reply_connents:string
}

// 提交评论
export const SendCommentsApi = (data: CommentsParams) => {
  return http({
    method: 'POST',
    url: '/users/comments',
    data,
  })
}

// 提交用户回复评论
export const SendReplyCommentsApi = (data: ReplyParams) => {
  return http({
    method: 'POST',
    url: '/users/comments/reply',
    data,
  })
}
