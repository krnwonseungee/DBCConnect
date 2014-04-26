SearchWidget.Controller = function(view, opts) {
  if (!opts) opts = {};

  this.view = view;
  this.userBearer = opts.userBearer || applicationController;
  this.shouldDisplay = false;
};

SearchWidget.Controller.prototype = {
  init: function () {
    this.view.draw(this);
  },

  searchBarSubmit: function(searchTerm){
                     var controller = this;

                     $.ajax({
                       type: "post",
                     url: "/users/results",
                     data: { pgsearch: searchTerm }
                     }).done(function(searchResultsPartial){
                       controller.partial = searchResultsPartial;
                       controller.shouldDisplay = true;
                       controller.view.draw(controller);
                     })
                   },

  closeSearchResults: function() {
                         this.shouldDisplay = false;
                         this.view.draw(this);
                      }

};

