$(function(){
  applicationController = new Application.Controller()
  new UserDataFetcher(applicationController).fetch();

  new QuotesRetriever(
    new QuoteWidget.Controller(
      new QuoteWidget.View('#footer'))).retrieve();

  /* TODO: These should be localized to the closure */
  plV = new Pairlist.View({ displaySel:  "#activeUsersList" });
  plC = new Pairlist.Controller(plV, {
    loggedInUserBearer: applicationController,
    retrieverOpts: {
                    doNotPollForUpdate: true,
                  }
  });
  plV.setEventDelegate(plC);
  plC.init();

  /* TODO: These should be localized to the closure */
  avV = new AvailabilityWidget.View();
  avC = new AvailabilityWidget.Controller(avV);
  avV.setEventDelegate(avC);

  applicationController.registerUserDependentController(avC, 'init');
  avC.init();

  function createMap(view) {
    var l_map = new L.map('map')
    map_view = new BootMap.View(map_controller, view, '#map')
    map_controller = new BootMap.Controller('#map');
    map_controller.map = l_map;
    map_controller.view = map_view
    map_controller.fetchUsers()
    map_controller.initializeMap(37.769, -70.429, 3)
    map_view.drawMap()
  }
  createMap()
  return;

  var
    navigationController = new NavigationController,
    controller = new Controller(view);

  //new Binder({
    //controller: controller,
    //selectorOptions: {
      //closePopupSelector: '#close-pop-up',
      //logoSelector: '#logo',
      //profileUpdateSelector: '#update-submit',
      //showProfileSelector: '.profile-link',
      //searchSelector: "#submit-search",
      //availabilityToggleSelector: "#availability",
      //clickableUserNameSelector: "#activeUsersList",
      //logoutSelector: "#logout"
    //}
  //});
});

