import service from "..";
// 请求轮播图的数据
export function getBanner() {
  return service({
    method: "GET",
    url: "banner?type=2",
  });
}
//获取歌曲列表
export function getMusicList() {
  return service({
    method: "GET",
    url: "/personalized?limit=10",
  });
}
// 搜索

export function geSearchtMusic(data) {
  return service({
    method: "GET",
    url: `/search?keywords=${data}`,
  });
}

export function getHot() {
  return service({
    method: "GET",
    url: "/search/hot",
  });
}

// 手机登录接口

export function getPhone(data) {
  return service({
    method: "GET",
    url: `/login/cellphone?phone=${data.phone}&password=${data.password}`,
  });
}
// 获取用户详情信息
export function getUserInfo(data) {
  return service({
    method: "GET",
    url: `/user/detail?uid=${data}`,
  });
}
