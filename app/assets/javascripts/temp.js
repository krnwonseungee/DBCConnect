Application.LoggedInUserNameView = function(opts) {
  if (!opts) opts = {};
  this.selector = opts.sel || '.logged_user';
  this.eventDelegate = opts.sel || applicationController;
}

Application.LoggedInUserNameView.prototype = {
  draw: function(userBearer) {
          var user = userBearer.getUser(),
            view = this;

          if (!user || !user.name || !user.user_id) return;
          
          $(this.selector)
            .first()
            .text(user.name)
            .attr('id', user.user_id)
            .on('click', function () {
              view.eventDelegate.profilenameClicked(view);
            });
        }
};

