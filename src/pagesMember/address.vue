<script setup lang="ts">
import { ref } from 'vue'
import {onLoad, onShow} from '@dcloudio/uni-app';
import { getAddressListApi,DeleteAddressApi } from '@/services/address';
import {deleteCartApi} from "@/services/cart";
import {userAddressInfoStore} from '@/stores';

const userAddressStore = userAddressInfoStore();
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync();

const addressList = ref([]);

const getAddressListData = async ()=>{
  const res = await getAddressListApi()
  addressList.value = res.results
}

const params = defineProps<{
  type:string
}>()



// 删除收货地址
const onDeleteAddress = async (addressId)=>{
  uni.showModal({
    content: '是否删除该地址?',
    success: async (res) => {
      if (res.confirm) {
        const res = await DeleteAddressApi(addressId);
        if(res.code === 200){
          uni.showToast({ icon: 'success', title: res.msg });
          getAddressListData();
        }else {
          uni.showToast({ icon: 'error', title: res.msg });
        }
      }
    },
  })

}

// 选中收货地址
const onChangeAddress = (item)=> {
  userAddressStore.setUserAddressInfo(item);
  if(params.type === 'create') {
    uni.navigateTo({
      url:'/pagesOrder/create/create'
    })
  }else {
    uni.showToast({ icon: 'success', title: '已选择改地址' });
  }


}
onShow(()=>{
  getAddressListData()
})
</script>

<template>
  <view class="viewport" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <h1 style="margin: 10rem auto" v-if="!addressList">暂无收货地址</h1>
    <!-- 地址列表 -->
    <scroll-view class="scroll-view" scroll-y>
      <view v-if="true" class="address">
        <uni-swipe-action class="address-list">
          <!-- 收货地址项 -->
          <uni-swipe-action-item
            class="item"
            v-for="(item,index ) in addressList"
            :key="item.addressId"
          >
            <view @tap="onChangeAddress(item)" class="item-content">
              <view class="user">
                {{ item.receiver }}
                <text class="contact">{{ (item.contact).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') }}</text>
                <text v-if="item.isDefault === 1" class="badge">默认</text>
              </view>
              <view class="locate"
              >{{item.province}} {{item.city}} {{item.county}} {{item.address}}</view
              >
              <navigator
                class="edit"
                hover-class="none"
                :url="`/pagesMember/address-form?type=0&addressId=${item.addressId}`"
              >
                修改
              </navigator>
            </view>
            <!-- 右侧插槽 -->
            <template #right>
              <button @tap="onDeleteAddress(item.addressId)" class="delete-button">
                删除
              </button>
            </template>
          </uni-swipe-action-item>
        </uni-swipe-action>
      </view>
      <view v-else class="blank">暂无收货地址</view>
    </scroll-view>
    <!-- 添加按钮 -->
    <view class="add-btn">
      <navigator hover-class="none" url="/pagesMember/address-form?type=1">
        新建地址
      </navigator>
    </view>
  </view>
</template>

<style lang="scss">
.return{
  position: relative;
  top: 0px;
  z-index: 99;
  background-color: var(--xiaofan-bg-main-color);
}
page {
  height: 100%;
  overflow: hidden;
}

/* 删除按钮 */
.delete-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1px;
  width: 50px;
  height: 100%;
  font-size: 28rpx;
  color: #fff;
  border-radius: 0;
  padding: 0;
  background-color: #cf4444;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f4f4f4;

  .scroll-view {
    padding-top: 20rpx;
  }
}

.address {
  padding: 0 20rpx;
  margin: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .item-content {
    line-height: 1;
    padding: 40rpx 10rpx 38rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;

    .edit {
      position: absolute;
      top: 36rpx;
      right: 30rpx;
      padding: 2rpx 0 2rpx 20rpx;
      border-left: 1rpx solid #666;
      font-size: 26rpx;
      color: #666;
      line-height: 1;
    }
  }

  .item:last-child .item-content {
    border: none;
  }

  .user {
    font-size: 28rpx;
    margin-bottom: 20rpx;
    color: #333;

    .contact {
      color: #666;
    }

    .badge {
      display: inline-block;
      padding: 4rpx 10rpx 2rpx 14rpx;
      margin: 2rpx 0 0 10rpx;
      font-size: 26rpx;
      color: var(--xiaofan-bg-main-color);
      border-radius: 6rpx;
      border: 1rpx solid var(--xiaofan-bg-main-color);
    }
  }

  .locate {
    line-height: 1.6;
    font-size: 26rpx;
    color: #333;
  }
}

.blank {
  margin-top: 300rpx;
  text-align: center;
  font-size: 32rpx;
  color: #888;
}

.add-btn {
  height: 80rpx;
  text-align: center;
  line-height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: var(--xiaofan-bg-main-color);
}
</style>
