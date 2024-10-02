<template>
  <!-- 猜你喜欢 -->
  <view class="index-guess-like">
    <h3 class="index-guess-like-title">猜·你·喜·欢</h3>
    <view class="index-guess-like-goods">
      <ul class="index-guess-like-goods-ul">
        <li class="index-guess-like-goods-ul-li" v-for="(item,index) in goodsList" :key="item.goodsId" @click="goGoodsDeatil(item.isEffective,item.goodsId)">
          <image src="@/static/images/xiajia.png" :class="item.isEffective ? 'xiajia' : '' " v-if="item.isEffective"/>
          <image :src="item.picture" class="index-guess-like-goods-ul-li-image"/>
          <h4 class="index-guess-like-goods-ul-li-h4">{{ item.name }}</h4>
          <view class="price">
            <p class="new">¥{{ item.price }}</p>
            <p class="old">¥{{ item.oldPrice }}</p>
          </view>
          <span class="index-guess-like-goods-ul-li-span">已售234</span>
        </li>

      </ul>
    </view>
  </view>
</template>

<script setup lang="ts">
// 定义props接收父组件传参
import {ref, onMounted} from 'vue'
import type {goodsListData} from '@/types/goods';
import {GetGoodsListDataApi} from "@/services/getGoodsList";
import {onShow} from "@dcloudio/uni-app";

const goodsList = ref<goodsListData[]>([]);

const pagePrams = ref({
  pageNum: 1,
  pageSize: 10
})

const getGoodsListData = async () => {
  const newGoodsList = await GetGoodsListDataApi(pagePrams.value.pageNum, pagePrams.value.pageSize);
  if (newGoodsList.code !== 200) {
    uni.showToast({icon: 'error', title: newGoodsList.msg});
  } else {
    goodsList.value.push(...newGoodsList);
    pagePrams.value.pageNum++;
  }
}

const getGoodsListTest = async () => {
  const newGoodsList = await GetGoodsListDataApi(1, 10);
  goodsList.value = newGoodsList;
}

const goGoodsDeatil = (status:number,goodsId:number) =>{
 if(!status){
   uni.navigateTo({
     url:`/pages/goods/goods?id=${goodsId}`
   })
 }else {
   uni.showToast({icon: 'none', title: '该商品已下架'});
 }
}

onShow(() => {
  getGoodsListTest()
})


// 暴露方法
defineExpose({
  getMore: getGoodsListData,
})
</script>

<style lang="scss" scoped>

.xiajia {
  position: absolute;
  width: 150px;
  height: 150px;
  transform: translateX(10px);
  z-index: 9;
}

.index-guess-like {
  width: 90%;
  margin: 100px auto;

  .index-guess-like-title {
    position: relative;
    top: -5%;
    left: 35%;
    font-size: 20px;
  }

  .index-guess-like-goods {
    position: relative;
    top: -2%;
    left: -18%;
    width: 100%;

    .index-guess-like-goods-ul {
      width: 111%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      .index-guess-like-goods-ul-li {
        width: 160px;
        margin: 20px 0 0 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

        background-color: #ffffff;

        .index-guess-like-goods-ul-li-image {
          width: 100%;
          height: 150px;
          border-radius: 10px 10px 0 0;
        }

        .index-guess-like-goods-ul-li-h4 {
          padding: 5px;
          height: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .index-guess-like-goods-ul-li-span {
          position: relative;
          top: -28px;
          left: 62%;
          font-size: 14px;
          color: #999999;
        }

        .price {
          display: flex;
          padding: 5px;

          .new {
            color: #F54E51;
          }

          .old {
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
