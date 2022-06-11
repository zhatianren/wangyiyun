<template>
  <div>
    <Topnav />
    <Swiper />
    <Icon />
    <MusicList />
    <!-- <MusicDetail /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Topnav from "@/components/home/Topnav.vue";
import Swiper from "@/components/home/Swiper.vue";
import Icon from "@/components/home/Icon.vue";
import MusicList from "@/components/home/MusicList.vue";
import MusicDetail from "./MusicDetail.vue";
export default {
  name: "HomeView",
  components: {
    Topnav,
    Swiper,
    Icon,
    MusicList,
    MusicDetail,
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon {
  width: 0.4rem;
  height: 0.4rem;
}
a {
  color: black;
}
</style>
