Pairlist.View = function (opts) {
  this.opts = opts;
  this.displaySel = opts.displaySel || "#activeUsersList";
  this.templateSel = opts.templateSel || "#pairlist-user-template";
  this.googleMenuSelector = ".button-div";
};

Pairlist.View.prototype = {
  draw: function (source) {
          var userList = source.getUserList();
          this.renderList(userList);
  },

  setEventDelegate: function (d) {
    this.eventDelegate = d;
  },

  getEventDelegate: function() {
                      return this.eventDelegate;
                    },

  renderList: function(userList){
                var clickedUserId,
                  $display = $(this.displaySel)
                  template = $(this.templateSel).html(),
                  numOfActiveUsers = userList.length,
                  delegate = this.getEventDelegate();


                $display.empty();

                for (var i = 0; i < numOfActiveUsers; i++){
                  clickedUserId = userList[i].id;
                  $display.append(Handlebars.compile(template)(userList[i]))
                    .find("li:last")
                      .bind('click', {clickedUserId: clickedUserId}, function (event) {
                        event.preventDefault();
                        delegate.displayPairingPrompt(event.data.clickedUserId);
                      });
                }
  },

  showGoogleHangoutButtonRequestor: function(delegate, idToPairWith){
                                      var template = $("#google-hangout-prompt").html(),
                                        idToPairWith = idToPairWith;
                                      $(this.googleMenuSelector)
                                        .empty()
                                        .prepend(Handlebars.compile(template)())
                                        .on('click', 'a', function() {
                                          delegate.requestHangoutSession(idToPairWith);
                                        });
  },
}
