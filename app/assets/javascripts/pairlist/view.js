Pairlist.View = function (opts) {
  this.opts = opts;
  this.displaySel = opts.displaySel || "#activeUsersList";
  this.templateSel = opts.templateSel || "pairlist_user";
  this.googleMenuSelector = ".button-div";
  this.hostName = opts.hostName;
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
    numOfActiveUsers = userList.length,
    delegate = this.getEventDelegate();


    $display.empty();


    for (var i = 0; i < numOfActiveUsers; i++){
      clickedUserId = userList[i].id;
      $display
      .append(HandlebarsTemplates[this.templateSel](userList[i]))
      .find("li:last")
      .bind('click', {clickedUserId: clickedUserId}, function (event) {
        event.preventDefault();
        delegate.displayPairingPrompt(event.data.clickedUserId);
      });
    }
  },

  showGoogleHangoutButtonResponder: function (hangoutURL) {
    var selector = $("#google-hangout-response-button-template"),
    template = selector.html();

    $(".button-div")
    .empty()
    .prepend(Handlebars.compile(template)({url: hangoutURL}))
    .find('#pairing-link')
    .on('click', function(){
      $('#close-pop-up').click();
    });
  },


  showGoogleHangoutButtonRequestor: function(delegate, idToPairWith){
    var idToPairWith = idToPairWith,
      context = this._hangoutButtonLookupData(idToPairWith),
      template = HandlebarsTemplates.google_hangout_prompt,
      content = template(context);

    $(this.googleMenuSelector)
    .empty()
    .prepend(content)
    .on('click', 'a', function() {
      delegate.requestHangoutSession(idToPairWith);
    });
  },

  _calculateCallbackPath: function () {
    return "http://" + this.hostName + "/pairings/update_hangout_info";
  },

    _hangoutButtonLookupData: function (idToPairWith) {
      var paramsObj = {
        requestor_id: applicationController.getUser().user_id,
        responder_id: idToPairWith,
        callbackPath: this._calculateCallbackPath()
      },
      encString = encodeURIComponent(JSON.stringify(paramsObj));

      return {
        lookupData: encString
      };
    }
}
