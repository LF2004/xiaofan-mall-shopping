<template>
  <view>
      <SearchComponents/>

    <view class="history-recording" v-if="searchGoodsListRecording">
      <h3 style="margin: 10px 0 0 25px">历史搜索</h3>
      <ul class="recording-list">
          <li class="recording-list-item" v-for="(item,index) in searchGoodsListRecording" :key="index">
            <navigator :url="`/pages/goods/components/SerachList?name=${item.goodsName}`">
              {{ item.goodsName }}
            </navigator>
          </li>
      </ul>
    </view>

    <view v-if="!searchGoodsListRecording">
      <h1 style="padding: 10px">暂无历史搜索</h1>
    </view>
  </view>

  <!-- 推荐商品 -->
  <view class="recommend-goods">
    <h1>推荐商品</h1>
    <ul class="recommend-goods-ul">
      <li class="recommend-goods-ul-li" v-for="(item,index) in recommendGoods">
        <uni-tag v-if="index === 0 || index === 1 || index === 2" :text="'热搜'" :type="index === 0 ? 'error' : (index === 1 ? 'warning' : '')"></uni-tag>
          <p @click="goGoodsDetali(item.goodsId)">{{ item.name }}</p>
      </li>
    </ul>
  </view>
</template>

<script setup lang="ts">
import SearchComponents from '@/pages/goods/components/SearchComponents';
import {ref  } from 'vue'
import {GoodsSearchApi, recommendGoodsApi} from "@/services/getGoodsList";
import {onLoad, onShow} from "@dcloudio/uni-app";
// 获取屏幕边界到安区域距离
const { safeAreaInsets } = uni.getSystemInfoSync();

const searchGoodsListRecording = ref()

const recommendGoods = ref()

const goGoodsDetali = (id)=>{
  uni.navigateTo({
    url:`/pages/goods/goods?id=${id}`
  })
}


onShow(async ()=>{
  // 从本地存储中获取搜索历史记录
  let searchList = JSON.parse(uni.getStorageSync('SearchGood'));
  searchGoodsListRecording.value = searchList;
})

onLoad(async ()=>{
  const res = await recommendGoodsApi();
  recommendGoods.value = res.results
})
</script>

<style scoped lang="scss">
.history-recording{
  width: 100%;
  background-color: #f9f9f9;
  .recording-list{
    width: 100%;
    height: 100%;
    transform: translateX(-40px);
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: flex-start;

    .recording-list-item{
      width: 100px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #ebecf0;
      border-radius: 15px;
      color: #48494d;
      margin: 10px 0 0 20px;
      margin-bottom: 20px;
    }
  }
};

.recommend-goods{
  margin-top: 10%;
  h1{
    font-size: 1.2rem;
    padding-left: 7%;
  }
  .recommend-goods-ul{
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    .recommend-goods-ul-li{
      margin-top: 10%;
      p{
        border-bottom: 1px solid #c5c3c340;
        padding: 5px;
      }
    }
  }
}
</style>
