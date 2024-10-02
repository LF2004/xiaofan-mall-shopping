<script setup lang="ts">
import returnPage from '@/components/returnPage'
// 获取屏幕边界到安全区域距离
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue';
import type { userInfo } from "@/types/userInfo";
import { GetUserInfoApi,PutUserInfoApi,PutUserAvatarApi } from "@/services/userInfo";
import { userMannerInfoStore } from '@/stores';
const { safeAreaInsets } = uni.getSystemInfoSync();
const userInfoStore = userMannerInfoStore();
const back = ()=>{
  uni.switchTab({
    url:'/pages/my/my'
  })
}



// 用户信息
const userInfo = ref<userInfo[]>([]);

// 获取用户信息
const getUserInfoData = async ()=>{
  const res = await GetUserInfoApi();
  if(res.code === 200){
    userInfo.value = res;
  }else {
    uni.showToast({icon:'error',msg:'未知异常'})
  }
}
const onBirthdayChange = (e)=>{
  userInfo.value.birthday = e.detail.value
}

// 提交修改的用户信息
const onSubmit = async ()=>{
  const res = await PutUserInfoApi(userInfo.value);
  if(res.code === 200){
    // 修改成功并修改stores用户信息
    let userInfoParams = {
      "avatar":userInfo.value.avatar,
      "NickName":userInfo.value.NickName
    }
    userInfoStore.changeUserInfoManner(userInfoParams);
    uni.showToast({ icon: 'success', title: res.msg });
  }
};

// 修改用户头像
const ChangeUserAvatar = ()=>{
  uni.chooseImage({
    count: 6, //默认9
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album','camera'],   //album 从相册选图，camera 使用相机
    success: function (res) {
      let arr = res.tempFilePaths[0] //这里接收的是上传图片的本地路径
      // 上传图片
      uni.uploadFile({
        url:'/upload/Upload',
        filePath:arr,
        name:'file',
        success: async (uploadFileRes) => {
          // 获取到imgUrl 调用更新用户头像接口
          var obj = JSON.parse(uploadFileRes.data);
          if(obj.code === 200){
            const res = await PutUserAvatarApi(obj.imgUrl);
            let userInfoParams = {
              "avatar":obj.imgUrl,
              "NickName":userInfo.value.NickName
            }
            userInfoStore.changeUserInfoManner(userInfoParams);
            uni.showToast({ icon: 'success', title: res.msg });
            getUserInfoData(); // 更新用户信息

          }
        }
      })
    }
  });
}


onLoad(()=>{
  getUserInfoData();
})
</script>

<template>
  <uni-icons type="left" size="40" color="#ffffff" @click="back()" class="return" :style="{ marginTop: safeAreaInsets?.top + 'px' }"></uni-icons>
  <view class="viewport">

    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">

      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <view class="avatar">
      <view class="avatar-content" @click="ChangeUserAvatar">
        <image
          class="image"
          :src="userInfo?.avatar"
          mode="aspectFill"
        />
        <text class="text">点击修改头像</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">

          <text class="label">账号</text>
          <text class="account">{{ (userInfo.telPhone)?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input
            class="input"
            type="text"
            v-model="userInfo.NickName"
            :value="userInfo.NickName"
            placeholder="请填写昵称"
          />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="onGenderChange">
            <label class="radio">
              <radio
                value="男"
                color="#007aff"
                v-model="userInfo.gender"
                :checked="userInfo.gender === '男'"
              />
              男
            </label>
            <label class="radio">
              <radio
                value="女"
                color="#007aff"
                v-model="userInfo.gender"
                :checked="userInfo.gender === '女'"
              />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <picker
            @change="onBirthdayChange"
            class="picker"
            mode="date"
            v-model="userInfo.birthday"
            start="1900-01-01"
            :end="new Date()"
          >
            <view v-if="userInfo?.birthday">{{
                userInfo.birthday
            }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <view class="form-item">
        <text class="label">城市</text>
        <input
          class="input"
          type="text"
          v-model="userInfo.county"
          :value="userInfo.county"
          placeholder="请填写城市"
        />
      </view>
        <view class="form-item">
          <text class="label">职业</text>
          <input
            class="input"
            type="text"
            v-model="userInfo.profession"
            placeholder="请填写职业"
            :value="userInfo.profession"
          />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button @tap="onSubmit" class="form-button">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
.return{
  position: absolute;
  top: 0px;
  z-index: 99;
}
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url('@/static/images/profile_bg.png');
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 导航栏
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #007aff;
  }
}
</style>
