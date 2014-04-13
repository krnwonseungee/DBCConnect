//controller
Controller = function(){}
Controller.prototype = {
  initialize: function(){
    view.setupMenuToResponsive();
    setInterval(this.refreshList, 1000);
  },

  refreshList: function(){
    $.ajax({
      type: "get",
      url: "/users/active",
      dataType: "json"
    }).done(function(serverData){
      list.activeUsers = serverData.activeUsers.map($.parseJSON)
    })
    view.renderList()
  }
}

$(document).ready(function(){
  controller = new Controller;
  controller.initialize();
})


