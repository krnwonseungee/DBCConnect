AvailabilityWidget.View = function (opts) {
  if (!opts) opts = {};
  this.sel = opts.sel || "#availability span";
  this.initialized = false;
};

AvailabilityWidget.View.prototype = {
  setEventDelegate: function (delegate) {
                      this.delegate = delegate;
  },

  initEvents: function () {
                var delegate = this.delegate;
                $(this.sel).on('click', function (e) {
                  e.stopPropagation();
                  delegate.toggleButtonClicked();
                });
  },

  draw: function (src) {
          var activityElement = this._element();
          if (!this.initialized) {
            this.initialized = true;
            this.initEvents();
          }
          if (src.isAvailable) {
            activityElement.addClass('active').removeClass('inactive');
          } else {
            activityElement.removeClass('active').addClass('inactive');
          }
  },

  _element: function () {
    return $(this.sel);
  }
};

