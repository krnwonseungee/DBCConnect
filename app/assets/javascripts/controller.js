//controller
Controller = function(){}
Controller.prototype = {
  initialize: function(){
    view.setupMenuToResponsive();
    view.showHelpPopups();
    // controller.initializePairingIcon(); to be implemented
    setInterval(this.refreshList, 2003);
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

  pinging: function(){
    $.ajax({
      type: "get",
      url: "/requests",
      dataType: "json"
    }).done(function(serverData){
      if (serverData.found){
        controller.makeUserInactive();
        controller.togglePinging();
        controller.askForHangoutUrlPinger(serverData.requestor_id);
      }
    })
  },

  askForHangoutUrlPinger: function(requestor_id){
    controller.loggedUser.requestor_id = requestor_id
    controller.urlPinger = setInterval(function(){
      $.ajax({
        type: "get",
        url: "/pairings/get_url/" + controller.loggedUser.requestor_id,
        dataType: "json"
      }).done(function(serverData){
        if (serverData.success){
          view.showGoogleHangoutButtonResponder(serverData.hangout_url);
          clearInterval(controller.urlPinger);
          controller.urlPinger = 0;
        }
      })
    }, 833);
  },

  bindDomEvents: function(){
    $("#activeUsersList").on("click", "a", function(e){
      clickedUserId = e.target.parentElement.id;
      controller.askToPairWithUser(clickedUserId);
    });
    $("#availability").on("click", function(e){
      e.preventDefault();
      var node = e.target.parentElement;
      controller.setPairingMode(node);
      view.toggleActiveIcon(node);
    });
  },

  setPairingMode: function(node){
    if (node.attributes[0].value === "active"){
      controller.loggedUser.activeState = false
    }else{
      controller.loggedUser.activeState = true
    }
    controller.togglePinging();
    $.ajax({
      type: "put",
      url: "/users/" + controller.loggedUser.id,
      data: { user: {active: controller.loggedUser.activeState} }
    }).done(function(serverData){})
  },

  togglePinging: function(){
    if (controller.loggedUser.activeState){
      controller.pinger = setInterval(function(){controller.pinging()}, 5000)
    }else{
      clearInterval(controller.pinger);
      controller.pinger = 0;
    }
  },

  askToPairWithUser: function(id){//this will be used to create a popup to confirm
    controller.makeUserInactive();
    view.showGoogleHangoutButtonRequestor();
    controller.sendPairingRequest(id);
  },

  makeUserInactive:function(){
    controller.loggedUser.activeState = false;
    controller.togglePinging();
    view.refreshActiveIcon();
  },

  sendPairingRequest: function(id){
    //corresponds with route /requests  CREATE
    $.ajax({
      type: "post",
      url: "/requests",
      data: {responder_id: id},
      dataType: "json"
    }).done(function(serverData){})
  },

  getUserDetails: function(){
    $.ajax({
      type: "get",
      url: "/welcome/getuser"
    }).done(function(serverData){
      controller.loggedUser = new User;
      controller.loggedUser.id = serverData.user_id;
      controller.loggedUser.activeState = serverData.active;
      controller.loggedUser.name = serverData.name;
      view.showLoggedUser();
    })
  }
}

document.addEventListener('DOMContentLoaded', function(){
  view = new View
  controller = new Controller;
  controller.getUserDetails();
  controller.initialize();
  controller.bindDomEvents();

  if (!document.getElementById('map')) return;
  map_controller = new BootMap.Controller
  map_view = new BootMap.View(map_controller)
  map_controller.view = map_view
  map_controller.fetchUsers()
  map_controller.initializeMap(30.5, -10.5, 3)
  map_view.drawMap()
});


