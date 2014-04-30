Pairlist.PairingRequestPoller = function(notifier, opts) {
  this.DEFAULT_UPDATE_LIST_QUERY_TIME = 2003;
  this.notifier = notifier;
  this.opts = opts;
  if (!opts) this.opts = {};
};

Pairlist.PairingRequestPoller.prototype = {
  poll: function(opts){

    var cb,
      pollUrl = this.opts.pollUrl || "/requests",
      poller = this;

    $.ajax({
      url: pollUrl,
    }).done(function(serverData){
      if (cb = poller.opts.doneCallback) {
        cb.apply(poller, [serverData]);
      } else {
        poller.defaultDoneCallback.apply(poller, [serverData]);
      }
    })
  },

  defaultDoneCallback: function(serverData) {
                         var notifier = this.notifier;
                           pollInterval = this.opts.pollInterval ||
                             this.DEFAULT_UPDATE_LIST_QUERY_TIME,
                           poller = this;

                         notifier.processPairingRequestData(serverData);

                         if (this.opts.doNotPollForUpdate ||
                             this.interval) return;
                         this.interval = setInterval(function() {
                           poller.poll();
                         }, pollInterval);
                       },

  stop: function () {
          clearInterval(this.interval);
        },

  resume: function () {
            var pollInterval = this.opts.pollInterval || this.DEFAULT_UPDATE_LIST_QUERY_TIME;

            this.interval = setInterval(function() {
              poller.poll();
            }, pollInterval);
          }
}
