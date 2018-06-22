// components/selectTabelCell/index.js
const joinUrl = require('../../utils/joinUrl.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    iconSrc:  {
        type: String,
        observer: function (n, o) {
            n && this.setData({ haveIcon: true });
        }
    },
    cellData: {
      type: String,
      observer: function (n, o) {
        n === '' ? this.setData({ haveData: false }) : n && this.setData({ haveData: true });
      }
    },
    hasArrow: {
      type: Boolean,
        observer: function (n, o) {
            n === '' ? this.setData({ haveArrow: false }) : n && this.setData({ haveArrow: true });
        }
    },
    url: String,
    title: String,
    selectType: String,
    placeholder: String,
    navOptions: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    haveData: false,
    haveCompany: false,
    haveIcon: false
  },

  created() {

  },

  attached() {
    // console.log('xxxxx', this.properties.cellData);
    // this.properties.cellData 
  },

  ready() {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    linkTo() {
      this.triggerEvent('selectCallback');
      if (this.properties.url) {
        wx.navigateTo({
          url: joinUrl(this.properties.url, this.properties.navOptions)
        });
        return;
      }
    }
  }
})
