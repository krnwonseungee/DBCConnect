List = function(){
  this.activeUsers = []
  this.idleUsers = []
  this.inactiveUsers = []
}
List.prototype = {
  update: function(){},
  addUser: function(){},
  removeUser: function(){}
}
list = new List

User = function(){
  name = ""
  id = null
}
User.prototype = {
  update: function(){}
}