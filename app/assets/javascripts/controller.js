// Find calls where we do stuff to view.....those are antipattern
Controller = function(view){
  this.view = view;
}

Controller.prototype = {
  handleQuote: function(quote) {
                 this.quote = quote;
                 this.view.showQuote(this);
               },

  setUser: function(user) {
             this.loggedUser = user;
             this.view.refreshActiveIcon(this);
             this.view.showLoggedUser(this);
             this.updatePairingMode();
           },

  logOutUser: function() {
                this.loggedUser = null;
                this.updatePairingMode();
                this.updatePairingTables();
                location.href = "/"
              },


  pinging: function(){
    $.ajax({
      type: "get",
      url: "/requests",
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
  }
}
