AvailabilityWidget.Controller = function (view) {
  this.view = view;
  this.isAvailable = true;
};

AvailabilityWidget.Controller.prototype  = {
  init: function () {
    this.view.draw(this);
  },

  toggleButtonClicked: function () {
                         if (this.isAvailable) {
                           this._toggleOff();
                         } else {
                           this._toggleOn();
                         }
                       },

  _toggleOff: function () {
                console.log('toggle off');
                this.isAvailable = false;
              },

  _toggleOn: function () {
               console.log('toggle on');
               this.isAvailable = true;
             },
};

AvailabilityWidget.View = function (opts) {
  if (!opts) opts = {};
  this.sel = opts.sel || "#availability";
  this.initialized = false;
};

AvailabilityWidget.View.prototype = {
  setEventDelegate: function (delegate) {
                      this.delegate = delegate;
  },

  initEvents: function () {
                var delegate = this.delegate;
                $(this.sel).on('click', function () {
                  delegate.toggleButtonClicked();
                });
  },

  draw: function (src) {
          if (!this.initialized) this.initEvents();
          if (src.isAvailable) {
            $(this.sel).addClass('active');
          } else {
            $(this.sel).addClass('inactive');
          }
  }
};
