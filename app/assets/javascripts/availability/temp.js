AvailabilityWidget.Controller = function (view, pairListWidget) {
  this.view = view;
  this.pairListWidget = pairListWidget;

  this.isAvailable = false;
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
                this.pairListWidget._loggedInUser().markAsUnavailable(this, this.init);
                this.isAvailable = false;
              },

  _toggleOn: function () {
               console.log('toggle on');
               this.pairListWidget._loggedInUser().markAsAvailable(this, this.init);
               this.isAvailable = true;
             },
};

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
