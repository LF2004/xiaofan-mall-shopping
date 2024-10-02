<template>
  <!-- 首页轮播图公告 -->
  <view class="index-swiper">
    <view class="carousel">
      <swiper
        :circular="true"
        :autoplay="true"
        :interval="3000"
        @change="onChange"
      >
        <swiper-item v-for="item,index in imgUrl" :key="index">
          <navigator
            url="/pages/index/index"
            hover-class="none"
            class="navigator"
          >
            <image mode="aspectFill" class="image" :src="item.banner_img"></image>
          </navigator>
        </swiper-item>
      </swiper>
      <!-- 指示点 -->
      <view class="indicator">
        <text
          v-for="(item, index) in imgUrl.length"
          :key="index"
          class="dot"
          :class="{ active: index === activeIndex }"
        ></text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import SwiperComponents from "@/components/SwiperComponents";
import { GetBannerApi } from "@/services/getGoodsList"
import { ref } from 'vue'
const activeIndex = ref(0)
// 当swiper下标发生变化时触发
// UniHelper为uni-app提供的事件类型
const onChange: UniHelper.SwiperOnChange = (ev) => {
  // ! 非空断言,主观上排除非空值情况
  activeIndex.value = ev.detail!.current
}
const imgUrl = ref([])

const getBanner = async () => {
  const res = await GetBannerApi()
  imgUrl.value = res
}

getBanner()
</script>

<style lang="scss">
/* 轮播图 */
.carousel {
  height: 100%;
  position: relative;
  overflow: hidden;
  transform: translateY(0);
  background-color: #efefef;
  border-radius: 6px;
  .indicator {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 16rpx;
    display: flex;
    justify-content: center;
    .dot {
      width: 30rpx;
      height: 6rpx;
      margin: 0 8rpx;
      border-radius: 6rpx;
      background-color: rgba(255, 255, 255, 0.4);
    }
    .active {
      background-color: #fff;
    }
  }
  .navigator,
  .image {
    width: 100%;
    height: 100%;
  }
}
</style>
