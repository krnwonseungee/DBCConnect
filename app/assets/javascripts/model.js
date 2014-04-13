List = function(){
  this.activeUsers = []
  this.idleUsers = []
  this.inactiveUsers = []
}
List.prototype = {
  update: function(){
    list.getActiveUsers();
  },
  
  getActiveUsers: function(){
    $.ajax({
      type: "get",
      url: "/users/active",
      dataType: "json"
    }).done(function(serverData){
      list.activeUsers = serverData.activeUsers.map($.parseJSON)
    })
  },

  addUser: function(){},
  removeUser: function(){}
}
list = new List

User = function(){
  name = ""
  id = null
}
User.prototype = {
  update: function(){
  }


}