//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    doneNum: 0,
    target: false,
    changeColor: "change-show",
    changedColor: "changed-show",
    addMore: false,
    showDone: false,
    resetData: "",
    todo:[
    ]
  },
  // 离开程序将数据写入缓存
  onHide() {
    wx.setStorage({
      key: 'todo',
      data: this.data.todo,
    })
  },
  // 进入程序加载缓存
  onShow() {
    var todoStor = []
    try {
      todoStor = wx.getStorageSync('todo')
      todoStor = JSON.parse(todoStor)
        } 
    catch (e) {
        } 
    if(typeof(todoStor)!="object"){
      todoStor = []
    }
    this.setData({
      todo:todoStor
    })
  },
  // 添加数据
  handleBlur(res){
    this.addTodo(res)
  },
  // addMore暂无使用 input数据不能为空 添加数据
  addTodo(res) {
    var msg = res.detail.value
    if(msg){
        var newTodo = [{
          message: msg,
          done:false
          }]
        var allTodo = this.data.todo.concat(newTodo)
        this.setData({
          addMore: false,
          todo: allTodo,
          resetData: ""
      })
    }
    else{
      this.setData({
        addMore: false
      })
    }
  },

  addNew(res) {
    this.setData({
      addMore:true
    })
  },
  // 点击表示完成
  checkboxChange(res) {
    var haveDone = res.detail.value[0]
    this.doneItem(res.detail.value[0])
  },
  // 完成内容点击后通过数据index找到对象将done改为true表示完成
  doneItem(itemIndex) {
    var newList = this.data.todo
    if (newList[itemIndex]){
      newList[itemIndex] = {
        message: newList[itemIndex].message,
        done: true
      }
      this.setData({
        todo: newList,
        doneNum: this.data.doneNum+1,
        target:true
      })
    }
  },
  // 点击修改样式切换显示数据 在一个page根据点击不同展示不同数据
  changeShow(res) {
    var color = this.data.changeColor
    var change = this.data.changedColor
    this.setData({
      changeColor:change,
      changedColor:color,
      showDone: !this.data.showDone,
      doneNum: 0,
      target: false
    })
  },
  // 清空已完成数据 
  resetDone() {
    var done = this.data.todo
    var newTodo = []
    for (var i = 0; i < done.length; i++){
      var oneData=done[i].done
      if (!oneData){
        newTodo.push(done[i])
      }
    }
    this.setData({
      todo: newTodo
    })
  }
})
