AvailabilityWidget.Controller = function (view) {
  this.view = view;
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
                this._loggedInUser().markAsUnavailable(this, this.init);
                this.isAvailable = false;
              },

  _toggleOn: function () {
               this._loggedInUser().markAsAvailable(this, this.init);
               this.isAvailable = true;
             },

  _loggedInUser: function () {
                   return applicationController.getUser();

  }
};
