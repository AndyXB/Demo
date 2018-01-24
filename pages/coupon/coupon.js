// pages/coupon/coupon.js
var userId = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupon: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        userId = res.data.mobileNumber
        wx.getStorage({
          key: userId,
          success: function(res) {
            that.setData({
              coupon: res.data
            })
          },
          fail: function() {
            var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
            var maxPos = chars.length;
            var coupon = '';
            for (var i = 0; i < 7; i++) {
              coupon += chars.charAt(Math.floor(Math.random() * maxPos));
            }

            wx.setStorage({
              key: userId,
              data: coupon
            })

            that.setData({
              coupon: coupon
            })
          }
        })
      }
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
  
  }
})