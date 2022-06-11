<template>
  <nav>
    <router-link to="/"></router-link>
    <router-link to="/about"></router-link>
    <FooterNav v-show="$store.state.isFooterShow" />
  </nav>
  <router-view />
</template>
<script>
import FooterNav from "@/components/musicDetail/FooterNav.vue";
// import store from "@store/index.js";

export default {
  components: {
    FooterNav,
  },
};
</script>

<style lang="less">
</style>
