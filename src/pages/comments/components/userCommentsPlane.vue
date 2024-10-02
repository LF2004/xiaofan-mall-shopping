<template>
  <view class="header is-browser" style="z-index: 1" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <view class="header-content">
      <i class="icon-back" @tap="TapOnBack" style="z-index: 999"></i>
      <view class="content">晒图/讨论({{ userGoodsComments.allTotal }})</view>
    </view>
  </view>

  <view class="flex-col page space-y-27" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <view class="flex-row section">
      <view class="flex-col justify-start items-center button"><text class="font_1 text" style="color: #ffffff">全部</text></view>
      <view class="flex-row items-center button_2 section_2 space-x-4">
        <text class="font_1 text_2">有图</text>
        <text class="text_3">12</text>
      </view>
    </view>
    <view class="flex-col space-y-38">
      <view class="flex-col list-item" v-for="item,index in userGoodsComments.commentsList" :key="index">
        <view class="flex-row items-center group space-x-26">
          <image
            class="image"
            style="border-radius: 25px"
            :src="item.avatar"
          />
          <view class="flex-row justify-between flex-auto group_2">
            <view class="flex-col items-start space-y-16">
              <text class="font_1 text_4">{{ item.comment_user_name }}</text>
              <text class="font_3 text_5">{{ item.comment_time }}</text>
            </view>
            <view class="flex-row items-center self-start space-x-90">
              <image
                class="image_3"
                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/64488c4f54fe0000115cf112/16939114426979896696.png"
              />
              <view class="flex-row items-center space-x-10">
                <text class="font_2">1</text>
                <uni-icons type="hand-up" size="18" color="#2A82E4"></uni-icons>
              </view>
            </view>
            <!-- 图片类型评论  -->
            <view class="comment-img" v-if="false">
              <ul class="comment-img-ul">
                <li class="comment-img-ul-li">
                  <image src="http://xiaofanya.oss-cn-beijing.aliyuncs.com/391998-20201218143716_931a6.jpg" class="comment-img-ul-li-image"/>
                </li>
                <li class="comment-img-ul-li">
                  <image src="http://xiaofanya.oss-cn-beijing.aliyuncs.com/391998-20201218143716_931a6.jpg" class="comment-img-ul-li-image"/>
                </li>
                <li class="comment-img-ul-li">
                  <image src="http://xiaofanya.oss-cn-beijing.aliyuncs.com/391998-20201218143716_931a6.jpg" class="comment-img-ul-li-image"/>
                </li>
              </ul>
            </view>
            <span class="comment-text" v-else @tap="messageToggle(item)">{{ item.comment_content }}</span>
          </view>
        </view>
        <view class="flex-col self-end section_3" >
          <view class="user-reply" :class="userGoodsComments.commentsReplyList[index][i].repliesVisible ? 'CollapseMove' : 'RemoveCollapseMove'"  v-for="reply,i in userGoodsComments.commentsReplyList[index]" :key="item.reply_id">

            <view class="flex-row justify-between items-center group_6">
              <view class="flex-row items-center space-x-98" >
                <view class="flex-row items-center shrink-0 space-x-26">
                  <image
                    class="shrink-0 image_5"
                    :src="reply.reply_user_avatar"
                  />
                  <text class="font_4">{{ reply.reply_user_name }}</text>
                </view>
                <text class="font_3">{{ reply.reply_time }}</text>
              </view>
              <view class="flex-row items-end space-x-85">
                <li>
                  <image
                    class="image_3"
                    src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/64488c4f54fe0000115cf112/16939114426979896696.png"
                  />
                </li>
                <li>
                  <text class="font_5">0</text>
                </li>
                <li>
                  <uni-icons type="hand-up" size="18" color="#939393"></uni-icons>
                </li>

              </view>
            </view>
            <!-- 回复面板 -->
            <view>
              <uni-popup ref="popup" type="share" safeArea backgroundColor="#fff">

                <view class="franky-popup_box">
                  <view class="params-pop">
                    <textarea :placeholder="`@${replyName}${isPlOrHf ? '评论': '回复'}的${othersReplyComment}说:`" class="replyPlan" v-model="replyComment">

                    </textarea>

                    <button type="primary" size="mini" class="sendReplyComment" @click="sendReplyComment">发送</button>
                  </view>
                </view>
              </uni-popup>

            </view>
            <text class="self-start font_7 text_7" v-html="formatComment(reply.reply_content)" @tap="messageToggle(reply)"></text>


          </view>

          <text class="self-start font_8 text_8 text_9" style="z-index: 999;" @click="Collapse(index)">{{ !userGoodsComments.commentsReplyList[index][0]?.repliesVisible ? `收起${userGoodsComments.commentsReplyList[index].length}条回复` : '展开...' }}</text>
        </view>
      </view>
    </view>
  </view>

</template>

<script setup lang="ts">
import {ref,computed} from "vue";
import {onLoad} from "@dcloudio/uni-app";
import { getUserGoodsCommentsApi,SendReplyCommentsApi } from '@/services/comments';
const { safeAreaInsets } = uni.getSystemInfoSync();
import { userMannerInfoStore } from '@/stores';
const userInfoStore = userMannerInfoStore();
const TapOnBack = ()=>{
  uni.navigateBack()
}

const query = defineProps<{
  goodsId: string
}>()

const userGoodsComments = ref([]);

const getUserGoodsCommentsData = async () =>{
  const res = await getUserGoodsCommentsApi(query.goodsId);
  userGoodsComments.value = res;
}

const formatComment = (comment)=>{
  return comment.replace(/@([^:]+):/g, '<span style="color: #2A82E4;">$&</span>');
}

// 初始化 repliesVisible 数组，每个元素对应一个评论，默认为 false，表示隐藏
const changCommentStatus = () =>{
  for(let i = 0; i < userGoodsComments.value.commentsReplyList.length; i++){
    userGoodsComments.value.commentsReplyList[i].forEach(v => {
      v.repliesVisible = false;
    })
  }
}


// 收起功能
const Collapse = (index) =>{
  console.log('ok')
  userGoodsComments.value.commentsReplyList[index].forEach(v => {
    v.repliesVisible = !v.repliesVisible;
  })


}


const popup = ref(null)

const replyName = ref()

const replyItem = ref()

const othersReplyComment = ref(); // 用户回复的内容

const replyComment = ref(); // 用户需要回复别人的内容需要发送

const isPlOrHf = ref(false); // 改评论是否为回复

const messageToggle = (comment)=>{
  if(comment.comment_user_name){
    isPlOrHf.value = true;
  }else {
    isPlOrHf.value = false;
  }
  othersReplyComment.value = comment.content || comment.comment_content;
  if(userInfoStore.UserInfoManner.NickName === comment.reply_user_name) {
    uni.showToast({ icon: 'none', title: '不要太自恋' });
  }else {
    replyName.value = comment.reply_user_name || comment.comment_user_name;
    replyItem.value = comment;
    popup.value[0].open()
  }

}

const closePopup = ()=>{
  // @ts-ignore
  popup.value[0].close()
}

// 回复功能
const sendReplyComment = async ()=>{
  const {
    reply_user_avatar,
    repliesVisible,
    content,
    reply_id,
    reply_user_name,
    reply_content,
    reply_time,
    reply_goodsId,
    ...item
  } = replyItem.value;
  const newItem = {goodsId: reply_goodsId,reply_connents:replyComment.value,reply_name:reply_user_name,...item};
  const res = await SendReplyCommentsApi(newItem);
  if(res.code === 200) {
    uni.showToast({ icon: 'success', title: res.msg });
    popup.value[0].close();
    getUserGoodsCommentsData();
  }else {
    uni.showToast({ icon: 'error', title: res.msg });
  }
}

onLoad(async ()=>{
  await getUserGoodsCommentsData()
  await changCommentStatus()

})
</script>

<style scoped lang="scss">
*{
  padding: 0;
  margin: 0;
  list-style: none;
}
.replyPlan{
  padding: 10px;
  font-size: 20px;
}
.sendReplyComment{
  margin: -20px 20px 0 0;
  float: right;
}
.params-pop{
  height: 200px;
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

.page {
  padding: 100rpx 0 562.5rpx;
  background-color: #ffffff;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  .section {
    padding: 0 25rpx 20.15rpx;
    border-bottom: 1px solid #e7e7e7;
    .button {
      padding: 16.67rpx 0;
      border-radius: 27.77rpx;
      background-color: #68ADFC;
      width: 94.44rpx;
      height: 54.17rpx;
      .text {
        line-height: 22.23rpx;
      }
    }
    .button_2 {
      margin-left: 17.35rpx;
      .text_2 {
        margin-left: 48.6rpx;
        color: #747474;
        line-height: 22.23rpx;
      }
      .text_3 {
        color: #747474;
        font-size: 22.23rpx;
        font-family: Microsoft YaHei;
        font-weight: 700;
        line-height: 18.06rpx;
      }
    }
    .section_2 {
      padding: 16.67rpx 0;
      border-radius: 25.35rpx;
      width: 181.25rpx;
      height: 54.85rpx;
      border: solid 0.69rpx #efefef;
    }
    .space-x-4 {
      & > view:not(:first-child),
      & > text:not(:first-child),
      & > image:not(:first-child) {
        margin-left: 2.77rpx;
      }
    }
  }
  .space-y-38 {
    & > view:not(:first-child),
    & > text:not(:first-child),
    & > image:not(:first-child) {
      margin-top: 26.4rpx;
    }
    .list-item {
      padding: 0 25rpx;
      .group {
        padding-bottom: 19.44rpx;
        .image {
          width: 56.94rpx;
          height: 59.73rpx;
        }
        .group_2 {
          margin-right: 20.15rpx;
          .space-y-16 {
            & > view:not(:first-child),
            & > text:not(:first-child),
            & > image:not(:first-child) {
              margin-top: 11.1rpx;
            }
            .text_4 {
              line-height: 22.23rpx;
            }
            .text_5 {
              margin-left: 2.08rpx;
            }
          }
          .space-x-90 {
            & > view:not(:first-child),
            & > text:not(:first-child),
            & > image:not(:first-child) {
              margin-left: 62.5rpx;
            }
          }
        }
      }
      .space-x-26 {
        & > view:not(:first-child),
        & > text:not(:first-child),
        & > image:not(:first-child) {
          margin-left: 18.06rpx;
        }
        .image_5 {
          width: 43.06rpx;
          height: 43.06rpx;
          border-radius: 25px;
        }
        .font_4 {
          font-size: 23.6rpx;
          font-family: Microsoft YaHei;
          letter-spacing: 2.83rpx;
          line-height: 22.92rpx;
          font-weight: 700;
          color: #939393;
        }
      }
      .section_3 {
        margin-right: 19.44rpx;
        padding-left: 2.77rpx;
        padding-bottom: 21.52rpx;
        border-bottom: 1px solid #e7e7e7;
        width: 609.73rpx;
        .image_4 {
          width: 606.25rpx;
          height: 63.19rpx;
        }
        .group_3 {
          margin-top: 22.23rpx;
          .space-x-88 {
            & > view:not(:first-child),
            & > text:not(:first-child),
            & > image:not(:first-child) {
              margin-left: 61.1rpx;
            }
            .group_4 {
              margin-bottom: 2.08rpx;
            }
            .space-x-14 {
              & > view:not(:first-child),
              & > text:not(:first-child),
              & > image:not(:first-child) {
                margin-left: 9.73rpx;
              }
            }
          }
        }
        .group_5 {
          margin-top: 9.02rpx;
          .font_6 {
            font-size: 23.6rpx;
            font-family: Microsoft YaHei;
            letter-spacing: 1.9rpx;
            line-height: 24.31rpx;
            font-weight: 700;
            color: #939393;
          }
          .text_6 {
            margin-top: 2.08rpx;
          }
        }
        .view {
          padding: 0 59.02rpx;
        }
        .group_6 {
          margin-top: 16.67rpx;
          .space-x-85 {
            width: 100px;
            li{
              margin-left: 10px;
            }
          }
        }
        .space-x-98 {
          & > view:not(:first-child),
          & > text:not(:first-child),
          & > image:not(:first-child) {
            margin-left: 68.06rpx;
          }
        }
        .font_5 {
          font-size: 20.83rpx;
          font-family: Microsoft YaHei;
          line-height: 16.67rpx;
          font-weight: 700;
          color: #939393;
        }
        .font_7 {
          font-size: 23.6rpx;
          font-family: Microsoft YaHei;
          letter-spacing: 1.9rpx;
          line-height: 21.52rpx;
          font-weight: 700;
          color: #000000;
        }
        .text_7 {
          margin-left: 61.1rpx;
          margin-top: 9.73rpx;
        }
        .font_8 {
          font-size: 23.6rpx;
          font-family: Microsoft YaHei;
          line-height: 22.92rpx;
          font-weight: 700;
          color: #4590b7;
        }
        .text_8 {
          line-height: 23.6rpx;
        }
        .text_9 {
          margin-left: 57px;
          margin-top: 31.25rpx;
        }
      }
      .font_3 {
        font-size: 20.83rpx;
        font-family: Microsoft YaHei;
        line-height: 16.67rpx;
        font-weight: 700;
        color: #d7d4d6;
      }
      .image_3 {
        width: 5.56rpx;
        height: 21.52rpx;
      }
      .image_2 {
        width: 30.56rpx;
        height: 29.85rpx;
      }
      .space-x-10 {
        & > view:not(:first-child),
        & > text:not(:first-child),
        & > image:not(:first-child) {
          margin-left: 6.94rpx;
        }
        .font_2 {
          font-size: 23.6rpx;
          font-family: Microsoft YaHei;
          letter-spacing: 2.83rpx;
          line-height: 18.75rpx;
          font-weight: 700;
          color: #939393;
        }
      }
    }
  }
  .font_1 {
    font-size: 22.23rpx;
    font-family: Microsoft YaHei;
    line-height: 21.52rpx;
    font-weight: 700;
    color: #2A82E4;
  }
}
.space-y-27 {
  & > view:not(:first-child),
  & > text:not(:first-child),
  & > image:not(:first-child) {
    margin-top: 18.75rpx;
  }
};

// 图片类型评论样式
.comment-img{
  position: relative;
  top: 30px;
  left: -40%;
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
  .comment-img-ul{
    width: 350px;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .comment-img-ul-li{
      width: 80px;
      height: 80px;
      margin: 10px 0 0 10px;
      .comment-img-ul-li-image{
        width: 100%;
        height: 100%;
      }
    }
  }
}
// 收起展开评论动画
.CollapseMove{
  height: 0;
  transform: translateX(-10px);
  opacity: 0;
  transition: .3s;
}

.RemoveCollapseMove{
  opacity: 1;
  transition: .3s;
}

.comment-text{
  width: 250px;
  position: relative;
  left: -50%;
  top: 15px;
  margin-top: 20px;
}
</style>
