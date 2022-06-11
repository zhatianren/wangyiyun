import { createStore } from "vuex";
import { getDetailLyric } from "@/api/banner/detail.js";
import { getPhone } from "@/api/banner/index.js";

export default createStore({
  state: {
    // 播放列表默认值
    playList: [
      {
        al: {
          iid: 6434,
          name: "好久不见",
          pic: 18782957139233960,
          picUrl:
            "https://p2.music.126.net/o_OjL_NZNoeog9fIjBXAyw==/18782957139233959.jpg",
          pic_str: "18782957139233959",
        },
        id: 65538,
        name: "好久不见",
        ar: [
          {
            name: "陈奕迅",
          },
        ],
      },
    ],
    playIndex: 0, //列表详情的默认下标
    isbtnShow: true, //暂停按钮显示隐藏
    detailShow: false, //歌曲详情页的显示
    lyricList: {}, //获取歌词
    currentTime: 0, //当前时间
    duration: 0, //歌曲总时长
    isLogin: false, //是否登录状态
    isFooterShow: true, //判断是否显示底部组件
    token: "", //验证有无token
    user: {}, //存储用户信息
  },
  getters: {},
  mutations: {
    updateIsbtnShow(state, value) {
      state.isbtnShow = value;
    },
    updatePlayList(state, value) {
      state.playList = value;
      // console.log(state.playList);
    },
    updatePlayListIndex(state, value) {
      state.playIndex = value;
    },
    updateDetail(state, value) {
      //点击的时候取反
      state.detailShow = !state.detailShow;
    },
    updateLyric(state, value) {
      state.lyricList = value;
    },
    updeteCurrentTime(state, value) {
      state.currentTime = value;
    },
    addDuration(state, value) {
      state.duration = value;
    },
    pushPlayList(state, value) {
      state.playList.push(value);
    },
    updateLogin(state, value) {
      state.isLogin = value;
    },
    updateToken(state, value) {
      state.token = value;
      localStorage.setItem("token", value);
    },
    userInfo(state, value) {
      state.user = value;
      localStorage.setItem("user", JSON.stringify(value));
      console.log(state.user);
    },
  },
  actions: {
    //获取歌词传给updateLyric里的lyricList
    async getMusicLyric(context, value) {
      let res = await getDetailLyric(value);
      context.commit("updateLyric", res.data.lrc);
    },

    async getPhonePwd(context, value) {
      let res = await getPhone(value);
      // console.log(res);
      return res;
    },
  },
  modules: {},
});
