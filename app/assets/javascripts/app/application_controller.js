Application.Controller = function(view){
  this.view = view;
  this.notifiedOnUserUpdate = [];
  this.displayUserProfile = false;
}

Application.Controller.prototype = {
  setUser: function(user) {
             this.loggedUser = user;
             this._processNotifications();
           },

  getUser: function () {
             return this.loggedUser;
           },

  logOutUser: function () {
                this.loggedUser = null;
                location.href = "/"
              },

  setUserAsAvailable: function () {
                          this._updateUserPairingWillingnessStatus('/users/mark_willing_to_pair');
                      },

  setUserAsUnavailable: function () {
                          this._updateUserPairingWillingnessStatus('/users/mark_unwilling_to_pair');
                        },


  registerUserDependentController: function (aController, cbName) {
                                     this.notifiedOnUserUpdate.push([ aController, cbName ]);
                                     aController[cbName].apply(aController, [this]);
                                   },

  _updateUserPairingWillingnessStatus: function (url) {
                                         var c = this,
                                           loggedUser = this.getUser();

                                         $.post(url, { user_id: loggedUser.user_id }, function (data) {
                                           loggedUser.active = data.active;
                                           c.setUser(loggedUser);
                                         });
                                       },

  _processNotifications: function () {
                           var appController = this;
                           this.notifiedOnUserUpdate.forEach(function (callbackPair) {
                             var aController = callbackPair[0],
                             cbName = callbackPair[1];
                           aController[cbName].apply(aController, [appController]);
                           });
                         }
}
