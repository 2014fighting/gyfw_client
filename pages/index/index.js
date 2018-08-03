//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    grids: [{ id: 0, img: '../../images/huishou.png', url: '../banjia/banjia',name:'旧品回收' }, 
      { id: 1, img: '../../images/zuche.png', url: '../banjia/banjia', name: '租车服务'  },
      { id: 2, img: '../../images/zaocan.png', url: '../banjia/banjia', name: '早餐预定'  },
      { id: 3, img: '../../images/zhuanzu.png', url: '../banjia/banjia', name: '转租服务' }, 
      { id: 4, img: '../../images/meishi.png', url: '../banjia/banjia', name: '附近美食' }, 
      { id: 5, img: '../../images/yule.png', url: '../banjia/banjia', name: '周边娱乐' }],

    imgUrls: [
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
   
  onLoad: function () {

    wx.request({
      url: app.globalData.apiUrl+"appoint/list",
      data: {},
      header: {
        // "Content-Type":"application/json"
      },
      success: function (res) {
        console.log(res.data)
      },
      fail: function (err) {
        console.log(err)
      }

    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  clickMe: function () {
   wx.showToast({
     title: '你个傻逼',
   })
    // this.setData({ msg: "Hello World" })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
