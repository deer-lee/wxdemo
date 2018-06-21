// pages/login/index.js

let XeEncrypt = require('../../utils/XeEncrypt.js');
var validateForm = require('../../validateForm/index');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    secToken: '',
    encrypt: new XeEncrypt(),
    loginBtnLoading: false,
    logoutFlag: false
  },
  submitLogin(e) {
    let _this = this;
    let checkPassword = validateForm.checkPassword(e.detail.value.passworld, '请输入密码');
    let checkPhone = validateForm.checkPhone(e.detail.value.phoneNumber);
    if (checkPhone && checkPassword) {
      wx.ajax({
        url: '/api/app/owner/uam/login/getSecToken',
        success(res) {
          _this.setData({
            secToken: res
          });
          let phoneNumber = e.detail.value.phoneNumber;
          let passworld = new XeEncrypt().aesEncrypt(e.detail.value.passworld, _this.data.secToken, _this.data.secToken);
          _this.setData({
            loginBtnLoading: true
          });
          wx.ajax({
            url: '/api/app/owner/uam/login/loginWithPassword',
            data: {
              phoneNum: phoneNumber,
              password: passworld,
              platform: 3,
              deviceId: 123321
            },
            success(res) {
              try {
                wx.setStorageSync('info', res);
                app.info = res;
              } catch (e) {
                console.log('info', e);
              }
              app.isGoback = false;
              wx.showToast({
                title: '登录成功!',
                icon: 'none',
                duration: 500
              });
              setTimeout(() => {
                wx.switchTab({
                  url: '../../pages/main/index'
                })
              }, 1500);
              // setTimeout(()=>{
              //     if(_this.data.logoutFlag) {
              //         wx.switchTab ({
              //             url:'../../pages/main/index'
              //         })
              //     } else {
              //         wx.navigateBack();
              //     }
              // }, 1500);
            },
            fail(msg) {
              wx.showToast({
                title: msg,
                icon: 'none'
              })
              _this.setData({
                loginBtnLoading: false
              });
            }
          });
        },
        fail() {
          wx.showToast({
            title: '服务异常请稍后再试！',
            icon: 'none'
          })
        }
      });
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    if (options.logoutFlag !== undefined) {
      _this.setData({
        logoutFlag: options.logoutFlag
      });
    } else {
      _this.setData({
        logoutFlag: false
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

    return {
      title: '一键发布 急速响应 全程冷链 安全可控',
      path: '/pages/main/index'
    }
  }
})