// const base_url = 'http://39.105.29.12:8020/member/v1'// 基础的url
import base_url from '../API/BaseApi.js'

const login_url = base_url + '/user/login' // 登录所需要的接口
const PlayerRecord_url = base_url + '/browser/list' // 获取播放记录
const del_playerRecord_url = base_url + '/browser/delete/' // 删除指定id的浏览记录
const collOneVideo_url = base_url + '/collection/operate?' // 收藏指定id的视频
const getCollRecord_url = base_url + '/collection/list' // 获取所有的收藏记录
const del_allcoll = base_url + '/collection/delete/all' // 删除所有的收藏记录
const getVideoInfor_url = base_url + '/video/details/' // 获取指定id的视频的所有信息
const upVideoprogress_url = base_url + '/browser/record' // 定时记录视频观看进度
const recommend_url = base_url + '/video/details/recommend/' // 视频详情页下方的推荐
const getDownRecord_url = base_url + '/download/record/list' // 获取所有的下载记录
const delDownRecord_url = base_url + '/download/record/delete/' // 删除指定的某一条下载记录
const delAllDownRecord_url = base_url + '/download/record/delete/all' // 删除所有的下载记录
const getVideoAdmin_url = base_url + '/video/user/list' // 获取视频管理页面的所有的信息
const delVideoAdmin_url = base_url + '/video/delete/' // 删除视频管理页面的某一条指定的信息
const getVideoAdminClass_url = base_url + '/column/list' // 获取视频管理页面上面的视频分类
const getAllNews_url = base_url + '/message/list' // 获取所有的消息通知
const checkNew_url = base_url + '/message/check/' // 已读指定ID的消息
const checkAllNews_url = base_url + '/message/check/all' // 一键已读所有消息
const getUserDetails_url = base_url + '/user/details' // 获取本人信息
const userRegister_url = base_url + '/user/register?' // 用户注册
const checkMesscode_url = base_url + '/user/code/validate' // 检验验证码是否正确
const getMobileCode_url = base_url + '/user/code' // 获取验证码
const changUserInfor_url = base_url + '/user/update/info?' // 修改个人信息
const changMobile_url = base_url + '/user/update/phone?' // 修改个人的手机号
const changPassword_url = base_url + '/user/update/pwd?' // 修改手机密码
const addDown_url = base_url + '/download/apply/create?' // 新增下载申请
const addWatch_url = base_url + '/watch/apply/create?' // 新增观看申请
const getAllUpVideoClass_url = base_url + '/column/home/list' // 视频上传页面中获取视频分类中的一级类
const getAllUpVideoTwoClass_url = base_url + '/column/list/' // 视频上传页面中获取视频分类中的二级类
const uploadVideo_url = base_url + '/video/create?' // 用户上传视频
const downVideo_url = base_url + '/video/download/' // 下载某一个视频
const getAdminVideoInfor = base_url + '/video/details/update/' // 从视频管理页面跳转编辑,根据视频id获取视频的详细信息
const changVideoInfor = base_url + '/video/update/' // 重新编辑视频的详细信息
const getAdminVideoInfor_url = base_url + '/video/details/control/' // 从消息中心点击观看

const getvideolistnavmenu = base_url + '/column/home/list'
const getvideoeco = base_url + '/column/list/'
const getcategory = base_url + '/column/list/'
const getvideolist = base_url + '/video/list'
const gethomepageselected = base_url + '/video/list/selection'
const gettimeaxis = base_url + '/video/time/search'
const logout = base_url + '/user/logout'
const getsearch_hot = base_url + '/video/list/hot'
const getsearch_recommend = base_url + '/video/list/recommend'
const postcollection = base_url + '/collection/operate?'
const bannerimg = base_url + '/banner/list'
// 分享视频
const share_apply = base_url + '/share/apply/create'
const share_validate = base_url + '/share/apply/validate'
const share_activate = base_url + '/share/apply/activate'
const share_details = base_url + '/share/video/details'
const share_download = base_url + '/share/video/download'

// 需要让外部拿到
export default {

  login_url: login_url,
  PlayerRecord_url: PlayerRecord_url,
  del_playerRecord_url: del_playerRecord_url,
  collOneVideo_url: collOneVideo_url,
  getCollRecord_url: getCollRecord_url,
  del_allcoll: del_allcoll,
  getDownRecord_url: getDownRecord_url,
  getVideoInfor_url: getVideoInfor_url,
  upVideoprogress_url: upVideoprogress_url,
  recommend_url: recommend_url,
  delDownRecord_url: delDownRecord_url,
  getVideoAdmin_url: getVideoAdmin_url,
  getAllNews_url: getAllNews_url,
  delVideoAdmin_url: delVideoAdmin_url,
  getVideoAdminClass_url: getVideoAdminClass_url,
  checkNew_url: checkNew_url,
  checkAllNews_url: checkAllNews_url,
  getUserDetails_url: getUserDetails_url,
  userRegister_url: userRegister_url,
  checkMesscode_url: checkMesscode_url,
  getMobileCode_url: getMobileCode_url,
  changUserInfor_url: changUserInfor_url,
  changMobile_url: changMobile_url,
  changPassword_url: changPassword_url,
  addDown_url: addDown_url,
  addWatch_url: addWatch_url,
  getAllUpVideoClass_url: getAllUpVideoClass_url,
  getAllUpVideoTwoClass_url: getAllUpVideoTwoClass_url,
  uploadVideo_url: uploadVideo_url,
  downVideo_url: downVideo_url,
  delAllDownRecord_url: delAllDownRecord_url,
  getAdminVideoInfor: getAdminVideoInfor,
  changVideoInfor: changVideoInfor,
  getAdminVideoInfor_url: getAdminVideoInfor_url,

  getvideolistnavmenu: getvideolistnavmenu,
  getvideoeco: getvideoeco,
  getcategory: getcategory,
  getvideolist: getvideolist,
  gethomepageselected: gethomepageselected,
  gettimeaxis: gettimeaxis,
  logout: logout,
  getsearch_recommend: getsearch_recommend,
  getsearch_hot: getsearch_hot,
  postcollection: postcollection,
  bannerimg: bannerimg,

  share_apply: share_apply,
  share_validate: share_validate,
  share_activate: share_activate,
  share_details: share_details,
  share_download: share_download
}