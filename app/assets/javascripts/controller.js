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
           },

  logOutUser: function() {
                this.loggedUser = null;
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
