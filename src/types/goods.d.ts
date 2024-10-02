export type goodsListData = {
  /** 商品Id */
  goodsId: number
  /** 商品类型  */
  goodsType: number
  /** 当前价格  */
  price: number
  /** 原价 */
  oldPrice:number,
  /** 商品图片 */
  picture:string,
  /** 商品库存 */
  stock:number,
  /** 是否为有效商品 */
  isEffective:number,
  /** 是否为限时抢购商品 */
  isLimited:number,
  /** 限时抢时间 */
  limited_time:string,
  /** 商品详情图 */
  detail_img:string
};

// 商品详情数据

export type goodsDetailData = {
  /** 商品Id */
  goodsId: number
  /** 商品类型  */
  goodsType: number
  /** 当前价格  */
  price: number
  /** 原价 */
  oldPrice:number,
  /** 是否为有效商品 */
  isEffective:number,
  /** 是否为限时抢购商品 */
  isLimited:number,
  /** 限时抢时间 */
  limited_time:string,
  /** 商品详情图 */
  detail_img:string,
  sName:string[],
  color:string[],
  size:string[],
  /** 商品库存 */
  inventory:string[],
  /** 商品规格图片 */
  picture:string[]
};

