ProfileWidget.Controller = function(view) {
  this.view = view;
};

ProfileWidget.Controller.prototype = {
  draw: function(userBearer) {
          this.displayProfile = userBearer.displayUserProfile;

          if (this.partial) {
            this.view.draw(this);
          } else {
            this._fetchProfilePartial(userBearer);
          }
        },

  shouldDisplayPartial: function () {
    return this.displayProfile
  },

  _fetchProfilePartial: function (userBearer) {
                          var controller = this,
                            loggedInUser = userBearer.getUser();

                          if (!loggedInUser || !loggedInUser.id) return;

                          $.ajax({
                            url: "/users/" + loggedInUser.id,
                          }).done(function(userPartial){
                            controller.partial = userPartial;
                            controller.draw(userBearer);
                          })
                        }

};

