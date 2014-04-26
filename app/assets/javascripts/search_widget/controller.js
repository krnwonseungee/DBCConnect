SearchWidget.Controller = function(view, opts) {
  if (!opts) opts = {};

  this.view = view;
  this.userBearer = opts.userBearer || applicationController;
};

SearchWidget.Controller.prototype = {
  init: function () {
    this.view.initBindings();
  },

  searchBarSubmit: function(searchTerm){
                     o.retrieveResults($("#search-input").val());
                   },

  renderSearchResults: function (searchTerm) {
                        this.displayUserProfile = true;
                        this.searchTerm = searchTerm;
                        this.view.draw(this);
  },

  retrieveResults: function(searchTerm) {
                     var controller = this;

                     $.ajax({
                       type: "post",
                     url: "/users/results",
                     data: {pgsearch: userBearer.searchTerm}
                     }).done(function(searchResultsPartial){
                       controller.partial = searchResultsPartial;
                       controller.view.draw(controller);
                     })
                   },



};

