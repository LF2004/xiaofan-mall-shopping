<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
// 字体图标
@import '@/styles/fonts.scss';
@import '@/styles/codefun.scss';
@import "@/static/main.scss";
//第二种
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent; }
//去除页面滚动条
body,html{
  overflow-x: hidden;
}
li{
  list-style: none;
}
body::-webkit-scrollbar {display: none;}
view,
navigator,
input,
scroll-view {
  box-sizing: border-box;
}

button::after {
  border: none;
}

swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

// 两行省略
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.uni-collapse-item__title.uni-collapse-item-border{
  border: none !important;
}
.uni-collapse-item__title-arrow{
  transform: translate(-25rem,.3rem) !important;
}
.uni-collapse-item__title-text{
  transform: translateY(.3rem) !important;
  font-size: 16px !important;
}
</style>
