import { getSetting, chooseAddress, openSetting, showModal, showToast, requestPayment } from "../../utils/asyncWx.js";
import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[],
    cart:[],
    totalPrice:0,
    totalNum:0
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
    //1 获取缓存收获地址信息
    const address = wx.getStorageSync("address");
    //1 获取缓存中购物车数据 
    let cart = wx.getStorageSync("cart")|| [];
    // 过滤后的购物车数组
    cart = cart.filter((item)=>{item.checked})
    this.setData({address})
    console.log(address);
    console.log(cart)

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach((item)=>{
      totalPrice += item.num * item.goods_price;
      totalNum += item.num;
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },
  async handleOrderPay(){
    try {
      
    } catch (error) {
      await showToast({title:'支付失败'})
      console.log(error);
      
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
  onShareAppMessage: function () {

  }
})