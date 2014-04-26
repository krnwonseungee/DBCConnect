ProfileWidget.View = function(opts){
  if (!opts) opts = {};
  this.selector = opts.sel || '#container';
};

ProfileWidget.View.prototype = {
  draw: function(userProfilePartialBearer) {
          var $sel,
            partial = userProfilePartialBearer.partial,
            delegate = this.delegate;

          $sel = $(this.selector)
            .empty()
            .html(partial)
            .find("#close-pop-up")
              .on('click', function () {
                delegate.closeProfile();
              })
              .end()
            .find(".edit-profile-link")
              .on('click', function (e) {
                e.preventDefault();
                delegate.displayEditProfileForm();
              })
              .end()
            .find("#update-submit")
              .on('click', function (e) {
                var data = $(this).parent("form").serialize();
                e.preventDefault();
                delegate.submitEditProfileData(data);
              })
              .end();

          if (userProfilePartialBearer.shouldDisplayPartial()) {
            $sel.show();
          } else {
            $sel.hide();
          }
        },

  setEventDelegate: function(d) {
                      this.delegate = d;
                    }
};

