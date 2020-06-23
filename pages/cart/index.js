import { getSetting, chooseAddress, openSetting, showModal ,showToast} from "../../utils/asyncWx.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
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
    
    let address = wx.getStorageInfoSync("address");
    let cart = wx.getStorageSync("cart") || [];
    this.setData({address})
    this.setCart(cart) 
  },
  async handleChooseAddress(){
    try {
      // 1 获取权限
        const res1 = await getSetting();
        // authSetting 用户授权结果 
        // subscriptionsSetting 用户订阅消息设置，接口参数withSubscriptions值为true时才会返回
        const scopeAddress = res1.authSetting["scope.address"];
      // 2 判断权限状态
        if(scopeAddress == false){
          await openSetting();
        }
      // 4 调用获取收货地址 api
        let address = await chooseAddress();
        address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;

      // 5 存入到缓存中
        wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error)
    }
  },
  handleItemChange(e){
    console.log(e);
    const goods_id = e.currentTarget.dataset.id;
    let { cart } = this.data;
    let index = cart.findIndex((item) => item.goods_id == goods_id)
    cart[index].checked = !cart[index].checked;

    this.setCart(cart)

  },
  // 设置购物车状态同时 重新计算 底部工具栏的数据 全选 总价格 购买的数量
  setCart(cart){
    let allChecked = true
    // 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(item =>{
      if (item.checked) {
        totalPrice += item.num * item.goods_price;
        totalNum += item.num;
      }else{
        allChecked = false
      }
    })



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