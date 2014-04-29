  /* TODO
   * 1.  Add logout functionality (pending sign-on)
   * 2.  Restore ask to Pair functionality
   */

$(function(){
  var
    availabilitylistView, availabilitylistController,
    usernameView, logoutView,
    pairlistView, pairlistController,
    l_map, usersLayerGen, statsLayerGen,
    profileView, profileController,
    searchWidgetView, searchWidgetController;


  applicationController = new Application.Controller()

  new UserDataFetcher(applicationController).fetch();

  availabilitylistView = new AvailabilityWidget.View();
  availabilitylistController = new AvailabilityWidget.Controller(availabilitylistView);
  availabilitylistView.setEventDelegate(availabilitylistController);

  applicationController.registerUserDependentController(availabilitylistController, 'draw');

  usernameView = new Application.LoggedInUserNameView;
  applicationController.registerUserDependentController(usernameView, 'draw');

  logoutView = new Application.LogoutButtonView;
  applicationController.registerUserDependentController(logoutView, 'draw');

  new QuotesRetriever(
    new QuoteWidget.Controller(
      new QuoteWidget.View('#footer'))).retrieve();

  pairlistView = new Pairlist.View({ displaySel:  "#activeUsersList" });
  pairlistController = new Pairlist.Controller(pairlistView, {
    loggedInUserBearer: applicationController,
  });
  pairlistView.setEventDelegate(pairlistController);
  pairlistController.initPollers(
    [
      new Pairlist.UserListPoller(pairlistController),
      new Pairlist.PairingRequestPoller(pairlistController)
  ]);

  l_map = new BootMap.MapFactory().map();
  usersLayerGen = new BootMap.UsersLayerGenerator(l_map);
  statsLayerGen = new BootMap.StatsLayerGenerator(l_map);

  new BootMap.UserFetcher().fetch(function(bootList) {
    usersLayerGen.renderMarkers(bootList);
    statsLayerGen.renderStats(bootList);
  });

  profileView = new ProfileWidget.View;
  profileController = new ProfileWidget.Controller(profileView);
  profileController.initializeEventBindings();
  usernameView.registerEventDelegate({
    event: 'click',
    goesTo: profileController,
    as: 'clickedOnUsernameWidget'
  });

  searchWidgetView = new SearchWidget.View;
  searchWidgetController = new SearchWidget.Controller(searchWidgetView);
  searchWidgetController.init();
});

