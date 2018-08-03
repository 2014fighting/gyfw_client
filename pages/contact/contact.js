// pages/contact/contact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:'专注公寓生活服务，搬家，早餐，租车，家电维修，旧品回收,点击电话号码联系我们!',
    mobile: '15659284668'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.info(1);
        var latitude = res.latitude; // 经度
        var longitude = res.longitude; // 纬度

        this.setData({ latitude1: latitude, longitude1: longitude });
      },
      fail: function (e) {
        console.log(e);
      },
    })
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
  
  },

  contactMe:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.mobile,
    })
  }
})