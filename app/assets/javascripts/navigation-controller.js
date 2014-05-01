NavigationController = function(){}
NavigationController.prototype = {
  searchBarSubmit: function(){
      var searchValue = $("#search-input").val();
      navigationController.retrieveResults(searchValue);
  },

  retrieveResults: function(searchValue){
    $.ajax({
      type: "post",
      url: "/users/results",
      data: {pgsearch: searchValue}
    }).done(function(searchResultsPartial){
      navigationController.renderResults(searchResultsPartial);
    })
  },

  renderResults: function(searchResultsPartial){
    view.renderPartial(searchResultsPartial)
  }
}

