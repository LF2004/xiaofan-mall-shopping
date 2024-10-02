<script setup lang="ts">
import { ref } from 'vue'
import { GetOrderListApi,againPayOrderApi,PayOrderApi,PaySuccesspaymentOrderApi } from '@/services/order'
import {OrderState,orderStateList} from '@/services/constants'
import { onShow} from "@dcloudio/uni-app";
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()


// tabs 数据
const orderTabs = ref([
  { orderState: 0, title: '全部' },
  { orderState: 1, title: '待付款' },
  { orderState: 2, title: '待发货' },
  { orderState: 3, title: '待收货' },
  { orderState: 4, title: '待评价' },
])

// 高亮下标
const activeIndex = ref()

const orderList = ref([]);

const getOrderListData = async (id) =>{
  activeIndex.value = id;
  orderList.value = await GetOrderListApi(id ? id : 0);
}

// 再次购买
const againPay = async (id) =>{
  const res = await againPayOrderApi(id);
  let newOrderId = res.newOrderId;
  if(res.code === 200) {
    uni.showToast({ icon: 'success', title: res.msg });
    uni.navigateTo({
      url:`/pagesOrder/detail/detail?id=${newOrderId}`
    })
  }
};

// 去支付
const goPayOrder = async (id) =>{
  const res = await PayOrderApi(id);
  // 在按钮的点击事件中调用showToast方法
  uni.showToast({
    title: '正在打开支付页面',
    icon: 'loading',
    duration: 2000,
    success:async ()=>{
      uni.setStorageSync('payUrl',res.paymentUrl)
      uni.setStorageSync('orderId',id)
      uni.navigateTo({
        url: '/pages/pay/index'
      });



      let intervalId;
      // 开始轮询支付结果
      intervalId = setInterval(async ()=>{
        const payStatus = await PaySuccesspaymentOrderApi(query.id);
        if(payStatus.code === 200 || payStatus.code === 202){
          getOrderData();
          clearInterval(intervalId);
        }
      },1500)
    }
  });

}

onShow(() =>{
  getOrderListData()
})
</script>

<template>
  <view class="viewport" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <!-- tabs -->
    <view class="tabs">
      <text
        class="item"
        v-for="(item, index) in orderTabs"
        :key="item.title"
        @tap="getOrderListData(index)"
      >
        {{ item.title }}
      </text>
      <!-- 游标 -->
      <view class="cursor" :style="{ left: activeIndex * 20 + '%' }"></view>
    </view>
    <!-- 滑动容器 -->
    <swiper class="swiper" :current="activeIndex" @change="getOrderListData($event.detail.current)">
      <!-- 滑动项 -->
      <swiper-item v-for="item in 5" :key="item">
        <!-- 订单列表 -->
        <scroll-view scroll-y class="orders">
          <view class="card" v-for="order in orderList" :key="order.goodsId">
            <!-- 订单信息 -->
            <view class="status">
              <text class="date">{{ order.creatTime }}</text>
              <!-- 订单状态文字 -->
              <text>{{ orderStateList[order.payStatus].text }}</text>
              <!-- 待评价/已完成/已取消 状态: 展示删除订单 -->
              <text class="icon-delete" v-if="order.payStatus >= OrderState.DaiPingJia"></text>
            </view>
            <!-- 商品信息，点击商品跳转到订单详情，不是商品详情 -->
            <navigator
              v-for="(sku,index) in order.goodsName"
              :key="order.orderId"
              class="goods"
              :url="`/pagesOrder/detail/detail?id=${order.orderId}`"
              hover-class="none"
            >

                <image
                  style="width: 100px;height: 100px;margin-right: 10px"
                  :src="order.goodsImg[index].imgUrl"
                ></image>


              <view class="meta">
                <view class="name ellipsis">{{ sku.name }}</view>
                <view class="type">{{order.skuName[index].name}}</view>
              </view>
            </navigator>
            <!-- 支付信息 -->
            <view class="payment">
              <text class="quantity">共{{ order.count }}件商品</text>
              <text>实付</text>
              <text class="amount"> <text class="symbol">¥</text>
                {{ order.allPirce }}</text>
            </view>
            <!-- 订单操作按钮 -->
            <view class="action">
              <!-- 待付款状态：显示去支付按钮 -->
              <template v-if="order.payStatus === OrderState.DaiFuKuan">
                  <view class="button primary" @click="goPayOrder(order.orderId)">去支付</view>
              </template>
              <template v-else>
                <button
                  class="button secondary"
                  style="background-color: #fff"
                  @click="againPay(order.orderId)"
                >
                  再次购买
                </button>
                <!-- 待收货状态: 展示确认收货 -->
                <view v-if="order.payStatus === OrderState.DaiShouHuo" class="button primary">确认收货</view>
              </template>
            </view>
          </view>
          <!-- 底部提示文字 -->
          <view
            class="loading-text"
            :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }"
          >
            {{ true ? '没有更多数据~' : '正在加载...' }}
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}

.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

// tabs
.tabs {
  display: flex;
  justify-content: space-around;
  line-height: 60rpx;
  margin: 0 10rpx;
  background-color: #fff;
  box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);
  position: relative;
  z-index: 9;

  .item {
    flex: 1;
    text-align: center;
    padding: 20rpx;
    font-size: 28rpx;
    color: #262626;
  }

  .cursor {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 20%;
    height: 6rpx;
    padding: 0 50rpx;
    background-color: var(--xiaofan-bg-main-color);
    /* 过渡效果 */
    transition: all 0.4s;
  }
}

// swiper
.swiper {
  background-color: #f7f7f8;
}

// 订单列表
.orders {
  .card {
    min-height: 100rpx;
    padding: 20rpx;
    margin: 20rpx 20rpx 0;
    border-radius: 10rpx;
    background-color: #fff;

    &:last-child {
      padding-bottom: 40rpx;
    }
  }

  .status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;
    color: #999;
    margin-bottom: 15rpx;

    .date {
      color: #666;
      flex: 1;
    }

    .primary {
      color: #ff9240;
    }

    .icon-delete {
      line-height: 1;
      margin-left: 10rpx;
      padding-left: 10rpx;
      border-left: 1rpx solid #e3e3e3;
    }
  }

  .goods {
    display: flex;
    margin-bottom: 20rpx;

    .cover {
      width: 170rpx;
      height: 170rpx;
      margin-right: 20rpx;
      border-radius: 10rpx;
      overflow: hidden;
      position: relative;
    }

    .quantity {
      position: absolute;
      bottom: 0;
      right: 0;
      line-height: 1;
      padding: 6rpx 4rpx 6rpx 8rpx;
      font-size: 24rpx;
      color: #fff;
      border-radius: 10rpx 0 0 0;
      background-color: rgba(0, 0, 0, 0.6);
    }

    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .name {
      height: 80rpx;
      font-size: 30rpx;
      color: #444;
    }

    .type {
      line-height: 1.8;
      padding: 0 15rpx;
      margin-top: 10rpx;
      font-size: 24rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
      background-color: #f7f7f8;
    }

    .more {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22rpx;
      color: #333;
    }
  }

  .payment {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    line-height: 1;
    padding: 20rpx 0;
    text-align: right;
    color: #999;
    font-size: 28rpx;
    border-bottom: 1rpx solid #eee;

    .quantity {
      font-size: 24rpx;
      margin-right: 16rpx;
    }

    .amount {
      color: #444;
      margin-left: 6rpx;
    }

    .symbol {
      font-size: 20rpx;
    }
  }

  .action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 20rpx;

    .button {
      border: 1rpx solid #ccc;
      width: 180rpx;
      height: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 20rpx;
      border-radius: 60rpx;
      font-size: 26rpx;
    }

    .secondary {
      color: var(--xiaofan-bg-main-color);
      border-color: var(--xiaofan-bg-main-color);

    }

    .primary {
      color: #fff;
      background-color: var(--xiaofan-bg-main-color);
    }
  }

  .loading-text {
    text-align: center;
    font-size: 28rpx;
    color: #666;
    padding: 20rpx 0;
  }
}
</style>
