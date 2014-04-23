Application.Controller = function(view){
  this.view = view;
}

Application.Controller.prototype = {
  setUser: function(user) {
             this.loggedUser = user;
             this.view.refreshActiveIcon(this);
             this.view.showLoggedUser(this);
           },

  logOutUser: function() {
                this.loggedUser = null;
                location.href = "/"
              }
}
