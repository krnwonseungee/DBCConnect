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

  profilenameClicked: function () {
                        this.displayUserProfile = true;
                        this._processNotifications();

                      },

  closeProfile: function () {
                  this.displayUserProfile = false;
                  this._processNotifications();
                },

  registerUserDependentController: function (aController, cbName) {
                                     this.notifiedOnUserUpdate.push([ aController, cbName ]);
                                     aController[cbName].apply(aController, [this]);
                                   },

  _processNotifications: function () {
    this.notifiedOnUserUpdate.forEach(function (callbackPair) {
      var aController = callbackPair[0],
        cbName = callbackPair[1];
      aController[cbName].apply(aController, [this]);
    });
  }
}
