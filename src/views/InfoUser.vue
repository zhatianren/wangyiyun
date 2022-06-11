<template>
  <div class="infoUserTop">
    <img
      :src="this.userlist.data.profile.avatarUrl"
      alt=""
      class="profileimg"
    />
    <span>{{ this.userlist.data.profile.nickname }}</span>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      userlist: {},
    };
  },
  created() {
    this.getUser();
  },
  computed: {
    ...mapState(["user"]),
  },

  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.userlist = JSON.parse(localStorage.getItem("user"));
      console.log(this.userlist);
    },
  },
};
</script>

<style lang='less'>
.infoUserTop {
  width: 100%;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  // position: absolute;
  // left: 50%;
  // top: 20%;
  .profileimg {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
  }
}
</style>