<template>
  <SearchComponents/>
    <view class="page">
        <view class="goods-sift">
            <ul class="goods-sift-list">
              <li>
                <uni-collapse>
                  <uni-collapse-item title="综合" :show-animation="true" class="collapse-item">
                    <view class="content" v-for="(item,index) in siftCas" :key="index">
                      <text class="text" :style="{ color: textColors[index] }" @click="ChangeSiftStatus(index)">{{ item.title }}</text>
                    </view>
                  </uni-collapse-item>
                </uni-collapse>
              </li>
              <li @click="changSort">
                <p :style="{'color':isHighlightText ? '#007aff' : '#000000'}">{{ priceChoseStatus.name }}</p>
                <view class="sift-menu">
                  <uni-icons type="arrow-up" size="12" :color="priceChoseStatus.status === 1 ? '#007aff' : '#000000'"></uni-icons>
                  <uni-icons type="arrow-down" size="12" :color="priceChoseStatus.status === 2 ? '#007aff' : '#000000'"></uni-icons>
                </view>
              </li>
              <li>
                <p>新品</p>

              </li>
            </ul>
        </view>
    </view>
  <scroll-view  scroll-y class="scroll-view" @scrolltolower="OnScrollTolower">
  <view class="index-guess-like">
    <view class="index-guess-like-goods">
      <ul class="index-guess-like-goods-ul">
        <navigator v-for="(item,index) in goodsList" :key="item.id" :url="`/pages/goods/goods?id=${item.id}`" hover-class="none">
          <li class="index-guess-like-goods-ul-li">
            <image :src="item.picture" class="index-guess-like-goods-ul-li-image"/>
            <h4 class="index-guess-like-goods-ul-li-h4">{{ item.name }}</h4>
            <view class="price">
              <p class="new">¥{{ item.price }}</p>
              <p class="old">¥{{ item.oldPrice }}</p>
            </view>
            <span class="index-guess-like-goods-ul-li-span">已售234</span>
          </li>
        </navigator>

        <view>
          <h1 v-if="!goodsList">暂无商品</h1>
        </view>

      </ul>
    </view>
  </view>
  </scroll-view>
</template>

<script setup lang="ts">
import returnPage from '@/components/returnPage'
import SearchComponents from '@/pages/goods/components/SearchComponents';
import {GoodsSearchApi, SearchGoodsApi} from "@/services/getGoodsList";
import { ref } from 'vue';
import {onLoad} from "@dcloudio/uni-app";
const siftCas = ref([
  {

    "title":"综合排序"
  },
  {
    "title":"销量优先"
  }
]);

const textColors = ref(['#000000', '#000000', '#000000']);

const priceChoseStatus = ref({ name: '价格', status: 0,});

const ChangeSiftStatus = async (index)=>{
  // 将被点击的文本颜色修改为红色
  textColors.value[index] = '#007aff';

  // 将其他文本颜色恢复为蓝色
  for (let i = 0; i < textColors.value.length; i++) {
    isHighlightText.value = false;
    priceChoseStatus.value.status = 0;
    if (i !== index) {
      textColors.value[i] = '#000000';
    }
  }
  const res = await SearchGoodsApi(query.name,index);
  goodsList.value = res.results;
}


const goodsList = ref(); // 搜索到的商品列表

const searchText = ref();
const flag = ref();
const isHighlightText = ref(false);
// 按照价格排序
const changSort = async ()=>{
  isHighlightText.value = true;
  flag.value = flag.value === 1 ? 2 : 1
  priceChoseStatus.value.status = flag.value
  const res = await SearchGoodsApi(query.name,flag.value);
  goodsList.value = res.results;
}

const query = defineProps<{
  name: string
}>()


// 搜索商品
const search = async ()=>{
  const res = await SearchGoodsApi(searchText.value);
  if(res.code === 200){
    uni.showToast({ icon: 'success', title: res.msg });
    goodsList.value = res.results;
  }
}

onLoad(async ()=>{
  if(query.name){
    const res = await SearchGoodsApi(query.name);
    goodsList.value = res.results;
  }
})

</script>

<style scoped lang="scss">
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
.collapse-item{
  position: absolute;
  left: 0;
  width: 30rem;
}
.page{
  background-color: #f9f9f9;
}
.goods-sift{
  width: 100%;
  height: 60px;
  background-color: #fff;
  .goods-sift-list{
    display: flex;
    margin-left: -10%;
    flex-direction: row;
    flex-wrap: nowrap;
    line-height: 60px;
    justify-content: space-around;
  }
  .goods-sift-list li{
    z-index: 99;
    .sift-menu{
      display: flex;
      flex-direction: column;
      position: relative;
      top: -6.7rem;
      left: 2rem;
      .uni-icons:first-child{
        transform: translateY(2.8rem);
      }
    }
  }
}
.content text{
  padding: 2rem;
  font-size: .8rem;
}
.index-guess-like{
  width: 90%;
  margin: 100px auto;
  .index-guess-like-title{
    position: relative;
    top: -5%;
    left: 35%;
    font-size: 20px;
  }
  .index-guess-like-goods{
    position: relative;
    top: -2%;
    left: -18%;
    width: 100%;
    .index-guess-like-goods-ul{
      width: 111%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .index-guess-like-goods-ul-li{
        width: 160px;
        margin: 20px 0 0 20px;
        border-radius: 10px;
        background-color: #ffffff;
        .index-guess-like-goods-ul-li-image{
          width: 100%;
          height: 150px;
        }
        .index-guess-like-goods-ul-li-h4{
          padding: 5px;
          height: 40px;
          overflow: hidden;
          text-align: center;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .index-guess-like-goods-ul-li-span{
          position: relative;
          top: -28px;
          left: 62%;
          font-size: 14px;
          color: #999999;
        }
        .price{
          display: flex;
          padding: 5px;
          .new{
            color: #F54E51;
          }
          .old{
            margin-left: 10px;
            font-size: 12px;
            line-height: 22px;
            text-decoration: line-through;
            color: #999999;
          }
        }
      }
    }
  }
}
</style>
