/**
 * Created by yangzhanpeng on 2018/1/5.
 */
import config from './config.json'
import {fetch} from '@/utils/fetch'
import {toast} from '@/main'
import wx from 'weixin-js-sdk'
const redirectUrl = `${window.location.protocol}//${window.location.host}/jump`

const initShare = async function (initUrl, shareUrl, shareImage, title, desc, cb = null) {
  const url = '/mobileWechat/wechatConfig.do'
  const u = navigator.userAgent
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  let response = ''
  if (isIOS) {
    response = await fetch(url, {url: initUrl})
  } else {
    response = await fetch(url, {url: window.location.href})
  }
  if (parseInt(response.code) === 1) {
    wx.config({
      debug: false,
      appId: config.appId,
      timestamp: response.data.timestamp,
      nonceStr: response.data.nonceStr,
      signature: response.data.signature,
      jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage',
        'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone',
        'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem', 'translateVoice', 'startRecord',
        'stopRecord', 'onVoiceRecordEnd', 'playVoice',
        'onVoicePlayEnd', 'pauseVoice', 'stopVoice',
        'uploadVoice', 'downloadVoice', 'chooseImage',
        'previewImage', 'uploadImage', 'downloadImage',
        'getNetworkType', 'openLocation', 'getLocation',
        'hideOptionMenu', 'showOptionMenu', 'closeWindow',
        'scanQRCode', 'chooseWXPay', 'openProductSpecificView',
        'addCard', 'chooseCard', 'openCard']
    })
    wx.ready(function () {
      wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: shareUrl,
        imgUrl: shareImage,
        success: function (res) {
          console.log('分享成功')
          cb && cb()
        }
      })
      wx.onMenuShareTimeline({
        title: title,
        desc: desc,
        link: shareUrl,
        imgUrl: shareImage,
        success: function (res) {
          console.log('分享成功')
          cb && cb()
        }
      })
      wx.onMenuShareQQ({
        title: title,
        desc: desc,
        link: shareUrl,
        imgUrl: shareImage,
        success: function () {
          console.log('分享成功')
          cb && cb()
        }
      })
    })
  } else {
    toast(response.message)
  }
}

/**
 * 微信授权
 */
const getAuth = function ($route) {
  sessionStorage.setItem('returnUrl', $route.fullPath)
  setTimeout(() => {
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
  })
}

/**
 * 判断是否是微信中打开
 * @returns {boolean}
 */
const isWechat = function () {
  const ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}

let wechat = {
  initShare,
  isWechat,
  getAuth
}

export default wechat
