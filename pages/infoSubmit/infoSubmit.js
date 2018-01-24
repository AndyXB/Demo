Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    mobileNumber: '',
    email: '',
    birthdate: '2000-01-01'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res.data)
        that.setData({
          userName: res.data.userName,
          mobileNumber: res.data.mobileNumber,
          email: res.data.email,
          birthdate: res.data.birthdate
        })
      }
    })
  },

  /**
   * 提交表单
   */
  formSubmit: function (e) {
    // console.log('form发生了submit事件，携带数据为：', this.data)
    if (this.data.userName.length == 0 || this.data.mobileNumber.length == 0 || this.data.email.length == 0) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 2000
      })
      return
    }

    // 获取时间戳
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    this.setData({
      timestamp: timestamp
    })

    wx.setStorage({
      key: "userInfo",
      data: this.data
    })

    wx.navigateTo({
      url: '../coupon/coupon'
    });
  },

  /**
   * 重置表单
   */
  formReset: function () {
    this.setData({
      userName: '',
      mobileNumber: '',
      email: '',
      birthdate: '2000-01-01'
    })
    // console.log('form发生了reset事件')
  },

  /**
   * 用户名变动
   */
  nameChange: function (e) {
    if (e.detail.value.length == 0) {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.setData({
        userName: e.detail.value
      })
    }
  },

  /**
   * 手机号变动及校验
   * 电话号码证规则：
   * ^ 1 以数字1 开头
   * [3-578] 手机号第二位允许是 3 、4 、5、7、8 中的任意一位
   * \d{9} 任意9位数字组合
   * $ 只能以数字作为结尾
   */
  mobileNumberChange: function (e) {
    var phoneReg = /^1[3-578]\d{9}$/
    if (!phoneReg.test(e.detail.value)) {
      wx.showToast({
        title: '手机号不正确',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.setData({
        mobileNumber: e.detail.value
      })
    }
  },

  /**
   * 邮箱变动及校验
   * 邮箱验证规则：
   * 第一部分@第二部分
   * 第一部分 ： 由字母、数字、下划线、短线 - 、点号 . 组成
   * 第二部分： 域名，域名由字母、数字、短线 - 域名后缀组成
   */
  emailChange: function (e) {
    var mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if (!mailReg.test(e.detail.value)) {
      wx.showToast({
        title: '邮箱不正确',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.setData({
        email: e.detail.value
      })
    }
  },

  /**
   * 生日选择
   */
  birthdateChange: function (e) {
    this.setData({
      birthdate: e.detail.value
    })
  }
})