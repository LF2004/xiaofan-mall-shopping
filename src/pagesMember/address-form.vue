<script setup lang="ts">
import { ref } from 'vue';
import { AddAddressApi,UpdateAddressApi,getAddressListApi,getUserAddressApi } from '@/services/address';
import {onLoad} from "@dcloudio/uni-app";
// 表单数据
const form = ref({
  receiver: '', // 收货人
  contact: '', // 联系方式
  fullLocation: '', // 省市区
  province: '', // 省份
  city: '', // 城市
  county: '', // 区/县
  address: '', // 详细地址
  isDefault: 0, // 默认地址，1为是，0为否
})

const query = defineProps<{
  type: string
  addressId:string
}>()

const addOrChangeAddress = async ()=>{
  // 进行添加
  if(query.type === '1'){
    const rest = await AddAddressApi(form.value)
    uni.showToast({ icon: 'success', title: rest.msg });
  }else {
    const res = await UpdateAddressApi(form.value)
    uni.showToast({ icon: 'success', title: res.msg });
  }
  uni.redirectTo({
    url:'/pagesMember/address'
  })
}

const ChangDefaultAddress = async ()=>{
  if(form.value.isDefault === 1){
    form.value.isDefault = 0;
  }else {
    form.value.isDefault = 1;
  }
}

const userAddressInfo = ref()

onLoad(async () => {
  console.log(query.addressId)
  if(query.type !== '1'){
    const { results } = await getUserAddressApi(query.addressId);
    const addressInfo = results[0];
    const {
      receiver,
      contact,
      fullLocation,
      province,
      city,
      county,
      address,
      isDefault
    } = addressInfo;

    Object.assign(form.value, addressInfo); // 使用对象的解构赋值合并默认值

    userAddressInfo.value = addressInfo;
  }

});

</script>

<template>
  <view class="content">
    <form>
      <!-- 表单内容 -->
      <view class="form-item">
        <text class="label">收货人</text>
        <input class="input" placeholder="请填写收货人姓名"  v-model="form.receiver"/>
      </view>
      <view class="form-item">
        <text class="label">手机号码</text>
        <input class="input" placeholder="请填写收货人手机号码"  v-model="form.contact"/>
      </view>
      <view class="form-item">
        <text class="label">所在地区</text>
        <input class="picker" placeholder="请填写省" v-model="form.province"/>
        <input class="picker" placeholder="请填写市" v-model="form.city"/>
        <input class="picker" placeholder="请填写区(县)" v-model="form.county"/>
      </view>
      <view class="form-item">
        <text class="label">详细地址</text>
        <input class="input" placeholder="街道、楼牌号等信息"  v-model="form.address"/>
      </view>
      <view class="form-item">
        <label class="label">设为默认地址</label>
        <switch class="switch" color="#00bb99" :checked="userAddressInfo?.isDefault === 1" @change="ChangDefaultAddress()"/>
      </view>
    </form>
  </view>
  <!-- 提交按钮 -->
  <button class="button" @click="addOrChangeAddress()">{{ query.type == 0 ? '修改收货地址' : '添加收货地址' }}</button>
</template>

<style lang="scss">
@import '@/styles/main.scss';
page {
  background-color: #f4f4f4;
}

.content {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .form-item,
  .uni-forms-item {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;
    margin-bottom: 0;

    // 调整 uni-forms 样式
    .uni-forms-item__content {
      display: flex;
    }

    .uni-forms-item__error {
      margin-left: 200rpx;
    }

    &:last-child {
      border: none;
    }

    .label {
      width: 200rpx;
      color: #333;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .switch {
      position: absolute;
      right: -20rpx;
      transform: scale(0.8);
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }
}

.button {
  height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: var(--xiaofan-bg-main-color);
}
</style>
