SearchBarController = function(){}
SearchBarController.prototype = {
  bindSearchbarEvent: function(){
    $("#submit-search").submit(function(e){
      e.preventDefault();
      var searchValue = $("#search-input").val();
      searchBarController.retrieveResults(searchValue);
    }),

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

searchBarController = new SearchBarController  
