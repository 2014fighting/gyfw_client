// pages/info/add.js
var util = require('../../utils/util.js');
var app = getApp();
var today = util.formatTime(new Date((new Date()).getTime() + (1000 * 60 * 60 * 24 * 1))).split(' ')[0];
var minday = util.formatTime(new Date()).split(' ')[0];
var maxday = util.formatTime(new Date((new Date()).getTime() + (1000 * 60 * 60 * 24 * 62))).split(' ')[0];
Page({
  data: {
    sex: ['请选择性别', '男', '女'],
    type: 1,
    gender: 0,
    date: today,
    start: minday,
    end: maxday,
    time: '请选择时间',
    types: [{ name: '1', value: '车找人', checked: true }, { name: '2', value: '人找车' }],
    Surpluss: ['请选择', 1, 2, 3, 4, 5, 6],
    surplus: 0,
    isAgree: false,
    vehicle: '',
    departure: '出发地',
    destination: '目的地'
  },
  setSex: function (e) {
    this.setData({ gender: e.detail.value })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  selectType: function (e) {
    this.setData({ type: e.detail.value })
  },
  setsurplus: function (e) {
    this.setData({ surplus: e.detail.value })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  formSubmit: function (e) {
    var data = e.detail.value;
    var that = this;
    console.log(data);

    if (data.name == '') {
      util.isError('请输入姓名', that);
      return false;
    }
    if (data.gender == 0) {
      util.isError('请选择性别', that);
      return false;
    }

    if (data.phone == '') {
      util.isError('请输入手机号码', that);
      return false;
    }

    if (!(/^1[34578]\d{9}$/.test(data.phone))) {
      util.isError('手机号码错误', that);
      return false;
    }
    if (that.data.departure == '出发地') {
      util.isError('请选择出发地', that);
      return false;
    }
    if (that.data.destination == '目的地') {
      util.isError('请选择目的地', that);
      return false;
    }
    if (data.time == '请选择时间') {
      util.isError('请选择出发时间', that);
      return false;
    }
    if (data.surplus == '0') {
      var arr = new Array('', '剩余空位', '乘车人数');
      util.isError('请选择' + arr[data.type], that);
      return false;
    }


    if (!data.isAgree[0]) {
      util.isError('请阅读并同意条款', that);
      return false;
    }
    data.sk = app.globalData.sk;
    data.departure = that.data.departure;
    data.destination = that.data.destination;
    util.req('info/add', data, function (data) {
      if (data.status == 1) {
        wx.redirectTo({
          url: '/pages/info/index?id=' + data.info
        });
      } else {
        util.isError(data.msg, that);
        return false;
      }
    })
    util.clearError(that);
  },
  sexDeparture: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          departure: res.address
        })
      }
    })
  },
  sexDestination: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          destination: res.address
        })
      }
    })
  },
  onLoad: function (options) {
    this.setData({
      gender: app.globalData.userInfo.gender,
      name: (app.globalData.userInfo.name == '') ? app.globalData.userInfo.nickName : app.globalData.userInfo.name,
      phone: app.globalData.userInfo.phone,
      vehicle: app.globalData.userInfo.vehicle
    })
  }
})