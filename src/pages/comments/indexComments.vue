<template>
    <view class="comment-card-wrapper no-tags to-hash no-bottom" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
      <view class="panel-header">
        <view class="content">
          <view>
            <span class="title">晒图/讨论</span>
            <span class="count">758条</span>
          </view>
          <view class="btn-publish" @tap="goPushComment">
            <span class="sendping">发精评</span>
            <span class="plus">+</span>
          </view>
        </view>
      </view>
        <view class="panel-content">
          <view class="photo-wall">
            <view class="img-wrapper">
              <view class="img-list c5 c5-1">
                <view class="lazy-img-wrapper">
                  <img src="https://p2.lefile.cn/product/adminweb/2023/08/18/Q9lBGoaswAZvmYoEHJJiYSzK1-0946.jpg">
                </view>
              </view>
              <view class="img-list c5 c5-n" v-for="item,index in 4" :key="index">
                <view class="lazy-img-wrapper">
                  <img src="https://p2.lefile.cn/product/adminweb/2023/08/18/Q9lBGoaswAZvmYoEHJJiYSzK1-0946.jpg">
                </view>
              </view>
            </view>
          </view>
          <navigator :url="`/pages/comments/components/userCommentsPlane?goodsId=${query.id}`">
          <view class="bili-callapp-btn-wrap">
            <view class="bili-callapp-btn">展开全部评论</view>
          </view>
          </navigator>
        </view>
    </view>
</template>

<script setup lang="ts">
// 获取屏幕边界到安区域距离

import {onShow} from "@dcloudio/uni-app";

const { safeAreaInsets } = uni.getSystemInfoSync();

const goPushComment = ()=>{
  uni.navigateTo({url:`/pages/comments/components/userComments?goodsId=${query.id}`})
}

const query = defineProps<{
  id: string
}>()

onShow(() => {
})
</script>

<style scoped lang="scss">
.comment-card-wrapper {
  margin: var(--module-margin, 0 0 12px 0);
  background: var(--module-bg, #fff);
  border-radius: var(--module-radius, 12px);
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: 50% 50%;

  .panel-header {
    width: 100%;
    height: 45px;
  }

  .content {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    height: 100%;
    padding: 0 12px;
  }

  .title {
    font-size: 14px;
    color: #111;
    font-weight: 700;
  }

  .count {
    font-size: 12px;
    color: #999;
  }

  .btn-publish {
    font-size: 12px;
    color: #666;
  }

  .sendping {
    font-style: inherit;
    color: orange;
  }

  .plus {
    color: #bbb;
    padding-left: 4px;
  }

  .panel-content {
    min-height: 125px;
    padding-bottom: 10px;
    padding-top: 12px;
  }
  .photo-wall {
    margin-top: -2px;
    padding: 0 15px 13px;
    .img-wrapper {
      overflow: hidden;
      position: relative;
      margin-left: -3px;
      margin-right: -12px;
      .lazy-img-wrapper{
        position: relative;
        padding-top: 100%;
      }
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        min-height: 100%;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        object-fit: cover;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
      }
    }
      .img-list{
      float: left;
      width: 48%;
      box-sizing: border-box;
      padding: 2px 0 0 2px;
    }
    .img-list c5 c5-1{
      width: 48%;
    }
    .img-list.c5-n {
      width: 24%;
    }

  }
}
.bili-callapp-btn-wrap .bili-callapp-btn, .bili-callapp-btn-wrap {
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  .bili-callapp-btn {
    width: 100%;
    height: 40px;
    border-radius: 20px;
    border: .5px solid var(--xiaofan-bg-main-color);
    font-family: PingFang SC;
    font-weight: 400;
    font-size: 15px;
    color: var(--xiaofan-bg-main-color);
  }

}
</style>
