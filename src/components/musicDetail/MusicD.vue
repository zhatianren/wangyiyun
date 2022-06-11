<template>
  <div>
    <img :src="musicList.al.picUrl" alt="" class="bgimg" />
    <div class="detailTop">
      <div class="detailTopLeft">
        <van-icon name="arrow-down" @click="backHome" />
        <div class="pl">
          <Vue3Marquee style="color: #fff">
            {{ musicList.name }}
          </Vue3Marquee>
          <span v-for="(item, index) in musicList.ar" :key="index">
            {{ item.name }}
            <van-icon name="arrow" class="va" />
          </span>
        </div>
      </div>
      <div class="detailTopRight">
        <van-icon name="share-o" />
      </div>
    </div>
    <div class="detailpage" v-show="!isLyricShow">
      <img
        src="@/assets/needle.png"
        alt=""
        class="needleImg"
        :class="{ img_needle_active: !isbtnShow }"
      />
      <img src="@/assets/1.png" alt="" class="cdImg" />
      <img
        :src="musicList.al.picUrl"
        alt=""
        class="bgImg"
        @click="isLyricShow = true"
        :class="{ img_ar_active: !isbtnShow, img_ar_pauesd: isbtnShow }"
      />
    </div>
    <div class="lyric" ref="MusicTop" v-show="isLyricShow">
      <p
        v-for="(item, i) in lyircList"
        @click="isLyricShow = false"
        :key="i"
        :class="{
          actived:
            currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
        }"
      >
        {{ item.lyc }}
      </p>
    </div>

    <div class="detailFooter">
      <div class="footertop">
        <van-icon name="like-o" />
        <van-icon name="down" />
        <van-icon name="music-o" />
        <van-icon name="chat-o" />
        <van-icon name="ellipsis" />
      </div>
      <div class="footercontent">
        <input
          type="range"
          min="0"
          :max="duration"
          v-model="currentTime"
          step="0.1"
        />
      </div>
      <div class="footernav">
        <van-icon name="revoke" />
        <van-icon name="arrow-left" @click="goPlay(-1)" />
        <van-icon
          name="play-circle-o"
          style="font-size: 40px"
          @click="play"
          v-if="isbtnShow"
        />
        <van-icon
          name="pause-circle-o"
          style="font-size: 40px"
          @click="play"
          v-else
        />
        <van-icon name="arrow" @click="goPlay(1)" />
        <van-icon name="bars" />
      </div>
    </div>
  </div>
</template>

<script>
import vueMarquee from "vue-marquee";
import { mapMutations, mapState } from "vuex";

export default {
  props: ["musicList", "play", "isbtnShow", "updateDuration"],
  data() {
    return {
      isLyricShow: false,
    };
  },
  computed: {
    ...mapState([
      "lyricList",
      "currentTime",
      "playIndex",
      "playList",
      "duration",
    ]),
    lyircList() {
      let arr;
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lyc = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);

          if (isNaN(Number(mill))) {
            //判断如果秒钟只有两位的时候就取字符串位置7-9
            mill = item.slice(7, 9);
            lyc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          // console.log(hour, min, mill, lyc);
          return { min, sec, mill, lyc, time };
        });
        arr.forEach((item, i) => {
          // 歌词最后一句或者最后一句的数值不是NaN就把pre数值给大让字体凸显
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 10000;
          } else {
            item.pre = arr[i + 1].time; //下句歌词的时间段
          }
        });
      }
      console.log(arr);
      return arr; //返回一个歌词数组
    },
  },
  components: {
    vueMarquee,
  },
  mounted() {
    this.updateDuration();
    // console.log(this.lyricList.lyric);
  },
  methods: {
    //点击的时候就关闭弹窗
    backHome() {
      this.isLyricShow = false;
      this.updateDetail();
    },
    goPlay(num) {
      let index = this.playIndex + num;
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index == this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
    ...mapMutations(["updateDetail", "updateLyricList", "updatePlayListIndex"]),
  },
  watch: {
    currentTime(newValue) {
      let p = document.querySelector("p.actived");

      if (p) {
        if (p.offsetTop > 300) {
          this.$refs.MusicTop.scrollTop = p.offsetTop - 300;
        }
      }
      if (newValue == this.druation) {
        this.updatePlayListIndex(this.playIndex + 1);
      }
      // console.log([this.$refs.MusicTop]);
    },
  },
};
</script>

<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  filter: blur(50px);
  z-index: -1;
}
.detailTop {
  width: 100%;
  height: 1.5rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .pl {
      width: 2rem;
      height: 100%;
      margin-top: 10px;
      margin-left: 0.3rem;
      span {
        color: #999;
      }
      .va {
        font-size: 0.2rem;
        color: #999;
      }
    }
  }
  .van-icon {
    font-size: 0.5rem;
    color: aliceblue;
  }
}
.detailpage {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .needleImg {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-35deg);
    transition: all 2s;
  }
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }
  .cdImg {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .bgImg {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 10s linear infinite;
  }
  .img_ar_active {
    animation-play-state: running;
  }
  .img_ar_pauesd {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.lyric {
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.4rem;
  overflow: scroll;
  p {
    color: rgba(255, 255, 255, 0.547);
    margin-bottom: 0.4rem;
  }
  .actived {
    color: #fff;
    font-size: 0.5rem;
  }
}
.detailFooter {
  width: 100%;
  height: 3rem;
  position: fixed;
  bottom: 0;
  .footertop {
    width: 100%;
    height: 1.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    .van-icon {
      font-size: 0.5rem;
      color: #fff;
    }
  }
  .footercontent {
    input {
      width: 100%;
      height: 0.06rem;
    }
  }
  .footernav {
    width: 100%;
    height: 1.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    position: fixed;
    bottom: 0;
    .van-icon {
      font-size: 0.5rem;
      color: #fff;
    }
  }
}
</style>