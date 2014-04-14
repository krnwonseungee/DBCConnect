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
    // view.renderList()
  },

  bindEvents: function(){
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
    })
  },

  setPairingMode: function(node){
    if (node.attributes.class.value === "active"){
      var wantedStatus = false
    }else{
      var wantedStatus = true
    }
    $.ajax({
      type: "put",
      url: "/users/" + user.id,
      data: { user: {active: wantedStatus} }
    }).done(function(serverData){})
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
  controller = new Controller;
  controller.getUserDetails();
  controller.initialize();
  controller.bindEvents();
  searchResultsController = new SearchResults.Controller();
  // console.log(searchResultsController)
  searchResultsController.bindSearchbarEvent();

  controller = new BootMap.Controller
  view = new BootMap.View(controller)
  controller.view = view
  controller.fetchUsers()
  controller.initializeMap(30.5, -118.5, 4)
  view.drawMap()


}


