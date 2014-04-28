Pairlist.Controller = function(view, opts) {
  this.view = view;
  this.retriever = new Pairlist.UserListPoller(this, opts.retrieverOpts);
  this.requestRetriever = new Pairlist.PairingRequestPoller(this);
  this.pairableUsers = [];
  this.loggedInUserBearer = opts.loggedInUserBearer || applicationController;
};

Pairlist.Controller.prototype = {
  init: function() {
          this.retriever.retrieve();
          this.requestRetriever.retrieve();
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
    this.sendPairingRequest(id);
  },

  processPairingRequestData: function (serverData) {
                               var requestorId = serverData.requestor_id;
                               if (serverData.found) {
                                 this.addRequest(serverData);
                                 this.askForHangoutUrlPinger();
                               }
  },

  currentPairingRequest: function () {
    return this.activeRequest;
  },

  askForHangoutUrlPinger: function(){
                            debugger;
                            var requestorId = this.currentPairingRequest().requestorId,
                              controller = this,
                              view = this.view;

                            this.hangoutUrlPinger = setInterval(function(){
                              $.ajax({
                                type: "get",
                              url: "/pairings/get_url/" + requestorId,
                              dataType: "json"
                              }).done(function(serverData){
                                if (serverData.success){
                                  view.showGoogleHangoutButtonResponder(serverData.hangout_url);
                                  clearInterval(controller.hangoutUrlPinger);
                                  controller.hangoutUrlPinger = 0;
                                }
                              })
                            }, 833);
                          },


  makeUserInactive: function(){
                      this.loggedUser.activeState = false;
                      this.togglePinging();
                      view.refreshActiveIcon(this);
                    },

  sendPairingRequest: function(id){
                        var controller = this;
                          $.ajax({
                            type: "post",
                            url: "/requests",
                            data: {responder_id: id},
                          }).done(function(serverData){
                            console.log('Request sent!');
                            //controller.addRequest(serverData);
                          })
  },

  addRequest: function(requestJSON) {
                this.activeRequest = new Pairlist.Request(requestJSON);
              },

  removeActiveRequest: function () {
                         this.activeRequest = null;
  },

  displayPairingPrompt: function(idToPairWith) {
                          this._loggedInUser().markAsUnavailable();
                          this.view.showGoogleHangoutButtonRequestor(this, idToPairWith);
                        },

  markMyselfAsUnavailable: function() {
                             this._loggedInUser().markAsUnavailable();
                           },

  markMyselfAsAvailable: function() {
                           this._loggedInUser().markAsAvailable();
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
