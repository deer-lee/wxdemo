//app.js
let httpConfig = require('./httpConfig.js');
App({
    info: undefined,
    getInfo: function () {
        return this.info ? this.info : wx.getStorageSync('info');
    },
  onLaunch: function () {
      wx.ajax = (config) => {
          let requestConfig = {
              method: 'POST'
          }
          if (this.getInfo()) {
              requestConfig.header = {
                  Authorization: 'Bearer ' + this.getInfo().token
              }
          }
          requestConfig = Object.assign(requestConfig, config);
          requestConfig.url = httpConfig.baseUrl + config.url;
          let success = requestConfig.success;
          let fail = requestConfig.fail;
          requestConfig.success = (res) => {
              if (res.statusCode === 200) {
                  if (res.data.code === 200) {
                      success && success(res.data.result);
                  } else {
                      fail && fail(res.data.message);
                  }
              } else {
                  wx.showToast({ title: res.errMsg });
              }
          };
          return wx.request(requestConfig);
      }

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})