  /* TODO
   *
   * 1.  Consolidate work incorrectly-homed on applicationController
   * 2.  Add logout functionality (pending sign-on)
   * 3.  Restore the pinging / service request (pending sign-on, group
   * available environment)
   *
   */

$(function(){
  var l_map, usersLayerGen, statsLayerGen;

  applicationController = new Application.Controller()

  new UserDataFetcher(applicationController).fetch();
  avV = new AvailabilityWidget.View();
  avC = new AvailabilityWidget.Controller(avV);
  avV.setEventDelegate(avC);

  applicationController.registerUserDependentController(avC, 'init');
  avC.init();

  usernameView = new Application.LoggedInUserNameView;
  applicationController.registerUserDependentController(usernameView, 'draw');

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

