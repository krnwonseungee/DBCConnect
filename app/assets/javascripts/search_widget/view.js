SearchWidget.View = function(opts){
  if (!opts) opts = {};
  this.selector = opts.sel || '#container';
};

SearchWidget.View.prototype = {
  draw: function(controller) {
          this._initBindings(controller);
        },

  _initBindings: function (delegate) {
                   debugger;
                  var delegate = delegate
                  $("#searchbar")
                    .find("#search-input")
                    .on('keyup', function(e) {
                      if (e.keyCode == jQuery.ui.keyCode.ENTER) {
                        delegate.searchBarSubmit();
                      }
                    })
                  .end()
                    .find("button")
                    .on('click', function (e) {
                      e.preventDefault();
                      delegate.searchBarSubmit();
                    });
                }
};

