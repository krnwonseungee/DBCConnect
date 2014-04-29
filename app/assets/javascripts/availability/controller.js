AvailabilityWidget.Controller = function (view) {
  this.view = view;
};

AvailabilityWidget.Controller.prototype  = {
          this._determineAvailability(userBearer);
  draw: function (userBearer) {
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
                this._loggedInUser().markAsUnavailable(this, this.draw);
                this.isAvailable = false;
              },

  _toggleOn: function () {
               this._loggedInUser().markAsAvailable(this, this.draw);
               this.isAvailable = true;
             },

  _loggedInUser: function () {
                   return applicationController.getUser();

  },

  _determineAvailability: function (userBearer) {
                            if (!userBearer ||
                                !userBearer.getUser()) return false;
                            this.isAvailable = userBearer.getUser().active;
  }
};
