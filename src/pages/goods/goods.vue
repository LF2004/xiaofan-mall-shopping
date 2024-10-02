<template>

  <!-- SKU弹窗组件 -->
  <vk-data-goods-sku-popup
    ref="skyPopupRef"
    v-model="isShowSku"
    border-radius="20"
    :amount-type="0"
    :localdata="goodsInfo"
    :mode="mode"
    @open="onOpenSkuPopup"
    @close="SkuPopup"
    @add-cart="onAddCart"
    @buy-now="onBuyNow"
    :actived-style="{
      color: '#ffffff',
      borderColor: 'var(--xiaofan-bg-main-color)',
      backgroundColor: '#68ADFC',
    }"

  ></vk-data-goods-sku-popup>
  <returnPage style="background-color: #ffffff;border-radius: 20px" :size="30"/>
<!-- goods-header -->

  <!-- 商品轮播图展示 -->
  <view>
    <swiper circular class="detail" @change="onChange" style="width: 100%;height: 390px">

      <swiper-item v-for="(item,index) in GoodsDataDitail.goods_swiper_img" :key="index">
        <image
          @tap="onTapImage(item.imgUrl)"
          mode="aspectFill"
          class="goods-swiper-img"
          :src="item.imgUrl"
        />
      </swiper-item>
    </swiper>
    <view class="indicator">
      <text class="current">{{ currentIndex + 1 }}</text>
      <text class="split">/</text>
      <text class="total">{{ indicatorImgTotal }}</text>
    </view>
  </view>
  <view class="flex-col page">
    <!-- 商品基础信息   -->
    <view class="flex-col relative group">
      <view class="flex-row justify-between section" v-if="true">
        <view class="flex-col self-center space-y-14">
          <view class="flex-row items-center" style="padding-left: 10px">
            <text class="font_3 text_2">定金</text>
            <view class="flex-row items-baseline group_3">
              <view class="group_4">
                <text class="font_2 text">￥9.9</text>
              </view>
            </view>
          </view>
          <view class="flex-row">
            <view class="flex-col justify-start shrink-0 section_2">
              <view class="group_6">
                <text class="font_6 text_11">预计到手价</text>
                <text class="font_6 text_12">￥{{ GoodsDataDitail.price }}</text>
              </view>
            </view>
            <text class="self-center font_5 text_7 text_8">原价</text>
            <text class="self-center text_7 text_9" style="transform: translateX(5px)">￥</text>
            <text class="self-center font_5 text_7 text_10" style="transform: translateX(5px)">{{ GoodsDataDitail.oldPrice }}</text>
          </view>
        </view>
        <view class="flex-col items-end self-start group_5 space-y-16">
          <text class="font_4 text_6">售完即止</text>
          <text class="font_4 text_14">距离结束31天</text>
        </view>
      </view>
      <view class="flex-col items-end section_3 space-y-13">
        <view class="goods-name">
          <text class="font_1"
          >{{ GoodsDataDitail.name }}
          </text>
        </view>
        <view class="goods-price" v-if="false">
          <span>￥84</span>
        </view>
        <view class="goods-old-price" v-if="false">
          <span>历史价￥84</span>
        </view>
        <image @tap="onUserCollection" class="image_2" :src="userWantState ? '/static/images/want_selete.png' : '/static/images/want.png'"/>

        <text class="text_16">100人想要</text>
      </view>
    </view>
    <view class="flex-col section_4 space-y-72">
      <view class="flex-row justify-between" @tap="messageToggle">
        <!--  商品规格    -->
        <view class="flex-row items-center group_7">
          <text class="font_7">参数</text>
          <view class="flex-col items-center shrink-0 group_9 space-y-26">
            <text class="font_7">尺寸</text>
            <text class="font_9 text_20">12</text>
          </view>
          <view class="shrink-0 section_5"></view>
          <view class="flex-col items-center shrink-0 group_11 space-y-26">
            <text class="font_7">比例</text>
            <text class="font_9">3:2</text>
          </view>
        </view>
        <view class="flex-col items-center group_8 space-y-30">
          <text class="font_7 text_17">官方价</text>
          <text class="font_9">
            9.99元
          </text>
        </view>
        <view class="flex-row items-center group_10 space-x-57">
          <view class="flex-col items-center shrink-0 space-y-28">
            <text class="font_7 text_18">发售日</text>
            <text class="font_9 text_21">2023-12-25 15:38:00</text>
          </view>
          <text class="font_8 text_19">&gt;</text>
        </view>
      </view>
      <view class="flex-col space-y-23">
        <view class="flex-row justify-between items-center">
          <view class="flex-row items-center">
            <image
              class="shrink-0 image_3"
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/64488c4f54fe0000115cf112/16933998562599328159.png"
            />
            <view class="group_12">
              <text class="font_10">专业包装</text>
              <text class="font_11">·</text>
            </view>
            <view class="group_13">
              <text class="font_10 text_23">满129包邮</text>
              <text class="font_11">·</text>
            </view>
            <text class="font_10 text_24">保价保单</text>
          </view>
          <text class="font_8 text_22">&gt;</text>
        </view>
        <view class="flex-row group_14 space-x-9">
          <image
            class="image_4"
            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/64488c4f54fe0000115cf112/16933998562611693067.png"
          />
          <text class="font_7 text_25">不支持7天无理由退货</text>
        </view>
      </view>
    </view>
    <!-- 相关推荐 -->
    <recommendGoods :list="RelatedGoods"/>
    <!-- 用户评论   -->
   <index-comments :id="query.id"/>
  </view>
  <view class="partner-detail">
    <view class="panel-inner-title">商品详情</view>
    <view class="text-description">
      <view class="text-image">
        <view class="module-item">
          <view class="module-item-title">
            <span class="module-item-title-icon"></span>
            <span class="module-item-title-text">商品介绍</span>
          </view>

          <view class="module-item-content">
            <div class="item-type module-item-image" v-for="item,index in GoodsDataDitail.detail_img" :key="index">
              <img :src="item.imgUrl" style="height: auto;">
            </div>
          </view>
        </view>
      </view>
    </view>
  </view>
  <!-- 提示信息弹窗 -->
  <view>
      <uni-popup ref="popup" type="share" safeArea backgroundColor="#fff">
        <view class="franky-popup_box">
          <view class="params-pop">
            <view class="params-pop-header">
              <view class="title">详细参数</view>
              <view class="icon-close" @tap="closePopup"></view>
            </view>
            <view class="params-table">
              <view class="params-tr">
                <view class="params-td-key">尺寸</view>
                <view class="params-td-value">高约12</view>
              </view>
              <view class="params-tr">
                <view class="params-td-key">比例</view>
                <view class="params-td-value">4:3</view>
              </view>
              <view class="params-tr">
                <view class="params-td-key">官方价</view>
                <view class="params-td-value">9.9</view>
              </view>
              <view class="params-tr">
                <view class="params-td-key">发行日</view>
                <view class="params-td-value">2023-12-25 15:45:00</view>
              </view>
              <view class="params-tr">
                <view class="params-td-key">材质</view>
                <view class="params-td-value">塑料</view>
              </view>
            </view>
          </view>
        </view>
      </uni-popup>
  </view>

  <!-- 用户操作 -->
  <view
    class="toolbar"
    :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }"
  >
    <view class="icons">
      <button class="icons-button"><text class="icon-heart"></text>收藏</button>
      <button class="icons-button" open-type="contact">
        <text class="icon-handset"></text>客服
      </button>
      <navigator
        class="icons-button"
        url="/pages/cart/cart"
        open-type="switchTab"
      >
        <text class="icon-cart"></text>购物车
      </navigator>
    </view>
    <view class="buttons">
      <view class="addcart" @tap="openSkuPopup(SkuMode.Cart)"> 加入购物车 </view>
      <view class="buynow" @tap="openSkuPopup(SkuMode.Buy)"> 立即购买 </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// 获取商品详情数据
import {ref,computed  } from 'vue'
import {onLoad} from '@dcloudio/uni-app';
import returnPage from '@/components/returnPage'
import recommendGoods from "@/pages/goods/components/recommendGoods.vue";
import {
  GetGoodsDataDitailApi,
  BrowseGoodsApi,
  userCollectionApi,
  GetGoodsNameAndPictureApi, GetRelatedGoodsApi
} from "@/services/getGoodsList";
import {AddCartApi} from "@/services/cart";
import type { goodsDetailData } from '@/types/goods';
// 导入用户评论组件
import indexComments from "@/pages/comments/indexComments.vue"
import IndexComments from "@/pages/comments/indexComments.vue";
import type { UniPopupType } from '@uni-helper/uni-ui-types'
import type {
  SkuPopupEvent,
  SkuPopupInstanceType,
  SkuPopupLocaldata,
} from '@/components/vk-data-goods-sku-popup/vk-data-goods-sku-popup'



// 是否打开SKU弹窗
const isShowSku = ref(false);

// sku按钮模式
enum SkuMode {
  Both = 1,
  Cart = 2,
  Buy = 3,
}
const mode = ref<SkuMode>(SkuMode.Both)



// 后端返回的商品信息
const goodsInfo = ref({});

const openSkuPopup = (val: SkuMode)=>{
  isShowSku.value = true
  mode.value = val
  /**
   * 获取商品信息
   * 这里可以看到每次打开SKU都会去重新请求商品信息,为的是每次打开SKU组件可以实时看到剩余库存
   */
  // 此处写接口请求，并将返回的数据进行处理成goodsInfo的数据格式，
  // goodsInfo是后端返回的数据
  goodsInfo.value = GoodsDataDitail.value.convertedData;

};


// sku组件实例
const skyPopupRef = ref<SkuPopupInstanceType>()
// 计算sku被选中的值
const selectArrText = computed(() => {
  return skyPopupRef.value?.selectArr?.join(' ').trim() || '请选择商品规格'
})

const CartParams = ref({
  skuId:'',
  count:''
});
// 加入购物车
const onAddCart = async (ev: SkuPopupEvent) => {
  isShowSku.value = false;
  // 添加商品
  CartParams.value.skuId = ev._id;
  CartParams.value.count = ev.buy_num;
  const res = await AddCartApi(CartParams.value);
  uni.showToast({ icon: 'success', title: res.msg });
}

// 立即购买
const onBuyNow = (ev: SkuPopupEvent) => {
  uni.showToast({ icon: 'success', title: '购买成功' });
  isShowSku.value = false
  // uni.navigateTo({
  //   url: `/pagesOrder/create?skuId=${ev._id}&count=${ev.buy_num}`,
  // })

}


const query = defineProps<{
  id: string
}>()

const goIndex = ()=>{
  uni.navigateBack({
    delta: 1
  })
}
const popup = ref(null)

const messageToggle = ()=>{
  // @ts-ignore
  popup.value.open()
}

const closePopup = ()=>{
  // @ts-ignore
  popup.value.close()
}
const currentIndex = ref(0)
const onChange: UniHelper.SwiperOnChange = (ev) => {
  currentIndex.value = ev.detail.current
}

const userWantState = ref(false)

// 用户收藏商品
const onUserCollection = async () => {
    const res = await userCollectionApi(query.id)
    userWantState.value = res.isCollectionStatus
  // // @ts-ignore
  //   if(userWantState.value === 1) {
  //     uni.showToast({icon:'none',title:'已取消收藏'})
  //   } else {
  //     uni.showToast({icon:'none',title:'收藏成功'})
  //   }
};

const GoodsDataDitail = ref<goodsDetailData[]>([]);
const indicatorImgTotal = ref(0)
// 获取商品详情数据
const GetGoodsDataDitail = async ()=> {
  const res = await GetGoodsDataDitailApi(query.id);
  GoodsDataDitail.value = res;
  indicatorImgTotal.value = GoodsDataDitail.value?.goods_swiper_img.length;
}

// 获取相关商品

const RelatedGoods = ref([]);
const GetRelatedGoods = async ()=>{
  const res = await GetRelatedGoodsApi(query.id);
  RelatedGoods.value = res;
}

// 点击图片时
const onTapImage = (url: string) => {
  const imgUrlList = GoodsDataDitail.value.goods_swiper_img.map(item => item.imgUrl);
  // 大图预览
  uni.previewImage({
    urls: imgUrlList
  })
}
onLoad(async() =>{
  uni.pageScrollTo({
    scrollTop:0,   // 滚动到页面的目标位置  这个是滚动到顶部, 0
    duration:300  // 滚动动画的时长
  })
  await GetGoodsDataDitail();
  await GetRelatedGoods()
  // 保存用户历史浏览记录
  await BrowseGoodsApi(query.id);
})
</script>

<style scoped lang="scss">
.goods-header{
  position: fixed;
  left: 2%;
  top: 1%;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background-color: #ffffff;
  z-index: 999;
}
//弹出层
.franky-popup_box{
  bottom: 0;
  left: 0;
  height: 675px;
  width: 100%;
  .franky-popup_box {
    position: fixed;
    max-width: 100%;
    max-height: 100%;
  }
  .params-pop {
    background: #fff;
    border-radius: 4px 4px 0 0;
    box-sizing: border-box;
    padding: 0 12px 20px;
    line-height: 1.4;
    word-wrap: break-word;
    word-break: break-all;
    border-radius: 12px 12px 0 0;
    height: 80vh;
    overflow: hidden;
  }
  .params-pop-header{
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 18px 0;
    position: relative;
  }
  .title{
    font-size: 16px;
    color: #212121;
    text-align: center;
    font-weight: bolder;
  }
  .icon-close {
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -11px;
    width: 22px;
    height: 22px;
    background-size: 16px auto;
  }
  .params-table{
    height: calc(100% - 98px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding: 20px 0;
  }
  .params-tr {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    margin-top: 20px;
    .params-td-key{
      font-size: 12px;
      line-height: 18px;
      color: #999;
      width: 62px;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      -webkit-box-flex: 0;
      -webkit-flex-grow: 0;
      -ms-flex-positive: 0;
      flex-grow: 0;
      margin-right: 20px;
    }
    .params-td-value{
      font-size: 14px;
      line-height: 18px;
      color: #212121;
      -webkit-box-flex: 1;
      -webkit-flex: 1 1;
      -ms-flex: 1 1;
      flex: 1 1;
    }
  }

}
.goods-swiper-img {
  width: 100%;
  height: 100%;
}
.indicator {
  position: relative;
  transform: translateY(-30px);
  left: 85%;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  min-width: 40px;
  height: 20px;
  line-height: 22px;
  display: inline-block;
  font-size: 12px;
  color: #fff;
  text-align: center;
  padding: 0 5px;
  box-sizing: border-box;
}
.page {
  background-color: #f4f4f4;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  .group {
    .section {
      padding: 11.1rpx 20.83rpx;
      background-color: #fefcfd;
      .space-y-14 {
        & > view:not(:first-child),
        & > text:not(:first-child),
        & > image:not(:first-child) {
          margin-top: 9.73rpx;
        }
        .font_3 {
          font-size: 26.4rpx;
          font-family: Microsoft YaHei;
          letter-spacing: 2.65rpx;
          font-weight: 700;
          color: var(--xiaofan-bg-main-color);
        }
        .text_2 {
          line-height: 25.69rpx;
        }
        .group_3 {
          width: 142.35rpx;
          .group_4 {
            margin-left: 23.6rpx;
            line-height: 31.25rpx;
            height: 31.25rpx;
            .font_2 {
              font-size: 38.9rpx;
              font-family: Microsoft YaHei;
              font-weight: 700;
              color: var(--xiaofan-bg-main-color);
            }
            .text {
              line-height: 31.25rpx;
            }
            .text_5 {
              line-height: 5.56rpx;
              letter-spacing: 3.1rpx;
            }
            .text_3 {
              color: #f1759f;
              font-size: 27.77rpx;
              font-family: Microsoft YaHei;
              font-weight: 700;
              line-height: 22.23rpx;
            }
          }
          .text_4 {
            margin-left: -142.35rpx;
            line-height: 20.83rpx;
          }
        }
        .section_2 {
          padding: 8.33rpx 0;
          background-color: var(--xiaofan-bg-unimportant-color);
          border-radius: 15px ;
          height: 37.5rpx;
          .group_6 {
            margin-left: 15.98rpx;
            line-height: 20.83rpx;
            .font_6 {
              font-size: 20.83rpx;
              font-family: Microsoft YaHei;
              font-weight: 700;
              color: #ffffff;
              padding: 5px;
            }
            .text_11 {
              line-height: 20.83rpx;
            }
            .text_12 {
              line-height: 16.67rpx;
              letter-spacing: -2.5rpx;
            }
            .text_13 {
              color: var(--xiaofan-bg-main-color);
              font-size: 20.83rpx;
              font-family: YouYuan;
              font-weight: 700;
              line-height: 15.27rpx;
              letter-spacing: -2.5rpx;
            }
          }
        }
        .font_5 {
          font-size: 22.23rpx;
          font-family: YouYuan;
          font-weight: 700;
          color: #64676c;
        }
        .text_7 {
          text-decoration: line-through;
        }
        .text_8 {
          margin-left: 13.9rpx;
          line-height: 22.23rpx;
          letter-spacing: -2.67rpx;
        }
        .text_9 {
          color: #64676c;
          font-size: 22.23rpx;
          font-family: SimHei;
          font-weight: 700;
          line-height: 15.98rpx;
          letter-spacing: -2.67rpx;
        }
        .text_10 {
          line-height: 15.27rpx;
          letter-spacing: -0.9rpx;
        }
      }
      .group_5 {
        margin-right: 2.08rpx;
        margin-top: 27.77rpx;
        .font_4 {
          font-size: 25rpx;
          font-family: Microsoft YaHei;
          letter-spacing: 2rpx;
          font-weight: 700;
          color: var(--xiaofan-bg-main-color);
        }
        .text_6 {
          line-height: 25rpx;
        }
        .text_14 {
          margin-right: 2.08rpx;
          line-height: 26.4rpx;
        }
      }
      .space-y-16 {
        & > view:not(:first-child),
        & > text:not(:first-child),
        & > image:not(:first-child) {
          margin-top: 11.1rpx;
        }
      }
    }
    .section_3 {
      padding: 66.67rpx 41.67rpx 18.75rpx;
      background-color: #ffffff;
      .image_2 {
        margin-right: 17.35rpx;
        width: 30.56rpx;
        height: 29.17rpx;
      }
      .text_16 {
        color: #0b0b0b;
        font-size: 16.67rpx;
        font-family: Microsoft YaHei;
        line-height: 15.27rpx;
      }
    }
    .space-y-13 {
      & > view:not(:first-child),
      & > text:not(:first-child),
      & > image:not(:first-child) {
        margin-top: 9.02rpx;
      }
    }
    .image {
      width: 140.27rpx;
      height: 122.92rpx;
    }
    .pos_2 {
      position: absolute;
      right: 193.06rpx;
      bottom: 230rpx;
    }
    .group_2 {
      line-height: 13.9rpx;
      width: 650rpx;
      .font_1 {
        font-size: 25rpx;
        font-family: Microsoft YaHei;
        letter-spacing: 2rpx;
        line-height: 13.9rpx;
        font-weight: 700;
        color: #0b0b0b;
      }
      .text_15 {
        line-height: 1.73rpx;
      }
    }
    .pos {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .section_4 {
    padding: 35.42rpx 10.42rpx 90.27rpx 21.52rpx;
    background-color: #ffffff;
    border-radius: 24.31rpx;
    .group_7 {
      width: 356.25rpx;
      border-right: solid 1.4rpx #e9e9e9;
      .group_9 {
        margin-left: 37.5rpx;
        margin-bottom: 2.77rpx;
        .text_20 {
          line-height: 25rpx;
        }
      }
      .space-y-26 {
        & > view:not(:first-child),
        & > text:not(:first-child),
        & > image:not(:first-child) {
          margin-top: 18.06rpx;
        }
      }
      .section_5 {
        margin-left: 22.23rpx;
        background-color: #e9e9e9;
        width: 1.4rpx;
        height: 68.75rpx;
      }
      .group_11 {
        margin-left: 23.6rpx;
        margin-bottom: 4.17rpx;
      }
    }
    .group_8 {
      margin-bottom: 2.77rpx;
      .text_17 {
        line-height: 23.6rpx;
      }
    }
    .space-y-30 {
      & > view:not(:first-child),
      & > text:not(:first-child),
      & > image:not(:first-child) {
        margin-top: 20.83rpx;
      }
    }
    .font_7 {
      font-size: 22.23rpx;
      font-family: Microsoft YaHei;
      line-height: 22.23rpx;
      font-weight: 700;
      color: #979797;
    }
    .font_9 {
      font-size: 25rpx;
      font-family: Microsoft YaHei;
      line-height: 23.6rpx;
      font-weight: 700;
      color: #0b0b0b;
    }
    .group_10 {
      padding: 2.77rpx 0 4.85rpx 25rpx;
      border-left: solid 1.4rpx #e9e9e9;
      .space-y-28 {
        & > view:not(:first-child),
        & > text:not(:first-child),
        & > image:not(:first-child) {
          margin-top: 19.44rpx;
        }
        .text_18 {
          line-height: 21.52rpx;
        }
        .text_21 {
          line-height: 20.15rpx;
        }
      }
      .text_19 {
        line-height: 24.31rpx;
      }
    }
    .space-x-57 {
      & > view:not(:first-child),
      & > text:not(:first-child),
      & > image:not(:first-child) {
        margin-left: 39.58rpx;
      }
    }
    .space-y-23 {
      & > view:not(:first-child),
      & > text:not(:first-child),
      & > image:not(:first-child) {
        margin-top: 15.98rpx;
      }
      .image_3 {
        width: 193.75rpx;
        height: 31.25rpx;
      }
      .group_12 {
        margin-left: 34.02rpx;
        line-height: 22.23rpx;
        height: 22.23rpx;
      }
      .group_13 {
        margin-left: 12.5rpx;
        line-height: 22.92rpx;
        height: 23.6rpx;
        .text_23 {
          line-height: 22.92rpx;
        }
      }
      .font_10 {
        font-size: 22.23rpx;
        font-family: Microsoft YaHei;
        line-height: 22.23rpx;
        font-weight: 700;
        color: #0b0b0b;
      }
      .font_11 {
        font-size: 22.23rpx;
        font-family: Microsoft YaHei;
        line-height: 3.48rpx;
        font-weight: 700;
        color: #e9e9e9;
      }
      .text_24 {
        margin-left: 4.17rpx;
      }
      .text_22 {
        margin-right: 2.08rpx;
        line-height: 24.31rpx;
      }
      .group_14 {
        padding: 0 2.77rpx;
        .image_4 {
          width: 22.92rpx;
          height: 23.6rpx;
        }
        .text_25 {
          margin-bottom: 2.08rpx;
          color: #bebcbd;
        }
      }
      .space-x-9 {
        & > view:not(:first-child),
        & > text:not(:first-child),
        & > image:not(:first-child) {
          margin-left: 6.25rpx;
        }
      }
    }
    .font_8 {
      font-size: 33.33rpx;
      font-family: YouYuan;
      line-height: 23.6rpx;
      font-weight: 700;
      color: #cbcbcb;
    }
  }
  .space-y-72 {
    margin-top: 30px;
    margin-bottom: 40px;
    & > view:not(:first-child),
    & > text:not(:first-child),
    & > image:not(:first-child) {
      margin-top: 50rpx;
    }
  }
}
.goods-xqzs {
  .section {
    margin-top: 20px;
    border-radius: 24.31 rpx;
    width: 750 rpx;
    height: 100vh;
  }

  .font_1 {
    font-size: 25 rpx;
    font-family: Microsoft YaHei;
    line-height: 25.69 rpx;
    font-weight: 700;
  }

  .text {
    color: #232323;
  }

  .pos {
    position: absolute;
    left: 25 rpx;
    top: 186.81 rpx;
  }

  .section_2 {
    padding: 9.73 rpx 20.15 rpx 9.73 rpx 22.23 rpx;
    background-image: url('https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/64488c4f54fe0000115cf112/16933996510491638821.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 169.44 rpx;

    .image {
      width: 24.31 rpx;
      height: 25.69 rpx;
    }

    .text_2 {
      color: var(--xiaofan-bg-main-color);
      letter-spacing: -0.5rpx;
    }
  }

  .pos_2 {
    position: absolute;
    left: 0;
    top: 236.81 rpx;
  }

  .image_2 {
    width: 704.17 rpx;
    height: 993.75 rpx;
  }

  .pos_3 {
    position: absolute;
    left: 22.92 rpx;
    right: 22.92 rpx;
    top: 300 rpx;
  }

  .pos_4 {
    position: absolute;
    left: 25 rpx;
    right: 20.83 rpx;
    bottom: 34.73 rpx;
  }
}
.goods-price{
  position: relative;
  left: -310px;
  top: 20px;
  color: var(--xiaofan-bg-main-color);
  font-size: 20px;
  font-family: Microsoft YaHei;
  line-height: 0.7375rem;
  font-weight: 700;
}
.goods-old-price{
  position: relative;
  left: -190px;
  top: 4px;
  color: #64676c;
  font-size: 14px;
  text-decoration: line-through;
  font-family: Microsoft YaHei;
  line-height: 0.7375rem;
  font-weight: 700;
}
.partner-detail{
  border-radius: 10px;
  background-color: #ffffff;
   .panel-inner-title {
     transform: translateY(5px);
    padding-bottom: 12px!important;
     font-size: 14px;
     font-family: Microsoft YaHei;
     line-height: 0.69469rem;
     font-weight: 700;
     color: #0b0b0b;
  }
  .panel-inner-title:before {
    position: absolute;
    left: 0;
    top: 16px;
    display: block;
    width: 4px;
    height: 14px;
    content: "";
    border-radius: 0 2px 2px 0;
  }
  .module-item:first-child {
    padding-top: 0;
    margin-top: 0;
  }
  .module-item {
    padding: 10px 12px;
    word-wrap: break-word;
    word-break: break-all;
  }
  .module-item .module-item-title {
    font-family: SimSun,sans-serif;
    margin-left: -12px;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    padding: 4px 12px;
    line-height: 16px;
    color: #7b859a;
    font-weight: bolder;
    background: #f2f4f6;
    border-bottom-right-radius: 15px;
    border-top-right-radius: 15px;
    font-size: 0;
  }
  .module-item .module-item-title .module-item-title-icon{
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURXmDmUxpcXmDmXuEmnqFmXqFmXuDl3qFmXqEmXuGm39/n29/n3qEl3uEmnyFmXuFmvjAQBwAAAAPdFJOU4AAQN/voCC/v18QEGCQb5Wwa6QAAAEFSURBVHja1dI9SgNBHAXwidql2LwtpggR3EL2BBYWfjTWYpS0yxYpbexSCbmA5Aa5Qs6QJr3gJWwCrpgU8nwz4z9ZvIGv/M3yZuGNQ0r/6KxGyi/lz+TXrE3zWyofoz2VJKcrkpNEqiGbLjC+IkOhizWbAsrgJRY6r7PrBWL8vQpr1yO32CUjO4E4NClpxMlOmkgHaj0X9A91z0mkjq/Iizr8y03RSwT/Sn4+xJuNgCWVywVahBU5BVqkVN/4S9n6f9Jdm44jaRQjzSXKNcrMaK65Coex7C2R3kEzhAMedTQKdCrpIhAGsqdsXerzd4hseTbxHRghr2RJjODDPjWMki3treAHD5jR84wJ8msAAAAASUVORK5CYII=) no-repeat 50%;
    background-size: 100% 100%;
    margin-right: 4px;
    vertical-align: middle;
    margin-top: 2px;
    -webkit-box-flex: 0;
    -webkit-flex-grow: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
  }
  .module-item .module-item-title .module-item-title-text {
    font-size: 12px;
  }
  .module-item .module-item-image img{
    display: block;
    width: 100%;
  }
}

/* 底部工具栏 */
.toolbar {
  position: fixed;
  top: 94.5%;
  left: -3%;
  width: 100%;
  background-color: #fff;
  height: 100rpx;
  padding: 0 20rpx;
  border-top: 1rpx solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;
  .buttons {
    display: flex;
    & > view {
      width: 220rpx;
      text-align: center;
      line-height: 72rpx;
      font-size: 26rpx;
      color: #fff;
      border-radius: 72rpx;
    }
    .addcart {
      background-color: #ffa868;
    }
    .buynow {
      background-color: var(--xiaofan-bg-main-color);
      margin-left: 20rpx;
    }
  }
  .icons {
    padding-right: 10rpx;
    display: flex;
    align-items: center;
    flex: 1;
    .icons-button {
      flex: 1;
      text-align: center;
      line-height: 1.4;
      padding: 0;
      margin: 0;
      border-radius: 0;
      font-size: 20rpx;
      color: #333;
      background-color: #fff;
    }
    text {
      display: block;
      font-size: 34rpx;
    }
  }
}
</style>
