// 购物车列表
export type cartListData = {
  /** 购物车Id */
  cartId: number
  /** 商品Id */
  goodsId:number,
  /** skuId  */
  skuId: number
  /** 商品名称  */
  goods_name: string
  /** 规格名称 */
  sku_name:string,
  /** 商品图片 */
  picture:string,
  /** 商品数量 */
  count:number,
  /** 商品价格 */
  price:string,
};
