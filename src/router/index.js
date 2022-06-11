import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/MusicDetail",
    name: "MusicDetail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MusicDetail.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/Search.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/infouser",
    name: "infouser",
    beforeEnter: (to, from, next) => {
      if (
        store.state.isLogin ||
        store.state.token ||
        localStorage.getItem("token")
      ) {
        next();
      } else {
        next("login");
      }
    },
    component: () => import("../views/InfoUser.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// 全局路由守卫隐藏底部组件
router.beforeEach((to, from) => {
  console.log(to);
  if (to.path === "/login" || to.path === "/infouser") {
    store.state.isFooterShow = false;
  } else {
    store.state.isFooterShow = true;
  }
});

export default router;
