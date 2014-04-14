SearchResults.Controller = function(){}

SearchResults.Controller.prototype = {
  bindSearchbarEvent: function(){
    $("#searchbar").submit(function(e){
      e.preventDefault();
      var searchValue = $("input:first").val();
      // console.log("SEARCHVALUE" + searchValue)
      searchResultsController.retrieveResults(searchValue);
    })
  },

  retrieveResults: function(searchValue){
      // debugger
    $.ajax({
      type: "post",
      url: "/users/results",
      data: {pgsearch: searchValue}
    }).done(function(searchResults){
      searchResultsController.renderResults(searchResults);
    })
  },

  renderResults: function(results){
    $('#main').empty().append(results)
  }

}
