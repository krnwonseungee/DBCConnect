Controller = function(view){
  this.view = view;
}

Controller.prototype = {
  initialize: function(){
    var view = this.view;

    this.getQuotes();
    this.bindDomEvents();
    view.setupMenuToResponsive();
    view.showHelpPopups();
    setInterval(this.refreshList.call(this), 2003);
    this.createMap();
  },

  getQuotes: function(){
    var view = this.view;
    $.ajax({
      type: "get",
      url: "/quotes",
      dataType:"json"
    }).done(function(quote){
      view.showQuote(quote)
    })
  },

  setUser: function(user) {
             this.loggedUser = user;
             this.view.refreshActiveIcon(this);
             this.view.showLoggedUser(this);
             this.updatePairingMode();
           },

  refreshList: function(){
    $.ajax({
      type: "get",
      url: "/users/active",
      dataType: "json"
    }).done(function(serverData){
      list.activeUsers = serverData.activeUsers.map($.parseJSON)
    })
    this.view.renderList()
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
    $("#logout").on("click", function(e){
      e.preventDefault();
      controller.loggedUser.activeState = false;
      controller.updatePairingMode();
      controller.updatePairingTables();
      location.href = "/"
    });
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
    $("#submit-search").on("click", function(e){
      e.preventDefault();
      navigationController.searchBarSubmit();
    });

    $(document).on("click", '.profile-link', function(e){
      e.preventDefault();
      var userId = e.target.id
      navigationController.requestShowUserProfile(userId);
    });

    $(document).on("click", '.edit-profile-link', function(e){
      e.preventDefault();
      var userId = e.target.id
      navigationController.requestEditUserProfile(userId);
    });

    $(document).on("click", '#update-submit', function(e){
      e.preventDefault();
      navigationController.submitEditUserProfile();
    });

    $("#logo").on("click", function(e){
      e.preventDefault();
      view.renderMap();
    });

    $(document).on("click", '#close-pop-up', function(e){
      e.preventDefault();
      view.hidePartial(e);
    })
  },

  updatePairingTables: function(){
    $.ajax({
      url: "/pairings/" + controller.loggedUser.pairing_id,
      type: "delete"
    })
  },

  setPairingMode: function(node){
    if ($("#availability").children().children().attr("class") === "active"){
      controller.loggedUser.activeState = false
    }else{
      controller.loggedUser.activeState = true
    }
    controller.updatePairingMode();
  },

  updatePairingMode: function(){
                       var controller = this;
                       if (!controller.loggedUser || !controller.loggedUser.id) return;
    this.togglePinging();
    $.ajax({
      type: "put",
      url: "/users/" + controller.loggedUser.id,
      data: { user: {active: controller.loggedUser.activeState} }
    }).done(function(serverData){})
  },

  togglePinging: function(){
    if (this.loggedUser.activeState){
      controller.pinger = setInterval(function(){controller.pinging()}, 5000)
    }else{
      clearInterval(this.pinger);
      this.pinger = 0;
    }
  },

  askToPairWithUser: function(id){//this will be used to create a popup to confirm
    this.makeUserInactive();
    view.showGoogleHangoutButtonRequestor();
    controller.sendPairingRequest(id);
  },

  makeUserInactive:function(){
    this.loggedUser.activeState = false;
    this.togglePinging();
    view.refreshActiveIcon(this);
  },

  sendPairingRequest: function(id){
    //corresponds with route /requests  CREATE
    $.ajax({
      type: "post",
      url: "/requests",
      data: {responder_id: id},
      dataType: "json"
    }).done(function(serverData){
      controller.loggedUser.request_id = serverData.request_id;
      controller.loggedUser.pairing_id = serverData.pairing_id;
    })
  },

  createMap: function(){
               if (!this.view.mapElement) return;
    map_controller = new BootMap.Controller
    map_view = new BootMap.View(map_controller, this.view)
    map_controller.view = map_view
    map_controller.fetchUsers()
    map_controller.initializeMap(37.769, -70.429, 3)
    map_view.drawMap()
  }
}

$(function(){
  var view = new View({ mapSelector: "#map" }),
    navigationController = new NavigationController,
    controller = new Controller(view),
    userFetcher = new UserDataFetcher(controller).fetch();

  controller.initialize();
});

