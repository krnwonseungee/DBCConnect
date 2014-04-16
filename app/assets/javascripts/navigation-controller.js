SearchBarController = function(){}
SearchBarController.prototype = {
  searchBarSubmit: function(){
      var searchValue = $("#search-input").val();
      searchBarController.retrieveResults(searchValue);
  },

  retrieveResults: function(searchValue){
    $.ajax({
      type: "post",
      url: "/users/results",
      data: {pgsearch: searchValue}
    }).done(function(searchResultsPartial){
      searchBarController.renderResults(searchResultsPartial);
    })
  },

  renderResults: function(searchResultsPartial){
    view.renderPartial(searchResultsPartial)
  }
}

