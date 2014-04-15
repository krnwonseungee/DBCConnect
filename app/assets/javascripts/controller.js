//controller
Controller = function(){}
Controller.prototype = {
  initialize: function(){
    view.setupMenuToResponsive();
    view.showHelpPopups();
    // controller.initializePairingIcon();
    setInterval(this.refreshList, 2000);
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
      debugger
      if (serverData.found){
        controller.makeUserInactive();
        controller.togglePinging();
        view.showGoogleHangoutButtonResponder(serverData.hangout_url);
      }
    })
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
      debugger
      controller.pinger = setInterval(function(){controller.pinging()}, 5000)
    }else{ 
      clearInterval(controller.pinger); 
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

window.onload = function(){
  controller = new Controller;
  controller.getUserDetails();
  view = new View
  controller.initialize();
  controller.bindDomEvents();

  map_controller = new BootMap.Controller
  map_view = new BootMap.View(map_controller)
  map_controller.view = map_view
  map_controller.fetchUsers()
  map_controller.initializeMap(30.5, -10.5, 3)
  map_view.drawMap()
}


