ProfileWidget.View = function(opts){
  if (!opts) opts = {};
  this.selector = opts.sel || '#container';
  this.templateSelector = opts.templateSelector || '#user-popup';
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

