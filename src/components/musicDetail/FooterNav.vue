<template>
  <div class="footernav" @click="tan">
    <div class="footerLeft" @click="updateDetail">
      <img :src="playList[playIndex].al.picUrl" alt="" />
      <div class="sing">
        <p>{{ playList[playIndex].name }}</p>
        <span>横滑可切换上下首哦</span>
      </div>
    </div>
    <div class="footerRight">
      <van-icon name="play-circle" @click="play" v-if="isbtnShow" />
      <van-icon name="pause-circle-o" @click="play" v-else />

      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playIndex].id}.mp3`"
    ></audio>
    <div>
      <van-popup
        :show="detailShow"
        position="bottom"
        :style="{ height: '100%', width: '100%' }"
      >
        <!-- 传入play的方法,显示隐藏的布尔值 -->
        <Dailog
          :musicList="playList[playIndex]"
          :play="play"
          :isbtnShow="isbtnShow"
          :updateDuration="updateDuration"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Dailog from "./MusicD.vue";
export default {
  data() {
    return {
      interval: 0, //定时器初始值
    };
  },
  computed: {
    ...mapState([
      "playList",
      "playIndex",
      "isbtnShow",
      "detailShow",
      "currentTime",
      "duration",
    ]),
  },
  components: {
    Dailog,
  },
  mounted() {
    console.log(this.$refs);
    //数据渲染的时候触发
    this.$store.dispatch("getMusicLyric", this.playList[this.playIndex].id);
  },
  updata() {
    //数据更新的时候获取歌词
    this.$store.dispatch("getMusicLyric", this.playList[this.playIndex].id);
    updateDuration();
  },
  methods: {
    tan() {
      this.$store.dispatch("getMusicLyric", this.playList[this.playIndex].id);
      console.log(this.playList[this.playIndex].id);
    },
    play: function () {
      // 判断音乐是否播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsbtnShow(false);
        this.updateTime(); //播放的时候调用播放函数传时间
      } else {
        this.$refs.audio.pause();
        this.updateIsbtnShow(true);
        clearInterval(this.interval); //暂停清除定时器
      }
    },
    updateTime() {
      this.interval = setInterval(() => {
        this.updeteCurrentTime(this.$refs.audio.currentTime); //传入当前时间段
      }, 1000);
    },
    updateDuration() {
      this.addDuration(this.$refs.audio.duration);
    },
    ...mapMutations([
      "updateIsbtnShow",
      "updateDetail",
      "updeteCurrentTime",
      "addDuration",
    ]),
  },
  watch: {
    palyIndex() {
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        this.updateIsbtnShow(false);
      }
    },
    // 当播放列表首次进入的时候第一次点击不会播放，监听属性当列表有变化的时候自动播放
    playList() {
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        this.updateIsbtnShow(false);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.footernav {
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  z-index: 999;
  // align-items: center;
  .footerLeft {
    padding: 0.2rem;
    width: 70%;
    height: 100%;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      margin-right: 0.4rem;
    }
  }
  .footerRight {
    width: 20%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .van-icon {
      font-size: 30px;
    }
    .icon {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
}
</style>