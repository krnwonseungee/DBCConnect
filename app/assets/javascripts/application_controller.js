Application.Controller = function(view){
  this.view = view;
}

Application.Controller.prototype = {
  setUser: function(user) {
             this.loggedUser = user;
             this.view.refreshActiveIcon(this);
           },

  getUser: function () {
             return this.loggedUser;
           },

  logOutUser: function () {
                this.loggedUser = null;
                location.href = "/"
              }
}
