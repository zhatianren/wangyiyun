<template>
  <div>
    <div class="musicTopnav">
      <img :src="playlist.coverImgUrl" alt="" class="bgimg" />
      <div class="topleft">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
      </div>
      <div class="content">歌单漫游</div>
      <div class="topright">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </div>
    </div>
    <div class="topcontent">
      <div class="rImg">
        <img :src="playlist.coverImgUrl" alt="" />
        <span>{{ playlist.playCount }}</span>
      </div>

      <div class="topcontentright">
        <p class="name">{{ playlist.name }}</p>
        <div class="rightImg">
          <img :src="playlist.creator.backgroundUrl" alt="" class="toux" />
          <span class="imgName">{{ playlist.creator.nickname }}</span>
        </div>
        <p class="bottomTitle">{{ playlist.description }}</p>
      </div>
    </div>

    <div class="itemTopFooter">
      <div class="footerItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
        </svg>
        <span>{{ playlist.commentCount }}</span>
      </div>
      <div class="footerItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{ playlist.shareCount }}</span>
      </div>
      <div class="footerItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
        </svg>
        <span>下载</span>
      </div>
      <div class="footerItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-show_duoxuan"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script>
// export default {
//   props: ["playlist"],
//   data() {
//     return {};
//   },
// };
export default {
  setup(props) {
    // console.log(props);
    // 通过props进行传值，判断如果数据拿不到，就获取sessionStorage中的
    if ((props.playlist.creator = "")) {
      props.playlist.creator = JSON.parse(
        sessionStorage.getItem().playlist
      ).creator;
    }

    // 对播放量的处理
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    return { changeCount };
  },
  props: ["playlist"],
};
</script>

<style lang="less" scoped>
.musicTopnav {
  width: 100%;
  height: 1.5rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .content {
    font-size: 0.36rem;
    font-weight: 700;
    color: aliceblue;
  }
  .topleft,
  .topright {
    margin: 10px;
  }
  .bgimg {
    width: 100%;
    height: 10rem;
    position: fixed;
    z-index: -1;
    filter: blur(30px);
  }

  .icon {
    fill: #fff;
  }
}
.topcontent {
  width: 100%;
  // height: 6rem;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
  .rImg {
    width: 3rem;
    height: 3rem;
    position: relative;
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 0.3rem;
      position: absolute;
    }
    span {
      position: absolute;
      color: #fff;
      margin-top: 0.2rem;
      right: 0.2rem;
    }
  }

  .topcontentright {
    width: 50%;
    .name {
      color: #fff;
      font-weight: 600;
    }
    .rightImg {
      height: 1rem;
      line-height: 1rem;
      margin-top: 0.2rem;
      .toux {
        width: 1rem;
        height: 1rem;
        z-index: 100;
        border-radius: 50%;
        vertical-align: middle;
      }
      .imgName {
        color: #fff;
        vertical-align: middle;
        margin-left: 0.2rem;
      }
    }
    .bottomTitle {
      width: 100%;
      height: 50px;
      line-height: 1rem;
      color: #fff;
      overflow: hidden; // 溢出部分隐藏
      white-space: nowrap; // 文字不换行
      text-overflow: ellipsis; // 显示省略号
    }
  }
}
.itemTopFooter {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}
</style>
