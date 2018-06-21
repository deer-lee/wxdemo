// pages/order/subPages/pages/releaseTrunlLine/index.js
// let identityFilter = require('../../../../../utils/identityFilter.js').identityFilter;
let formatTime = require('../../../../../utils/util.js');
let millisecondToDate = require('../../../../../utils/millisecondToDate.js');
let payMode = require('../../../../../utils/payMode.js')
let temperatureZone = require('../../../../../utils/temperatureZone.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startAddres: '',
    endAddres: '',
    loadCarTime: '',
    temperatureZone: '',
    goodsCategory: '',
    payMode: '',
    goodsWeight: '',
    goodsVolume: '',
    freight: '',
    shipper: '',
    selectProtocol: ['selectProtocol'],
    detailedListNumber: '',
    showLoadTimePicker: false,
    showTemperatureZonePicker: false,
    showGoodsCategoryPicker: false,
    showPayModePicker: false
  },
  uploadGoodsList() {
    wx.navigateTo({
      url: `/pages/order/subPages/pages/uploadGoodsList/index?firstFlag=${this.data.firstFlag}&resourceCode=${this.data.resourceCode}&viewFlag=false`
    });
  },
  // 装车时间
  selectLoadCarTime() {
    this.setData({
      showLoadTimePicker: true
    });
  },
  // 装车时间
  loadCarTimeDataCancelCallback(e) {
    this.setData({
      showLoadTimePicker: e.detail.show
    });
  },
  // 装车时间
  loadCarTimeDataDoneCallback(e) {
    this.setData({
      loadCarTime: e.detail.date + ' ' + e.detail.time
    });
  },

  //温度带
  selectTemperatureZonet() {
    this.setData({
      showTemperatureZonePicker: true
    });
  },

  //温度带
  temperatureZoneCancelCallback(e) {
    this.setData({
      showTemperatureZonePicker: e.detail.show
    });
  },
  //温度带
  temperatureZoneDoneCallback(e) {
    this.setData({
      temperatureZone: e.detail.data
    });
  },

  //货物类别
  selectGoodsCategory() {
    this.setData({
      showGoodsCategoryPicker: true
    });
  },
  //货物类别
  goodsCategoryDoneCallback(e) {
    console.log('e', e)
    this.setData({
      goodsCategory: e.detail
    });
  },
  //货物类别
  goodsCategoryCancelCallback(e) {
    this.setData({
      showGoodsCategoryPicker: e.detail.show
    });
  },
  //支付方式
  selectPayMode() {
    this.setData({
      showPayModePicker: true
    });
  },
  //支付方式
  payModeDoneCallback(e) {
    this.setData({
      payMode: e.detail
    });
  },
  //支付方式
  payModeCancelCallback(e) {
    this.setData({
      showPayModePicker: e.detail.show
    });
  },
  //重量
  weightDone(e) {
    this.setData({
      goodsWeight: e.detail.value
    });
  },
  //体积
  volumeDone(e) {
    this.setData({
      goodsVolume: e.detail.value
    });
  },
  //运费
  freightDone(e) {
    this.setData({
      freight: e.detail.value
    });
  },
  //联系方式
  shipperDone(e) {
    this.setData({
      shipper: e.detail.value
    });
  },

  protocolChange(e) {
    this.setData({
      selectProtocol: e.detail.value
    });
  },
  IconFn: function (e) {
    wx.showModal({
      content: "此运费承运方可能会议价，需要您来选择承运方",
      confirmText: "确认",
      confirmColor: '#18A9DF',
      showCancel: false
    })
  },

  sbumitBtnClick() {
    if (!this.data.startAddres || !this.data.endAddres) {
      wx.showToast({
        title: '收货地和发货地不能为空！',
        icon: 'none'
      })
    } else if (!this.data.startAddres.address || !this.data.endAddres.address) {
      wx.showToast({
        title: '请填写详细地址 ',
        icon: 'none'
      })
    } else if (!this.data.loadCarTime) {
      wx.showToast({
        title: '发货时间不能为空！',
        icon: 'none'
      })
    } else if (!this.data.temperatureZone) {
      wx.showToast({
        title: '温度带不能为空！',
        icon: 'none'
      })
    } else if (!this.data.goodsCategory) {
      wx.showToast({
        title: '货物类别不能为空！',
        icon: 'none'
      })
    } else if (!this.data.goodsWeight || !this.data.goodsVolume) {
      wx.showToast({
        title: '货物重量和方数不能为空！',
        icon: 'none'
      })
    } else if (this.data.goodsWeight > 999.99 || this.data.goodsVolume > 999.99) {
      wx.showToast({
        title: '货物吨数或方数不能超过999.99！',
        icon: 'none'
      })
    } else if (!this.data.freight) {
      wx.showToast({
        title: '期望运费不能为空！',
        icon: 'none'
      })
    } else if (this.data.freight <= 0) {
      wx.showToast({
        title: '期望运费不能为0！',
        icon: 'none'
      })
    } else if (this.data.freight.length > 5) {
      wx.showToast({
        title: '期望运费不能大于5位！',
        icon: 'none'
      })
    } else if (!this.data.shipper) {
      wx.showToast({
        title: '发货联系人不能为空！',
        icon: 'none'
      })
    } else if (!/^[\u4e00-\u9fa5]+$/.test(this.data.shipper)) {
      wx.showToast({
        title: '发货联系人只支持汉字！',
        icon: 'none'
      })
    } else if (this.data.shipper.length > 6) {
      wx.showToast({
        title: '发货联系人只支持录入6位！',
        icon: 'none'
      })
    } else if (!this.data.selectProtocol.length) {
      wx.showToast({
        title: '您还没有同意用户协议！',
        icon: 'none'
      })
    } else {
      const _this = this;
      wx.ajax({
        url: `/api/wx/owner/mainline/submitMainLineResource`,
        data: {
          categoryCode: _this.data.goodsCategory.id,
          categoryName: _this.data.goodsCategory.goodsTypeName,
          freight: Number(_this.data.freight),
          fromAddress: _this.data.startAddres.address,
          fromAreaCode: _this.data.startAddres.area,
          fromAreaName: _this.data.startAddres.areaName,
          fromCityCode: _this.data.startAddres.city,
          fromCityName: _this.data.startAddres.cityName,
          fromProvinceCode: _this.data.startAddres.province,
          fromProvinceName: _this.data.startAddres.provinceName,
          goodsTotalVolume: Number(_this.data.goodsVolume),
          goodsTotalWeight: Number(_this.data.goodsWeight),
          settlementMode: _this.data.payMode.value,
          source: 'WECHAT',
          temperatureZone: _this.data.temperatureZone.code,
          loadingStartTime: _this.data.loadCarTime.replace(/\//g, '-').slice(0, 16) + ':00',
          loadingEndTime: _this.data.loadCarTime.replace(/\//g, '-').slice(0, 10) + _this.data.loadCarTime.slice(-6) + ':00',
          shipper: _this.data.shipper,
          shipperPhone: app.getInfo().phone,
          toAddress: _this.data.endAddres.address,
          toAreaCode: _this.data.endAddres.area,
          toAreaName: _this.data.endAddres.areaName,
          toCityCode: _this.data.endAddres.city,
          toCityName: _this.data.endAddres.cityName,
          toProvinceCode: _this.data.endAddres.province,
          toProvinceName: _this.data.endAddres.provinceName,
          attachmentList: _this.data.uploadImgRes ? _this.data.uploadImgRes : []
        },
        success(res) {
          wx.showToast({
            title: '委托干线成功!',
            icon: 'success',
            success() {
              setTimeout(() => {
                app.switchTab = 1
                wx.switchTab({
                  url: '/pages/order/index'
                });
              }, 1500);
            }
          })
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    if (options.resourceCode) {
      wx.ajax({
        url: `/api/wx/owner/resource/getMainLineInfoDetail/${options.resourceCode}`,
        success: function (res) {
          let resLength = res.attachmentRes.length;
          if (resLength > 0) {
            _this.setData({
              detailedListNumber: resLength + '张'
            })
          } else {
            _this.setData({
              detailedListNumber: ''
            })
          }
          _this.setData({
            resourceCode: options.resourceCode,
            startAddres: res.fromProvinceName + res.fromCityName + res.fromAreaName,
            endAddres: res.toProvinceName + res.toCityName + res.toAreaName,
            startAddres: {
              address: res.fromAddress,
              area: res.fromAreaCode,
              areaName: res.fromAreaName,
              city: res.fromCityCode,
              cityName: res.fromCityName,
              province: res.fromProvinceCode,
              provinceName: res.fromProvinceName
            },
            endAddres: {
              address: res.toAddress,
              area: res.toAreaCode,
              areaName: res.toAreaName,
              city: res.toCityCode,
              cityName: res.toCityName,
              province: res.toProvinceCode,
              provinceName: res.toProvinceName
            },
            goodsWeight: res.goodsTotalWeight,
            goodsVolume: res.goodsTotalVolume,
            freight: res.freight,
            uploadImgRes: res.attachmentRes,
            // detailedListNumber: res.attachmentRes.length,
            shipper: res.shipper,
            payMode: payMode(res.settlementMode), //结算方式
            temperatureZone: temperatureZone(res.temperatureZone), //温度带
            goodsCategory: {
              goodsTypeName: res.cargoDetails[0].categoryName,
              id: res.cargoDetails[0].categoryCode
            },
            loadCarTime: millisecondToDate(res.loadingStartTime, res.loadingEndTime)//装货时间
          })
        },
        fail: function (msg) {
          console.log('msg1', msg)
        }
      })
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
    console.log('uploadImgRes', this.data.uploadImgRes);
    if (this.data.uploadImgRes !== undefined) {
      if (this.data.uploadImgRes.length > 0) {
        this.setData({
          detailedListNumber: this.data.uploadImgRes.length + '张'
        });
      } else {
        this.setData({
          detailedListNumber: ''
        });
      }
    }
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
      path: 'pages/main/index'
    }
  }
})