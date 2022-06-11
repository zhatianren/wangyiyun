import service from "..";
// 请求轮播图的数据
export function getDetail(data) {
  return service({
    method: "GET",
    url: `/playlist/detail?id=${data}`,
  });
}
//获取歌单详情列表
export function getDetailList(data) {
  return service({
    method: "GET",
    url: `/playlist/track/all?id=${data}&limit=10&offset=0}`,
  });
}
// 获取歌词
export function getDetailLyric(data) {
  return service({
    method: "GET",
    url: `/lyric?id=${data}`,
  });
}
