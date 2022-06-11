<template>
  <div class="playlist">
    <div class="listTop">
      <div class="listLeft">
        <van-icon name="play-circle-o" />
        <span class="playall">
          播放全部<span class="shou">
            ({{ "共" + detailList.length + "首" }})</span
          >
        </span>
      </div>
      <van-button type="danger">
        <van-icon name="plus" />
        收藏({{ subscribedCount }})
      </van-button>
    </div>
    <div class="itemList">
      <div class="item" v-for="(item, i) in detailList" :key="i">
        <div class="itemLeft" @click="playMusic(i)">
          <span class="leftSpan">{{ i + 1 }}</span>
          <div class="ar">
            <p>{{ item.name }}</p>
            <span v-for="(itemAr, index) in item.ar" :key="index">
              {{ itemAr.name }}
            </span>
          </div>
        </div>
        <div class="itemRight">
          <van-icon name="play-circle" v-if="item.mv != 0" />
          <!-- <svg class="icon bofang" aria-hidden="true" v-if="item.mv != 0"> -->
          <!-- <use xlink:href="#icon-shipin"></use> -->
          <!-- </svg> -->
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  setup(props) {},
  props: ["detailList", "subscribedCount"],
  methods: {
    playMusic(i) {
      this.updatePlayList(this.detailList);
      this.updatePlayListIndex(i);
    },
    ...mapMutations(["updatePlayList", "updatePlayListIndex"]),
  },
};
</script>

<style lang="less" scoped>
.playlist {
  width: 100%;
  height: 10rem;
  background-color: #fff;
  padding: 0 0.2rem;
  margin-top: 0.5rem;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  .listTop {
    width: 100%;
    height: 1rem;
    padding-top: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .listLeft {
      //   width: 3.5rem;
      height: 100%;
      justify-content: space-between;
      display: flex;
      align-items: center;
      .van-icon {
        margin-right: 0.1rem;
      }
      .shou {
        font-size: 12px;
        color: rgba(62, 61, 61, 0.986);
      }
    }
    .van-button--normal {
      height: 0.7rem;
      line-height: 1rem;
      border-radius: 0.5rem;
    }
  }
  .itemList {
    width: 100%;
    .item {
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .itemLeft {
        width: 80%;
        height: 100%;
        display: flex;
        align-items: center;
        .leftSpan {
          display: inline-block;
          width: 0.2rem;
          text-align: center;
          font-size: 0.36rem;
          margin-right: 0.2rem;
        }
        .ar {
          p {
            width: 4.54rem;
            height: 0.4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
          }
        }
      }
    }
    .itemRight {
      display: flex;
      align-items: center;
      .van-icon {
        margin-right: 0.2rem;
      }
      .icon {
        margin-right: 0.1rem;
      }
    }
  }
}
</style>