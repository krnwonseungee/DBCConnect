//controller
Controller = function(){}
Controller.prototype = {
  initialize: function(){
    view.setupMenuToResponsive();
    view.showHelpPopups();
    // controller.initializePairingIcon();
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

  pinging: function(){
      $.ajax({
        type: "get",
        url: "/requests",
        dataType: "json"
      }).done(function(serverData){
        console.log(serverData)
      })
  },

  bindDomEvents: function(){
    $("#activeUsersList").on("click", "a", function(e){
      e.preventDefault();
      clickedUserId = e.target.parentElement.id;
      controller.askTopairWithUser(clickedUserId);
    });
    $("#availability").on("click", function(e){
      e.preventDefault();
      var node = e.target.parentElement;
      controller.setPairingMode(node);
      view.toggleActiveIcon(node);
    });
  },

  setPairingMode: function(node){
    if (node.attributes.class.value === "active"){
      user.active = false
      var wantedStatus = false
      controller.togglePinging();
    }else{
      user.active = true
      var wantedStatus = true
      controller.togglePinging();
    }
    $.ajax({
      type: "put",
      url: "/users/" + user.id,
      data: { user: {active: wantedStatus} }
    }).done(function(serverData){})
  },

  togglePinging: function(){
    if (user.active){
      controller.pinger = setInterval(function(){controller.pinging}, 900)
    }else{
      clearInterval(controller.pinger);
    }
  },

  askTopairWithUser: function(id){//this will be used to create a popup to confirm
    view.showPairingPopup();
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
    })
  },

  getUserDetails: function(){
    $.ajax({
      type: "get",
      url: "/welcome/getuser"
    }).done(function(serverData){
      user = new User;
      user.id = serverData.user_id;
      user.active = serverData.active;
      user.name = serverData.name;
    })
  }
}

window.onload = function(){
  view = new View
  controller = new Controller;
  controller.getUserDetails();
  controller.initialize();
  controller.bindDomEvents();

  map_controller = new BootMap.Controller
  map_view = new BootMap.View(map_controller)
  map_controller.view = map_view
  bootlist = map_controller.fetchUsers()
  map_controller.initializeMap(30.5, -10.5, 3)
  map_view.drawMap()
  console.log("you've loaded new production code")
}


