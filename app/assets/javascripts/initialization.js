QuoteWidget = {}

QuoteWidget.Controller = function(view) {
  this.view = view;
}

QuoteWidget.Controller.prototype = {
  handleQuote: function(quote) {
                 this.quote = quote;
                 this.view.showQuote(this);
               }
}

QuoteWidget.View = function(targetSel) {
  this.targetSel = targetSel;
}

QuoteWidget.View.prototype = {
  showQuote: function(quoteBearer){
               var quote = quoteBearer.quote,
                template = $("#quote-template").html();

    $(this.targetSel)
      .empty()
      .append(Handlebars.compile(template)(quote));
  }
};

$(function(){
  appController = new Application.Controller()
  new UserDataFetcher(appController).fetch();


  var qcv = new QuoteWidget.View('#footer');
  var qc =  new QuoteWidget.Controller;
  qc.view = qcv;
  new QuotesRetriever(qc).retrieve();







  jane = new Pairlist.View({ displaySel:  "#activeUsersList" });
  billy = new Pairlist.Controller(jane, {
    retrieverOpts: {
                    doNotPollForUpdate: true,
                  }
  });
  jane.setEventDelegate(billy);
  billy.init();
  return;

  var view = new View({ mapSelector: "#map" }),
    navigationController = new NavigationController,
    controller = new Controller(view),
    userFetcher = new UserDataFetcher(controller).fetch(),
    quotesRetriever = new QuotesRetriever(controller).retrieve();

  new Binder({
    controller: controller,
    selectorOptions: {
      closePopupSelector: '#close-pop-up',
      logoSelector: '#logo',
      profileUpdateSelector: '#update-submit',
      showProfileSelector: '.profile-link',
      searchSelector: "#submit-search",
      availabilityToggleSelector: "#availability",
      clickableUserNameSelector: "#activeUsersList",
      logoutSelector: "#logout"
    }
  });

  function createMap(view) {
    if ($("#map").length < 1) return;
    map_controller = new BootMap.Controller
    map_view = new BootMap.View(map_controller, view)
    map_controller.view = map_view
    map_controller.fetchUsers()
    map_controller.initializeMap(37.769, -70.429, 3)
    map_view.drawMap()
  }

  createMap(view);
});

