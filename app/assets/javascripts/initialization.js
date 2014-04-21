$(function(){
  var view = new View({ mapSelector: "#map" }),
    navigationController = new NavigationController,
    controller = new Controller(view),
    userFetcher = new UserDataFetcher(controller).fetch(),
    quotesRetriever = new QuotesRetriever(controller).retrieve();

  new Binder({controller: controller});

  controller.initialize();
});

