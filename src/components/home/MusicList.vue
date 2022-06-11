<template>
  <div class="musicList">
    <div class="musictop">
      <div class="title">推荐歌单</div>
      <div class="more">更多></div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="150"
        class="swiper"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in musicList" :key="item.id">
          <router-link :to="{ path: '/MusicDetail', query: { id: item.id } }">
            <img :src="item.picUrl" />
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-31liebiao"></use>
              </svg>
              {{ changCouunt(item.playCount) }}
            </span>
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
import { getMusicList } from "@/api/banner/index.js/";
export default {
  data() {
    return {
      musicList: [],
    };
  },
  methods: {
    async getGeDan() {
      let res = await getMusicList();
      this.musicList = res.data.result;
      // console.log(res);
    },
    // 处理播放量的数据显示
    changCouunt(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    },
  },

  mounted() {
    this.getGeDan();
  },
};
</script>
<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musictop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      width: 70px;
      height: 0.5rem;
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.5rem;
      border-radius: 0.4rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 4rem;
    .van-swipe-item {
      padding-right: 0.2rem;
      position: relative;
      height: 100%;
      img {
        width: 100%;
        height: 2rem;
        border-radius: 0.2rem;
      }
      .playCount {
        position: absolute;
        z-index: 100;
        right: 0.4rem;
        color: white;
        margin-top: 0.06rem;
        .icon {
          width: 0.3rem;
          height: 0.3rem;
        }
      }
      .name {
        font-size: 0.28rem;
      }
    }
  }
}
</style>>
