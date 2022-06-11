<template>
  <div>
    <MusicDetailTopNav :playlist="playlist" />
    <MusicDetailList
      :detailList="detailList"
      :subscribedCount="playlist.subscribedCount"
    />
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { getDetail, getDetailList } from "@/api/banner/detail.js";
import MusicDetailTopNav from "@/components/musicDetail/MusicDetailTopNav.vue";
import MusicDetailList from "@/components/musicDetail/MusicDetailList.vue";
export default {
  data() {
    return {
      playlist: {},
      detailList: [],
    };
  },
  components: {
    MusicDetailTopNav,
    MusicDetailList,
  },
  mounted() {
    this.getDetailMusic();
  },

  methods: {
    // 获取音乐列表详情
    async getDetailMusic() {
      let id = useRoute().query.id;
      // 获取歌单详情
      let res = await getDetail(id);
      // 获取歌单列表数据
      let resList = await getDetailList(id);
      this.detailList = resList.data.songs;
      console.log(this.detailList);
      this.playlist = res.data.playlist;
      // 防止刷新把数据存储到session里面
      sessionStorage.setItem("itemDetail", JSON.stringify(this.playlist));
    },
  },
};
</script>

<style>
</style>