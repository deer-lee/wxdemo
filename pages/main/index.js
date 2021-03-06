// pages/main/index.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgUrls: [
          '../../resources/img/main/homePage1.png',
          '../../resources/img/main/homePage2.png'
      ],
      haveSupplyOfGoods: false,
      indicatorDots: false,
      duration: 1000,
      interval: 3000,
      autoplay: true,
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onShareAppMessage: function () {
    return {
      title: '一键发布 急速响应 全程冷链 安全可控',
      path: '/pages/main/index'
    }
  }
})