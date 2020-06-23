import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList:[],
    rightContent:[],
    // 当前点击菜单
    currentIndex:0,
    // 右侧内容滚动条距离顶部距离
    scrollTop:0
  },
  //接口返回数据
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCates()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const Cates = wx.getStorageSync("cates");
    console.log(Cates)
    if (!Cates) {
      this.getCates()
    }else{
      if (Date.now() - Cates.time >1000 * 10) {
        this.getCates()
      } else {
        //可使用旧数据
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  async getCates(){
    const res = await request({url:'/categories'});
    console.log(res,'接口');
    this.Cates = res
    wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
    //左侧
    let leftMenuList = this.Cates.map(item=>{
      return item.cat_name
    })
    console.log(leftMenuList);
    //右侧
    let rightContent = this.Cates[0].children;
    console.log(rightContent);
    this.setData({
      leftMenuList,
      rightContent
    })

  },
  handleItemTap(e){//点击左侧列表右侧滚动
    const { index } = e.currentTarget.dataset;
    //点击左侧对应菜单 右侧改变对应索引下的child值
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop:0
    })
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