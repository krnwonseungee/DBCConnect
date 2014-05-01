Pairlist.UserListPoller = function(notifier, opts) {
  this.DEFAULT_UPDATE_LIST_QUERY_TIME = 2003;
  this.notifier = notifier;
  this.opts = opts;
  if (!opts) this.opts = {};
}

Pairlist.UserListPoller.prototype = {
  poll: function(){

    var cb,
    pollUrl = "/users/active",
    poller = this;

    $.ajax({
      url: pollUrl,
    }).done(function(serverData){
      poller.defaultDoneCallback.apply(poller, [serverData]);
    })
  },

  defaultDoneCallback: function(serverData) {
    var userClass = this.opts.userClass || User,
    users = serverData.activeUsers.map(function(userJson) {
      return new userClass(userJson);
    }),
    pollInterval = this.opts.pollInterval ||
      this.DEFAULT_UPDATE_LIST_QUERY_TIME,
    poller = this;

    this.notifier.updateActiveUsers(users);

    if (this.opts.doNotPollForUpdate ||
        this.interval) return;
      this.interval = setInterval(function() {
        poller.poll();
      }, pollInterval);
  },

  stop: function() {
    clearInterval(this.interval);
  },

  resume: function () {
    var pollInterval = this.opts.pollInterval || this.DEFAULT_UPDATE_LIST_QUERY_TIME;

    this.interval = setInterval(function() {
      poller.poll();
    }, pollInterval);
  }
};
