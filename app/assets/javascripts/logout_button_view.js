Application.LogoutButtonView = function(opts) {
  if (!opts) opts = {};
  this.sel = "#logout";
};

Application.LogoutButtonView.prototype = {
  draw: function (delegate) {
    var delegate = delegate;

    $(this.sel)
    .empty()
    .append('<a>Logout</a>')
    .on('click', function (e) {
      e.preventDefault();
      delegate.logOutUser();
    });
  }
};
