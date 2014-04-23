Application.Controller = function(view){
  this.view = view;
}

Application.Controller.prototype = {
  handleQuote: function(quote) {
                 this.quote = quote;
                 this.view.showQuote(this);
               },

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
