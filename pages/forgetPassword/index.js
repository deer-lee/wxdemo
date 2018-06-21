// pages/forgetPassword/index.js
var interval = null;
var validateForm = require('../../validateForm/index');
let XeEncrypt = require('../../utils/XeEncrypt.js');
const app = getApp()
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
    nextFlag: false,
    password: '',
    confirmPassword: '',
    isCheck: false,
    nextBtnLoading: false,
    btnLoading: false,
    secToken: '',
    phoneFlag: false,
    title: '密码找回'
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
  bindKeyInput(e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },
  identifyCode() {
    // console.log('btnDisabled', this.data.btnDisabled);
    let _this = this;
    let phoneNum = this.data.phoneNum;
    if (validateForm.checkPhone(phoneNum)) {
      wx.ajax({
        url: '/api/wx/owner/uam/msg/getForgetIdentifyCode',
        data: {
          phoneNum: phoneNum,
          deviceId: 123321
        },
        success(res) {
          // console.log('res', res);
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
  submitForgetPassword(e) {
    let _this = this;
    let phoneNum = e.detail.value.phoneNum;
    let identifyCode = e.detail.value.identifyCode;
    this.setData({
      'phoneNum': phoneNum,
      'identifyCode': identifyCode
    });
    let checkPhone = validateForm.checkPhone(phoneNum);
    let checkCode = validateForm.checkRequired(identifyCode, '请输入验证码');
    if (checkPhone && checkCode) {
      this.setData({
        nextBtnLoading: true
      });
      wx.ajax({
        url: '/api/wx/owner/uam/msg/checkForgetIdentifyCode',
        data: {
          phoneNum: phoneNum,
          identifyCode: identifyCode
        },
        success(res) {
          if (res) {
            _this.setData({
              'nextFlag': true
            });
          } else {
            wx.showToast({
              title: '验证码错误',
              icon: 'none'
            })
          }
          _this.setData({
            nextBtnLoading: false
          });
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
  changPassword(e) {
    this.setData({
      'password': e.detail.value,
    });
  },
  switchChange(e) {
    this.setData({
      'isCheck': e.detail.value
    });
  },
  confirmForgetPassword(e) {
    let _this = this;
    let identifyCode = _this.data.identifyCode;
    let phoneNum = _this.data.phoneNum;
    let checkConfirmPassword = validateForm.checkPassword(e.detail.value.confirmPassword, '请输入确认密码');
    let checkPassword = validateForm.checkPassword(_this.data.password, '请输入密码');
    let checkCode = validateForm.checkRequired(identifyCode, '请输入验证码');
    let checkPhone = validateForm.checkPhone(phoneNum);
    if (checkPhone && checkCode && checkPassword && checkConfirmPassword) {
      if (_this.data.password !== e.detail.value.confirmPassword) {
        wx.showToast({
          title: '两次输入密码不一致',
          icon: 'none'
        });
        return false;
      }
      this.setData({
        btnLoading: true
      });
      let password = new XeEncrypt().aesEncrypt(_this.data.password, this.data.secToken, this.data.secToken);
      let confirmPassword = new XeEncrypt().aesEncrypt(e.detail.value.confirmPassword, this.data.secToken, this.data.secToken);
      wx.ajax({
        url: '/api/wx/owner/uam/login/forgetPassword',
        data: {
          confirmPassword: password,
          identifyCode: identifyCode,
          newPassword: password,
          phoneNum: phoneNum
        },
        success(res) {
          if (res) {
            // console.log('pwd', _this.data.password);
            wx.showToast({
              title: '密码重置成功',
              icon: 'none'
            });
            _this.setData({
              btnLoading: false
            });
            setTimeout(() => {
              _this.logout();
            }, 1500);
          }
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
    let flag = options.flag === 'true' ? true : false;
    console.log(flag);
    if (flag == true) {
      _this.setData({
        title: '修改密码'
      });
      wx.setNavigationBarTitle({
        title: '修改密码'
      })
      wx.ajax({
        url: '/api/app/owner/uam/login/getSecToken',
        success(res) {
          _this.setData({
            secToken: res,
            phoneNum: app.getInfo().phone,
            phoneFlag: true
          });
        },
        fail() {
          // console.log('fail');
          _this.setData({
            phoneFlag: false
          });
        }
      });
    } else {
      console.log('1');
      _this.setData({
        title: '密码找回',
        phoneFlag: false
      });
      wx.setNavigationBarTitle({
        title: '找回密码'
      })
      console.log('1', _this.data.phoneFlag);
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