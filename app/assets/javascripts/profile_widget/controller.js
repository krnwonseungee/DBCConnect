ProfileWidget.Controller = function(view, opts) {
  if (!opts) opts = {};

  this.view = view;
  this.userBearer = opts.userBearer || applicationController;
};

ProfileWidget.Controller.prototype = {
  initializeEventBindings: function () {
    this.view.delegate = this;
    this.view.draw(this);
  },

  shouldDisplayPartial: function () {
    return this.displayProfile
  },

  closeProfile: function () {
    this.displayProfile = false;
    this.view.draw(this);

  },

  submitEditProfileData: function (formData) {
    var controller = this,
    loggedInUser = this.userBearer.getUser();

    $.ajax({
      type: "put",
      url: "/users/" + loggedInUser.id,
      data: formData
    }).done(function(userPartial){
      controller.clickedOnUsernameWidget();
    });
  },

  displayEditProfileForm: function () {
    this.displayProfile = true;
    this._fetchUserEditPage()

  },

  clickedOnUsernameWidget: function () {
    this.displayProfile = true;
    this._fetchUserProfile();
  },

  _fetchUserEditPage: function () {
    var controller = this,
    loggedInUser = this.userBearer.getUser();

    if (!loggedInUser || !loggedInUser.id) return;

    $.ajax({
      url: "/users/" + loggedInUser.id + '/edit',
    }).done(function(userPartial){
      controller.partial = userPartial;
      controller.view.draw(controller);
    })
  },

  _fetchUserProfile: function () {
    var controller = this,
    loggedInUser = this.userBearer.getUser();

    if (!loggedInUser || !loggedInUser.id) return;

    $.ajax({
      url: "/users/" + loggedInUser.id,
    }).done(function(userPartial){
      controller.partial = userPartial;
      controller.view.draw(controller);
    })
  }
};

