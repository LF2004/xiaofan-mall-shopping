<template name="skeleton">
  <view class="sk-container">
    <view class="viewport">
      <view class="search">
        <view class="input">
          <text
            class="icon-search sk-transparent sk-text-14-2857-953 sk-text sk-pseudo sk-pseudo-circle"
            >女靴</text
          >
        </view>
      </view>
      <view class="categories">
        <scroll-view :scroll-y="true" class="primary">
          <view class="item active sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-346 sk-text"
              >居家</text
            >
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-170 sk-text"
              >美食</text
            >
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-890 sk-text"
              >服饰</text
            >
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-385 sk-text"
              >母婴</text
            >
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-796 sk-text"
              >个护</text
            >
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-891 sk-text"
              >严选</text
            >
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-756 sk-text"
              >数码</text
            >
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-972 sk-text"
              >运动</text
            >
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-851 sk-text"
              >杂项</text
            >
          </view>
        </scroll-view>
        <scroll-view scroll-y="true" class="secondary">
          <view is="components/XtxSwiper" class="banner">
            <view class="carousel XtxSwiper--carousel">
              <swiper
                circular="true"
                :interval="3000"
                :current="0"
                :autoplay="false"
              >
                <swiper-item
                  style="
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    transform: translate(0%, 0px) translateZ(0px);
                  "
                >
                  <navigator
                    class="navigator XtxSwiper--navigator"
                    hover-class="none"
                  >
                    <image
                      class="image XtxSwiper--image sk-image"
                      mode="aspectFill"
                    ></image>
                  </navigator>
                </swiper-item>
                <swiper-item
                  style="
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    transform: translate(100%, 0px) translateZ(0px);
                  "
                >
                  <navigator
                    class="navigator XtxSwiper--navigator"
                    hover-class="none"
                  >
                    <image
                      class="image XtxSwiper--image sk-image"
                      mode="aspectFill"
                    ></image>
                  </navigator>
                </swiper-item>
              </swiper>
              <view class="indicator XtxSwiper--indicator">
                <text
                  class="dot XtxSwiper--dot active XtxSwiper--active"
                ></text>
                <text class="dot XtxSwiper--dot"></text>
                <text class="dot XtxSwiper--dot"></text>
                <text class="dot XtxSwiper--dot"></text>
                <text class="dot XtxSwiper--dot"></text>
              </view>
            </view>
          </view>
          <view class="panel">
            <view class="title">
              <text class="name sk-transparent sk-text-26-6667-905 sk-text"
                >居家生活用品</text
              >
              <navigator
                class="more sk-transparent sk-text-30-0000-202 sk-text sk-pseudo sk-pseudo-circle"
                hover-class="none"
                >全部</navigator
              >
            </view>
            <view class="section">
              <navigator class="goods" hover-class="none">
                <image class="image sk-image"></image>
                <view
                  class="name ellipsis sk-transparent sk-text-14-2857-71 sk-text"
                  >飞天53%vol500ml贵州茅台酒（带杯）</view
                >
                <view class="price">
                  <text class="symbol sk-transparent sk-opacity">¥</text>
                  <text
                    class="number sk-transparent sk-text-14-2857-950 sk-text"
                    >1499.00</text
                  >
                </view>
              </navigator>
              <navigator class="goods" hover-class="none">
                <image class="image sk-image"></image>
                <view
                  class="name ellipsis sk-transparent sk-text-14-2857-6 sk-text"
                  >苏格兰陈年单一麦芽威士忌700毫升</view
                >
                <view class="price">
                  <text class="symbol sk-transparent sk-opacity">¥</text>
                  <text
                    class="number sk-transparent sk-text-14-2857-211 sk-text"
                    >318.00</text
                  >
                </view>
              </navigator>
              <navigator class="goods" hover-class="none">
                <image class="image sk-image"></image>
                <view
                  class="name ellipsis sk-transparent sk-text-14-2857-586 sk-text"
                  >下饭神器酸豆角50克*10袋</view
                >
                <view class="price">
                  <text class="symbol sk-transparent sk-opacity">¥</text>
                  <text
                    class="number sk-transparent sk-text-14-2857-970 sk-text"
                    >16.00</text
                  >
                </view>
              </navigator>
              <navigator class="goods" hover-class="none">
                <image class="image sk-image"></image>
                <view
                  class="name ellipsis sk-transparent sk-text-14-2857-99 sk-text"
                  >地道卤香好味道，桂林鲜米粉245克*6盒</view
                >
                <view class="price">
                  <text class="symbol sk-transparent sk-opacity">¥</text>
                  <text
                    class="number sk-transparent sk-text-14-2857-519 sk-text"
                    >69.00</text
                  >
                </view>
              </navigator>
              <navigator class="goods" hover-class="none">
                <image class="image sk-image"></image>
                <view
                  class="name ellipsis sk-transparent sk-text-14-2857-488 sk-text"
                  >玛歌正牌干红750毫升2017年</view
                >
                <view class="price">
                  <text class="symbol sk-transparent sk-opacity">¥</text>
                  <text
                    class="number sk-transparent sk-text-14-2857-496 sk-text"
                    >6699.00</text
                  >
                </view>
              </navigator>
              <navigator class="goods" hover-class="none">
                <image class="image sk-image"></image>
                <view
                  class="name ellipsis sk-transparent sk-text-14-2857-374 sk-text"
                  >三分钟即享简餐，日式即食咖喱150克</view
                >
                <view class="price">
                  <text class="symbol sk-transparent sk-opacity">¥</text>
                  <text
                    class="number sk-transparent sk-text-14-2857-173 sk-text"
                    >15.00</text
                  >
                </view>
              </navigator>
              <navigator class="goods" hover-class="none">
                <image class="image sk-image"></image>
                <view
                  class="name ellipsis sk-transparent sk-text-14-2857-996 sk-text"
                  >百年名庄出品，法国南部干红750毫升</view
                >
                <view class="price">
                  <text class="symbol sk-transparent sk-opacity">¥</text>
                  <text
                    class="number sk-transparent sk-text-14-2857-246 sk-text"
                    >58.00</text
                  >
                </view>
              </navigator>
              <navigator class="goods" hover-class="none">
                <image class="image sk-image"></image>
                <view
                  class="name ellipsis sk-transparent sk-text-14-2857-905 sk-text"
                  >名庄金奖加身，西班牙珍藏干红750毫升</view
                >
                <view class="price">
                  <text class="symbol sk-transparent sk-opacity">¥</text>
                  <text
                    class="number sk-transparent sk-text-14-2857-750 sk-text"
                    >168.00</text
                  >
                </view>
              </navigator>
              <navigator class="goods" hover-class="none">
                <image class="image sk-image"></image>
                <view
                  class="name ellipsis sk-transparent sk-text-14-2857-320 sk-text"
                  >无芯软糯的萌妹子，建宁莲子228克</view
                >
                <view class="price">
                  <text class="symbol sk-transparent sk-opacity">¥</text>
                  <text
                    class="number sk-transparent sk-text-14-2857-364 sk-text"
                    >45.00</text
                  >
                </view>
              </navigator>
              <navigator class="goods" hover-class="none">
                <image class="image sk-image"></image>
              </navigator>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<style>
.sk-transparent {
  color: transparent !important;
}
.sk-text-14-2857-953 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.2rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-14-2857-346 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-170 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-890 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-385 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-796 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-891 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-756 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-972 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-851 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-26-6667-905 {
  background-image: linear-gradient(
    transparent 26.6667%,
    #eeeeee 0%,
    #eeeeee 73.3333%,
    transparent 0%
  ) !important;
  background-size: 100% 60rpx;
  position: relative !important;
}
.sk-text-30-0000-202 {
  background-image: linear-gradient(
    transparent 30%,
    #eeeeee 0%,
    #eeeeee 70%,
    transparent 0%
  ) !important;
  background-size: 100% 60rpx;
  position: relative !important;
}
.sk-text-14-2857-71 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 30.8rpx;
  position: relative !important;
}
.sk-opacity {
  opacity: 0 !important;
}
.sk-text-14-2857-950 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-6 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 30.8rpx;
  position: relative !important;
}
.sk-text-14-2857-211 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-586 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 30.8rpx;
  position: relative !important;
}
.sk-text-14-2857-970 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-99 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 30.8rpx;
  position: relative !important;
}
.sk-text-14-2857-519 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-488 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 30.8rpx;
  position: relative !important;
}
.sk-text-14-2857-496 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-374 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 30.8rpx;
  position: relative !important;
}
.sk-text-14-2857-173 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-996 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 30.8rpx;
  position: relative !important;
}
.sk-text-14-2857-246 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-905 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 30.8rpx;
  position: relative !important;
}
.sk-text-14-2857-750 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-320 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 30.8rpx;
  position: relative !important;
}
.sk-text-14-2857-364 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-image {
  background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
