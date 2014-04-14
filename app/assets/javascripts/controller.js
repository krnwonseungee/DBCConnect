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
// where is this list defined?  What's it a list of?  Why isn't the controller
// mediating this update?  Wouldn't it be nicer to say
//
// controller.updateActiveUsers(serverData);
//
// ?
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
    // Waits, so you have an aja call but then don't do anything with the
    // response?  :-/
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
      // Wait, why is this a view responsibility.  A controller method should mediate this.
      view.showPairingPopup(id);
    })
  },

  getUserDetails: function(){
    $.ajax({
      type: "get",
      url: "/welcome/getuser"
    }).done(function(serverData){
      // Again, let the controller interpret this for you
      user = new User;
      user.id = serverData.user_id;
      user.active = serverData.active;
      user.name = serverData.name;
    })
  }
}

// Seems like a solid framework, just needs to have responsibility shared
// better.
window.onload = function(){
  view = new View
  controller = new Controller;
  controller.getUserDetails();
  controller.initialize();
  controller.bindDomEvents();

  map_controller = new BootMap.Controller
  map_view = new BootMap.View(map_controller)
  map_controller.view = map_view
  map_controller.fetchUsers()
  map_controller.initializeMap(30.5, -10.5, 3)
  map_view.drawMap()
}


