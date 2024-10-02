<template>
  <view class="header is-browser" style="z-index: 1" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <view class="header-content">
      <i class="icon-back" @tap="TapOnBack" style="z-index: 999"></i>
      <view class="content">发表讨论</view>
    </view>
  </view>

  <view class="scroll-content is-browser-scroll">
    <view class="row-wrapper">
      <view class="item-header">
        <img :src="goodsNameAndPiceure?.picture">
        <view class="item-right">
          <view class="item-name">{{goodsNameAndPiceure?.goodsName}}</view>
        </view>
      </view>
      <textarea placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。" v-model="userInpCommentsVal"></textarea>
      <view class="upload-pic upload-wrapper">
        <view class="upload-show">
          <view class="upload-btn">
            <label class="img-uploader-label"></label>
            <view class="count">
              <view>上传图片</view>
              <view>0/9</view>
            </view>
          </view>
          <view class="imgs-wrapper">
            <view class="img-item">
              <img src="https://gw.alicdn.com/bao/uploaded/i4/1917047079/O1CN01qgWz9S22AEcwf1Sqq_!!1917047079.jpg_Q75.jpg_.webp">
              <view class="upload-close"></view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>

  <view class="footer">
    <button class="button" @click="submitComment">提交</button>
  </view>
</template>

<script setup lang="ts">
import {GetGoodsNameAndPictureApi} from '@/services/getGoodsList';
import { CommentOrderApi } from '@/services/order';
import { SendCommentsApi } from '@/services/comments';
import {onLoad} from "@dcloudio/uni-app";
import {ref} from 'vue'
const { safeAreaInsets } = uni.getSystemInfoSync();

const TapOnBack = ()=>{
  uni.navigateBack()
}

const query = defineProps<{
  goodsId: string
  orderId: string
}>()

const goodsNameAndPiceure = ref()

const GetGoodsNameAndPictureData = async ()=>{
  const res = await GetGoodsNameAndPictureApi(query.goodsId);
  goodsNameAndPiceure.value = res;
}

const userInpCommentsVal = ref();

// 提交评论
const submitComment = async ()=>{
  let params = {
    goodsId:query.goodsId,
    type:'0',
    connents:userInpCommentsVal.value
  }
  const res = await SendCommentsApi(params);
  uni.showToast({ icon: 'success', title: res.msg });
  await CommentOrderApi(query.orderId)
}

onLoad(() =>{
  GetGoodsNameAndPictureData()
})

</script>

<style scoped lang="scss">
page{
  background-color: #f4f4f4;
}
.header {
  position: fixed;
  top: 0;
  width: 100%;
  background: #fff;
  box-shadow: inset 0 -0.05333rem 0 0 #e7e7e7;
  min-height: 2.34667rem;
  .content {
    position: relative;
    font-size: 1rem;
    color: #333;
    left: 35%;
    letter-spacing: 0;
    padding: .58667rem 1.06667rem 0 1.12rem;
    line-height: 1.17333rem;
    box-sizing: border-box;
  }
  .is-browser {
    height: 2.34667rem;
  }
  .header-content {
    position: relative;
  }
  .icon-back {
    position: absolute;
    left: .64rem;
    top: .58667rem;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNLTYtMmgyMnYyMkgtNnoiLz48cGF0aCBkPSJNLTUgMTloMjBWLTFILTV6Ii8+PHBhdGggZD0iTTkuMjEgMThhLjg0My44NDMgMCAwMS0uNTktLjIzM0wuMTk5IDkuNDZhLjYzLjYzIDAgMDEwLS45Mkw4LjYxOS4yMzNBLjg3Ljg3IDAgMDE5LjczNi4xNzVjLjMyNi4yNTQuMzU1LjY5LjA2Ni45NzdMMS44NDUgOWw3Ljk1NiA3Ljg0OGMuMjkuMjg2LjI2LjcyMy0uMDY2Ljk3OEEuODUxLjg1MSAwIDAxOS4yMSAxOCIgZmlsbD0iIzc1NzU3NSIvPjwvZz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-size: .53333rem .96rem;
    background-position: 50%;
    height: 1.17333rem;
    width: 1.17333rem;
    z-index: 2;
  }

}
.row-wrapper {
  width: 100%;
  margin-top: .64rem;
  box-sizing: border-box;
  padding: .64rem;
  border-radius: .21333rem;
  background: #fff;
  box-shadow: 0 0 0 0 #e7e7e7;
  .item-header {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    height: 2.4rem;
    padding-bottom: .53333rem;
    .item-name {
      position: absolute;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      font-size: .69333rem;
      line-height: .96rem;
      letter-spacing: 0;
      text-overflow: ellipsis;
      top: .10667rem;
      color: #212121;
    }
    .item-extra {
      position: relative;
      top: 1rem;
      font-size: .69333rem;
      color: #999;
    }
    .item-right {
      position: relative;
      -webkit-box-flex: 1;
      -webkit-flex: 1 1;
      -ms-flex: 1 1;
      flex: 1 1;
      margin-left: .64rem;
    }
    img {
      height: 2.4rem;
      width: 2.4rem;
      border-radius: .10667rem;
    }
  }
  .item-header:after {
    content: "";
    position: absolute;
    border-bottom: .05333rem solid #e7e7e7;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
.is-browser-scroll {
  padding-top: 2.34667rem;
}
.scroll-content {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 2.34667rem .64rem 3.41333rem;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  .row-wrapper {
    width: 100%;
    margin-top: .64rem;
    box-sizing: border-box;
    padding: .64rem;
    border-radius: .21333rem;
    background: #fff;
    box-shadow: 0 0 0 0 #e7e7e7;
  }
}
textarea {
  height: 6.4rem;
  width: 100%;
  margin-top: .8rem;
  padding: 0;
  box-sizing: border-box;
  resize: none;
  border: 0;
  outline: 0;
  font-size: .74667rem;
  color: #212121;
  background: transparent;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  letter-spacing: 0;
}
.upload-wrapper {
  margin-top: .42667rem;
  .upload-show{
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    overflow: hidden;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .upload-btn {
    font-size: .64rem;
    position: relative;
    margin-top: .64rem;
    margin-right: .8rem;
    color: #fff;
    width: 4.26667rem;
    height: 4.26667rem;
  }
  .img-uploader-label {
    display: block;
    height: 4.26667rem;
    width: 4.26667rem;
    box-sizing: border-box;
    border: .05333rem solid #e7e7e7;
    border-radius: .26667rem;
    background-color: #007aff;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABMBJREFUaAXtmU1sVUUUx9/Dj6qQqpUIVAKVuNHERJPioqmYNEjSQFxBWMCakBAWroytCxM36sa9O9OVSjQmNmoCSEgAIS3gSmOEhrQNHwqmBKS2xfr7lzuXuefdub33vr6+Z8JJ/p05Z845c8583ZnXSuV/TtVWi39+fv4xYnoNrAK/VKvVsawYWyoBgn+UYAfBM2AW/AO+JonTlKm0IlXaPGEPXXcBJfJIVG6jDNLDwZbmNHTSrYL36Wlm5nFm4Y4vdPUVNPaDcdAoku9+1+EipQZUCQhtXj24UtTwKVgPGkXyrT7ykOJxgbslZGck4UcZNzL4RGc5GMWjwOcjXR0ymQdNVesmUm5UMYHjfazh71wHdLma+gB4FTwEZiJotJWEeJ1ArrwW1Z3edfhT+Dwr5QQhzMw4oVyCIXj5/xy8AhSkC9QFJ97SGgROT+WTYD2+ZmoSsJYN4DfhsxcoEDf7/qA5mcpQnaYF6m5GAhrpzI0ZBafCTyytfjd4PHlOlrTKCh3H4RdASTho4/qnjpOHSqd/ohkzQKyVveAk0FJSDLo2zIEusA5o6bgRV30E6EMmHelqU//IYFysOYUavYnpOEhsygEaDwB/Q6veR1w30wybNQNpsUimePQhc+Q2sZsNJ4/LVktA3wStb5EL/h4X+NtqCShozYBGXHU38nepp9KSJ8A61l3+BaCPjaA1PAX+AL+xlrUJQ/QzDTp5/NGfwOZWyKBChwkKKmY04KANvA3OJ5zVMrcQHQJ6cdUQch0qX4F/wTS4Bt6sUfQFKCTIb8tTx3gXuJRwko/5ErXOtD6Qvw72gufS2hMylBKUaMxgMNJb4uOEcXFmEpPNGd0s2lT6O0DHQ3jXB8mS1vhxMAoug5VgA9gGuoClaQRbWecnbEMu3g5aHiNs3rV28HfAR6Aj5IO2LeAksHQVgZIMEu3u5Zh84VlPQQ9RA/rdQJvMJ+0BXY8XJfQ06x/4xlH9WJYxOv6zV/epe2QdOXmoRP+IsdFJsTGkH5JjM2j8iN2eoZ9Qj/USUpi4IaVCc6/Vh9+aoppLhO2w8XcmZGj07scZbEjxhO4nRv/bFLXcIny9COaMT72+asjolE7ggnG0o6anggL8HTU+d6a5MDpxArkfNDiQ7ibPua4Ihz2+bHXYGD5v+Ew2dwJ40R3Fp0nObp3h9dIF40B3qdxUJAFddX36y2fqqFs/7UV8FUlAzzmfnvWZOurWz40ivookoDUfbx7q69gXTxXpLKD7kpHrR6vclDsB1ruC133dkZZU8MPjlHKUbxmdXw2fzYaOpzQrdN83+iPw7tWUZpIpw/YN428WPnUPGL37K8E2lOD3Z0YZaKQfPYJ+L9HfgknstqwDz26Gek/sMEcFfV3ohjwfhatxN1j6t7zCjiKD25S7Y6cZFfTawTeRXdkicRt19+yizuyVWvbfAz0Haw4HZB3gINDdvx7SgMf/8alnA77DQH8YGGz99HcOXAFPAD1WuoH9GCKqTIAtnHJjYpaVGIk9QC+xsvQThmuXNWjbGQG8DH4omMEU+nrQ+D8jWtfLyxNMH/gM/AlCNErDe2D1UkVXeg+EAiA4bWBdMfRrhNa/7lB/g5us89uUD+jBCLTSCPwH4goiZ6wczoMAAAAASUVORK5CYII=);
    background-position: center 1.06667rem;
    background-size: 1.06667rem 1.06667rem;
    background-repeat: no-repeat;
  }
  .count {
    position: absolute;
    top: 75%;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    left: 50%;
    text-align: center;
    -webkit-transform: translate(-50%,-50%) scale(.8);
    transform: translate(-50%,-50%) scale(.8);
  }
  .imgs-wrapper {
    -webkit-box-flex: 1;
    -webkit-flex: 1 1;
    -ms-flex: 1 1;
    flex: 1 1;
    padding-top: .64rem;
    white-space: nowrap;
    overflow: auto;
    font-size: 0;
    .img-item{
      display: inline-block;
      margin-left: .8rem;
      position: relative;
      height: 4.26667rem;
      width: 4.26667rem;
      box-sizing: border-box;
      border: .05333rem solid #e7e7e7;
      border-radius: .21333rem;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      vertical-align: top;
      .upload-close{
        height: .85333rem;
        width: .85333rem;
        position: absolute;
        top: -.26667rem;
        right: -.42667rem;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCB4MT0iMTA2LjU4NyUiIHkxPSIyOC4wNDUlIiB4Mj0iMi40MTIlIiB5Mj0iOTcuNTg4JSIgaWQ9ImEiPjxzdG9wIHN0b3AtY29sb3I9IiNGQjcyOTkiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjRkI3Mjk5IiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjxjaXJjbGUgaWQ9ImIiIGN4PSIxNCIgY3k9IjEyIiByPSIxMCIvPjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00IC0yKSI+PHVzZSBmaWxsPSJ1cmwoI2EpIiB4bGluazpocmVmPSIjYiIvPjx1c2UgZmlsbD0iI0ZCNzI5OSIgeGxpbms6aHJlZj0iI2IiLz48L2c+PHBhdGggZD0iTTEwLjA3MSA4LjY1N0w3Ljk1IDYuNTM2QTEgMSAwIDEwNi41MzYgNy45NWwyLjEyIDIuMTIxLTIuMTIgMi4xMjFhMSAxIDAgMDAxLjQxNCAxLjQxNWwyLjEyMS0yLjEyMiAyLjEyMSAyLjEyMmExIDEgMCAxMDEuNDE1LTEuNDE1bC0yLjEyMi0yLjEyIDIuMTIyLTIuMTIyYTEgMSAwIDEwLTEuNDE1LTEuNDE0bC0yLjEyIDIuMTJ6IiBmaWxsPSIjRkZGIi8+PC9nPjwvc3ZnPg==);
        background-size: .85333rem .85333rem;
        background-repeat: no-repeat;
      }
      img{
        height: 100%;
        width: 100%;
        border-radius: .21333rem;
      }
    }
  }

}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: .64rem;
  min-height: 3.41333rem;
  box-sizing: border-box;
  box-shadow: 0 -0.05333rem 0 0 rgba(0,0,0,.15);
  background: #fff;
  .button {
    height: 2.13333rem;
    border-radius: 1.92rem;
    box-shadow: 0 0.05333rem 0.21333rem 0 #007aff8a;
    text-align: center;
    font-size: 0.74667rem;
    color: #fff;
    letter-spacing: 0;
    line-height: 2.13333rem;
    background-image: linear-gradient(-236deg, #b8d5f5, #007aff);
  }
}
</style>
