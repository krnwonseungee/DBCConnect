$(function(){
  var l_map, usersLayerGen, statsLayerGen;

  applicationController = new Application.Controller()
  new UserDataFetcher(applicationController).fetch();

  new QuotesRetriever(
    new QuoteWidget.Controller(
      new QuoteWidget.View('#footer'))).retrieve();

  plV = new Pairlist.View({ displaySel:  "#activeUsersList" });
  plC = new Pairlist.Controller(plV, {
    loggedInUserBearer: applicationController,
    retrieverOpts: {
                    doNotPollForUpdate: true,
                  }
  });
  plV.setEventDelegate(plC);
  plC.init();

  avV = new AvailabilityWidget.View();
  avC = new AvailabilityWidget.Controller(avV);
  avV.setEventDelegate(avC);

  applicationController.registerUserDependentController(avC, 'init');
  avC.init();

  l_map = new BootMap.MapFactory().map();
  usersLayerGen = new BootMap.UsersLayerGenerator(l_map);
  statsLayerGen = new BootMap.StatsLayerGenerator(l_map);

  new BootMap.UserFetcher().fetch(function(bootList) {
    usersLayerGen.renderMarkers(bootList);
    statsLayerGen.renderStats(bootList);
  });

  profileView = new ProfileWidget.View;
  profileController = new ProfileWidget.Controller(profileView);
  profileView.setEventDelegate(applicationController);
  applicationController.registerUserDependentController(profileController, 'draw');

  usernameView = new Application.LoggedInUserNameView;
  applicationController.registerUserDependentController(usernameView, 'draw');


  navigationController = new NavigationController;
  return;

  /* TODO
   *
   * Handle display of the user name so that we can do the profile thing
   *
   * Handle the search button
   *
   */

  var
    controller = new Controller(view);

  new Binder({
    controller: controller,
    selectorOptions: {
      closePopupSelector: '#close-pop-up',
      logoSelector: '#logo',
      profileUpdateSelector: '#update-submit',
      showProfileSelector: '.profile-link',
      searchSelector: "#submit-search",
      clickableUserNameSelector: "#activeUsersList",
      logoutSelector: "#logout"
    }
  });
});

