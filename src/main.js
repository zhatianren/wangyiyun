import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import getVant from "./ui/vant.js";
import Vue3Marquee from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import "@icon-park/vue/styles/index.css";

const app = createApp(App);
app.use(store);
app.use(Vue3Marquee);
getVant(app);
app.use(router).mount("#app");
