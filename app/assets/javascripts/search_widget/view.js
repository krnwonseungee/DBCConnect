SearchWidget.View = function(opts){
  if (!opts) opts = {};
  this.selector = opts.sel || '#container';
};

SearchWidget.View.prototype = {
  draw: function(controller) {
          var $sel,
            controller = controller;

          if (!this.alreadyInitializedBindings) this._initBindings(controller);

          $sel = $(this.selector)
            .empty()
            .html(controller.partial)
            .find("#close-pop-up")
              .on('click', function () {
                controller.closeSearchResults();
              })
              .end();

          if (controller.shouldDisplay) {
            $sel.show();
          } else {
            $sel.hide();
          }
        },

  _initBindings: function (delegate) {
                  this.alreadyInitializedBindings = true;
                  var delegate = delegate
                  $("#searchbar")
                    .find("#search-input")
                    .on('keyup', function(e) {
                      if (e.keyCode == jQuery.ui.keyCode.ENTER) {
                        delegate.searchBarSubmit($("#search-input").val());
                      }
                    })
                  .end()
                    .find("button")
                    .on('click', function (e) {
                      e.preventDefault();
                      delegate.searchBarSubmit($("#search-input").val());
                    });
                }
};

