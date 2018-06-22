// pages/forgetPassword/index.js
var interval = null;
var validateForm = require('../../../../../validateForm/index');
// let XeEncrypt = require('../../utils/XeEncrypt.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      status: 'Through',
      loginName: 'admin',
      userName: '超级管理员',
      roleName: '运营测试运',
      belongOrganize: '华北大区',
      phoneNumber: '13211111111'
  },
  confirmEditPassword(e) {
      console.log('确认');
  },
  logout(e) {
    let _this = this;
    try {
      app.info = undefined
      wx.removeStorage({
        key: 'info',
        success: function (res) {
          let pages = getCurrentPages()
          pages[0].setData({
            userInfo: {}
          })
          wx.navigateTo({
            url: '../../pages/login/index'
          })
        }
      })
    } catch (e) {
      console.error(e)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    console.log(options);
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