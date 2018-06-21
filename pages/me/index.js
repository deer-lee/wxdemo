// pages/main/index.js
let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        iconSrc: '../../resources/img/tab/tab_3.png',
        versionNum: 'v1.0.0'
    },
    toPersonMessage: function () {
        console.log('个人信息');
        wx.navigateTo({
            url: '/pages/me/subPages/pages/personMessage/index',
            success: function(res) {console.log('成功')},
            fail: function (res) { console.log('失败')}
        })
    },
    toEditPassword: function() {
        console.log('修改密码');
        wx.navigateTo({
            url: '/pages/me/subPages/pages/editPassword/index',
            success: function(res) {console.log('成功')},
            fail: function (res) { console.log('失败')}
        })
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