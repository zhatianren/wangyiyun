<template>
  <div class="login">
    <div class="logmiddle">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="phone"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px" @click="login">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            color="linear-gradient(to right, #ff6034, #ee0a24)"
          >
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/banner/index.js";
export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    async login() {
      let res = await this.$store.dispatch("getPhonePwd", {
        phone: this.phone,
        password: this.password,
      });
      console.log(res);
      if (res.data.code === 200) {
        this.$store.commit("updateLogin", true);
        this.$store.commit("updateToken", res.data.token);
        localStorage.setItem("uid", res.data.account.id);
        let userinfo = await getUserInfo(res.data.account.id);
        console.log(userinfo);
        this.$store.commit("userInfo", userinfo);
        this.$router.push("/infouser");
      } else {
        alert("手机号或密码错误");
        this.password = "";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 13.5rem;
  background: url("@/assets/wyyLogo.png ") no-repeat;
  background-size: 100% 100%;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .logmiddle {
    position: absolute;
    left: 5%;
    top: 42%;
  }
}
</style>

