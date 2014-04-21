function Binder(opts) {
  this.controller = opts.controller;
}

Binder.prototype.bind = function() {
  var controller = this.controller;

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
}
