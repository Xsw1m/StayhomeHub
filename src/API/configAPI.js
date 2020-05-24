// const base_url = 'http://39.105.29.12:8020/member/v1'// 基础的url
import base_url from '../API/BaseApi.js'

const login_url = '/user/login' // 登录所需要的接口 √
const PlayerRecord_url = '/view' // 获取播放记录
const del_playerRecord_url = '/view' // 删除指定id的浏览记录
const collOneVideo_url = '/meta' // 收藏指定id的视频
const getCollRecord_url = '/meta?' // 获取所有的收藏记录
const del_allcoll = '/collection/delete/all' // 删除所有的收藏记录
const getVideoInfor_url = '/video/' // 获取指定id的视频的所有信息
const upVideoprogress_url = '/browser/record' // 定时记录视频观看进度
const recommend_url = '/video' // 视频详情页下方的推荐
const getDownRecord_url = '/download/record/list' // 获取所有的下载记录
const delDownRecord_url = '/download/record/delete/' // 删除指定的某一条下载记录
const delAllDownRecord_url = '/download/record/delete/all' // 删除所有的下载记录
const getVideoAdmin_url = '/video/user/list' // 获取视频管理页面的所有的信息
const delVideoAdmin_url = '/video/' // 删除视频管理页面的某一条指定的信息
const getVideoAdminClass_url = '/column/list' // 获取视频管理页面上面的视频分类
const getAllNews_url = '/message/list' // 获取所有的消息通知
const checkNew_url = '/message/check/' // 已读指定ID的消息
const checkAllNews_url = '/message/check/all' // 一键已读所有消息
const getUserDetails_url = '/user/details' // 获取本人信息 √
const userRegister_url = '/user/register?' // 用户注册 √
const checkMesscode_url = '/user/code/validate' // 检验验证码是否正确 √
const getMobileCode_url = '/user/code' // 获取验证码 √
const changUserInfor_url = '/user/update/info?' // 修改个人信息 √
const changMobile_url = '/user/update/phone?' // 修改个人的手机号 √
const changPassword_url = '/user/update/pwd?' // 修改手机密码 √
const addDown_url = '/download/apply/create?' // 新增下载申请
const addWatch_url = '/watch/apply/create?' // 新增观看申请
const getAllUpVideoClass_url = '/column/home/list' // 视频上传页面中获取视频分类中的一级类
const getAllUpVideoTwoClass_url = '/column/list/' // 视频上传页面中获取视频分类中的二级类
const uploadVideo_url = '/video' // 用户上传视频
const downVideo_url = '/video/download/' // 下载某一个视频
const getAdminVideoInfor = '/video/' // 从视频管理页面跳转编辑,根据视频id获取视频的详细信息
const changVideoInfor = '/video/' // 重新编辑视频的详细信息
const getAdminVideoInfor_url = '/video/details/control/' // 从消息中心点击观看

const getvideolistnavmenu = '/column/home/list'
const getvideoeco = '/column/list/'
const getcategory = '/column/list/'
const getvideolist = '/video'
const gethomepageselected = '/video/list/selection'
const gettimeaxis = '/video'
const logout = '/user/logout'
const getsearch_hot = '/video/list/hot'
const getsearch_recommend = '/video/list/recommend'
const postcollection = '/meta?'
const bannerimg = '/banner'
// 分享视频
const share_apply = '/share/apply/create'
const share_validate = '/share/apply/validate'
const share_activate = '/share/apply/activate'
const share_details = '/share/video/details'
const share_download = '/share/video/download'
// 图片上传本地服务
const uploadImages = '/images'
// video 接口

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
  share_download: share_download,

  uploadImages: uploadImages
}
