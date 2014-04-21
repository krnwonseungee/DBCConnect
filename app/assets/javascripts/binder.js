function Binder(opts) {
  this.opts = opts;
  this.controller = opts.controller;
}

Binder.prototype.bind = function() {
  var controller = this.controller,
      opts = this.opts.selectorOptions;

  $(opts.logoutSelector).on("click", function(e){
    e.preventDefault();
    controller.logOutUser();
  });


  $(opts.clickableUserNameSelector).on("click", "a", function(e){
    clickedUserId = e.target.parentElement.id;
    controller.askToPairWithUser(clickedUserId);
  });

  $(opts.availabilityToggleSelector).on("click", function(e){
    e.preventDefault();
    var node = e.target.parentElement;
    controller.setPairingMode(node);
    view.toggleActiveIcon(node);
  });

  $(opts.searchSelector).on("click", function(e){
    e.preventDefault();
    navigationController.searchBarSubmit();
  });

  $(document).on("click", opts.showProfileSelector, function(e){
    e.preventDefault();
    var userId = e.target.id
    navigationController.requestShowUserProfile(userId);
  });

  $(document).on("click", opts.editProfileSelector, function(e){
    e.preventDefault();
    var userId = e.target.id
    navigationController.requestEditUserProfile(userId);
  });

  $(document).on("click", opts.profileUpdateSelector, function(e){
    e.preventDefault();
    navigationController.submitEditUserProfile();
  });

  $(opts.logoSelector).on("click", function(e){
    e.preventDefault();
    view.renderMap();
  });

  $(document).on("click", opts.closePopupSelector, function(e){
    e.preventDefault();
    view.hidePartial(e);
  })
}
