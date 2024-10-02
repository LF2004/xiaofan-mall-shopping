import { http } from '@/utils/http';
import type { goodsListData,goodsDetailData } from '@/types/goods'

export const GetGoodsListDataApi = (pageNum:number,pageSize:number) => {
  return http<goodsListData[]>({
    method: 'GET',
    url: `/api/goods?pageNum=${pageNum}&pageSize=${pageSize}`,
  })
}

// 获取商品详情

export const GetGoodsDataDitailApi = (goodId:number) => {
  return http<goodsDetailData[]>({
    method: 'GET',
    url: `/api/goods/detail?goodId=${goodId}`,
  })
}

// 商品搜索
export const SearchGoodsApi = (name:string,type?:string) => {
  return http<goodsListData[]>({
    method: 'GET',
    url: `/api/goods/search?name=${name}&type=${type}`,
  })
}

// 商品搜索
export const GoodsSearchApi = (name:string) => {
  return http({
    method: 'GET',
    url: `/api/search/goods?name=${name}`,
  })
}

// 推荐商品
export const recommendGoodsApi = () => {
  return http({
    method: 'GET',
    url: '/api/recommend/goods',
  })
}

// 保存历史浏览记录
export const BrowseGoodsApi = (goodsId:string) => {
  return http({
    method:'GET',
    url:`/users/browse?goodsId=${goodsId}`
  })
}


export const GetCollectionGoodsApi = () => {
  return http({
    method:'GET',
    url:'/users/fetch/collection'
  })
}


// 获取历史浏览记录
export const GetBrowseGoodsApi = () => {
  return http({
    method:'GET',
    url:'/users/fetch/browse'
  })
}

// 首页icon
export const GetIconListApi = () => {
  return http({
    method:'GET',
    url:'/api/goods/category'
  })
}

// 轮播图
export const GetBannerApi = () => {
  return http({
    method:'GET',
    url:'/api/goods/banner'
  })
}


// 分类商品
export const GetCategoryGoodsApi = (type:string) => {
  return http({
    method:'GET',
    url:`/api/goods/classfyGoods?type=${type}`
  })
}

export const userCollectionApi = (goodsId:string) => {
 return http({
   method:'POST',
   url:'/users/collection',
   data:{goodsId}
 })
}


// 获取评论商品信息
export const GetGoodsNameAndPictureApi = (goodsId:string) => {
  return http({
    method: 'GET',
    url: `/api/goodsInfo?goodsId=${goodsId}`,
  })
}

// 获取商品对应相关商品数据
export const GetRelatedGoodsApi = (goodsId:string) => {
  return http({
    method: 'GET',
    url: `/api/correlationl?goodsId=${goodsId}`,
  })
}


