import * as publicService from '../services/publicService';
import {Toast} from 'antd-mobile'
// import wx from 'weixin-js-sdk'

export default {
  namespace: 'wxJsApi',
  state: {
    jsConfig: {}
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
  },
  effects: {
    *queryJsApi({payload:query}, {call, put}) {
      const data = yield call(publicService.findJsApi, {url: window.location.href});
      yield put({type: "modifyState", payload: {jsConfig: data}});
      window.wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appid, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature,// 必填，签名
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData',"onMenuShareTimeline","onMenuShareAppMessage"] // 必填，需要使用的JS接口列表
      });
    },
    *shareData({payload:obj},{call}) {
      // const url = window.location.href;
      const domain = window.location.protocol+"//"+window.location.host; //域名
      const imgUrl = obj.img?(domain+obj.img):"";
      //console.log("host:::" +domain); //
      /*const data = yield call(publicService.findJsApi, {url: url});
      //console.log(data);
      //console.log(data.appid)
      window.wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appid, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature,// 必填，签名
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
      });*/

      window.wx.ready(function() {
        //分享给朋友
        window.wx.updateAppMessageShareData({
          title: obj.title, // 分享标题
          desc: obj.desc,
          link: obj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: imgUrl, // 分享图标
          success: function () {
            // 设置成功
            Toast.success("分享成功");
          },
          fail: function(res) {
            Toast.fail(res);
          }
        });

        //分享到朋友圈
        window.wx.updateTimelineShareData({
          title: obj.title, // 分享标题
          desc: obj.desc,
          link: obj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: imgUrl, // 分享图标
          success: function () {
            // 用户点击了分享后执行的回调函数
            Toast.success("分享成功");
          },
          fail: function(res) {
            Toast.fail(res);
          }
        })
      })

      window.wx.error(function(err) {
        Toast.fail(err);
      });
    },
  },
  subscriptions: {
  }
}
