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

  var initializeOSM = function(){
    var osmUrl    ='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib ='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors ';
    return  new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: 10, attribution: osmAttrib});
  };

  function createMap() {
    var START_LATITUDE = 37.769;
    var START_LONGITUDE = -70.429;
    var INITIAL_ZOOM = 3;

    var l_map = new L.map('map')
    l_map.setView(L.latLng(START_LATITUDE, START_LONGITUDE), INITIAL_ZOOM);
    l_map.addLayer(initializeOSM());

    map_view = new BootMap.View(l_map);
    map_controller = new BootMap.Controller('#map');
    map_controller.map = l_map;
    map_controller.view = map_view
    map_controller.fetchUsers()
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

