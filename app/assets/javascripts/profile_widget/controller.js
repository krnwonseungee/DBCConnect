ProfileWidget.Controller = function(view) {
  this.view = view;
};

ProfileWidget.Controller.prototype = {
  draw: function(userBearer) {
          this.displayProfile = userBearer.displayUserProfile;

          this._fetchProfilePartial(userBearer);
        },

  shouldDisplayPartial: function () {
    return this.displayProfile
  },

  _fetchProfilePartial: function (userBearer) {
                          var controller = this,
                            loggedInUser = userBearer.getUser();

                          if (!loggedInUser || !loggedInUser.id) return;

                          if (userBearer.profileDisplayMode === 'show') {
                            $.ajax({
                              url: "/users/" + loggedInUser.id,
                            }).done(function(userPartial){
                              controller.partial = userPartial;
                              controller.view.draw(controller);
                            })
                          }

                          if (userBearer.profileDisplayMode === 'edit') {
                            $.ajax({
                              url: "/users/" + loggedInUser.id + '/edit',
                            }).done(function(userPartial){
                              controller.partial = userPartial;
                              controller.view.draw(controller);
                            })
                          }

                          if (userBearer.profileDisplayMode == 'searchresults') {
                            $.ajax({
                              type: "post",
                              url: "/users/results",
                              data: {pgsearch: userBearer.searchTerm}
                            }).done(function(searchResultsPartial){
                              controller.partial = searchResultsPartial;
                              controller.view.draw(controller);
                            })
                          }

                        }

};

