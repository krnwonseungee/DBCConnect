Pairlist.Controller = function(view, opts) {
  this.view = view;
  this.retriever = new Pairlist.UserListPoller(this, opts.retrieverOpts);
  this.pairableUsers = [];
  this.loggedInUserBearer = opts.loggedInUserBearer || applicationController;
};

Pairlist.Controller.prototype = {
  init: function() {
          this.retriever.retrieve();
          return this;
        },

  updateActiveUsers: function(userList) {
                       this.pairableUsers = this._userListSansLoggedInUser(userList);
                       this._updateView();
                     },

  getUserList: function() {
                return this.pairableUsers;
              },

  stopPolling: function() {
                 this.retriever.stopPolling();
               },

  _updateView: function() {
                 this.view.draw(this);
               },

  requestHangoutSession: function(id){
    this.sendPairingRequest();
  },

  makeUserInactive: function(){
                      this.loggedUser.activeState = false;
                      this.togglePinging();
                      view.refreshActiveIcon(this);
                    },

  sendPairingRequest: function(){
                          /* we need to have the logged in user here... */
                          console.log('send da request once we know the user');
                          return;
                          $.ajax({
                            type: "post",
                            url: "/requests",
                            data: {responder_id: id},
                          }).done(function(serverData){
                            controller.loggedUser.request_id = serverData.request_id;
                            controller.loggedUser.pairing_id = serverData.pairing_id;
                          })
  },

  displayPairingPrompt: function(id) {
                          this.markMyselfAsUnavailable(id);
                          this.view.showGoogleHangoutButtonRequestor(this);
                        },

  markMyselfAsAvailable: function(id){
                           var controller = this,
                             postUpdateCallback = function() {
                               this.init();
                             };

                           this.pairableUsers.forEach(function(user) {
                             if (user.id === id) {
                               user.markAsAvailable(controller, postUpdateCallback);
                             }
                           });
    this._updateView();
  },

  markMyselfAsUnavailable: function(id){
                           var controller = this,
                             postUpdateCallback = function() {
                               this.init();
                             };

                           this.pairableUsers.forEach(function(user) {
                             if (user.id === id) {
                               user.markAsUnavailable(controller, postUpdateCallback);
                             }
                           });
    this._updateView();
  },

  _userListSansLoggedInUser: function (userList) {
                               var controller = this;
                               return userList.reduce(function (memo, user) {
                                 if (user.id != controller._loggedInUser().id) memo.push(user);
                                 return memo;
                               }, []).sort(function (a, b) {
                                 return a.name.localeCompare(b.name);
                               });
  },

  _loggedInUser: function () {
    return this.loggedInUserBearer.getUser();
  },
};
