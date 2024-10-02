<template>
  <!-- 首页导航栏-->
  <scroll-view  scroll-y class="scroll-view" @scrolltolower="OnScrollTolower">

  <view class="index-header" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <ul class="index-header-nav">
      <li class="index-header-nav-li"><p class="text">永州</p></li>
      <navigator url="/pages/goods/components/SearchGood">
        <li class="index-header-nav-li"><uni-icons type="search" size="18" class="search-icon"></uni-icons><input type="text" placeholder="搜索商品名称" class="index-header-serch"/></li>
      </navigator>
      <li class="index-header-nav-li li3" @click="sweep()"><p class="text">识物</p><uni-icons type="scan" size="24" color="#ffffff" class="search-scan"></uni-icons></li>
    </ul>
    <uni-load-more iconType="circle" status="loading" v-if="loadingStatus"/>
    <!-- 首页轮播图公告 -->
    <SwiperComponents/>

  </view>
  <!-- 首页分类功能 -->
  <IndexCassify :list="iconList"/>

  <!-- 商品限时秒杀 -->
  <view class="index-limited-spikes">
    <view class="index-limited-spikes-title">
      <view class="index-limited-spikes-text">
        <h3>限时</h3>
        <p style="color: #F54E51" class="index-limited-spikes-text-p">秒杀</p>
        <b class="index-limited-spikes-text-b">|</b>
        <span class="index-limited-spikes-text-detail">限量商品老贵了</span>
      </view>
      <!-- 倒计时 -->
      <view class="index-limited-spikes-countdown">
        <ul class="index-limited-spikes-countdown-ul">
          <li class="index-limited-spikes-countdown-ul-li">09</li><h4 class="index-limited-spikes-countdown-h4">:</h4>
          <li class="index-limited-spikes-countdown-ul-li">45</li><h4 class="index-limited-spikes-countdown-h4">:</h4>
          <li class="index-limited-spikes-countdown-ul-li">34</li>
        </ul>
      </view>
    </view>
    <!-- 现时秒杀 -->
    <view class="index-limited-spikes-goods">
        <ul class="index-limited-spikes-goods-ul">
          <li class="index-limited-spikes-goods-ul-li"><img src="https://www.z4a.net/images/2023/12/20/1e3279abc97c8581bdc8be16cb5589d7.png" class="index-limited-spikes-goods-ul-li-image"></li>
          <li class="index-limited-spikes-goods-ul-li"><img src="https://www.z4a.net/images/2023/12/20/1e3279abc97c8581bdc8be16cb5589d7.png" class="index-limited-spikes-goods-ul-li-image"></li>
          <li class="index-limited-spikes-goods-ul-li"><img src="https://www.z4a.net/images/2023/12/20/1e3279abc97c8581bdc8be16cb5589d7.png" class="index-limited-spikes-goods-ul-li-image"></li>
        </ul>
    </view>

  </view>
  <!-- 商品分类推荐-->
  <view class="commodity-classify-recommend">
    <ul class="commodity-classify-recommend-ul">
      <li class="commodity-classify-recommend-ul-li" v-for="item,index in 3">
        <p class="commodity-classify-recommend-ul-li-p">新品上市<h6 class="commodity-classify-recommend-ul-li-h6">New</h6></p>
        <span class="commodity-classify-recommend-ul-li-span">全是厂家剩下的</span>
        <img src="https://www.z4a.net/images/2023/12/20/1e3279abc97c8581bdc8be16cb5589d7.png" class="commodity-classify-recommend-ul-li-img"/>
      </li>
    </ul>
  </view>

<!--  <scroll-view scroll-x="true" style="height: 150px">-->
<!--  <view class="index-classify-tab">-->
<!--      <ul class="index-classify-tab-ul">-->
<!--        <li class="index-classify-tab-ul-li" v-for="item,index in 3">-->
<!--          <h2 class="index-classify-tab-ul-li-h2">冬季上新</h2>-->
<!--          <p class="index-classify-tab-ul-li-p">高端的食材</p>-->
<!--          <button class="index-classify-tab-ul-li-button">进入会场Go</button>-->
<!--          <image src="https://img.js.design/assets/img/65825e79c079d8ca66d2ccd8.jpg" class="index-classify-tab-ul-li-image"/>-->
<!--        </li>-->
<!--      </ul>-->
<!--  </view>-->
<!--  </scroll-view>-->

  <!-- 限时抢购 -->
  <view class="index-limited-spikes-title spikes-pos">
    <view class="index-limited-spikes-text">
      <h3>限时</h3>
      <p style="color: #F54E51" class="index-limited-spikes-text-p">秒杀</p>
      <b class="index-limited-spikes-text-b">|</b>
      <span class="index-limited-spikes-text-detail">限量商品老贵了</span>
    </view>
    <!-- 倒计时 -->
    <view class="index-limited-spikes-countdown">
      <ul class="index-limited-spikes-countdown-ul">
        <li class="index-limited-spikes-countdown-ul-li">09</li><h4 class="index-limited-spikes-countdown-h4">:</h4>
        <li class="index-limited-spikes-countdown-ul-li">45</li><h4 class="index-limited-spikes-countdown-h4">:</h4>
        <li class="index-limited-spikes-countdown-ul-li">34</li>
      </ul>
    </view>
  </view>
  <view class="index-limited-snapped-goods">
    <view class="index-limited-snapped-goods-title">
      <ul class="index-limited-snapped-goods-ul">
        <li class="index-limited-snapped-goods-ul-li">
          <h5 class="index-limited-snapped-goods-ul-li-h5">10:00</h5>
          <p class="index-limited-snapped-goods-ul-li-p select-goods">正在抢购</p>
        </li>
        <li class="index-limited-snapped-goods-ul-li">
          <h5 class="index-limited-snapped-goods-ul-li-h5">12:00</h5>
          <p class="index-limited-snapped-goods-ul-li-p">即将开始</p>
        </li>
        <li class="index-limited-snapped-goods-ul-li">
          <h5 class="index-limited-snapped-goods-ul-li-h5">14:00</h5>
          <p class="index-limited-snapped-goods-ul-li-p">即将开始</p>
        </li>
        <li class="index-limited-snapped-goods-ul-li">
          <h5 class="index-limited-snapped-goods-ul-li-h5">16:00</h5>
          <p class="index-limited-snapped-goods-ul-li-p">即将开始</p>
        </li>
      </ul>
    </view>
  </view>

  <!-- 限时抢购商品展示区 -->
  <view class="index-limited-snapped-goods-show">
    <ul>
      <li>
        <view class="index-limited-snapped-goods-show-img">
          <image src="https://gw.alicdn.com/bao/uploaded/i4/1917047079/O1CN01qgWz9S22AEcwf1Sqq_!!1917047079.jpg_Q75.jpg_.webp"/>
        </view>
        <view class="index-limited-snapped-goods-show-text">
          <h5>Apple/苹果 iPhone 15 Pro Max 官方正品旗舰店5G手机直降新款14Pro 国行max官网</h5>
          <view class="progress"><p :style="{width:160 + 'px'}"><span>已抢100%</span></p></view>
          <view class="price">
            <p><span>￥</span>6788</p>
            <p><span>￥</span>6788</p>
          </view>
          <navigator url="/pages/goods/goods?id=2">
          <button>上车</button>
          </navigator>
        </view>
      </li>
      <li>
        <view class="index-limited-snapped-goods-show-img">
          <image src="https://www.z4a.net/images/2023/12/20/1e3279abc97c8581bdc8be16cb5589d7.png"/>
        </view>
        <view class="index-limited-snapped-goods-show-text">
          <h5>MANHATTAN BOX SAINT LAURENT皮革小号肩背包</h5>
          <view class="progress"><p :style="{width:40 + 'px'}"><span>已抢68%</span></p></view>
          <view class="price">
            <p><span>￥</span>6788</p>
            <p><span>￥</span>6788</p>
          </view>
          <button>上车</button>
        </view>
      </li>
      <li>
        <view class="index-limited-snapped-goods-show-img">
          <image src="https://www.z4a.net/images/2023/12/20/1e3279abc97c8581bdc8be16cb5589d7.png"/>
        </view>
        <view class="index-limited-snapped-goods-show-text">
          <h5>MANHATTAN BOX SAINT LAURENT皮革小号肩背包</h5>
          <view class="progress"><p :style="{width:40 + 'px'}"><span>已抢68%</span></p></view>
          <view class="price">
            <p><span>￥</span>6788</p>
            <p><span>￥</span>6788</p>
          </view>
          <button>上车</button>
        </view>
      </li>
    </ul>
  </view>

  <view class="index-goods-show-subassembly" v-for="item,index in 1">
    <image src="https://img.js.design/assets/compImg/RztYfO3d7013adbda412674f43ecc696af0992_large.png" class="banner-img"/>
    <text class="goods-description">阿玛尼甄选香水套装</text>
    <scroll-view scroll-x="true" scroll-with-animation>
      <view class="goods-list">
        <ul class="goods-list-ul">
          <li class="goods-list-ul-li" v-for="item,index in 5">
            <image src="https://img.js.design/assets/compImg/Pzz_fO3244637d79d4ace83962f5e3bab152e9.png" class="goods-list-ul-li-img"/>
            <h4 class="goods-list-ul-li-h4">雅诗蓝带尬一尬嗷嗷嗷尬嗷嗷嗷</h4>
            <view class="price">
              <p class="new">¥787</p>
              <p class="old">¥787</p>
            </view>
          </li>
        </ul>
      </view>
    </scroll-view>
  </view>
    <!-- 猜你喜欢 -->
    <FanGuessLikeComponents ref="guessRef" style="height: 100vh;margin-top: 200px"/>
  </scroll-view>

</template>

<script setup lang="ts">
import {onLoad, onShow,onPullDownRefresh} from "@dcloudio/uni-app";
import IndexCassify from "@/pages/index/components/IndexCassify"
import SwiperComponents from "@/components/SwiperComponents";
import { GetIconListApi } from "@/services/getGoodsList"
import { useRouter } from 'vue-router';
import { useGuessList } from '@/composables'
import { ref  } from 'vue';

// 获取屏幕边界到安区域距离
const { safeAreaInsets } = uni.getSystemInfoSync();


const router = useRouter();

const status = 'more';
const loadingStatus = ref(false);
// 使用猜你喜欢组合式函数
const { guessRef, onScrolltolower } = useGuessList()

// 滚动触底
const OnScrollTolower = async ()=>{
  guessRef.value?.getMore();
 // 调用
};

const iconList = ref([]);

const getIconClassify = async ()=>{
  const res = await GetIconListApi();
  iconList.value = res
}

onPullDownRefresh(()=>{
  uni.reLaunch({
    url: '/'
  })
})

// 扫一扫
const sweep = async ()=>{
  uni.chooseImage({
    count: 6, //默认9
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album','camera'],   //album 从相册选图，camera 使用相机
    success: function (res) {
      let arr = res.tempFilePaths[0] //这里接收的是上传图片的本地路径
      loadingStatus.value = true;
      // 上传图片
      uni.uploadFile({
        url:'/upload/getImgCount',
        filePath:arr,
        name:'file',
        success:async (uploadFileRes) => {
          //这里要注意，uploadFileRes.data是个String类型，要转对象的话需要JSON.parse一下
          var obj = JSON.parse(uploadFileRes.data);
          loadingStatus.value = false;
          uni.navigateTo({
            url:`/pages/goods/components/SerachList?name=${obj.result[0].name.slice(0,2)}`
          })

        }
      })
    }
  });
}


onLoad(()=>{
  getIconClassify()
})
</script>

<style lang="scss">
.scroll-view {
  height: 100vh;
  overflow-y: scroll;
}
body{
  background-color: #F7FAFC;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: scroll;
}
:host {
  display: block;
  height: 280rpx;
}
li{
  list-style: none;
}
.index-header{
  width: 100vw;
  height: 200px;
  margin: 0 auto;
  border-radius: 0 0 50px 50px;
  background-color: var(--xiaofan-bg-main-color);
  .index-header-nav{
    height: 60px;
    display: flex;
    transform: translateX(-20px);
    align-items: center;
    justify-content: center;
    .index-header-nav-li{
      margin: 20px 0 0 10px;
      transform: translateX(-10px);
    }
    .index-header-nav-li.li3{
      transform: translate(15px,15px);
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

.index-swiper{
  width: 80%;
  margin: 20px auto;
  width: 350px;
  height: 200px;
  img{
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
};



// 倒计时
.index-limited-spikes-title{
  display: flex;
  color: #000000;
  transform: translate(10px,10px);
  .index-limited-spikes-text{
    display: flex;
  }
  .index-limited-spikes-text-p{
    font-size: 1rem;
    color: #dd524d;
  }
  .index-limited-spikes-text-b{
    font-size: 14px;
    font-weight: normal;
    margin-left: 5px;
    color: rgba(103, 103, 118, 1);
  }
  .index-limited-spikes-text-detail{
    font-size: 14px;
    margin: 2px 0 0 10px;
    color: rgba(103, 103, 118, 1);
  }

  .index-limited-spikes-countdown{
    height: 20px;
    margin-left: 6.5%;
    .index-limited-spikes-countdown-ul{
      display: flex;
      width: 108px;
      height: 20px;
      .index-limited-spikes-countdown-h4{
        margin-left: 5px;
        font-size: 12px;
      }
    }
    .index-limited-spikes-countdown-ul-li{
      width: 20px;
      height: 20px;
      border-radius: 20px;
      color: #ffffff;
      font-size: 12px;
      line-height: 20px;
      text-align: center;
      background-color: #007aff;
    }
  }
}

.index-limited-spikes{
  width: 90%;
  height: 200px;
  margin: -60px auto;
  border-radius: 10px;
  background-color: #ffffff;
  // 商品展示
  .index-limited-spikes-goods{
    width: 100%;
    margin: 40px auto;
    border-radius: 6px;
    .index-limited-spikes-goods-ul{
      height: 100%;
      display: flex;
      justify-content: center;
      .index-limited-spikes-goods-ul-li{
        width: 100px;
        height: 100px;
        margin-left: 10px;
        .index-limited-spikes-goods-ul-li-image{
          margin: 10px 0 0 -20px;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
};
.spikes-pos{
  position: relative;
  left: 7%;
  top: 20px;
}

.commodity-classify-recommend{
  width: 90%;
  margin: 100px auto;

  .commodity-classify-recommend-ul{
    width: 103%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(-13%);
    .commodity-classify-recommend-ul-li{
      width: 120px;
      height: 100%;
      margin-left: 20px;
      background-color: #ffffff;
      border-radius: 6px;
      .commodity-classify-recommend-ul-li-p{
        display: flex;
        justify-content: center;
        font-weight: 700;
        padding: 5px;
        .commodity-classify-recommend-ul-li-h6{
          background-color: #dd524d;
          color: #ffffff;
          line-height: 20px;
          border-radius: 5px 0 5px 0;
        }
      }
      .commodity-classify-recommend-ul-li-span{
        padding-left: 12%;
        font-size: 12px;
        color: #676776;
      }
      .commodity-classify-recommend-ul-li-img{
        margin-top: 50px;
        width: 100px;
        height: 100px;
      }
    }
  }
};

.index-classify-tab{
  width: 1200px;
  margin: 0 0 0 10%;
  .index-classify-tab-ul{
    display: flex;
    transform: translateX(-6.5%);
    li:nth-child(1){
      background: linear-gradient(225deg, rgba(87, 152, 134, 1) 0%, rgba(93, 158, 141, 1) 66.86%, rgba(107, 171, 156, 1) 100%);
      button{
        color: #77aC9F !important;
      }
    }
    li:nth-child(2){
      background-color: #FF9A8B;
      background-image: linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%);
      button{
        color: #FF9A8B !important;
      }
    }
    .index-classify-tab-ul-li{
      width: 295px;
      height: 120px;
      margin-left: 20px;
      border-radius: 15px;
      background-color: #007aff;
      .index-classify-tab-ul-li-h2{
        font-weight: 400;
        font-size: 20px;
        padding: 5px;
        color: #ffffff;
      }
      .index-classify-tab-ul-li-p{
        color: #ffffff;
        padding: 5px;
      }
      .index-classify-tab-ul-li-button{
        position: relative;
        left: -28%;
        top: 10%;
        width: 120px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        text-align: center;
        background-color: #ffffff;
        border-radius: 50px;
      }
      .index-classify-tab-ul-li-image{
        position: relative;
        top: -80%;
        left: 47%;
        width: 155px;
        height: 120px;
        overflow: hidden;
      }
    }
  }
};

.index-limited-snapped-goods{
  width: 80%;
  margin: 50px auto;
  .index-limited-snapped-goods-title{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 0 0 0;
    height: 70px;
    background: linear-gradient(90deg, rgba(42, 130, 228, 1) 0%, rgba(104, 173, 252, 1) 100%);
    border-radius: 10px;
    .select-goods{
      color: #2A82E4 !important;
      border-radius: 50px;
      background-color: #ffffff;
    }
    .index-limited-snapped-goods-ul{
      display: flex;
      height: 50px;
      transform: translate(-10%,10%);
      .index-limited-snapped-goods-ul-li{
        margin-left: 20px;
        width: 60px;
        height: 100%;
        .index-limited-snapped-goods-ul-li-h5{
          text-align: center;
          color: #ffffff;
        }
        .index-limited-snapped-goods-ul-li-p{
          width: 65px;
          height: 15px;
          font-size: .85rem;
          line-height: 15px;
          color: #ffffff;
          padding: 5px;
        }
      }
    }
  }
};

.index-limited-snapped-goods-show{
  width: 80%;
  height: 500px;
  margin: -30px auto;
  ul{
    height: 100%;
    margin-left: -12.5%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  li{
    width: 100%;
    height: 140px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 10px;
    .index-limited-snapped-goods-show-img{
      width: 35%;
      height: 120px;
      image{
        margin-top: 10%;
        width: 100%;
        height: 100%;
      }
    }
    .index-limited-snapped-goods-show-text{
      float: right;
      position: relative;
      top: -70%;
      left: -4%;
      width: 60%;
      h5{
        max-height: 40px;
        font-size: 12px;
      }
      button{
        position: relative;
        left: 34%;
        top: -25px;
        width: 75px;
        height: 24px;
        line-height: 24px;
        color: #ffffff;
        border-radius: 100px;
        font-size: 12px;
        background: linear-gradient(116.37deg, rgba(245, 78, 81, 1) 0%, rgba(245, 78, 81, 0.65) 100%);
      }
      .price{
        display: flex;
        align-items: center;
        margin-top: 10%;
        p:nth-child(1){
          font-size: 20px;
          color: #F54E51;
        }
        p:nth-child(2){
          margin-left: 5px;
          font-size: 14px;
          color: #999999;
        }
      }
    }
    .progress{
      width: 160px;
      height: 15px;
      border-radius: 10px;
      color: #ffffff;
      font-size: 12px;
      margin-top: 10px;
      background-color: #68ADFC;
      p{
        border-radius: 10px;
        color: #ffffff;
        background-color: #2A82E4;
        span{
          display: block;
          width: 60px;
          padding-left: 10px;
        }
      }
    }
  }
};

.index-goods-show-subassembly{
  width: 80%;
  height: 300px;
  background-color: #ffffff;
  margin: 50px auto;
  border-radius: 10px;
  .goods-description{
    position: relative;
    top: -25%;
    left: 5%;
    font-size: 18px;
    font-weight: 700;
    text-shadow: 2px 2px 5px #000000;
    color: #ffffff;
  }
  .banner-img{
    width: 100%;
    height: 100px;
    border-radius: 10px 10px 0 0;
  }
  .goods-list{
    transform: translate(-10%,-3%);
    height: 200px;
    .goods-list-ul-li-img{
      width: 90px;
      height: 103px;
    }
    .goods-list-ul{

      width: 100%;
      height: 100%;
      display: flex;
      .goods-list-ul-li{
        margin-left: 10px;
        width: 90px;
        height: 100%;
        .goods-list-ul-li-h4{
          margin-top: 10px;
          font-size: .7rem;
        }
        .price{
          display: flex;
          p{
            margin-top: 5px;
            text-align: center;
          }
          .new{
            color: #F54E51;
          }
          .old{
            margin-left: 10px;
            font-size: 12px;
            line-height: 24px;
            text-decoration: line-through;
            color: #999999;
          }
        }
      }
    }
  }
};


</style>
