$(function(){
  appController = new Application.Controller()
  new UserDataFetcher(appController).fetch();

  new QuotesRetriever(
    new QuoteWidget.Controller(
      new QuoteWidget.View('#footer'))).retrieve();

  plV = new Pairlist.View({ displaySel:  "#activeUsersList" });
  plC = new Pairlist.Controller(plV, {
    loggedInUserBearer: appController,
    retrieverOpts: {
                    doNotPollForUpdate: true,
                  }
  });
  plV.setEventDelegate(plC);
  plC.init();

  avV = new AvailabilityWidget.View();
  avC = new AvailabilityWidget.Controller(avV, plC);
  avV.setEventDelegate(avC);

  appController.registerUserDependentController(avC, 'init');

  avC.init();

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

