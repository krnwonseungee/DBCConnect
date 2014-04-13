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
  },

  bindEvents: function(){
    $("#activeUsersList").on("click", "a", function(e){
      e.preventDefault();
      clickedUserId = e.target.parentElement.id;
      controller.askTopairWithUser(clickedUserId);
    })
  },

  askTopairWithUser: function(id){
    view.showPairingPopup(id);
    controller.sendPairingRequest(id);
  },

  sendPairingRequest: function(id){
    //corresponds with route /requests  CREATE
    $.ajax({
      type: "post",
      url: "/requests",
      data: {responder_id: id},
      dataType: "json"
    }).done(function(serverData){
      debugger
    })
  }
}

$(document).ready(function(){
  controller = new Controller;
  controller.initialize();
  controller.bindEvents();
})


