// pages/createAccountNumber/index.js
var interval = null;
var validateForm = require('../../validateForm/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '发送验证码',
    currentTime: 61,
    btnDisabled: false,
    phoneNum: '',
    identifyCode: '',
    password: '',
    agreement: true,
    items: [
      { checked: true }
    ],
    btnLoading: false
  },
  bindKeyInput(e) {
    console.log(e.detail.value);
    this.setData({
      phoneNum: e.detail.value
    })
  },
  getCode() {
    var _this = this;
    var currentTime = _this.data.currentTime;
    interval = setInterval(function () {
      currentTime--;
      _this.setData({
        time: currentTime + 's后重发',
        btnDisabled: true
      });
      if (currentTime <= 0) {
        clearInterval(interval);
        _this.setData({
          time: '重发验证码',
          currentTime: 61,
          btnDisabled: false
        })
      }
    }, 1000)
  },
  identifyCode() {
    let _this = this;
    let phoneNum = this.data.phoneNum;
    if (validateForm.checkPhone(phoneNum)) {
      wx.ajax({
        url: '/api/wx/owner/uam/register/identifyCode',
        data: {
          phoneNum: phoneNum,
          deviceId: 123321
        },
        success(res) {
          console.log('res', res);
          _this.getCode();
        },
        fail(msg) {
          wx.showToast({
            title: msg,
            icon: 'none'
          })
        }
      });
    }

  },
  checkboxChange(e) {
    if (e.detail.value.length === 1) {
      this.data.agreement = true;
    } else {
      this.data.agreement = false;
    }
    console.log(e.detail.value.length);
  },
  submitAccount(e) {
    let _this = this;
    let phoneNum = e.detail.value.phoneNum;
    let identifyCode = e.detail.value.identifyCode;
    let password = e.detail.value.password;
    let agreement = this.data.agreement;
    let checkPassword = validateForm.checkPassword(password, '请输入密码');
    let checkCode = validateForm.checkRequired(identifyCode, '请输入验证码');
    let checkPhone = validateForm.checkPhone(phoneNum);
    if (checkPhone && checkCode && checkPassword) {
      if (agreement) {
        this.setData({
          btnLoading: true
        });
        wx.ajax({
          url: '/api/wx/owner/uam/register/registerUser',
          data: {
            phoneNum: phoneNum,
            identifyCode: identifyCode,
            password: password,
            confirmPassword: password
          },
          success(res) {
            console.log('res', res);
            wx.showToast({
              title: '注册成功!',
              icon: 'none',
              duration: 500
            });
            _this.setData({
              btnLoading: false
            });
            setTimeout(() => {
              wx.navigateBack();
            }, 1500);
          },
          fail(msg) {
            wx.showToast({
              title: msg,
              icon: 'none'
            });
            _this.setData({
              btnLoading: false
            });
          }
        });
      } else {
        wx.showToast({
          title: '请勾选用户服务协议',
          icon: 'none'
        });
      }
    }
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
  onShareAppMessage() {

    return {
      title: '一键发布 急速响应 全程冷链 安全可控',
      path: '/pages/main/index'
    }
  }
})