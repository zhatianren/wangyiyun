<template>
  <div class="topnav">
    <div class="search">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <input
        type="text"
        v-model="searchKey"
        shape="round"
        placeholder="陈奕迅"
        @keydown.enter="enterKey"
      />
      <p @click="sousuo">搜索</p>
    </div>
    <div class="searchHistory">
      <p class="historyP">历史</p>

      <span
        v-for="item in searchList"
        :key="item"
        class="jilu"
        @click="getHistory(item)"
      >
        <van-tag round type="primary" size="medium">{{ item }} </van-tag>
      </span>
      <van-icon name="delete-o" @click="deleteKey" class="delete" />
    </div>
    <div class="itemList">
      <div class="item" v-for="(item, i) in this.searchResList" :key="i">
        <div class="itemLeft" @click="updatePlay(item, i)">
          <span class="leftSpan">{{ i + 1 }}</span>
          <div class="ar">
            <p>{{ item.name }}</p>
            <span v-for="(itemAr, index) in item.artists" :key="index">
              {{ itemAr.name }}
            </span>
          </div>
        </div>
        <div class="itemRight">
          <play theme="outline" size="24" fill="#333" v-if="item.mvid != 0" />
          <more-one theme="outline" size="24" fill="#333" />
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { geSearchtMusic, getHot } from "@/api/banner/index.js";
import { MoreOne, Play } from "@icon-park/vue-next";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      searchList: [], //搜索的历史列表
      searchKey: "", //输入框的值
      searchResList: [], //搜索的歌手信息列表
    };
  },
  components: {
    MoreOne,
    Play,
  },
  computed: { ...mapState(["playList"]) },
  async mounted() {
    this.searchList = JSON.parse(localStorage.getItem("searchList"))
      ? JSON.parse(localStorage.getItem("searchList"))
      : [];

    let res = await getHot();
    console.log(res);
  },
  methods: {
    async enterKey() {
      //判断历史记录不为空的时候添加数组并去重
      if (this.searchKey !== "") {
        this.searchList.unshift(this.searchKey);
        this.searchList = [...new Set(this.searchList)];
        if (this.searchList.length > 5) {
          this.searchList.splice(this.searchList.length - 1, 1);
        }

        //把历史记录数组存储到localStorage里面
        localStorage.setItem("searchList", JSON.stringify(this.searchList));
        let res = await geSearchtMusic(this.searchKey);
        this.searchResList = res.data.result.songs;
        console.log(this.searchResList);
      }
      this.searchKey = "";
    },
    deleteKey() {
      localStorage.removeItem("searchList");
      this.searchList = [];
    },
    async sousuo() {
      //调用确认的方法
      this.enterKey();
    },
    async getHistory(keycode) {
      let datalist = await geSearchtMusic(keycode);
      this.searchResList = datalist.data.result.songs;
      //   console.log(datalist);
    },
    updatePlay(item, i) {
      console.log(item);
      item.al = item.album;
      item.al.picUrl = item.album.artist.img1v1Url;
      this.pushPlayList(item);
      let index = this.playList.length - 1;
      this.updatePlayListIndex(index);
    },
    ...mapMutations(["pushPlayList", "updatePlayListIndex"]),
  },
};
</script>

<style lang="less">
.topnav {
  .search {
    width: 100%;
    height: 1rem;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-icon {
      font-size: 20px;
    }
    input {
      width: 85%;
      height: 0.6rem;
      border: 0.01rem solid;
      border-radius: 0.3rem;
      padding-left: 10px;
      background: rgba(204, 204, 204, 0.127);
    }
    p {
      font-size: 16px;
    }
  }
  .searchHistory {
    width: 100%;
    height: 1rem;
    padding: 10px;
    display: flex;
    position: relative;
    //   justify-content: space-between;
    align-items: center;
    .historyP {
      font-size: 20px;
      font-weight: 700;
    }

    .van-tag {
      font-size: 0.3rem;
      margin-right: 0.1rem;
      color: #555;
      background: rgba(214, 213, 213, 0.801);
    }
    .delete {
      position: absolute;
      right: 0.2rem;
    }
    .van-icon {
      font-size: 22px;
    }
  }
  .itemList {
    width: 90%;
    margin-left: 30px;
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