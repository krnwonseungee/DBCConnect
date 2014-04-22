Pairlist.Controller = function(view, opts) {
  this.view = view;
  this.retriever = new Pairlist.UserListPoller(this, opts.retrieverOpts);
  this.pairableUsers = [];
};

Pairlist.Controller.prototype = {
  init: function() {
          this.retriever.retrieve();
          return this;
        },

  updateActiveUsers: function(userList) {
                       this.pairableUsers = userList;
                     },

  getUserList: function() {
                // we should make sure not to show the user the user's
                // name
                return this.pairableUsers;
              },

  stopPolling: function() {
                 this.retriever.stopPolling();
               }
};
