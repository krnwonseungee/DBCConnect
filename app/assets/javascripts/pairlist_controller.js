Pairlist.Controller = function(opts) {
  if (opts.doNotCreatePoller) return;
  this.retriever = new Pairlist.UserListPoller(this, opts.retrieverOpts);
};

Pairlist.Controller.prototype = {
  init: function() {
          this.retriever.retrieve();
          return this;
        },

  updateActiveUsers: function(userList) {
                       this.pairableNames = userList;
                     },

  stopPolling: function() {
                 this.retriever.stopPolling();
               }
};
