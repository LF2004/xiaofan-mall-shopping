<template>
  <view class="index-header" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <ul class="index-header-nav">
      <returnPage :color="'#ffffff'" :size="30" class="return"/>
      <li class="index-header-nav-li"><uni-icons type="search" size="18" class="search-icon"></uni-icons><input type="text" placeholder="搜索商品名称" class="index-header-serch" @focus="showSearchList" @blur="hideSearchList" v-model="searchText" @keydown.enter="performSearch" /></li>
    </ul>

    <view class="search-goods-list" v-if="showSearchListStatus">
      <ul class="search-goods-list-ul">
        <li class="search-goods-list-ul-li" v-for="(item,index) in searchGoodsList" :key="item.goodsId">
          <navigator :url="`/pages/goods/components/SerachList?name=${item.name}`">
            <p>{{ item.name }}</p>
          </navigator>
        </li>
      </ul>
    </view>
  </view>
</template>

<script setup lang="ts">
import returnPage from '@/components/returnPage';
import { GoodsSearchApi } from "@/services/getGoodsList";
import { ref,watch  } from 'vue'
// 获取屏幕边界到安区域距离
const { safeAreaInsets } = uni.getSystemInfoSync();

const showSearchListStatus = ref(false);

const showSearchList = ()=>{
  showSearchListStatus.value = true;
}

const hideSearchList = ()=>{
  showSearchListStatus.value = false;
}

const searchText = ref()

const searchGoodsList = ref()


watch(searchText,(n)=>{
  if(n === '') {
    showSearchListStatus.value = false
    return
  }else {
    showSearchListStatus.value = true
  }
  searchText.value = n;
  setTimeout(async ()=>{
    const res = await GoodsSearchApi(n);
    searchGoodsList.value = res.results;
  },500)
})

// 搜索回车跳转
const performSearch = ()=>{
// 从本地存储中获取搜索历史记录
  let searchList = [];
  let searchGood = uni.getStorageSync('SearchGood');
  if (searchGood) {
    try {
      searchList = JSON.parse(searchGood);
    } catch(e) {
      console.error(e);
    }
  }
  if (searchList) {
    // 如果搜索历史记录存在，则将新的搜索记录添加到数组中
    searchList.push({ goodsName: searchText.value });
  } else {
    // 如果搜索历史记录不存在，则创建一个新的数组，并将搜索记录添加到数组中
    searchList = [{ goodsName: searchText.value }];
  }
  uni.setStorageSync('SearchGood', JSON.stringify(searchList));

  // 跳转到搜索结果页面
  uni.navigateTo({
    url:`/pages/goods/components/SerachList?name=${searchText.value}`
  })
}
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

.search-goods-list{
  position: absolute;
  z-index: 999;
  left: 25%;
  width: 60%;
  border-radius: 15px;
  background-color: #ffffff;
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
  .search-goods-list-ul{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .search-goods-list-ul-li{
      width: 100%;
      height: 40px;
      margin:20px 0 0 -16%;
      border-bottom: 1px solid #c5c3c340;
      p{
        width: 95%;
        height: 15px;
        padding: 5px;
        font-size: 1rem;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
