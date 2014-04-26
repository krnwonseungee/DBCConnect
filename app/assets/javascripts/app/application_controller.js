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
                        this.profileDisplayMode = 'show';
                        this._processNotifications();
                      },

  displayEditProfileForm: function () {
                        this.displayUserProfile = true;
                        this.profileDisplayMode = 'edit';
                        this._processNotifications();
  },

  renderSearchResults: function (searchTerm) {
                        this.displayUserProfile = true;
                        this.profileDisplayMode = 'searchresults';
                        this.searchTerm = searchTerm;
                        this._processNotifications();
  },

  submitEditProfileData: function (formData) {
                           var controller = this;

                           $.ajax({
                             type: "put",
                             url: "/users/" + controller.loggedUser.id,
                             data: formData
                           }).done(function(userPartial){
                             controller.profilenameClicked();
                           });
  },

  closeProfile: function () {
                  this.displayUserProfile = false;
                  this._processNotifications();
                },

  renderEditPartial: function () {
                       this.displayUserProfile = true;
                       this.profileDisplayMode = 'edit';
                       this._processNotifications();
  },

  registerUserDependentController: function (aController, cbName) {
                                     this.notifiedOnUserUpdate.push([ aController, cbName ]);
                                     aController[cbName].apply(aController, [this]);
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
