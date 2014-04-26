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



  (function configureSearch(delegate) {
    var delegate = delegate;

    o = {
      bind: function () {
              var self = this;
        $("#searchbar")
          .find("#search-input")
            .on('keyup', function(e) {
              if (e.keyCode == jQuery.ui.keyCode.ENTER) {
                self.searchBarSubmit();
              }
            })
            .end()
        .find("button")
        .on('click', function (e) {
          e.preventDefault();
          self.searchBarSubmit();
        });
      },

      searchBarSubmit: function(){
                         o.retrieveResults($("#search-input").val());
                       },

    retrieveResults: function(searchValue){
                         delegate.renderSearchResults(searchValue);
                     }
    };

    o.bind();
  })(applicationController);
});

