//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    changeColor: "change-show",
    changedColor: "changed-show",
    addMore: false,
    showDone: false,
    resetData: "",
    todo:[
    ]
  },
  onHide() {
    wx.setStorage({
      key: 'todo',
      data: this.data.todo,
    })
  },
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
  handleBlur(res){
    this.addTodo(res)
  },
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
  radioChange(res) {
    console.log(res)
  },
  addNew(res) {
    this.setData({
      addMore:true
    })
  },
  checkboxChange(res) {
    var haveDone = res.detail.value[0]
    this.doneItem(res.detail.value[0])
  },
  doneItem(itemIndex) {
    var newList = this.data.todo
    if (newList[itemIndex]){
      newList[itemIndex] = {
        message: newList[itemIndex].message,
        done: true
      }
      this.setData({
        todo: newList
      })
    }
  },
  changeShow(res) {
  
    var color = this.data.changeColor
    var change = this.data.changedColor
    this.setData({
      changeColor:change,
      changedColor:color,
      showDone: !this.data.showDone
    })
  },
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
