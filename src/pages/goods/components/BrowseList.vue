<template>
  <view class="index-header" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <ul class="index-header-nav">
      <returnPage :color="'#ffffff'" :size="30" class="return"/>
      <li class="index-header-nav-li"><uni-icons type="search" size="18" class="search-icon"></uni-icons><input type="text" :placeholder="query.type == 1 ? '搜索我的历史记录' : '搜索我的收藏记录'" class="index-header-serch" v-model="searchText" @keydown.enter="performSearch" /></li>
    </ul>
  </view>

  <scroll-view scroll-y :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <view class="browse-goods">
      <ul class="browse-goods-ul" v-if="query.type == 1">
        <li class="browse-goods-ul-li" v-for="(item,index) in BrowseGoods" :key="item.browse_goods_id">
          <navigator :url="`/pages/goods/goods?id=${item.browse_goods_id}`">
            <image :src="item.picture" class="goods-img"/>
            <view class="goods-cont">
              <text class="goods-name">{{ item.goodsName }}</text>
              <view class="goods-price-btn">
                <p><span>￥</span>{{ item.price }}</p>
                <button class="buy">立即购买</button>
              </view>
            </view>
            <view class="browse-goods-time">
              <uni-icons type="eye" size="16"></uni-icons>
              {{ item.browse_time }}
            </view>
          </navigator>
        </li>
      </ul>
      <ul class="browse-goods-ul" v-else>
        <li class="browse-goods-ul-li" v-for="(item,index) in CollectionGoods" :key="item.browse_goods_id">
          <navigator :url="`/pages/goods/goods?id=${item.collectionId}`">
            <image :src="item.picture" class="goods-img"/>
            <view class="goods-cont">
              <text class="goods-name">{{ item.goodsName }}</text>
              <view class="goods-price-btn">
                <p><span>￥</span>{{ item.price }}</p>
                <button class="buy">立即购买</button>
              </view>
            </view>
            <view class="browse-goods-time">
              <uni-icons type="eye" size="16"></uni-icons>
              {{ item.collection_time }}
            </view>
          </navigator>
        </li>
      </ul>
    </view>
  </scroll-view>
</template>

<script lang="ts" setup>
import returnPage from '@/components/returnPage';
import {GetBrowseGoodsApi, GetCollectionGoodsApi} from "@/services/getGoodsList";
import {onLoad} from "@dcloudio/uni-app";
import { ref } from 'vue';
const searchText = ref()
const query = defineProps<{
  type: string
}>()


const BrowseGoods = ref();

const clBrowseGoods = ref()

const CollectionGoods = ref();

const getBrowseGoods = async ()=>{
  if(query.type == 1){
    const res = await GetBrowseGoodsApi();
    BrowseGoods.value = res.results;
    clBrowseGoods.value = res.results
  }else {
    const res = await GetCollectionGoodsApi();
    CollectionGoods.value = res.results;
  }
}


const performSearch = () =>{
  let search = searchText.value;
  if(searchText.value.trim() == ''){
    BrowseGoods.value = clBrowseGoods.value
    return
  }
  if(query.type == 1) {
    BrowseGoods.value = BrowseGoods.value.filter(v => v.goodsName.includes(search));
  }else {

  }
}

onLoad(()=>{
  getBrowseGoods();
})
</script>

<style lang="scss" scoped>
.return{
  position: absolute;
  left: 20px;
  top: 25px;
}
.index-header{
  width: 100vw;
  height: 80px;
  margin: 0 auto;
  background-color: var(--xiaofan-bg-main-color);
  .index-header-nav{
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    .index-header-nav-li{
      margin: 20px 0 0 10px;
      transform: translateX(-10px);
    }
    .index-header-nav-li.li3{

      transform: translateX(5px);
      p{
        font-size: 18px;
      }
    }
    .index-header-nav-li .text{
      width: 45px;
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 35px;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      vertical-align: top;

    }
    .index-header-serch{
      width: 237px;
      height: 36px;
      border-radius: 50px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(255, 255, 255, 1);
      /** 文本1 */
      font-size: 14px;
      padding-left: 30px;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 20.27px;
      color: rgba(208, 208, 208, 1);
      text-align: left;
      vertical-align: top;
    }
    .search-icon{
      position: absolute;
      top: 8px;
      margin-left: 10px;
    }
    .search-scan{
      position: absolute;
      top: -20px;
      margin-left: 10px;
    }

  }
};

.browse-goods{
  width: 75%;
  height: 200px;
  .browse-goods-ul{
    display: flex;
    width: 80%;
    flex-wrap: wrap;
    flex-direction: column;
    .browse-goods-ul-li{
      width: 100%;
      height: 100%;
      border-bottom: 1px solid #b9bcbe69;
      .goods-img{
        margin-top: 30px;
        width: 100px;
        height: 100px;
        transform: translateY(10%);
      }
      .goods-cont{
        position: relative;
        top: -70px;
        display: flex;
        justify-content: space-around;
        .goods-name{
          position: relative;
          width: 70%;
          height: 40px;
          left: 70%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .goods-price-btn{
          width: 100%;
          position: relative;
          top: 50px;
          left: -20px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          p{
            padding-left: 15px;
            font-size: 20px;
            font-weight: 700;
            color: #e43d33;
          }
          span{
            font-size: 12px;
          }
          .buy{
            width: 100px;
            height: 30px;
            line-height: 30px;
            color: #ffffff;
            background-color: var(--xiaofan-bg-main-color);
          }
        }
      }
    }

  }
  .browse-goods-time{
    position: relative;
    float: right;
    left: 38%;
    top: -10px;
  }
}
</style>
